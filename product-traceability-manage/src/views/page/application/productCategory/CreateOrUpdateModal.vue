<template>
  <Modal v-model="dialogVisible" @cancel="handleCancel" :title="$t('core.crud.createOrEdit', { 0: $t('app.application.productCategory.productCategory') })">
    <i-form :model="model" :rules="rules" ref="form" :label-width="100">
      <form-item :label="$t('app.common.property.name')" prop="name">
        <i-input maxlength="10" show-word-limit name="name" v-model="model.name" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.enterprise')" prop="enterpriseId">
        <enterprise-select name="productCategoryId" v-model="model.enterpriseId" block></enterprise-select>
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
  import EnterpriseSelect from '../enterprise/EnterpriseSelect';

  export default {
    name: 'CreateOrUpdateModal',
    components: {EnterpriseSelect},
    mixins: [CommonCreateOrUpdateModal],
    data () {
      return {
        api: productCategoryApi,
        rules: {
          name: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.common.property.name') }) }],
          enterpriseId: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.enterprise.enterprise') }) }],
        }
      };
    }
  };
</script>
