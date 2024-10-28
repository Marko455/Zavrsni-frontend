<template>
  <div id="app" @user-logged-in="checkUser">
    <nav class="navbar">
      <div class="logo">Zavrsni rad</div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>

        <li v-if="userState.loggedInUser">
          <span class="welcome-message">Dobrodosli, {{ userState.loggedInUser }}</span>
        </li>
        <li v-if="userState.loggedInUser">
          <button class="logout-btn" @click="logout">Odjava</button>
        </li>

        <li v-else><router-link to="/register">Registracija</router-link></li>
        <li><router-link to="/login">Prijava</router-link></li>
        <li><router-link to="#">Kontakt</router-link></li>
      </ul>

      <!-- Trazilica -->
      <div class="search-bar">
        <select v-model="filterType">
          <option value="title">Nazivu</option>
          <option value="seller">Prodavacu</option>
          <option value="location">Lokaciji</option>
        </select>

        <input type="text" v-model="searchQuery" placeholder="Pretrazi..." />
        <button class="search-btn" @click="applySearch">Pretrazi</button>
      </div>
    </nav>

    <router-view />

  </div>
</template>

<script>
import { watchEffect } from "vue";
import { userState } from "@/store/user";

export default {
  name: "App",
  data() {
    return {
      searchQuery: "",
      filterType: "title",
    };
  },
  setup() {
    userState.checkUser();
    watchEffect(() => {
      console.log("User state changed:", userState.loggedInUser);
    });
    return { userState };
  },
  methods: {
    checkUser() {
      userState.checkUser();
    },
    logout() {
      userState.clearUser();
      this.$router.push("/login");
    },
    applySearch() {
      const searchParams = {
        filterType: this.filterType,
        searchQuery: this.searchQuery,
      };
      this.$router.push({ path: "/", query: searchParams });
    },
  },
};
</script>

<style scoped>
/* Navbar styling */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3f51b5;
  padding: 10px 20px;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar .logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin: 0 15px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ffeb3b;
}

.welcome-message {
  font-size: 14px;
  font-weight: bold;
  color: #ffeb3b;
}

.logout-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #d32f2f;
}

/* Search Bar Styling */
.search-bar {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.search-bar select,
.search-bar input {
  padding: 6px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.search-btn {
  background-color: #ffeb3b;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #fbc02d;
}

/* Footer Styling */
.footer {
  text-align: center;
  background-color: #3f51b5;
  color: white;
  padding: 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.footer p {
  margin: 0;
}

/* Media Queries */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links li {
    margin: 10px 0;
  }

  .search-bar {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
