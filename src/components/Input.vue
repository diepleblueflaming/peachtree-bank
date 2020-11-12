<template>
  <div class="input_container">
    <input
      :class="{'in_valid_value': isInvalidValue}"
      :type="type"
      :placeholder="placeholder"
      @input="onInput()"
      v-model="currentText"
      :disabled="isDisabled"
      v-bind="extraAttributes"
      />
    <div
      v-if="showClearTextBtn"
      class="remove-icon"
      @click="onClearText"
    >
      <i class="fa fa-times-circle"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { _debounce } from '@/utils/utils.ts';

@Options({
  props: {
    type: String,
    placeholder: { type: String, default: '' },
    showClearTextBtn: { type: Boolean, default: false },
    preValue: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
    isInvalidValue: { type: Boolean, default: false },
    needClearText: { type: Boolean, default: false },
    extraAttributes: { type: Object, default: {} }
  },
  watch: {
    needClearText (newVal) {
      if (newVal) {
        this.currentText = '';
      }
    },
    preValue () {
      this.currentText = this.preValue;
    }
  },
  emits: ['on-input-text']
})
export default class Input extends Vue {
    name = 'Input';
    type!: string;
    placeholder!: string;
    currentText = '';
    showClearTextBtn!: boolean;
    preValue!: string;
    isDisabled!: boolean;
    isInvalidValue!: boolean;
    extraAttributes!: boolean;

    created () {
      if (this.preValue) {
        this.currentText = this.preValue;
        this.$emit('on-input-text', this.currentText);
      }
    }

    /**
     * Emit [on-input-text] event when user end typing
     */
    private get onInput () {
      return _debounce(300, () => {
        this.$emit('on-input-text', this.currentText);
      });
    }

    /**
   *  Clear all text when user click on clear button.
   * @return {void}
   */
    private onClearText () {
      this.currentText = '';
      this.$emit('on-input-text', this.currentText);
    }
}

</script>

<style scoped>
.input_container {
  width: 100%;
  height: auto;
  position: relative;
}

.input_container input {
  height: 24px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #C7C7C7;
  color: #b1b1b1;
  padding: 0;
  outline: none;
  font-size: 14px;
}
.input_container input.in_valid_value{
  border-bottom-color: red;
}
.input_container input:disabled {
  cursor: not-allowed;
}
.input_container .remove-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  right: 0;
  top: 0;
  background-size: 100% 100%;
  cursor: pointer;
  color: #0c8397;
  text-align: center;
}
</style>
