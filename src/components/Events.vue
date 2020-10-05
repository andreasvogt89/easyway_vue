<template>
<div>
    <button v-on:click="setEvent(event)" class="eventButton" v-for="event in state.events" :key="event._id">
      <span>{{event.event.name}}<br></span>
      <span>{{event.event.eventDate}}<br></span>
      <span>{{event.event.participant.length}}👨‍👦‍👦</span>
    </button>
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
      sessionStorage.removeItem('displayEvent');
      await REST_interface.getCollection("events").then(resp=>{
        this.state.events = this.parseDate(resp);
      }).catch(err=>{
        sessionStorage.removeItem('EAtoken');
        console.log("By Token 👋 :" + err.message);
        this.$router.push({ name: 'Login', query: { redirect: '/login' } });
      });
    },
  methods:{
    parseDate(events){
      events.forEach(event=>{
        let newDate = new Date(event.event.eventDate);
        event.event.eventDate = "📆 " + newDate.getDay() + '.' + newDate.getMonth() + '.' + newDate.getFullYear() + "\n"
      })
      return events;
    },
    setEvent(event){
      sessionStorage.setItem("displayEvent", event);
      this.$router.push({ name: 'EventDetails', query: { redirect: '/eventDetails' } });
    }
  }
}
</script>

<style scoped>
.eventButton{
  padding: 20px;
  margin: 10px;
  background-color: #1e2b36;
  border-radius: 0.1em;
  font-size: 30px;
  transition-duration: 0.4s;
}
.eventButton:hover{
  background-color: #d12662;
}
</style>
