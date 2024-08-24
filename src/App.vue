<template>
  <!-- <nav>
    <router-link to="/">Contacts</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link>
  </nav> -->
  <router-view />
</template>

<style>
:root {
  --font-family: "Unbounded", sans-serif;
  --second-family: "ProximaNova", sans-serif;
  --main-color: #4932d8;
  --dark-color: #2d2a42;
  --header-table-color: #7d7b8e;
  --column-name-width: 51.3%;
  --column-email-width: 25.2%;
  --column-phone-width: 21.7%;
  --column-gap-table: 10px;
}

* {
  box-sizing: border-box;
  font-family: var(--font-family);
  /* color: #2c3e50; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
