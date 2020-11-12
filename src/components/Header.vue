<template>
  <div class="header">
    <div class="header_icon_container">
      <img class="header_icon" src="../assets/images/logo.jpg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Header extends Vue {
  name = 'Header';
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  border-bottom: 3px solid #ff8e4e;
  display: flex;
  background-color: #ffffff;
}
.header .header_icon_container {
  height: 100%;
  display: flex;
  margin-left: 6%;
  align-items: center;
  box-sizing: border-box;
}

@media screen and (max-width: 514px) {
  .header .header_icon_container {
    width: 100%;
    padding: 6px;
    margin-left: 0;
  }
  .header .header_icon_container .header_icon {
    width: 100%;
  }
}
</style>
