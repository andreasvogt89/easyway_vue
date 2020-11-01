<template>
  <div class="component">
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
      <div  class="input">
        <label>
          <textarea id="comment" v-model="input.event.comments"
                    name="comment" rows="4" cols="50"
                    placeholder="Notes..."
                    class="comments">
          </textarea>
        </label>
      </div>
      <div class="input">
        <button class="button" v-on:click="this.$router.replace({name:'EventDetails'})">
          Abbrechen
        </button>
        <button  type="button" class="button" @click="changeEvent">
          Anpassen
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import REST_interface from "@/REST_interface";
import {reactive} from "vue";
import moment from "moment";


export default {
  name: "EditEvent",
  setup() {
    const input = reactive({
      event: {
        name: "",
        eventDate: "",
        place:"",
        comments:"",
      },
      event_ID: sessionStorage.getItem('eventID'),
    });
    return { input };
  },
  async created() {
    await REST_interface.getCollection("events").then(resp => {
      let item = resp.filter(item => item._id === this.input.event_ID);
      item[0].event.eventDate = new moment(item[0].event.eventDate).format('YYYY-MM-DD');
      this.input.event = item[0].event
        }).catch(err => {
          console.log('Event load failed: ' + err);
          this.$router.replace({name: 'EventDetails'});
        });
  },
  methods:{
    changeEvent() {
      REST_interface.changeItemInCollection('events', this.input.event_ID,
          {event: this.input.event}).then((res) => {
        console.log(res);
        this.$router.replace({name: 'EventDetails'});
      }).catch(err => {
        alert("Something went wrong: " + err);
      });
    }
  }
}
</script>

<style scoped>
input[type=text] {
  height: 1em;
  width: 10em;
  border: 2px solid #D12662;
  border-radius: 4px;
  font-size: 22px;
  background-color: #ffffff;
  padding: 12px 20px 12px 40px;
}
.comments{
  height: 6em;
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
