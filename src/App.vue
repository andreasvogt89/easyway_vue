<template>
  <Login class="main" v-if="state" />
  <div>
    <p class="error" v-if="error">Something went wrong 😐 <br>{{error}}</p>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import REST_interface from './REST_interface';
export default {
  name: 'App',
  components: {
    Login: Login
  },
  data() {
    return {
      state: false,
      error: '',
    }
  },
  async created() {
    try {
      this.state = await REST_interface.isBackendRunning();
    } catch (e) {
      this.error = e.message;
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
  color: #ffffff;
  margin-top: 60px;
}
body{
  background-color: #313c46;

}
.error{
  background-color: #822314;
  padding: 2em;
  border-radius: 1em;
}
.main{
  display: flex;
  justify-content: center;

}

</style>
