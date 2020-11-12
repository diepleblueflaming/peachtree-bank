<template>
  <Transaction />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Transaction from './views/Transaction.vue';

@Options({
  components: {
    Transaction
  }
})
export default class App extends Vue {
  name = 'App';
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Kanit', sans-serif;
  background: url("./assets/images/background.jpg") no-repeat center fixed;
  background-size: 100% 100%;
}
@media screen and (max-width: 768px){
  html {
    height: unset;
  }
}
</style>
