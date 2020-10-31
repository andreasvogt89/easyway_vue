<template>
  <div class="component">
  <h1>Please usfülle</h1>
  <form>
  <div  class="input">
    <label>
      <input type="text" name="firstname" v-model="input.person.firstname" placeholder="Vorname..">
    </label>
    <label>
      <input type="text" name="lastname" v-model="input.person.lastname" placeholder="Nachname..">
    </label>
  </div>
  <div  class="input">
    <label>
      <input type="text" name="phone" v-model="input.person.phone" placeholder="Handynummer..">
    </label>
    <label>
      <input type="text" name="emergency_phone" v-model="input.person.emergency_phone" placeholder="Notfallnummer..">
    </label>
  </div>
  <div class="input">
    <label>
      <input type="email" name="email" v-model="input.person.email" placeholder="Email..">
    </label>
    <label>
      <input type="text" name="class" v-model="input.person.class" placeholder="Klasse...">
    </label>
  </div>
  <div class="input">
    <label>
      <input type="text" name="age" v-model="input.person.age" placeholder="Alter...">
    </label>
    <label>
      <input type="text" name="comments" v-model="input.person.comments" placeholder="Kommentare...">
    </label>
  </div>
  <div  class="input">
    <button id="female" class="button" @click="selectFemale">
      🚺
    </button>
    <button id="male"  @click="selectMale" class="button">
      🚹
    </button>
  </div>
  <div class="input">
    <vue-google-autocomplete
        name="search"
        id="map"
        classname="form-control"
        placeholder="Adresse suchen..."
        v-on:placechanged="getAddressData"
        country="ch"
    >
    </vue-google-autocomplete>
  </div>
    <div  class="input">
      <label>
        <input type="text" name="street" v-model="input.person.street" placeholder="Strasse..">
      </label>
      <label>
        <input type="text" name="street_number" v-model="input.person.street_number" placeholder="Strassennummer..">
      </label>
    </div>
    <div  class="input">
      <label>
        <input type="text" name="city" v-model="input.person.city" placeholder="Ort..">
      </label>
      <label>
        <input type="text" name="postcode" v-model="input.person.postcode" placeholder="Postleitzahl..">
      </label>
    </div>
  </form>
    <div class="input">
      <button class="button" @click="this.$router.replace({name:'EventDetails', params: {_id: this.$route.params._id }})">
        Abbrechen
      </button>
      <button  type="button" class="button" @click="addPerson">
        Erstellen
      </button>
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import {reactive} from "vue";
import REST_interface from "@/REST_interface";

export default {
  name: "newPerson",
  components: { VueGoogleAutocomplete },

  setup() {
    const input = reactive({
      person: {
        firstname:"",
        lastname:"",
        email:"",
        emergency_phone:"",
        phone:"",
        city:"",
        street:"",
        street_number:"",
        postcode:"",
        gender:"",
        _id: "",
        age: "",
        class: "",
        comments:"",
        event:[],
      },
      inputDummy:{
        man:false,
        woman:false,
        address:"",
      },
      event_ID: sessionStorage.getItem('eventID'),
    });
    return { input };
  },
  methods:{
    getAddressData: function (addressData) {
      this.input.inputDummy.address = addressData;
      this.input.person.city = addressData.locality;
      this.input.person.postcode = addressData.postal_code;
      this.input.person.street = addressData.route
      this.input.person.street_number = addressData.street_number;
    },
    async addPerson(){
     if(this.input.inputDummy.woman){
       this.input.person.gender = "W"
     } else {
       this.input.person.gender = "M"
     }
     this.input.person.event.push(this.state.event_ID);
        await REST_interface.postToCollection("persons",{person: this.input.person}).then(resp=>{
          console.log('person adding status: ' + resp);
          this.$router.replace('/');
        }).catch(err=>{
          alert("Failed to add event: " + err);
        });
    },
    selectMale(){
      this.input.inputDummy.woman = false;
      this.input.inputDummy.man = true;
      document.getElementById("male").style.backgroundColor = "#D12662";
      document.getElementById("female").style.backgroundColor = "transparent";
    },
    selectFemale(){
      this.input.inputDummy.man = false;
      this.input.inputDummy.woman = true;
      document.getElementById("female").style.backgroundColor = "#D12662";
      document.getElementById("male").style.backgroundColor = "transparent";
    }
  }
}
</script>

<style scoped>
.input{
  padding: 20px;
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
input[type=date] {
  height: 1em;
  width: 10em;
  margin: 5px;
  border: 2px solid #D12662;
  border-radius: 4px;
  font-size: 22px;
  background-color: #ffffff;
  padding: 12px 20px 12px 40px;
}
input[type=email] {
  height: 1em;
  width: 10em;
  margin: 5px;
  border: 2px solid #D12662;
  border-radius: 4px;
  font-size: 22px;
  background-color: #ffffff;
  padding: 12px 20px 12px 40px;
}
input[type=checkbox].css-checkbox + label.css-label {
  padding-left:20px;
  height:15px;
  display:inline-block;
  line-height:15px;
  background-repeat:no-repeat;
  background-position: 0 0;
  font-size:15px;
  vertical-align:middle;
  cursor:pointer;
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
