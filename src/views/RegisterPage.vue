<template>
       <main class="container mt-custom">
        <div class="bg-light p-5 rounded">
     <h2>Register</h2>
      <form @submit.prevent="register" class="needs-validation">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="name" class="form-control" id="name" required>
        </div>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" class="form-control" id="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" class="form-control" id="password" required>
        </div> <br>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
        </div>

       </main>
     
  </template>
  
  <script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      username: '',
      password: ''
    };
  },
  methods: {
    register() {
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          username: this.username,
          password: this.password
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Registration fail');
        }
        // Handle successful registration here (e.g., show success message or redirect to login)
        this.$router.push('/login'); // Redirect ke halaman login setelah registrasi berhasil
      })
      .catch(error => {
        console.error(error.message);
      });
    }
  }
};
  </script>
  
  <style>
  /* You can include custom styles here if needed */
  </style>
  