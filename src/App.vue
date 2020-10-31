<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1{
  color: white;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  font-size: 40px;
  color: #ffffff;
}
#nav a.router-link-exact-active {
  color: #d12662;
}
body{
  background-color: #313c46;
}
.component{
  color: white;
  background-color: #2c3e50;
  padding: 20px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 2em;
}
</style>
