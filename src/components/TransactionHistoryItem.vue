<template>
  <div class="transaction-history-item" :style="{'border-left-color': leftEdgeColor}">
    <div class="sub_item transaction-history-item__date">
      {{ transactionDate }}
    </div>
    <div class="transaction-history-item__icon sub_item">
      <img
        :src="getMerchantIcon"
        alt="Merchant Icon">
    </div>
    <div class="transaction-history-item__content sub_item">
      <div class="merchant_name">{{ merchantName }}</div>
      <div class="transaction_type">{{ transactionType }}</div>
    </div>
    <div class="transaction-history-item__amount sub_item ">
      {{ transactionAmount }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
  TransactionHistoryData,
  CreditDebitIndicator
} from '@/interfaces/transaction.ts';
import { isValidDate } from '@/utils/utils.ts';

const CURRENCY_SYMBOL_MAP = new Map([
  ['EUR', '€'],
  ['USD', '$'],
  ['JOY', '¥']
]);

const MONTHS_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

@Options({
  props: {
    transaction: Object
  }
})
export default class TransactionHistoryItem extends Vue {
  name = 'TransactionHistoryItem';
  transaction!: TransactionHistoryData;

  /**
   * return transaction date info in format (MM DD)
   * @return { String }
   */
  get transactionDate (): string {
    const date = new Date(this.transaction.date);
    if (!isValidDate(date)) {
      return 'InValid Date';
    }
    return `${MONTHS_NAME[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  }

  /**
   * return merchant name information.
   * @return { String }
   */
  get merchantName (): string {
    return this.transaction.merchantName;
  }

  /**
   * get merchant icon by merchant name
   * @return { String }
   */
  get getMerchantIcon () {
    const iconName = this.transaction.merchantName.toLowerCase().
      trim().replace(/\s/g, '-');
    try {
      return require('../assets/icons/' + iconName + '.png');
    } catch (e) {
      return require('../assets/icons/not-found.png');
    }
  }

  /**
   * return transaction type information.
   * @return { String }
   */
  get transactionType (): string {
    return this.transaction.type;
  }

  /**
   * return transaction amount information
   * adding the currency symbol at the beginning.
   * @return {String}
   */
  get transactionAmount (): string {
    const currencySymbol = CURRENCY_SYMBOL_MAP.get(this.transaction.currencyCode) || '';
    return `${this.transaction.creditDebitIndicator === CreditDebitIndicator.CREDIT ? '-' : ''} ${currencySymbol}${this.transaction.amount}`;
  }

  /**
   * filling random color for left edge
   * @return { String }
   */
  get leftEdgeColor (): string {
    return this.transaction.categoryCode;
  }
}

</script>

<style scoped>
.transaction-history-item {
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 15% 10% calc(55% - 24px) 20%;
  border-left: 8px solid;
  padding: 6px 0;
  box-sizing: border-box;
}

.transaction-history-item .sub_item {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.transaction-history-item__icon img {
  width: 32px;
  height: 32px;
}

.transaction-history-item__content.sub_item {
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.3;
}

.transaction-history-item__content .merchant_name {
  font-weight: 600;
}

.transaction-history-item__amount.sub_item {
  justify-content: flex-end;
  padding-right: 16px;
  font-weight: 600;
}

.transaction-history-item__date.sub_item {
  padding-left: 16px;
}
@media screen and (max-width: 375px) {
  .transaction-history-item {
    grid-column-gap: 4px;
    grid-template-columns: 18% 10% calc(50% - 12px) 22%;
  }
  .transaction-history-item__amount.sub_item {
    padding-right: 4px;
  }
  .transaction-history-item__date.sub_item {
    padding-left: 4px;
  }
}
</style>
