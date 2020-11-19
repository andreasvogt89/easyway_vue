<template>
  <Nav/>
  <router-view />
  <div>
    <p class="error" v-if="this.state.error" >Something went wrong 😐 <br>{{state.error}}</p>
  </div>
  <div>
    <p class="userComment" v-if="this.$store.getters.loginState" >
      Logged in as: {{$store.getters.getUsername}},
      can do {{$store.getters.getUserRole}} things 😎
    </p>
  </div>
</template>

<script>
import Nav from "@/views/Nav";
import { reactive } from 'vue';

export default {
  name: 'App',
  components: {
    Nav,
  },
  setup(){
    const state = reactive({
      backend: "",
      login: false,
      error: false,
    });
    return { state }
  },
  async created() {
      if(sessionStorage.getItem('EAtoken') !== null){
        await this.$router.replace({name: 'Events'})
      } else {
        await this.$router.replace({name: 'Login'})
      }

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
  background-color: rgb(24, 26, 31);
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
.error{
  background-color: #fa6764;
  padding: 2em;
  border-radius: 1em;
  color: white;
}
.userComment{
  color: white;
  padding: 1em;
  float: left;
}
</style>
