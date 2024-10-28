<template>
  <div class="sell-property-container">
    <h2>Prodajte svoju nekretninu</h2>

    <form @submit.prevent="submitForm">

      <div class="form-group">
        <label for="title">Naziv nekretnine</label>
        <input type="text" id="title" v-model="property.title" placeholder="Enter property title" required />
      </div>

      <div class="form-group">
        <label for="location">Lokacija</label>
        <input type="text" id="location" v-model="property.location" placeholder="Enter property location" required />
      </div>

      <div class="form-group">
        <label for="price">Cijena ($)</label>
        <input type="number" id="price" v-model="property.price" placeholder="Enter property price" required />
      </div>

      <div class="form-group">
        <label for="description">Opis</label>
        <textarea id="description" v-model="property.description" placeholder="Enter property description" required></textarea>
      </div>

      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="text" id="image" v-model="property.image" placeholder="Enter image URL" required />
      </div>

      <div class="form-group">
        <label for="seller">Puno ime prodavaca</label>
        <input type="text" id="seller" v-model="property.seller" required/>
      </div>

      <div class="form-group">
        <label for="contact">Kontakt</label>
        <input type="text" id="contact" v-model="property.contact" required/>
      </div>

      <div class="form-group">
        <label for="contact">Property type</label>
        <input type="text" id="property_type" v-model="property.property_type" required/>
      </div>

      <div class="form-group">
        <label for="contact">Parking space</label>
        <input type="number" id="parking_space" v-model="property.parking_space" required/>
      </div>

      <div class="form-group">
        <label for="contact">Sq Ft</label>
        <input type="number" id="sq_ft" v-model.number="property.sq_ft" step="0.01" required/>
      </div>

      <div class="form-group">
        <label for="contact">Rooms</label>
        <input type="number" id="rooms" v-model="property.rooms" required/>
      </div>

      <div class="form-group">
        <label for="contact">Bathrooms</label>
        <input type="number" id="bathrooms" v-model="property.bathrooms" required/>
      </div>

      <div class="form-group">
        <label for="contact">Bedrooms</label>
        <input type="number" id="bedrooms" v-model="property.bedrooms" required/>
      </div>

      <button type="submit" class="btn-submit">Salji na prodaju</button>
    </form>

  </div>
</template>

<script>
import axios from 'axios';
import { userState } from "@/store/user";

export default {
  name: "SellProperty",
  data() {
    return {
      property: {
        title: "",
        location: "",
        price: null,
        description: "",
        image: "",
        seller: "",
        contact: "",
        property_type: "",
        parking_space: null,
        sq_ft: null,
        rooms: null,
        bathrooms: null,
        bedrooms: null

      },
    };
  },
  created() {
    if (userState.loggedInUser) {
      this.property.seller = userState.loggedInUser.email; // Za postaviti korisnicko ime ili email
    } else {
      console.warn("User is not logged in.");
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:8000/properties/", this.property);
        console.log("Property submitted:", response.data);

        alert(`Property titled "${this.property.title}" has been submitted for sale.`);
        this.resetForm();
      } catch (error) {
        console.error("Error submitting property:", error);
        alert("There was an error submitting your property.");
      }
    },
    resetForm() {
      this.property.title = "";
      this.property.location = "";
      this.property.price = null;
      this.property.description = "";
      this.property.image = "";
      this.property.seller = "";
      this.property.contact = "";
      this.property.property_type = "";
      this.property.parking_space = null;
      this.property.sq_ft = null;
      this.property.rooms = null;
      this.property.bathrooms = null;
      this.property.bedrooms = null;
    },
  },
};
</script>

<style scoped>

</style>
