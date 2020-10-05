<template>
  <div class="component">
<h1>{{ this.state.event.name }}</h1>
  </div>
</template>

<script>
import {reactive} from "vue";
import REST_interface from "@/REST_interface";

export default {
  name: "Event",
  setup() {
    const state = reactive({
      event: {},
      participants: [],
      error: false,
    });
    return { state };
  },
  async created() {
    this.state.event = sessionStorage.getItem('displayEvent');
    await REST_interface.getCollection("persons").then(resp=>{
      this.state.participants = resp.filter(person => person.event === this.state.event._id);
    }).catch(err=>{
      sessionStorage.removeItem('displayEvent');
      console.log("By Token 👋 :" + err.message);
      this.$router.push({ name: 'Events', query: { redirect: '/events' } });
    });
  }
}
</script>

<style scoped>
.component{
  color: white;
}
</style>
