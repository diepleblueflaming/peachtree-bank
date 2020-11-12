<template>
  <div class="btn_container">
    <div class="btn" @click="onClick">
      <span class="btn_text">{{text}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    text: String,
    onClick: Function
  }
})
export default class VButton extends Vue {
    name = 'VButton';
    text!: string;
    onClick!: Function;
}

</script>

<style scoped>
.btn_container {
  display: flex;
}
.btn_container .btn {
  width: 100%;
  background-color: #EE7033;
  border: 1px solid #EE7033;
  border-radius: 3px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
}
.btn_container .btn:hover {
  background-color: #ffffff;
}
.btn_container .btn:hover .btn_text {
  color: #EE7033;
}
.btn_container .btn .btn_text {
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
}
</style>
