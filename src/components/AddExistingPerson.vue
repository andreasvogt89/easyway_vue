<template>
  <div class="component">
  <h1>Bestehendi lölis</h1>
  <div>
    <button class="personButton" @click="selectPerson(item)"
            :class="{ personButtonSelected: (item.selected) }" v-for="item in state.persons" :key="item._id" >
      <span>{{item.firstname}}<br></span>
      <span>{{item.lastname}}</span>
    </button>
  </div>
  <div class="input">
    <button class="button" @click="this.$router.replace({name:'EventDetails'})">
      Abbrechen
    </button>
    <button class="button" @click="addPersons">
      Hinzufügen
    </button>
  </div>
  </div>
</template>

<script>
import REST_interface from "@/REST_interface";
import {reactive} from "vue";

export default {
  name: "AddExistingPerson",
  setup() {
    const state = reactive({
      persons: [],
      rawPersons: [],
      event_ID: sessionStorage.getItem('eventID'),
      error: false,
    });
    return { state };
  },
  async created() {
    await REST_interface.getCollection("persons").then(resp=>{
      this.state.rawPersons = resp;
      resp.forEach(item=> {
        if (!item.person.event.includes(this.state.event_ID)) {
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
  methods:{
    selectPerson(item){
      item.selected = !item.selected;
    },
    addPersons() {
     this.state.persons.filter(person => person.selected).forEach(selectedPerson=>{
       let updateItem =  this.state.rawPersons.find(item=> item._id = selectedPerson._id);
       updateItem.person.event.push(this.state.event_ID);
           REST_interface.changeItemInCollection('persons',updateItem._id,{person: updateItem.person}).then((res)=>{
             console.log(res);
             this.$router.replace({name:'EventDetails'});
           }).catch(err=>{
             alert("Something went wrong: " + err);
           })
     });

    }
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
  margin: 10px;
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
.personButtonSelected{
  padding: 20px;
  margin: 10px;
  width: 50%;
  background-color: #d12662;
  border-radius: 0.2em;
  font-size: 30px;
  transition-duration: 0.4s;
  border-color: transparent;
}
</style>
