<template>
<form>
  <div  class="input">
  <label>
    <input type="text" name="username" v-model="input.event.name" placeholder="Name..">
  </label>
  </div>
  <div class="input">
  <label>
    <input  type="date" name="username" v-model="input.event.date" placeholder="Datum..">
  </label>
  </div>
  <div class="input">
  <vue-google-autocomplete
      ref="address"
      id="map"
      classname="form-control"
      placeholder="Please type your address"
      v-on:placechanged="getAddressData"
      country="ch"
  >
  </vue-google-autocomplete>
  </div>
</form>
</template>

<script>
import {reactive} from "vue";
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  name: "NewEvent",
  components: { VueGoogleAutocomplete },
  setup() {
    const input = reactive({
      event: {},
      address: '',
      error: false,
    });
    return { input };
  },
  mounted() {
    this.$refs.input.address.focus();
  },

  methods:{
    getAddressData: function (addressData, placeResultData, id) {
      this.input.address = addressData;
      console.log(placeResultData);
      console.log(id);
    }
  }
}

</script>

<style scoped>
.input{
  padding: 20px;
}
input[type=text] {
  box-sizing: border-box;
  border: 2px solid #D12662;
  border-radius: 4px;
  font-size: 22px;
  background-color: #ffffff;
  padding: 12px 20px 12px 40px;
}
input[type=date] {
  box-sizing: border-box;
  border: 2px solid #D12662;
  border-radius: 4px;
  font-size: 22px;
  background-color: #ffffff;
  padding: 12px 20px 12px 40px;
}
</style>
