<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-text">
        <h1>Dobrodošli na RealEstate</h1>
        <p>Vaše rješenje na jednom mjestu za pronalazak kuće iz snova.</p>
        <p>Istražite naše popise i započnite svoje putovanje već danas!</p>
      </div>
    </div>

    <!-- Lista nekretnina -->
    <div v-if="filteredProperties.length" class="property-list">
      <PropertyCard v-for="property in filteredProperties" :key="property.id" :property="property" />
    </div>
    <div v-else>
      <p>Nema rezultata pretrage...</p>
    </div>

    <div class="sell-property-btn">
      <router-link to="/sell-property">
        <button v-if="userState.loggedInUser" class="btn-sell">Prodajte nekretninu</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import PropertyCard from '../components/PropertyCard.vue';
import axios from 'axios';
import { userState } from "@/store/user";
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
  setup() {
    userState.checkUser();
    return { userState };
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
        const response = await axios.get('http://localhost:8000/properties/');
        this.properties = response.data;
      } catch (error) {
        console.error("Pogreška dohvaćanja nekretnina:", error);
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  padding: 0;
  text-align: center;
}

.hero-section {
  width: 100%;
  height: 60vh;
  background-image: url('@/assets/heroImage.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-text {
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 1rem 2rem;
  border-radius: 8px;
  max-width: 80%;
}

.hero-text h1 {
  margin: 0;
  font-size: 2.5rem;
}

.hero-text p {
  font-size: 1.2rem;
}

.property-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
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
