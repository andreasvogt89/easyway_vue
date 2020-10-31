<template>
  <div class="component">
  <h1>Neues Event</h1>
<form @keyup.enter="addEvent">
  <div  class="input">
  <label>
    <input type="text" name="username" v-model="input.event.name" placeholder="Name..">
  </label>
  </div>
  <div class="input">
  <label>
    <input  type="date" name="date" v-model="input.event.eventDate" placeholder="Datum..">
  </label>
  </div>
    <div  class="input">
      <label>
        <input type="text" name="place" v-model="input.event.place" placeholder="Wo..">
      </label>
    </div>
  <div class="input">
    <button class="button" @click="this.$router.replace('/')">
      Abbrechen
    </button>
    <button  type="button" class="button" @click="addEvent">
      Erstellen
    </button>
  </div>
</form>
  </div>
</template>

<script>
import {reactive} from "vue";
import REST_interface from "@/REST_interface";

export default {
  name: "NewEvent",
  setup() {
    const input = reactive({
      event: {
        name: "",
        eventDate: "",
        place:"",
        participants: [],
      },
    });
    return { input };
  },
  methods:{
    async addEvent(){
      await REST_interface.postToCollection("events",this.input).then(resp=>{
          console.log('Event adding status: ' + resp);
          this.$router.replace('/');
      }).catch(err=>{
        alert("Failed to add event: " + err);
      });
    },
  },

}

</script>

<style scoped>
.input{
  padding: 20px;
}
input[type=text] {
  height: 1em;
  width: 10em;
  border: 2px solid #D12662;
  border-radius: 4px;
  font-size: 22px;
  background-color: #ffffff;
  padding: 12px 20px 12px 40px;
}
input[type=date] {
  height: 1em;
  width: 10em;
  border: 2px solid #D12662;
  border-radius: 4px;
  font-size: 22px;
  background-color: #ffffff;
  padding: 12px 20px 12px 40px;
}
.button{
  background-color: transparent;
  height: 2em;
  width: 8em;
  margin: 10px;
  border-radius: 2em;
  border-color: #1e2b36;
  font-size: xx-large;
}

.button:hover{
  background-color: #d12662;
}
</style>
