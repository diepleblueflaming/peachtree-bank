<template>
  <div class="transaction_history">
    <div class="transaction_history__header">
      <div class="icon"></div>
      <div class="title">
        <span class="title_inner">{{$t('transaction_recent_title')}}</span>
      </div>
    </div>
    <div class="transaction_history__body">
      <div class="transaction_history__toolbar">
        <TransactionHistoryToolbar
        @on-switch-sorting="onSwitchSorting"
        @on-searching="onInputSearchKeyWord"
        />
      </div>
      <div class="recent_transactions">
        <TransactionHistoryItem v-for="(item, index) in listTransactionUsedToBeRendered" :key="index" :transaction="item"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';
import TransactionHistoryItem from '@/components/TransactionHistoryItem.vue';
import TransactionHistoryToolbar from '@/components/TransactionHistoryToolbar.vue';
import { toTimestamp } from '@/utils/utils';
import {
  SortingInfo,
  SortingOrder,
  SortingType,
  RecentTransaction,
  TransactionHistoryData
} from '@/interfaces/transaction';

const { mapGetters } = createNamespacedHelpers('transaction');

@Options({
  components: {
    TransactionHistoryItem,
    TransactionHistoryToolbar
  },
  computed: { ...mapGetters(['getTransactions']) },
  watch: {
    getTransactions () {
      this.listTransactionUsedToBeRendered = this.createListTransactionUsedToBeRendered();
    }
  }
})
export default class TransactionHistory extends Vue {
  name = 'TransactionHistory';
  transactions!: Array<RecentTransaction>;
  listTransactionUsedToBeRendered: Array<TransactionHistoryData> = [];
  sortingInfo: SortingInfo | null = null;
  getTransactions!: Array<RecentTransaction>;

  created () {
    this.listTransactionUsedToBeRendered = this.createListTransactionUsedToBeRendered();
  }

  /** create transaction used to be rendered
   * @return { void }
   */
  createListTransactionUsedToBeRendered (): Array<TransactionHistoryData> {
    return this.getTransactions.
      map((tran: RecentTransaction) => {
        return {
          categoryCode: tran.categoryCode,
          date: tran.dates.valueDate,
          icon: '',
          type: tran.transaction.type,
          merchantName: tran.merchant.name,
          currencyCode: tran.transaction.amountCurrency.currencyCode,
          amount: String(tran.transaction.amountCurrency.amount),
          creditDebitIndicator: tran.transaction.creditDebitIndicator
        } as TransactionHistoryData;
      });
  }

  /**
   * Handling when user switch sorting
   * @param sortingInfo
   */
  onSwitchSorting (sortingInfo: SortingInfo) {
    this.sortingInfo = sortingInfo;
    this.sortListOfTransaction(sortingInfo);
  }

  /**
   * Sorting the list of transaction according to the sorting information.
   * @param sortingInfo {SortingInfo}
   */
  private sortListOfTransaction (sortingInfo: SortingInfo) {
    this.listTransactionUsedToBeRendered.
      sort((tranOne: TransactionHistoryData, tranTwo: TransactionHistoryData) => {
        const leftHandSideOpr = sortingInfo.order === SortingOrder.ASC ? tranOne : tranTwo;
        const rightHandSideOpr = sortingInfo.order === SortingOrder.ASC ? tranTwo : tranOne;
        if (sortingInfo.type === SortingType.DATE) {
          return toTimestamp(leftHandSideOpr.date) - toTimestamp(rightHandSideOpr.date);
        } else if (sortingInfo.type === SortingType.BENEFICIARY) {
          return leftHandSideOpr.merchantName.localeCompare(rightHandSideOpr.merchantName);
        } else {
          return Number(leftHandSideOpr.amount) - Number(rightHandSideOpr.amount);
        }
      });
  }

  /**
   * Filter list of transaction when user type search keyword
   * @param searchText { String }
   */
  onInputSearchKeyWord (searchText: string) {
    this.listTransactionUsedToBeRendered = this.createListTransactionUsedToBeRendered();
    if (searchText) {
      this.listTransactionUsedToBeRendered = this.listTransactionUsedToBeRendered.
        filter((tran: TransactionHistoryData) => tran.merchantName.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    }
    // if exit sorting info. Sorting list of transaction
    if (this.sortingInfo) {
      this.sortListOfTransaction(this.sortingInfo);
    }
  }
}

</script>

<style scoped>
.transaction_history__header {
  display: flex;
  padding: 8px;
  height: 30px;
  background-color: #0C8397;
  align-items: center;
}
.transaction_history__header .icon {
  width: 28px;
  height: 24px;
  background: #0C8397 url("../assets/icons/briefcase.png") no-repeat center center;
  background-size: 100% 100%;
}
.transaction_history__header .title {
  width: calc(100% - 24px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.transaction_history__header .title .title_inner {
  color: #ffffff;
  font-size: 1rem;
}
.transaction_history__body {
  background-color: #ffffff;
  padding: 16px;
}
.recent_transactions {
  margin-top: 32px;
  border: 1px solid #B5B5B5;
  border-left: none;
}
.recent_transactions>div:not(:last-of-type) {
  border-bottom: 1px solid #B5B5B5;
}
@media screen and (max-width: 375px) {
  .transaction_history__body {
    padding: 8px;
  }
}
</style>
