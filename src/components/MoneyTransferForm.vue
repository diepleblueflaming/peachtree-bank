<template>
  <div class="money-transfer-form">
    <div class="money-transfer-form__header">
      <div class="icon"></div>
      <div class="title">
        <span class="title_inner">{{$t('transfer_form_title')}}</span>
      </div>
    </div>
    <div class="money-transfer-form__body">
      <div class="form_input_group">
        <div class="title">{{$t('transfer_form_from_account')}}</div>
        <Input
          :type="'text'"
          :preValue="'Free Checking(4692)  $ ' + String(getRemittersBalance).slice(0, 7)"
          :isDisabled="true"
          @on-input-text="onInputFromAccount"
        />
      </div>
      <div class="form_input_group">
        <div class="title">{{$t('transfer_form_to_account')}}</div>
        <Input
          :type="'text'"
          :needClearText="resetAllInputData"
          :isInvalidValue="isInvalidToAccountInfo"
          @on-input-text="onInputToAccount"
        />
      </div>
      <div class="form_input_group last">
        <div class="title">{{$t('transfer_form_amount')}}</div>
        <Input
          :type="'number'"
          :extraAttributes="{min: 0}"
          :needClearText="resetAllInputData"
          :isInvalidValue="isInvalidAmountInfo"
          @on-input-text="onInputAmount"
        />
      </div>
      <div class="error_msg_area" :class="{'show': isBalanceExceeded}">
        {{$t('transfer_overdraft_limit')}}
      </div>
      <div class="btn_area">
        <VButton :text="$t('transfer_submit_btn_text')" :onClick="onSubmit"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';
import Input from '@/components/Input.vue';
import VButton from '@/components/VButton.vue';
import { TransferInformation } from '@/interfaces/transaction';

const MIN_OVERDRAFT = -500.0;
const { mapGetters } = createNamespacedHelpers('transaction');

@Options({
  components: {
    Input,
    VButton
  },
  props: {
    resetAllInputData: { type: Boolean, default: false }
  },
  watch: {
    resetAllInputData (newVal: boolean) {
      if (newVal) {
        this.transferInformation = {
          fromAccount: this.transferInformation.fromAccount
        };
      }
    }
  },
  computed: { ...mapGetters(['getRemittersBalance']) },
  emits: ['on-submit-transfer']
})
export default class MoneyTransferForm extends Vue {
  name = 'MoneyTransferForm';
  resetAllInputData!: boolean;
  transferInformation: TransferInformation = {} as TransferInformation;
  isInvalidAmountInfo = false;
  isInvalidToAccountInfo = false;
  getRemittersBalance!: number;

  /**
   * Update from account info when user input
   * @param fromAccount
   */
  onInputFromAccount (fromAccount: string) {
    this.transferInformation.fromAccount = fromAccount;
  }

  /**
   * Update from account info when user input
   * @param toAccount
   */
  onInputToAccount (toAccount: string) {
    this.transferInformation.toAccount = toAccount;
  }

  /**
   * Update from account info when user input
   * @param amount
   */
  onInputAmount (amount: number) {
    this.transferInformation.amount = amount;
  }

  onSubmit () {
    // validating input data
    this.isInvalidAmountInfo = this.checkAmountInfo();
    this.isInvalidToAccountInfo = this.checkToAccountInfo();
    if (this.isInvalidToAccountInfo || this.isInvalidAmountInfo || this.isBalanceExceeded) {
      return;
    }
    this.$emit('on-submit-transfer', this.transferInformation);
  }

  /**
   * check to account
   */
  checkToAccountInfo () {
    return !this.transferInformation.toAccount;
  }

  /**
   * check amount
   */
  checkAmountInfo () {
    return !Number(this.transferInformation.amount);
  }

  /**
   * return [true] if overdraft get limited. else return false.
   */
  get isBalanceExceeded () {
    return Boolean(this.transferInformation.amount &&
      (this.getRemittersBalance - this.transferInformation.amount) < MIN_OVERDRAFT);
  }
}

</script>

<style scoped>
.money-transfer-form {
  width: 100%;
}

.money-transfer-form__header {
  display: flex;
  padding: 8px;
  height: 30px;
  background-color: #0C8397;
  align-items: center;
}

.money-transfer-form__header .icon {
  width: 28px;
  height: 24px;
  background: #0C8397 url("../assets/icons/arrows.png") no-repeat center center;
  background-size: 100% 100%;
}

.money-transfer-form__header .title {
  width: calc(100% - 24px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.money-transfer-form__header .title .title_inner {
  color: #ffffff;
  font-size: 1rem;
}

.money-transfer-form__body {
  background-color: #ffffff;
  padding: 16px;
}
div.form_input_group:not(.last) {
  margin-bottom: 16px;
}
.form_input_group.last {
  margin-bottom: 8px;
}
.form_input_group .title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}
.error_msg_area {
  opacity: 0;
  font-size: 14px;
  color: red;
}
.error_msg_area.show {
  opacity: 1;
}
.btn_area {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
.btn_area .btn_container {
  width: 60%;
}
</style>
