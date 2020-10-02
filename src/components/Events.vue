<template>
<div>
  <ul class="eventList">
    <li v-for="event in state.events" :key="event._id">
      {{ event.event.name }}
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
        this.state.events = resp
      }).catch(err=>{
        sessionStorage.removeItem('EAtoken');
        console.log("By Token 👋 :" + err.message);
        this.$router.push({ name: 'Login', query: { redirect: '/login' } });
      });
    }
}
</script>

<style scoped>
.eventList{
  color: white;
  padding: 2vw;
}
</style>
