<template>
  <div class="property-details-container">
    <img :src="property.image" alt="Property Image" class="property-image" />
    <div class="property-info">

      <h2>{{ property.title }}</h2>
      <p><strong>Lokacija:</strong> {{ property.location }}</p>
      <p><strong>Cijena:</strong> ${{ property.price }}</p>
      <p><strong>Opis:</strong> {{ property.description }}</p>
      <p><strong>Prodavač:</strong> {{ property.seller }}</p>
      <p><strong>Kontakt:</strong> {{ property.contact }}</p>
      <p><strong>Vrsta nekretnine:</strong> {{ property.property_type }}</p>
      <p><strong>Parkirna mjesta:</strong> {{ property.parking_space }}</p>
      <p><strong>Sq Ft:</strong> {{ property.sq_ft }}</p>
      <p><strong>Broj soba:</strong> {{ property.rooms }}</p>
      <p><strong>Broj kupatila:</strong> {{ property.bathrooms }}</p>
      <p><strong>Broj spavaćih soba:</strong> {{ property.bedrooms }}</p>
    </div>

    <div ref="mapContainer" class="map-container"></div>

    <div class="property-actions">
      <button class="btn-buy" @click="buyProperty">Kupi nekretninu</button>
      <button class="btn-buy" @click="openRequestModal">Zatraži obilazak kuce</button>
      <button class="btn-edit" @click="goToEditPage">Uredi nekretninu</button>
      <router-link to="/">
        <button class="btn-back">Vrati se na početnu</button>
      </router-link>

      <div v-if="showRequestModal" class="modal-overlay">
        <div class="modal">
          <h3>Zatraži obilazak kuće</h3>
          <label for="visit-date">Odaberi datum i vrijeme:</label>
          <input type="datetime-local" id="visit-date" v-model="visitDateTime" />
          <div class="modal-actions">
            <button class="btn-confirm" @click="requestVisit">Potvrdi</button>
            <button class="btn-cancel" @click="closeRequestModal">Otkaži</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = 'pk.eyJ1IjoibWFya280NTUiLCJhIjoiY20zNzNkdGY3MGJodDJxcjY2b2lpcTlubSJ9.TZ2ssTeRpCBui-6CK3jQXg';

export default {
  name: "PropertyDetails",
  data() {
    return {
      property: {},
      map: null,
      marker: null,
      showRequestModal: false,
      visitDateTime: "",
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
        
        if (this.property.latitude && this.property.longitude) {
          this.initializeMap();
        }
      } catch (error) {
        console.error("Pogreska dohvacanja detalja nekretnine:", error);
      }
    },
    initializeMap() {
      this.map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [this.property.longitude, this.property.latitude],
        zoom: 12,
      });

      this.marker = new mapboxgl.Marker()
        .setLngLat([this.property.longitude, this.property.latitude])
        .addTo(this.map);
    },
    goToEditPage() {
      this.$router.push(`/properties/${this.property.id}/edit`);
    },
    buyProperty() {
      alert(`Uspijesno ste kupili nekretninu ${this.property.title}`);
    },
    openRequestModal() {
      this.showRequestModal = true;
    },
    closeRequestModal() {
      this.showRequestModal = false;
    },
    requestVisit() {
        if (this.visitDateTime) {
        const payload = {
          property_id: this.property.id,
          visit_date_time: this.visitDateTime,
        };

        axios.post(`http://localhost:8000/properties/${this.property.id}/schedule-tour`, payload)
          .then(response => {
            alert(`Obilazak uspješno zatražen za ${this.visitDateTime}`);
          this.showRequestModal = false;
          })
          .catch(error => {
            console.error("Greška prilikom slanja zahtjeva za obilazak:", error);
            alert("Došlo je do greške. Molimo pokušajte ponovno.");
          });
      } else {
        alert("Molimo odaberite datum i vrijeme.");
      }
    },
  
  },
};
</script>

<style scoped>
.property-details-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  background-color: #3927e1;
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

.map-container {
  width: 100%;
  height: 400px;
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
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
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(49, 145, 225, 0.938);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: rgb(6, 141, 199);
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.modal h3 {
  margin-bottom: 1rem;
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.btn-confirm {
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: rgb(210, 32, 148);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancel {
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>