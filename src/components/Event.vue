<template>
  <div class="component">
    <button v-on:click="this.$router.push('/')" class="button"> X </button>
      <div>
    <h1>{{state.event.name}}</h1>
    <p>{{state.event.eventDate}}</p>
    <p>Anzahl Personen: {{state.event.participants.length}}</p>
      <br>
        <div>
          <button v-on:click="this.$router.replace('/person/new')" class="button" > Add someone + </button>
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
    });
    return { state };
  },
  async created() {
    await REST_interface.getCollection("events").then(resp=>{
      let eventDb = resp.filter(item => item._id === this.$route.params._id);
      let newDate = new Date(eventDb[0].event.eventDate);
      eventDb[0].event.eventDate = "📆 " + new moment(newDate).format('LL') + "\n";
      this.state.event = eventDb[0].event;
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.replace('/');
    });
    await REST_interface.getCollection("persons").then(resp=>{
      this.state.participants = resp.filter(person => person.event === this.state.event._id);
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.replace('/');
    });
  },
  methods:{
    async deleteEvent() {
      if (confirm('Are you sure you want to delete this?')) {
        await REST_interface.deleteItemInCollection("events",this.$route.params._id).then(()=>{
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
.component{
  color: white;
  background-color: #2c3e50;
  padding: 20px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 2em;
}
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
</style>
