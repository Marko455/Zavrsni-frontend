<template>
  <div class="home-container">
    <h1>Dobrodosli na RealEstate</h1>
    <p>Vase rjesenje na jednom mjestu za pronalazenje kuce iz snova.</p>
    <p>Istrazite nase popise i zapocnite svoje putovanje vec danas!</p>

    <!-- Lista nekretnina -->
    <div v-if="filteredProperties.length" class="property-list">
      <PropertyCard v-for="property in filteredProperties" :key="property.id" :property="property" />
    </div>
    <div v-else>
      <p>Nema rezultata pretrage...</p>
    </div>

    <!-- Chatbot Input Field -->
    <div class="chatbot-container">
      <input
        type="text"
        placeholder="Postavite pitanje o nekretninama..."
        class="chatbot-input"
      />
      <button class="chatbot-send-btn">➤</button>
    </div>

    <div class="sell-property-btn">
      <router-link to="/sell-property">
        <button class="btn-sell">Prodajte nekretninu</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import PropertyCard from '../components/PropertyCard.vue';
import axios from 'axios';

export default {
  name: "Home",
  components: {
    PropertyCard,
  },
  data() {
    return {
      properties: [],
    };
  },
  computed: {
    filteredProperties() {
      const filterType = this.$route.query.filterType || '';
      const searchQuery = this.$route.query.searchQuery?.toLowerCase() || '';

      if (!filterType || !searchQuery) {
        return this.properties;
      }

      return this.properties.filter((property) => {
        const value = property[filterType]?.toLowerCase();
        return value?.includes(searchQuery);
      });
    }
  },
  async created() {
    await this.fetchProperties();
  },
  methods: {
    async fetchProperties() {
      try {
        const response = await axios.get('http://localhost:8000/properties');
        this.properties = response.data;
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  padding: 1rem;
  text-align: center;
}

.property-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.chatbot-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
}

.chatbot-input {
  width: 60%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

.chatbot-input:focus {
  border-color: #42b883;
}

.chatbot-send-btn {
  padding: 0.8rem 1.2rem;
  font-size: 1.2rem;
  color: white;
  background-color: #42b883;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chatbot-send-btn:hover {
  background-color: #35495e;
}

.sell-property-btn {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.btn-sell {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: white;
  background-color: #42b883;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-sell:hover {
  background-color: #35495e;
}
</style>
