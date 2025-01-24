<template>
    <div class="edit-property-container">
      <h2>Uređivanje nekretnine</h2>
      <form @submit.prevent="submitForm">
  
        <div class="form-group">
          <label for="title">Naziv nekretnine</label>
          <input type="text" id="title" v-model="property.title" required />
        </div>
  
        <div class="form-group">
          <label for="location">Lokacija</label>
          <input type="text" id="location" v-model="property.location" required />
        </div>
  
        <div class="form-group">
          <label for="price">Cijena ($)</label>
          <input type="number" id="price" v-model="property.price" required />
        </div>
  
        <div class="form-group">
          <label for="description">Opis</label>
          <textarea id="description" v-model="property.description" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="image">URL slike</label>
          <input type="text" id="image" v-model="property.image" required />
        </div>
  
        <button type="submit" class="btn-submit">Spremi promjene</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "EditProperty",
    data() {
      return {
        property: {},
      };
    },
    async created() {
      const propertyId = this.$route.params.id;
      await this.fetchPropertyDetails(propertyId);
    },
    methods: {
      async fetchPropertyDetails(id) {
        try {
          const response = await axios.get(`http://localhost:8000/properties/${id}`);
          this.property = response.data;
        } catch (error) {
          console.error("Pogreska dohvacanja detalja nekretnine:", error);
        }
      },
      async submitForm() {
        try {
          const response = await axios.put(`http://localhost:8000/properties/${this.property.id}`, this.property);
          alert(`Nekretnina nazvana "${this.property.title}" je azurirana.`);
          this.$router.push(`/properties/${this.property.id}`);
        } catch (error) {
          console.error("Pogreska azuriranja nekretnine:", error);
          alert("Pojavila se pogreska u azuriranju nekretnine.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-property-container {
    max-width: 600px;
    margin: auto;
    padding: 2rem;
    background-color: #a79191;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
    color: black;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  textarea {
    resize: vertical;
  }
  
  .btn-submit {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    color: white;
    background-color: #42b883;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-submit:hover {
    background-color: #35495e;
  }
  </style>
  