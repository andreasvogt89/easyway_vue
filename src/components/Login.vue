<template>
  <div class="background">
  <h1>Login</h1>
  <form >
    <label>
      <input >
    </label>
  </form>
  <form class="form">
    <label>
      <input >
    </label>
  </form>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      counter: 0 });
    return { state };
  }
};
</script>

<style scoped>
.form{
  margin: 2em;
}

.background {
  position: absolute;
  overflow: hidden;

}
.background:before {
  background-image: url(../assets/background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  height: 200%;
  width: 200%;
  z-index: -1;
  animation:rot 125s 0ms linear infinite;
}
@keyframes rot {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
