<template>
<form>
  <label>
    <input type="text" name="username" v-model="input.event.name" placeholder="Name..">
  </label>
  <label>
    <input type="date" name="username" v-model="input.event.date" placeholder="Datum..">
  </label>
  <label>
    <input type="text" name="username" v-model="input.event.address" placeholder="Adresse">
  </label>
  <label>
    <input type="text" name="username" v-model="input.event.city" placeholder="Stadt/Ort">
  </label>
  <label>
    <input type="text" name="username" v-model="input.event.postcode" placeholder="Postleizahl">
  </label>
</form>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "NewEvent",
  setup() {
    const input = reactive({
      event: {},
      error: false,
    });
    return { input };
  },
}

</script>

<style scoped>

</style>
