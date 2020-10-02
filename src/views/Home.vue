<template>
  <div class="home">
    <div>
      <p class="error" v-if="!this.state.isBackendAvailable" >The service is currently not running, call your administrator 📣</p>
    </div>
    <div>
      <p class="error" v-if="this.state.error" >Something went wrong 😐 <br>{{error}}</p>
    </div>
    <Events />
  </div>
</template>

<script>
// @ is an alias to /src
import REST_interface from "@/REST_interface";
import Events from "@/components/Events";
import {reactive} from "vue";
export default {
  name: 'Home',
  components: {
    Events
  },
  setup() {
    const state = reactive({
      isBackendAvailable: true,
      error: false,
    });
    return { state };
  },
  async created() {
    try {
      this.state.isBackendAvailable = await REST_interface.isBackendRunning();
      if(sessionStorage.getItem('EAtoken') === null){
       await this.$router.push({name: 'Login', query: {redirect: '/login'}});
      }
    } catch (e) {
      this.error = e.message;
    }

  },
}
</script>
<style scoped>
.error{
  background-color: #fa6764;
  padding: 2em;
  border-radius: 1em;
  color: white;
}
</style>
