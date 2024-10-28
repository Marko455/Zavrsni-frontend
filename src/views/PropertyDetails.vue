<template>
    <div class="property-details-container">
      <img :src="property.image" alt="Property Image" class="property-image" />
      <div class="property-info">
        <h2>{{ property.title }}</h2>
        <p><strong>Lokacija:</strong> {{ property.location }}</p>
        <p><strong>Cijena:</strong> ${{ property.price }}</p>
        <p><strong>Opis:</strong> {{ property.description }}</p>
        <p><strong>Opis:</strong> {{ property.image }}</p>
        <p><strong>Prodavac:</strong> {{ property.seller }}</p>
        <p><strong>Kontakt:</strong> {{ property.contact }}</p>
        <p><strong>Vrsta nekretnine:</strong> {{ property.property_type }}</p>
        <p><strong>Parkirna mjesta:</strong> {{ property.parking_space }}</p>
        <p><strong>Sq Ft:</strong> {{ property.sq_ft }}</p>
        <p><strong>Broj soba:</strong> {{ property.rooms }}</p>
        <p><strong>Broj kupatila:</strong> {{ property.bathrooms }}</p>
        <p><strong>Broj spavacih soba:</strong> {{ property.bedrooms }}</p>
      </div>
  

      <div class="property-actions">
        <button class="btn-buy" @click="buyProperty">Kupi nekretninu</button>
        <button class="btn-edit" @click="goToEditPage">Uredi nekretninu</button>
        <router-link to="/">
          <button class="btn-back">Vrati se na pocetnu</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "PropertyDetails",
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
          console.error("Error fetching property details:", error);
        }
      },
      goToEditPage() {
        this.$router.push(`/properties/${this.property.id}/edit`);
      },
      buyProperty() {
        alert(`You have successfully purchased ${this.property.title}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .property-details-container {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .property-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .property-info {
    margin-top: 1rem;
  }
  
  .property-info h2 {
    font-size: 2rem;
    color: #35495e;
    margin-bottom: 1rem;
  }
  
  .property-info p {
    margin-bottom: 0.75rem;
    color: #555;
  }
  
  .property-actions {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
  }
  
  .btn-buy, .btn-back, .btn-edit {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    color: white;
    background-color: #42b883;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-buy:hover, .btn-back:hover {
    background-color: #35495e;
  }
</style>
  