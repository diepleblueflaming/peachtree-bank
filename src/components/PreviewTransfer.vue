<template>
  <div class="preview_transfer_info">
    <div class="preview_transfer__header">
      <div class="icon"></div>
      <div class="title">
        <span class="title_inner">{{$t('transfer_preview_title')}}</span>
      </div>
    </div>
    <div class="content_area">
      <div class="from_account preview_item">
        <div class="name">{{$t('transfer_form_from_account')}}</div>
        <div class="content">{{transferInfo.fromAccount}}</div>
      </div>
      <div class="to_account preview_item">
        <div class="name">{{$t('transfer_form_to_account')}}</div>
        <div class="content">{{transferInfo.toAccount}}</div>
      </div>
      <div class="amount preview_item">
        <div class="name">{{$t('transfer_form_amount')}}</div>
        <div class="content">{{transferInfo.amount}}</div>
      </div>
      <div class="btn_area">
        <div class="cancel_btn">
          <VButton
            :text="$t('cancel_btn_text')"
            :onClick="onCancelTransfer"
          />
        </div>
        <div class="submit_btn">
          <VButton
            :text="$t('transfer_btn_text')"
            :onClick="onSubmitTransfer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import VButton from '@/components/VButton.vue';
import { TransferInformation } from '@/interfaces/transaction.ts';

@Options({
  components: {
    VButton
  },
  props: {
    transferInfo: { type: Object, required: true }
  },
  emits: [
    'on-transfer',
    'on-cancel-transfer:'
  ]
})
export default class PreviewTransfer extends Vue {
    name = 'PreviewTransfer';
    transferInfo!: TransferInformation;

    /**
    * emit event [on-cancel-transfer] when user cancel transfer.
    */
    onCancelTransfer () {
      this.$emit('on-cancel-transfer');
    }

    /**
     * emit event [on-submit-form] when user submit transfer
     */
    onSubmitTransfer () {
      this.$emit('on-transfer');
    }
}

</script>

<style scoped>
.preview_transfer_info {
  width: 100%;
}
.preview_transfer__header {
  display: flex;
  padding: 8px;
  height: 30px;
  background-color: #0C8397;
  align-items: center;
}

.preview_transfer__header .icon {
  width: 28px;
  height: 24px;
  background: #0C8397 url("../assets/icons/arrows.png") no-repeat center center;
  background-size: 100% 100%;
}

.preview_transfer__header .title {
  width: calc(100% - 24px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview_transfer__header .title .title_inner {
  color: #ffffff;
  font-size: 1rem;
}
.content_area {
  padding: 16px;
  background-color: #ffffff;
}
.content_area .preview_item {
  display: grid;
  grid-template-columns: 30% calc(70% - 4px);
  grid-column-gap: 8px;
  box-sizing: border-box;
  font-size: 14px;
  margin-bottom: 16px;
}
.content_area .preview_item .name {
  font-weight: 600;
}
.btn_area {
  display: grid;
  grid-template-columns: calc(50% - 8px) calc(50% - 8px);
  grid-column-gap: 16px;
}
</style>
