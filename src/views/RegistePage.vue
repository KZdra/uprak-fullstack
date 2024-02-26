<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <label for="name">Name:</label>
        <input type="text" v-model="name" required>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name:'RegisterPage',
   data() {
      return {
        name: '',
        username: '',
        password: ''
      }
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
            throw new Error('Registration failed');
          }
          // Handle successful registration here (e.g., show success message or redirect to login)
        })
        .catch(error => {
          console.error(error.message);
        });
      }
    }
  }
  </script>