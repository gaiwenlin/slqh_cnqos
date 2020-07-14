<template>
  <Modal :maskClosable="false" v-model="dialogVisible" @cancel="handleCancel" :title="$t('core.crud.createOrEdit', { 0: $t('app.application.productBatch.productBatch') })">
    <i-form :model="model" :rules="rules" ref="form" :label-width="100">
      <form-item :label="$t('app.application.productBatch.batchNumber')" prop="batchNumber">
        <i-input maxlength="10" show-word-limit clearable name="batchNumber" v-model="model.batchNumber" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.productBatch.product')" prop="productId">
        <product-select name="productId" v-model="model.productId" block></product-select>
      </form-item>
      <form-item :label="$t('app.application.productBatch.produceDateTime')" prop="produceDateTime">
        <date-picker value-format="yyyy-MM-dd HH:mm:ss" name="produceDateTime" v-model="model.produceDateTime" block></date-picker>
      </form-item>
      <form-item :label="$t('app.application.productBatch.testReport')" prop="testReport">
        <input-file-uploader name="testReport" v-model="model.testReport" block></input-file-uploader>
      </form-item>
    </i-form>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button size="large" circle border :loading="saving" icon="success" scene="primary" @click="save">{{$t('app.common.action.save')}}</i-button>
    </template>
  </Modal>
</template>

<script>
  import productBatchApi from '../../../../apis/application/productBatch';
  import CommonCreateOrUpdateModal from '../../../mixins/CommonCreateOrUpdateModal';
  import ProductSelect from '../product/ProductSelect';

  export default {
    name: 'CreateOrUpdateModal',
    components: { ProductSelect },
    mixins: [CommonCreateOrUpdateModal],
    data () {
      return {
        api: productBatchApi,
        rules: {
          batchNumber: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.productBatch.batchNumber') }) }],
          productId: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.productBatch.product') }) }],
          produceDateTime: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.productBatch.produceDateTime') }) }],
        }
      };
    }
  };
</script>
