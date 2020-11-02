<template>
    <Nav/>
  <router-view/>
</template>
<script>
import Nav from "@/views/Nav";

export default {
  name: 'App',
  components: {
    Nav
  },
}
</script>
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
  padding-top: 10px;
}

body{
  background-color: #313c46;
}
.input{
  padding: 20px;
}
.component{
  color: white;
  background-color: #2c3e50;
  border-radius: 2em;
  justify-content: center;
}
.button{
  margin: 10px;
  background-color: transparent;
  padding: 10px 40px 10px 40px;
  border-radius: 2em;
  border-color: #1e2b36;
  font-size: x-large;
}

.button:hover{
  background-color: #d12662;
}
.right{
  float: right;
  color: white;
}
</style>
