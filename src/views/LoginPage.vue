<template>
     <main class="container mt-custom">
        <div class="bg-light p-5 rounded">
            <div class="col-md-6">
          <h2 class="mb-4">Login</h2>
          <form @submit.prevent="login" class="needs-validation" novalidate>
            <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" v-model="username" class="form-control" id="username" required>
              <div class="invalid-feedback">Please enter your username.</div>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" v-model="password" class="form-control" id="password" required>
              <div class="invalid-feedback">Please enter your password.</div>
            </div> <br>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
        </div>
     </main>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Invalid username or password');
          }
          console.log('logged in')
          // Handle successful login here (e.g., store token in localStorage)
        })
        .catch(error => {
          console.error(error.message);
        });
      }
    }
  }
  </script>
