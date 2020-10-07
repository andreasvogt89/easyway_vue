<template>
  <div class="component">
    <button v-on:click="this.back" class="button"> X </button>
    <div>
    <h1>🕵️‍♀️</h1>
    <p></p>
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
      console.log('Event load failed: ' + err);
      sessionStorage.removeItem('displayEvent');
      this.$router.push({ name: 'Home', query: { redirect: '/' } });
    });
  },
  methods:{
    back(){
      sessionStorage.removeItem('displayEvent');
      this.$router.push({ name: 'Home', query: { redirect: '/' } });
    }
  }
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
