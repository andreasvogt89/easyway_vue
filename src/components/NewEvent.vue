<template>
<form>
  <div  class="input">
  <label>
    <input type="text" name="username" v-model="input.event.name" placeholder="Name..">
  </label>
  </div>
  <div class="input">
  <label>
    <input  type="date" name="date" v-model="input.event.date" placeholder="Datum..">
  </label>
  </div>
    <div  class="input">
      <label>
        <input type="text" name="place" v-model="input.event.place" placeholder="Wo..">
      </label>
    </div>
  <div>
    <button>
      Abbrechen
    </button>
    <button>
      Senden
    </button>
  </div>
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
