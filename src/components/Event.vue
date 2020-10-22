<template>
  <div class="component">
    <button v-on:click="this.$router.push('/')" class="button"> X </button>
    <div class="component">
      <div>
        <button v-on:click="this.deleteEvent" class="button" > Löschen </button>
      </div>
    <h1>{{state.item.event.name}}</h1>
    <p>{{state.item}}</p>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import REST_interface from "@/REST_interface";

export default {
  name: "Event",
  setup() {
    const state = reactive({
      participants: [],
      item: "",
      error: false,
    });
    return { state };
  },
  async created() {
    await REST_interface.getCollection("events").then(resp=>{
      this.state.item = resp.filter(item => item._id === this.$route.params._id);
        console.log(this.state.item);
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.push('/');
    });
    await REST_interface.getCollection("persons").then(resp=>{
      this.state.participants = resp.filter(person => person.event === this.state.event._id);
    }).catch(err=>{
      console.log('Event load failed: ' + err);
      this.$router.push('/');
    });
  },
  methods:{
    async deleteEvent() {
      await REST_interface.deleteItemInCollection("events",this.$route.params._id).then(()=>{
        this.$router.push('/');
      }).catch(err=>{
        alert('Event deleting failed: ' + err)
        console.log('Event delete failed: ' + err);
        this.$router.push('/');
      });
    }
  }
}
</script>

<style scoped>
.component{
  color: white;
}
.button{
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
