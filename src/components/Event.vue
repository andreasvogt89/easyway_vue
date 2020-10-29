<template>
  <div class="component">
    <button v-on:click="this.$router.push('/')" class="button"> X </button>
    <div class="component">
    <h1>{{state.event.name}}</h1>
    <p>{{state.event.eventDate}}</p>
    <p>Anzahl Personen: {{state.event.participants.length}}</p>
      <br>
      <div>
        <button v-on:click="this.deleteEvent" class="button" > Löschen </button>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import REST_interface from "@/REST_interface";
import moment from "moment";

export default {
  name: "Event",
  setup() {
    const state = reactive({
      participants: [],
      event: {
        eventDate: "",
        name: "",
        participants: [],
        place: ""
      },
      error: false,
    });
    return { state };
  },
  async created() {
    await REST_interface.getCollection("events").then(resp=>{
      let eventDb = resp.filter(item => item._id === this.$route.params._id);
      let newDate = new Date(eventDb[0].event.eventDate);
      eventDb[0].event.eventDate = "📆 " + new moment(newDate).format('L') + "\n";
      this.state.event = eventDb[0].event;
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.push('/');
    });
    await REST_interface.getCollection("persons").then(resp=>{
      this.state.participants = resp.filter(person => person.event === this.state.event._id);
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.push('/');
    });
  },
  methods:{
    async deleteEvent() {
      await REST_interface.deleteItemInCollection("events",this.$route.params._id).then(()=>{
        this.$router.push('/');
      }).catch(err=>{
        alert('Event deleting failed: ' + err)
        console.log('Event delete failed: ' + err);
        this.$router.push('/');
      });
    }
  }
}
</script>

<style scoped>
.component{
  color: white;
  margin: 1em;
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
