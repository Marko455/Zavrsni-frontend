<template>
    <div class="property-card">
      <img :src="property.image" alt="Property Image" class="property-image" />
      <div class="property-info">
        <h3 class="property-title">{{ property.title }}</h3>
        <p class="property-location">{{ property.location }}</p>
        <p class="property-price">${{ property.price }}</p>
        <p class="property-description">{{ property.description }}</p>
        <p class="property-image">{{ property.image }}</p>
        <button v-if="userState.loggedInUser" class="btn-details" @click="viewDetails">Vise detalja</button>
      </div>
    </div>
  </template>
  
  <script>
  import { userState } from "@/store/user";
  export default {
    name: "PropertyCard",
    props: {
      property: {
        type: Object,
        required: true,
      },
    },
    setup() {
      userState.checkUser();
      return { userState };
    },
    methods: {
      viewDetails() {
        this.$router.push(`/property/${this.property.id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .property-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 1rem;
    background-color: #fff;
    transition: transform 0.2s;
  }
  
  .property-card:hover {
    transform: scale(1.05);
  }
  
  .property-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .property-info {
    padding: 1rem;
  }
  
  .property-title {
    font-size: 1.5rem;
    color: #35495e;
    margin-bottom: 0.5rem;
  }
  
  .property-location {
    color: #777;
    margin-bottom: 0.5rem;
  }
  
  .property-price {
    font-size: 1.25rem;
    color: #42b883;
    margin-bottom: 0.5rem;
  }
  
  .property-description {
    color: #555;
    margin-bottom: 1rem;
  }
  
  .btn-details {
    background-color: #42b883;
    color: #fff;
    border: none;
    padding: 0.75rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-details:hover {
    background-color: #35495e;
  }
  </style>
  