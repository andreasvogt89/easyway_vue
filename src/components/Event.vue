<template>
  <div class="component">
    <button v-on:click="this.$router.replace('/')" class="button"> X </button>
      <div>
    <h1>{{state.event.name}}</h1>
    <p>{{state.event.eventDate}}</p>
    <p>Anzahl Personen: {{state.event.participants.length}}</p>
        <div>
          <button class="personButton" v-for="item in state.event.participants" :key="item._id" >
          <span>{{item.person.firstname}}<br></span>
          <span>{{item.person.lastname}}</span>
          </button>
        </div>
      <br>
        <div>
          <button v-on:click="this.$router.replace({name:'AddExistingPerson'})"
                  class="button" >Add bestehendi lappe</button>
        </div>
        <div>
          <button v-on:click="this.$router.replace({name:'NewPerson'})"
                  class="button" >Add someone new +</button>
        </div>
      <div>
        <button v-on:click="this.deleteEvent" class="button" > Event furtputze </button>
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
      event_ID: sessionStorage.getItem('eventID'),
    });
    return { state };
  },
  async created() {
    await REST_interface.getCollection("events").then(resp=>{
      let eventDb = resp.filter(item => item._id === this.state.event_ID);
      let newDate = new Date(eventDb[0].event.eventDate);
      eventDb[0].event.eventDate = "📆 " + new moment(newDate).format('LL') + "\n";
      this.state.event = eventDb[0].event;
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.replace('/');
    });
    await REST_interface.getCollection("persons").then(resp=>{
      resp.forEach(item=>{
        if(item.person.event.includes(this.state.event_ID)){
          this.state.event.participants.push(item);
        }
      });
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.replace('/');
    });
  },
  methods:{
    async deleteEvent() {
      if (confirm('Are you sure you want to delete this?')) {
        await REST_interface.deleteItemInCollection("events",this.state.event_ID).then(()=>{
          this.$router.replace('/');
        }).catch(err=>{
          alert('Event deleting failed: ' + err)
          console.log('Event delete failed: ' + err);
          this.$router.push('/');
        });
      } else {
        alert("You're weak... weichbächer")
      }
    },
  }
}
</script>

<style scoped>
.button{
  margin-top: 10px;
  background-color: transparent;
  padding: 10px 40px 10px 40px;
  border-radius: 2em;
  border-color: #1e2b36;
  font-size: xx-large;
}

.button:hover{
  background-color: #d12662;
}
.personButton{
  padding: 20px;
  margin: 10px;
  width: 50%;
  background-color: #1e2b36;
  border-radius: 0.2em;
  font-size: 30px;
  transition-duration: 0.4s;
  border-color: transparent;
}
.personButton:hover{
  background-color: #d12662;
}

</style>
