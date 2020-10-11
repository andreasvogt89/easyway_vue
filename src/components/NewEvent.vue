<template>
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
  <div>
    <button class="button" @click="cancel">
      Abbrechen
    </button>
    <button  type="button" class="button" @click="addEvent">
      Senden
    </button>
  </div>
</form>
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
      await REST_interface.postToCollection("events",{event: this.input.event,
        created_at: new Date()}).then(resp=>{
          alert("Gspicheret Masafaga!" + resp);
          this.$router.push({ name: 'Home', query: { redirect: '/' } });
      }).catch(err=>{
        alert("Fail Masafaga!: " + err);
      });
    },
    async cancel(){
     await this.$router.push({ name: 'Home', query: { redirect: '/' } });
    }
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
</style>
