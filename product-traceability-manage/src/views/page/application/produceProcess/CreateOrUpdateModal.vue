<template>
  <Modal :maskClosable="false" width="960px" v-model="dialogVisible" @cancel="handleCancel" :title="$t('core.crud.createOrEdit', { 0: $t('app.application.produceProcess.produceProcess') })">
    <i-form :model="model" :rules="rules" ref="form" :label-width="100">
      <form-item :label="$t('app.common.property.name')" prop="name">
        <i-input maxlength="10" show-word-limit name="name" v-model="model.name" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.growthProcess.productCategory')" prop="productCategoryId">
        <product-category-select name="productCategoryId" v-model="model.productCategoryId" block></product-category-select>
      </form-item>
      <form-item :label="$t('app.application.produceProcess.steps')" prop="items">
        <i-table :data="model.items">
          <table-column :label="$t('app.application.produceProcess.step.name')">
            <template slot-scope="scope">
              <i-input v-model="scope.row.name"></i-input>
            </template>
          </table-column>
          <table-column :label="$t('app.application.produceProcess.step.picture')">
            <template slot-scope="scope">
              <picture-uploader v-model="scope.row.picture"></picture-uploader>
            </template>
          </table-column>
          <table-column :label="$t('app.common.action.actions')">
            <template slot-scope="scope">
              <i-button @click="removeItem(scope.$index, scope.row)" scene="danger" border circle>{{$t('app.common.action.remove')}}</i-button>
            </template>
          </table-column>
        </i-table>
        <i-button block @click="addItem" border dashed>{{$t('app.common.action.add')}}</i-button>
      </form-item>
    </i-form>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button size="large" circle border :loading="saving" icon="success" scene="primary" @click="save">{{$t('app.common.action.save')}}</i-button>
    </template>
  </Modal>
</template>

<script>
  import produceProcessApi from '../../../../apis/application/produceProcess';
  import CommonCreateOrUpdateModal from '../../../mixins/CommonCreateOrUpdateModal';
  import ProductCategorySelect from '../productCategory/ProductCategorySelect';

  export default {
    name: 'CreateOrUpdateModal',
    components: { ProductCategorySelect },
    mixins: [CommonCreateOrUpdateModal],
    data () {
      return {
        api: produceProcessApi,
        rules: {
          name: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.common.property.name') }) }],
        },
        defaultModel: {
          items: []
        }
      };
    },
    methods: {
      addItem () {
        this.model.items.push({
          name: '',
          picture: null
        });
      },
      removeItem (index, item) {
        this.model.items.splice(index, 1);
      }
    }
  };
</script>
