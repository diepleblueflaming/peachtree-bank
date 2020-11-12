<template>
  <div class="home_page">
    <Header />
    <div class="main_content">
      <div class="transfer_form_area">
        <div class="transfer_form" :class="{'show': transferInfo === null}">
          <MoneyTransferForm
            :resetAllInputData="resetAllInputData"
            @on-submit-transfer="onSubmitTransfer"
          />
        </div>
        <template v-if="transferInfo">
          <div class="preview_transfer" :class="{'show': transferInfo !== null}">
            <PreviewTransfer
              @on-cancel-transfer="onCancelTransfer"
              @on-transfer="onTransfer"
              :transferInfo="transferInfo"
            />
          </div>
        </template>
      </div>
      <div class="separate_space"></div>
      <div class="transaction_history_container">
        <TransactionHistory />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';
import Header from '@/components/Header.vue';
import MoneyTransferForm from '@/components/MoneyTransferForm.vue';
import PreviewTransfer from '@/components/PreviewTransfer.vue';
import TransactionHistory from '@/components/TransactionHistory.vue';
import { RecentTransaction, TransferInformation, CreditDebitIndicator } from '@/interfaces/transaction';

const { mapActions } = createNamespacedHelpers('transaction');

@Options({
  components: {
    Header,
    MoneyTransferForm,
    TransactionHistory,
    PreviewTransfer
  },
  methods: { ...mapActions(['loadTransaction', 'addTransfer']) }
})
export default class Home extends Vue {
  name = 'Transaction';
  loadTransaction!: Function;
  addTransfer!: Function;
  transferInfo: TransferInformation | null = null;
  resetAllInputData = false;

  created () {
    this.loadTransaction();
  }

  /**
   * Show preview form when user submit transfer
   * @param transferInfo
   */
  onSubmitTransfer (transferInfo: TransferInformation) {
    this.resetAllInputData = false;
    this.transferInfo = transferInfo;
  }

  /**
   * Hide preview transfer form ans show input transfer form.
   */
  onCancelTransfer () {
    this.transferInfo = null;
  }

  /**
   * Hide preview transfer form.
   * Show input transfer form and reset to initial.
   * Add transfer to list of transaction
   */
  onTransfer () {
    const transferWillBeAddedToTransactions = {
      categoryCode: '#12a580',
      dates: {
        valueDate: new Date().getTime()
      },
      transaction: {
        amountCurrency: {
          amount: this.transferInfo?.amount,
          currencyCode: 'USD'
        },
        type: 'Salaries',
        creditDebitIndicator: CreditDebitIndicator.DEBIT
      },
      merchant: {
        name: this.transferInfo!.toAccount,
        accountNumber: 'SI64397745065188826'
      }
    } as RecentTransaction;
    this.addTransfer(transferWillBeAddedToTransactions);
    this.transferInfo = null;
    this.resetAllInputData = true;
  }
}
</script>

<style scoped>
.home_page {
  width: 100%;
  height: 100%;
}
.main_content {
  padding: 2% 3%;
  box-sizing: border-box;
  height: calc(100% - 73px);
  display: grid;
  grid-template-columns: 30% 2% 68%;
}
.main_content .transfer_form,
.main_content .preview_transfer {
  opacity: 0;
  display: none;
  transition: opacity 0.3s linear;
}
.main_content .transfer_form.show,
.main_content .preview_transfer.show{
  opacity: 1;
  display: block;
}

.main_content .transaction_history_container {
  overflow-y: auto;
}

@media screen and (max-width: 768px){
  .main_content {
    grid-template-columns: none;
  }
  .main_content .separate_space {
    height: 32px;
  }
  .main_content .transaction_history_container {
    overflow: unset;
  }
}
</style>
