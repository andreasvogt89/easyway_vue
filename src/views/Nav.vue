<template>
    <ul>
      <li>
      <router-link to="/">Events</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li class="logout">
        <a @click="logout">{{this.state.login}}</a>
      </li>
    </ul>
</template>

<script>
// some JS file
import store from '../store/index';
import { reactive } from 'vue';

export default {
  name: "Nav",
  methods:{
    logout(){
      sessionStorage.removeItem('EAtoken');
      console.log("By Token 👋");
      this.$router.replace({name:'Login'});
    }
  },
  setup(){
    const state = reactive({
     login: store.getters.loginState,
    });
    return { state }
  },
}
</script>

<style scoped>

ul {
  list-style-type: none;
  margin: 10px;
  padding: 10px;
  overflow: hidden;
  background-color: #333;
  border-radius: 2px;
  top: 0;
}

li {
  float: left;
}

.logout {
  float: right;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: #111;
}
</style>
