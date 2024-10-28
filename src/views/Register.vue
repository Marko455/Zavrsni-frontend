<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Izradite racun</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="fullname">Puno ime</label>
          <input type="text" v-model="fullname" id="fullname" placeholder="Unesite svoje puno ime" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" placeholder="Unesite vas email" />
        </div>

        <div class="form-group">
          <label for="password">Lozinka</label>
          <input type="password" v-model="password" id="password" placeholder="Unesite lozinku" />
        </div>

        <div class="form-group">
          <label for="confirm-password">Potvrdi lozinku</label>
          <input type="password" v-model="confirmPassword" id="confirm-password" placeholder="Potvrdite lozinku" />
        </div>

        <button type="submit" class="btn-register">Registriraj se</button>
      </form>

      <p class="login-link">
        <p1 class="p1">Vec imate racun? </p1><router-link to="/login">Prijavi se</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Register",
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/users/', {
          name: this.fullname,
          email: this.email,
          password: this.password
        });
        alert('Registration successful!');
        this.$router.push('/login');
      } catch (error) {
        alert('Error registering user: ' + error.response.data.detail);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.register-form {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.register-form h2 {
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

.btn-register {
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

.btn-register:hover {
  background-color: #303f9f;
}

.login-link {
  text-align: center;
  margin-top: 15px;
}

.login-link a {
  color: #3f51b5;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .register-form {
    padding: 20px;
  }
}

.p1 {
  color: black;
}
</style>
