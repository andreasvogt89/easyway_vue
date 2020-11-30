<template>
  <div class="component">
  <h1>Bestehendi lölis</h1>
    <div>
      <label>
        <input type="text" v-model="state.filter" placeholder="Suche..">
      </label>
    </div>
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
      filter: "",
    });
    return { state };
  },
  async created() {
    await REST_interface.getCollection("persons").then(resp=>{
      this.state.rawPersons = resp;
      resp.forEach(item=> {
        if (!item.person.event.includes(this.state.event_ID) && (item.person.firstname !== '#DUMMY')) {
          this.state.persons.push({
            firstname: item.person.firstname,
            lastname: item.person.lastname,
            _id: item._id,
            selected: false,
          });
        }
        setInterval(this.searchSync(), 250);
      });
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.replace('/');
    });
  },
  //TODO search Sync
  methods:{
    selectPerson(item){
      item.selected = !item.selected;
    },
    addPersons() {
     this.state.persons.filter(person => person.selected).forEach(selectedPerson=>{
       let updateItem =  this.state.rawPersons.find(item=> item._id === selectedPerson._id);
       updateItem.person.event.push(this.state.event_ID);
       REST_interface.changeItemInCollection('persons',updateItem._id,{person: updateItem.person}).then((res)=>{
             console.log(res);
             this.$router.replace({name:'EventDetails'});
           }).catch(err=>{
             alert("Something went wrong: " + err);
           })
     });
    },
    searchSync(){
       let search = this.state.filter + "*";
       this.state.person = this.state.persons.filter(person => 
       person.firstname == search || person.lastname == search);
    },
  },
}
</script>

<style scoped>

.personButton{
  padding: 20px;
  margin: 10px;
  width: 80%;
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
  width: 80%;
  background-color: #d12662;
  border-radius: 0.2em;
  font-size: 30px;
  transition-duration: 0.4s;
  border-color: transparent;
}

input[type=text] {
  height: 1em;
  width: 10em;
  margin: 5px;
  border: 2px solid #D12662;
  border-radius: 4px;
  font-size: 22px;
  background-color: #ffffff;
  padding: 12px 20px 12px 40px;
}

</style>
