<template>
  <div class="sell-property-container">
    <h2>Prodajte svoju nekretninu</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Naziv nekretnine</label>
        <input type="text" id="title" v-model="property.title" placeholder="" required />
      </div>

      <div class="form-group">
        <label for="location">Lokacija</label>
        <input
          type="text"
          id="location"
          v-model="property.location"
          @blur="geocodeAddress"
          placeholder="Unesite adresu"
          required
        />
      </div>

      <div v-if="property.latitude && property.longitude" class="form-group">
        <p><strong>Koordinate:</strong> {{ property.latitude }}, {{ property.longitude }}</p>
      </div>

      <div class="form-group">
        <label for="price">Cijena ($)</label>
        <input type="number" id="price" v-model="property.price" placeholder="" required />
      </div>

      <div class="form-group">
        <label for="description">Opis</label>
        <textarea id="description" v-model="property.description" placeholder="" required></textarea>
      </div>

      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="text" id="image" v-model="property.image" placeholder="URL slike" required />
      </div>

      <div class="form-group">
        <label for="seller">Puno ime prodavača</label>
        <input type="text" id="seller" v-model="property.seller" required />
      </div>

      <div class="form-group">
        <label for="contact">Kontakt</label>
        <input type="text" id="contact" v-model="property.contact" required />
      </div>

      <div class="form-group">
        <label for="property_type">Vrsta nekretnine</label>
        <select id="property_type" v-model="property.property_type" required>
          <option value="" disabled>Izaberite vrstu nekretnine</option>
          <option value="apartment">Stan</option>
          <option value="house">Kuća</option>
          <option value="commercial">Poslovni prostor</option>
          <option value="land">Zemljište</option>
        </select>
      </div>

      <div class="form-group">
        <label for="parking_space">Broj parkirnih mjesta</label>
        <input type="number" id="parking_space" v-model="property.parking_space" required />
      </div>

      <div class="form-group">
        <label for="sq_ft">Kvadratni metri</label>
        <input type="number" id="sq_ft" v-model.number="property.sq_ft" step="0.01" required />
      </div>

      <div class="form-group">
        <label for="rooms">Broj soba</label>
        <input type="number" id="rooms" v-model="property.rooms" required />
      </div>

      <div class="form-group">
        <label for="bathrooms">Broj kupatila</label>
        <input type="number" id="bathrooms" v-model="property.bathrooms" required />
      </div>

      <div class="form-group">
        <label for="bedrooms">Broj spavaćih soba</label>
        <input type="number" id="bedrooms" v-model="property.bedrooms" required />
      </div>

      <button type="submit" class="btn-submit">Šalji na prodaju</button>
    </form>

    <div class="map-style-controls">
      <label for="mapStyle">Izaberite stil mape:</label>
      <select id="mapStyle" v-model="mapStyle" @change="changeMapStyle">
        <option value="mapbox://styles/mapbox/streets-v11">Ulice</option>
        <option value="mapbox://styles/mapbox/outdoors-v11">Priroda</option>
        <option value="mapbox://styles/mapbox/light-v10">Svijetla</option>
        <option value="mapbox://styles/mapbox/dark-v10">Tamna</option>
        <option value="mapbox://styles/mapbox/satellite-v9">Satelit</option>
      </select>
    </div>

    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";
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
        bedrooms: null,
        latitude: null,
        longitude: null,
      },
      map: null,
      mapStyle: "mapbox://styles/mapbox/streets-v11",
    };
  },
  created() {
    if (userState.loggedInUser) {
      this.property.seller = userState.loggedInUser.email;
    } else {
      console.warn("Korisnik nije prijavljen.");
    }
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFya280NTUiLCJhIjoiY20zNzNkdGY3MGJodDJxcjY2b2lpcTlubSJ9.TZ2ssTeRpCBui-6CK3jQXg";
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.mapStyle,
      center: [18.4131, 43.8563],
      zoom: 10,
    });

    this.map.on("click", (event) => {
      this.property.latitude = event.lngLat.lat;
      this.property.longitude = event.lngLat.lng;
    });
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:8000/properties/", this.property);
        console.log("Nekretnina potvrđena:", response.data);
        alert(`Nekretnina "${this.property.title}" je poslana na prodaju.`);
        this.resetForm();
      } catch (error) {
        console.error("Pogreška prodaje nekretnine:", error);
        alert("Pojavila se pogreška u prodaju nekretnine.");
      }
    },
    async geocodeAddress() {
      if (!this.property.location) return;

      const accessToken =
        "pk.eyJ1IjoibWFya280NTUiLCJhIjoiY20zNzNkdGY3MGJodDJxcjY2b2lpcTlubSJ9.TZ2ssTeRpCBui-6CK3jQXg";
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        this.property.location
      )}.json?access_token=${accessToken}`;

      try {
        const response = await axios.get(geocodeUrl);
        if (response.data.features && response.data.features.length > 0) {
          const coordinates = response.data.features[0].geometry.coordinates;
          this.property.longitude = coordinates[0];
          this.property.latitude = coordinates[1];

          console.log("Geocoded Coordinates:", this.property.latitude, this.property.longitude);

          this.map.flyTo({
            center: [this.property.longitude, this.property.latitude],
            essential: true,
            zoom: 14,
          });
        } else {
          alert("Nema podataka za ovu adresu.");
        }
      } catch (error) {
        console.error("Geocoding error:", error);
        alert("Pogreška kod dobivanja koordinata adrese.");
      }
    },
    resetForm() {
      this.property = {
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
        bedrooms: null,
        latitude: null,
        longitude: null,
      };
    },
    changeMapStyle() {
      this.map.setStyle(this.mapStyle);
    },
  },
};
</script>


<style scoped>
.sell-property-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

h2 {
  text-align: center;
  color: #35495e;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  color: rgb(198, 31, 140);
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #42b883;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #42b883;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1.5rem;
}

.btn-submit:hover {
  background-color: #35495e;
}

.map-container {
  width: 100%;
  height: 400px;
  margin-top: 2rem;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.map-style-controls {
  margin: 1rem 0;
  text-align: center;
  color: black;
}

.map-style-controls select {
  padding: 0.5rem;
  font-size: 1rem;
  color: red;
}
</style>
