<template>
  <div class="component">
    <button v-on:click="this.$router.push('/')" class="button"> X </button>
    <div>
    <h1>{{state.event.name}}</h1>
    <p>{{state.event.eventDate}}</p>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import REST_interface from "@/REST_interface";

export default {
  name: "Event",
  setup() {
    const state = reactive({
      participants: [],
      event: {},
      error: false,
    });
    return { state };
  },
  async created() {
    await REST_interface.getCollection("persons").then(resp=>{
      console.log(this.$route.params);
      this.state.event = this.$route.params;
      this.state.participants = resp.filter(person => person.event === this.state.event._id);
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.push('/');
    });
  },
}
</script>

<style scoped>
.component{
  color: white;
}
.button{
  background-color: transparent;
  padding: 10px 40px 10px 40px;
  border-radius: 2em;
  border-color: #1e2b36;
  font-size: xx-large;
}

.button:hover{
  background-color: #d12662;
}
</style>
