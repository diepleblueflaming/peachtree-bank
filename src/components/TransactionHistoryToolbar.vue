<template>
  <div class="transaction_history_toolbar">
    <div class="search_area">
      <Input
        :showClearTextBtn="true"
        @on-input-text="onTypingSearchText"
        :placeholder="$t('search_placeholder')"
      />
    </div>
    <div class="sorting_area">
      <div class="sorting_title">{{$t('sort_btn_text')}}</div>
      <div class="sorting_btn_area">
        <div
          class="sorting_by_date sorting_btn"
          :class="{'active': currentSortingType === 'DATE'}"
          @click="onSwitchSorting('DATE')"
        >
          <span class="title">{{$t('sorting_date_text')}}</span>
          <span class="icon">
            <i class="fa"
               :class="sortingIconClass"
            ></i>
          </span>
        </div>
        <div
          class="sorting_by_beneficiary sorting_btn"
          :class="{'active': currentSortingType === 'BENEFICIARY'}"
          @click="onSwitchSorting('BENEFICIARY')"
        >
          <span class="title">{{$t('sort_btn_beneficiary')}}</span>
          <span class="icon">
            <i class="fa"
               :class="sortingIconClass"
            ></i>
          </span>
        </div>
        <div
          class="sorting_by_amount sorting_btn"
          :class="{'active': currentSortingType === 'AMOUNT'}"
          @click="onSwitchSorting('AMOUNT')"
        >
          <span class="title">{{$t('sort_btn_amount')}}</span>
          <span class="icon">
            <i class="fa"
               :class="sortingIconClass"
            ></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Input from '@/components/Input.vue';
import {
  SortingOrder,
  SortingInfo,
  SortingType
} from '@/interfaces/transaction.ts';

@Options({
  components: {
    Input
  },
  emits: ['on-searching', 'on-switch-sorting']
})
export default class TransactionHistoryToolbar extends Vue {
  name = 'TransactionHistoryToolbar';
  currentSortingType = '';
  sortingInfo: SortingInfo | null = null;

  /**
   * get sorting icon class according current sorting order
   * @return { void }
   */
  get sortingIconClass () {
    return {
      'fa-sort-up': this.sortingInfo && this.sortingInfo.order === 'ASC',
      'fa-sort-down': this.sortingInfo && this.sortingInfo.order === 'DESC'
    };
  }

  /**
   * handling when user switch sorting
   * @param sortingType
   * @return { void }
   */
  onSwitchSorting (sortingType: SortingType): void {
    this.updateSortingInfo(sortingType);
    this.currentSortingType = sortingType;
    this.$emit('on-switch-sorting', this.sortingInfo);
  }

  /**
   * Update sorting information
   * @param sortingType
   * @return { void }
   */
  private updateSortingInfo (sortingType: SortingType): void {
    // if user not yet sorting
    if (!this.sortingInfo) {
      this.sortingInfo = {
        type: sortingType,
        order: SortingOrder.ASC
      };
      return;
    }
    // if user change sorting order.
    if (this.sortingInfo.type === sortingType) {
      this.sortingInfo.order = this.sortingInfo.order === SortingOrder.ASC ? SortingOrder.DESC : SortingOrder.ASC;
      return;
    }
    // if user change sorting type
    this.sortingInfo.type = sortingType;
  }

  /**
   * meit [] event when user type search keyword.
   * @param searchText { String }
   * @return { void }
   */
  onTypingSearchText (searchText: string) {
    this.$emit('on-searching', searchText);
  }
}

</script>

<style scoped>
.transaction_history_toolbar {
  display: grid;
  grid-template-columns: calc(40% - 16px) calc(60% - 16px);
  grid-column-gap: 32px;
}
.sorting_area {
  display: grid;
  grid-template-columns: 20% 80%;
}
.sorting_area .sorting_title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
}
.sorting_area .sorting_btn_area {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  border: 1px solid #e7e7e7;
}
.sorting_area .sorting_btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  padding: 3px 0;
}
.sorting_area .sorting_btn .title {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
}
.sorting_area .sorting_btn .icon i {
  position: absolute;
  margin-left: 6px;
  opacity: 0;
}
.sorting_area .sorting_btn .icon i.fa-sort-up {
  top: calc(50% - 5px);
}
.sorting_area .sorting_btn .icon i.fa-sort-down {
  top: 2px;
}

.sorting_area .sorting_btn.active {
  background-color: #0c8397;
  color: #ffffff;
}
.sorting_area .sorting_btn.active .icon i {
  opacity: 1;
}
.sorting_btn_area>div:not(:last-of-type) {
  border-right: 1px solid #e7e7e7;
}
.sorting_btn_area .sorting_by_date {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 1024px) {
  .transaction_history_toolbar {
    grid-template-columns: none;
  }
  .sorting_area {
    margin-top: 16px;
  }
  .sorting_area .sorting_title {
    justify-content: flex-start;
  }
}
@media screen and (max-width: 375px) {
  .sorting_area .sorting_btn .title {
    font-size: 12px;
  }
}
</style>
