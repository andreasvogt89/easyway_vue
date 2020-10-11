<template>
<div>
    <button @click="this.setEvent(event)" class="eventButton" v-for="event in state.events" :key="event._id">
      <span>{{event.event.name}}<br></span>
      <span>{{event.event.eventDate}}<br></span>
      <span>{{event.event.participants.length}}👨‍👦‍👦</span>
    </button>
    <div>
    <button @click="newEvent" class="eventButton">
      Event Erstellen<br>
      👩‍💻<br>
      ...
    </button>
    </div>
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
      sessionStorage.setItem("displayEvent",event);
      this.$router.push({ name: 'EventDetails', query: { redirect: '/event' } })
    },
    newEvent(){
      this.$router.push({ name: 'NewEvent', query: { redirect: '/events/new' } })
    }
  }
}
</script>

<style scoped>
.eventButton{
  padding: 20px;
  margin: 10px;
  height: 6em;
  width: 8em;
  background-color: #1e2b36;
  border-radius: 0.2em;
  font-size: 30px;
  transition-duration: 0.4s;
  border-color: transparent;
}
.eventButton:hover{
  background-color: #d12662;
}
</style>
