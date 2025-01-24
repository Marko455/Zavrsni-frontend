<template>
  <div class="chat-container">
    <div class="chat-display">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="{ 'user-message': message.from === 'user', 'bot-message': message.from === 'bot' }"
      >
        <div v-if="Array.isArray(message.text)">
          <p class="bot-intro-text">{{ message.answer }}</p>
          <PropertyCard 
            v-for="(property, idx) in message.text" 
            :key="idx" 
            :property="property" 
          />
        </div>
        <p v-else>{{ message.text }}</p>
      </div>
    </div>

    <div class="sorting-options">
      <label for="sort-by">Sort By:</label>
      <select v-model="sortBy" id="sort-by">
        <option value="price">Price</option>
        <option value="bedrooms">Bedrooms</option>
        <option value="bathrooms">Bathrooms</option>
        <option value="sq_ft">Square Feet</option>
      </select>

      <label>
        <input type="radio" value="asc" v-model="sortOrder" /> Ascending
      </label>
      <label>
        <input type="radio" value="desc" v-model="sortOrder" /> Descending
      </label>
    </div>

    <form @submit.prevent="sendMessage" class="chat-input">
      <input 
        v-model="userInput" 
        placeholder="Postavite pitanje..." 
        @keyup.enter="sendMessage"
      />
      <button type="submit">Pošalji</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import PropertyCard from './PropertyCard.vue';

export default {
  components: { PropertyCard },
  data() {
    return {
      userInput: '', 
      messages: [],  
      sortBy: 'price', 
      sortOrder: 'asc' 
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      this.messages.push({ from: 'user', text: this.userInput });

      try {
        const response = await axios.post('http://localhost:8000/sql_query/', { 
          question: this.userInput,
          sort_by: this.sortBy,
          sort_order: this.sortOrder
        });

        if (response.data.results && Array.isArray(response.data.results)) {
          this.messages.push({
            from: 'bot',
            text: response.data.results,
            answer: response.data.answer
          });
        } else {
          this.messages.push({ from: 'bot', text: response.data.answer });
        }
      } catch (error) {
        this.messages.push({ from: 'bot', text: 'Sorry, something went wrong. Please try again.' });
      }

      this.userInput = '';
    }
  }
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  border-radius: 5px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.chat-display {
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #000000;
  background-color: #fff;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #2648b7;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #e02690;
  border-radius: 5px;
  margin-right: 5px;
}

.chat-input button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}

.user-message {
  text-align: right;
  background-color: #67d413;
  padding: 8px;
  border-radius: 5px;
  margin: 5px 0;
}

.bot-message {
  text-align: left;
  background-color: #f1f0f0;
  padding: 8px;
  border-radius: 5px;
  margin: 5px 0;
}

.bot-intro-text {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.sorting-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #2597ee;
  border-bottom: 1px solid #e11b9c;
}

.sorting-options label {
  margin-right: 10px;
}

.sorting-options select {
  padding: 5px;
  border: 1px solid #1edd10;
  border-radius: 5px;
}

.sorting-options input[type="radio"] {
  margin-left: 10px;
}
</style>
