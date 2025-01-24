<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Prijavite se na račun</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" placeholder="Unesite vas email" />
        </div>

        <div class="form-group">
          <label for="password">Lozinka</label>
          <input v-model="password" type="password" id="password" placeholder="Unesite vasu lozinku" />
        </div>

        <div class="form-group">
          <label>Odaberite tip računa:</label>
          <div>
            <input type="radio" id="buyer" value="buyer" v-model="role" />
            <label for="buyer">Kupac</label>
            <input type="radio" id="seller" value="seller" v-model="role" />
            <label for="seller">Prodavac</label>
          </div>
        </div>

        <button type="submit" class="btn-login">Prijava</button>
      </form>

      <p class="register-link">
        <span class="p1">Nemate racun?</span> <router-link to="/register">Registriraj se ovdje</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { userState } from "@/store/user";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      role: ""
    };
  },
  methods: {
    async loginUser(){
      if (!this.role) {
        alert("Molimo vas izaberite ulogu.");
        return;
      }
      
      try {
        const endpoint = this.role === 'buyer' ? '/login_buyer/' : '/login_seller/';
        
        const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, {
          email: this.email,
          password: this.password,
        });

        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        this.$emit('user-logged-in');
        this.$router.push("/");
      } catch (error) {
        alert("Prijava neuspijesna: " + (error.response?.data?.detail || error.message));
      }
    }
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #28b1cc;
}

.login-form {
  background-color: rgb(34, 151, 186);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #3f51b5;
  outline: none;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-login:hover {
  background-color: #303f9f;
}

.register-link {
  text-align: center;
  margin-top: 15px;
}

.register-link a {
  color: #3f51b5;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .login-form {
    padding: 20px;
  }
}

.p1 {
  color: black;
}
</style>
