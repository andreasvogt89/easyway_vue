<template>
<div>
  <div>
    <button @click="this.goToEventDetails(item)" class="eventButton" v-for="item in state.events" :key="item._id">
      <span>{{item.event.name}}<br></span>
      <span>{{item.event.eventDate}}<br></span>
      <span>{{item.event.participants.length}}👨‍👦‍👦</span>
    </button>
  </div>
  <div>
  <button @click="this.$router.push('/events/new')" class="eventButton">
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
import moment from 'moment'

export default {
  name: "Events",
  setup() {
    const state = reactive({
      events: [],
    });
    return { state };
  },
  async created() {
      await REST_interface.getCollection("events").then(resp=>{
        this.state.events = this.parseDate(resp);
      }).catch(err=>{
        sessionStorage.removeItem('EAtoken');
        console.log("By Token 👋 :" + err.message);
        this.$router.push('/login');
      });
    },
  methods:{
    parseDate(events){
      events.forEach(event=>{
        let newDate = new Date(event.event.eventDate);
        event.event.eventDate = "📆 " + new moment(newDate).format('L') + "\n";
      });
      return events;
    },
   goToEventDetails(item){
     this.$router.push({name:'EventDetails', params: {_id: item._id }});
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
