<template>
    <ul>
      <li>
      <router-link to="/">Events</router-link>
      </li>
      <li>
        <router-link  to="/about">About</router-link>
      </li>
      <li v-if="this.$store.getters.loginState" class="logout">
        <a @click="logout">LOGOUT</a>
      </li>
    </ul>
</template>

<script>


export default {
  name: "Nav",
  methods:{
    logout(){
      sessionStorage.removeItem('EAtoken');
      this.$store.dispatch('logout');
      console.log("By Token 👋");
      this.$router.replace({name:'Login'});
    },
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
  background-color: #6b6b6b;
  border-color: #964e4e;

}
li a:hover {
  background-color: #111111;
}
a.router-link-exact-active {
  background-color: #d12662;
}

</style>
