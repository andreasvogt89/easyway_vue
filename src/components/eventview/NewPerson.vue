<template>
  <div class="component">
    <div v-if="!input.loadingActiv">
      <h1>Please usfülle</h1>
          <div class="dummyPerson">
            <h4>Dummy person</h4>
            <div class="switch">
            <label>
              Nö
              <input type="checkbox" v-model="input.dummyPerson.enabled">
              <span class="lever grey"></span>
              Jup
            </label>
            </div>
            <div v-if="input.dummyPerson.enabled">
            <p class="range-field" >
              <input type="range"  min="1" max="25" v-model="input.dummyPerson.amount" />
            </p>
            </div>
            <div v-if="input.dummyPerson.enabled">
          <p>
            {{input.dummyPerson.amount}} dummys hinzufügen
          </p>
            </div>
          </div>
          <div class="input" v-if="!input.dummyPerson.enabled">
            <div class="input">
              <label>
                <input type="text" name="firstname" v-model="input.person.firstname" placeholder="Vorname..">
              </label>
              <label>
                <input type="text" name="lastname" v-model="input.person.lastname" placeholder="Nachname..">
              </label>
            </div>
            <div class="input">
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
          </div>
            <div class="input">
              <label>
                <input type="text" name="age" v-model="input.person.age" placeholder="Alter...">
              </label>
              <label>
                <input type="text" name="comments" v-model="input.person.comments" placeholder="Kommentare...">
              </label>
            </div>
          <div class="input" v-if="!input.dummyPerson.enabled">
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
            <div class="input">
              <label>
                <input type="text" name="street" v-model="input.person.street" placeholder="Strasse..">
              </label>
              <label>
                <input type="text" name="street_number" v-model="input.person.street_number" placeholder="Strassennummer..">
              </label>
            </div>
            <div class="input">
              <label>
                <input type="text" name="city" v-model="input.person.city" placeholder="Ort..">
              </label>
              <label>
                <input type="text" name="postcode" v-model="input.person.postcode" placeholder="Postleitzahl..">
              </label>
            </div>
          </div>
        <div class="input">
          <button id="female" class="button" @click="selectFemale">
            🚺
          </button>
          <button id="male" class="button" @click="selectMale" >
            🚹
          </button>
        </div>
        <div class="input">
        <button class="button" @click="this.$router.replace({name:'EventDetails'})">
          Abbrechen
        </button>
        <button  type="button" class="button" @click="addPerson">
          Erstellen
        </button>
        </div>
    </div>
    <div v-if="input.loadingActive">
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
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
      dummyPerson:{
        enabled: false,
        amount: 0,
      },
      loadingActiv: false,
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
      this.state.loadingActiv = true;
      let event_ID = sessionStorage.getItem('eventID');
     if(this.input.inputDummy.woman){
       this.input.person.gender = "W"
     } else {
       this.input.person.gender = "M"
     }
     this.input.person.event.push(event_ID);
     if(this.input.dummyPerson.enabled){
        this.input.person.firstname = '#DUMMY';
        this.input.person.lastname =  '#DUMMY';
        this.input.person.class = "#DUMMY";
        this.input.person.email = "#DUMMY";
        this.input.person.emergency_phone = '0000';
        this.input.person.phone = '0000';
        this.input.person.street = "#DUMMY";
        this.input.person.street_number = "0000";
        this.input.person.postcode = '0000';
        this.input.person.city = "#DUMMY";

        for(var i = 0; i < this.input.dummyPerson.amount; i++){
          await this.sendAddPerson();
        }
     } else{
       await this.sendAddPerson();
     }
     this.state.loadingActiv = false;  
     this.$router.replace({name:'EventDetails'});
    },
    async sendAddPerson(){
        await REST_interface.postToCollection("persons",{person: this.input.person}).then(resp=>{
          console.log('person adding status: ' + resp);
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
.dummyPerson{
  padding: 1em;
}
</style>
