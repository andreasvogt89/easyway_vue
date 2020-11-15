<template>
  <div class="component">
<div>
  <h1>Eventliste</h1>
  <div>
    <button @click="this.goToEventDetails(item)" class="eventButton"
            v-for="item in state.events" :key="item._id">
      <span>{{item.event.name}}<br></span>
      <span>{{item.event.eventDate}}<br></span>
    </button>
  </div>
  <div>
  <button @click="this.$router.replace('/events/new')" class="eventButton">
    Event Erstellen<br>
    👩‍💻<br>
    ...
  </button>
  </div>
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
        this.$router.replace({name:'Login'});
      });
    },
  methods:{
    parseDate(events){
      events.forEach(event=>{
        let newDate = new Date(event.event.eventDate);
        moment.locale('de-ch');
        event.event.eventDate = "📆 " + new moment(newDate).format('L') + "\n";
      });
      return events;
    },
   goToEventDetails(item){
     sessionStorage.setItem('eventID', item._id);
     sessionStorage.setItem('eventName', item.event.name);
     this.$router.replace({name:'EventDetails'});
    }
  }
}
</script>

<style scoped>
.eventButton{
  padding: 20px;
  margin: 10px;
  width: 50%;
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
