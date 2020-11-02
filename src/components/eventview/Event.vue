<template>
  <div class="component">
      <div class="navBarEvent">
        <div>
        <button v-on:click="this.$router.replace({name: 'EditEvent'})" class="buttonNAV"> ✒ </button>
        </div>
        <div>
        </div>
        <div>
          <button v-on:click="this.$router.replace('/')" class="buttonNAV"> X </button>
        </div>
      </div>
    <div>
      <h1>{{state.event.name}}</h1>
    </div>
      <div>
    <p>{{state.event.eventDate}}</p>
    <p>Anzahl Personen: {{state.event.participants.length}}</p>
        <div>
          <button class="buttonLI" @click="this.$router.replace({name:'Personlist'})" > Lütlis
          </button>
        </div>
        <div>
        <div class="comments">
            {{state.event.comments}}
        </div>
        </div>

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

.buttonLI{
  margin-top: 10px;
  background-color: #1e2429;
  height: 40%;
  width: 40%;
  padding: 10px 40px 10px 40px;
  border-radius: 2px;
  border-color: transparent;
  font-size: xx-large;
}

.buttonLI:hover{
  background-color: #d12662;
}

.navBarEvent{
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}

.buttonNAV{
  margin-top: 10px;
  background-color: transparent;
  padding: 10px 40px 10px 40px;
  border-radius: 2em;
  border-color: #1e2b36;
  font-size: xx-large;
}

.buttonNAV:hover{
  background-color: #d12662;
}

.comments{
  margin: 20px;
  padding: 10px;
  background-color: #6b6b6b;
  border-radius: 3px;
  text-align: center;
  border-color: #d12662;
}
</style>
