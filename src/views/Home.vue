<template>
  <div class="home">
    <Login class="main"/>
    <div>
      <p class="error" v-if="!this.state.isBackendAvailable" >The service is currently not running, call your administrator 📣</p>
    </div>
    <div>
      <p class="error" v-if="error" >Something went wrong 😐 <br>{{error}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login";
import REST_interface from "@/REST_interface";
import {reactive} from "vue";
export default {
  name: 'Home',
  components: {
    Login
  },
  setup() {
    const state = reactive({
      isBackendAvailable: false,
      error: '',
    });
    return { state };
  },
  async created() {
    try {
      this.state.isBackendAvailable = await REST_interface.isBackendRunning();
      if(!sessionStorage.easyway){
        sessionStorage.easyway = {
          accessToken: false
        }
      }
    } catch (e) {
      this.error = e.message;
    }

  },
}
</script>
<style scoped>
.main{
  display: flex;
  justify-content: center;
}
.error{
  background-color: #fa6764;
  padding: 2em;
  border-radius: 1em;
  color: white;
}
</style>
