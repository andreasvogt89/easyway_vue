<template>
<div class="component">
  <button v-on:click="this.$router.replace({name:'EventDetails'})" class="button"> X </button>
  <h1>Lütlis am {{state.event_Name}}</h1>
  <button class="personButton"
          v-for="item in state.persons" :key="item._id" >
    <span>{{item.firstname}}<br></span>
    <span>{{item.lastname}}</span>
  </button>
</div>
</template>

<script>
import REST_interface from "@/REST_interface";
import {reactive} from "vue";

export default {
  name: "Personlist",
  setup() {
    const state = reactive({
      persons: [],
      rawPersons: [],
      event_ID: sessionStorage.getItem('eventID'),
      event_Name: sessionStorage.getItem('eventName'),
      error: false,
    });
    return { state };
  },
  async created() {
    await REST_interface.getCollection("persons").then(resp=>{
      this.state.rawPersons = resp;
      resp.forEach(item=> {
        if (item.person.event.includes(this.state.event_ID)) {
          this.state.persons.push({
            firstname: item.person.firstname,
            lastname: item.person.lastname,
            _id: item._id,
            selected: false,
          });
        }
      });
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.replace('/');
    });
  },
}
</script>

<style scoped>
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
