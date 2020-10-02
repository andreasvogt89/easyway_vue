<template>
<div>
  <ul id="example-1">
    <li v-for="event in this.events" :key="event.name">
      {{ event.message }}
    </li>
  </ul>
</div>
</template>

<script>
import {reactive} from "vue";
import REST_interface from "@/REST_interface";

export default {
  name: "Events",
  setup() {
    const state = reactive({
      events: [],
      error: false,
    });
    return { state };
  },
  async created() {
      await REST_interface.getCollection("events").then(resp=>{
        this.events = resp.body;
      }).catch(err=>{
        sessionStorage.removeItem('EAtoken');
        console.log(err);
        this.$router.push({ name: 'Login', query: { redirect: '/login' } });
      });
    }
}
</script>

<style scoped>

</style>
