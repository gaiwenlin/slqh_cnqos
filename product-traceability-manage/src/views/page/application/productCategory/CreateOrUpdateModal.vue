<template>
  <Modal v-model="dialogVisible" @cancel="handleCancel" :title="$t('core.crud.createOrEdit', { 0: $t('app.application.productCategory.productCategory') })">
    <i-form :model="model" :rules="rules" ref="form" :label-width="100">
      <form-item :label="$t('app.common.property.name')" prop="name">
        <i-input maxlength="10" show-word-limit name="name" v-model="model.name" block></i-input>
      </form-item>
    </i-form>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button size="large" circle border :loading="saving" icon="success" scene="primary" @click="save">{{$t('app.common.action.save')}}</i-button>
    </template>
  </Modal>
</template>

<script>
  import productCategoryApi from '../../../../apis/application/productCategory';
  import CommonCreateOrUpdateModal from '../../../mixins/CommonCreateOrUpdateModal';

  export default {
    name: 'CreateOrUpdateModal',
    mixins: [CommonCreateOrUpdateModal],
    data () {
      return {
        api: productCategoryApi,
        rules: {
          name: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.common.property.name') }) }],
        }
      };
    }
  };
</script>
