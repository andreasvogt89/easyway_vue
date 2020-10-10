<template>
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
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import {reactive} from "vue";

export default {
  name: "newPerson",
  components: { VueGoogleAutocomplete },
  setup() {
    const input = reactive({
      person: {},
      error: false,
    });
    return { input };
  },
  mounted() {
    this.$refs.input.person.address.focus();
  },

  methods:{
    getAddressData: function (addressData, placeResultData, id) {
      this.input.person.address = addressData;
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
