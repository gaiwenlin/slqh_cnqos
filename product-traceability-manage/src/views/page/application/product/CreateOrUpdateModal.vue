<template>
  <Modal :maskClosable="false" width="960" v-model="dialogVisible" @cancel="handleCancel" :title="$t('core.crud.createOrEdit', { 0: $t('app.application.product.product') })">
    <i-form :model="model" :rules="rules" ref="form" :label-width="100">
      <tab v-model="activeTab">
        <tab-pane label="基本信息" name="baseInfo">
          <div class="content-padding">
            <form-item :label="$t('app.application.product.name')" prop="name">
              <i-input maxlength="200" show-word-limit name="name" v-model="model.name" block></i-input>
            </form-item>
            <form-item :label="$t('app.application.enterprise.enterprise')" prop="enterpriseId">
              <enterprise-select name="productCategoryId" v-model="model.enterpriseId" block></enterprise-select>
            </form-item>
            <form-item :label="$t('app.application.product.specification')" prop="specification">
              <i-input name="specification" v-model="model.specification" block></i-input>
            </form-item>
            <form-item :label="$t('app.application.product.productCategory')" prop="productCategoryId">
              <product-category-select name="productCategoryId" v-model="model.productCategoryId" block></product-category-select>
            </form-item>
            <form-item :label="$t('app.application.product.standardName')" prop="standardName">
              <i-input maxlength="200" show-word-limit name="standardName" v-model="model.standardName" block></i-input>
            </form-item>
            <form-item :label="$t('app.application.product.standardNo')" prop="standardNo">
              <i-input maxlength="200" show-word-limit name="standardNo" v-model="model.standardNo" block></i-input>
            </form-item>
            <form-item :label="$t('app.application.product.standardDescription')" prop="standardDescription">
              <i-input :rows="5" maxlength="200" show-word-limit type="textarea" name="standardDescription" v-model="model.standardDescription" block></i-input>
            </form-item>
          </div>
        </tab-pane>
        <tab-pane label="详情" name="detail">
          <div class="content-padding">
            <form-item :label="$t('app.application.product.description')" prop="description">
              <i-input :rows="5" maxlength="200" show-word-limit type="textarea" name="description" v-model="model.description" block></i-input>
            </form-item>
            <form-item :label="$t('app.application.product.edibleMethod')" prop="edibleMethod">
              <i-input :rows="5" maxlength="200" show-word-limit type="textarea" name="edibleMethod" v-model="model.edibleMethod" block></i-input>
            </form-item>
            <form-item :label="$t('app.application.product.photos')" prop="photos">
              <pictures-uploader name="photos" v-model="model.photos" block></pictures-uploader>
            </form-item>
            <form-item :label="$t('app.application.product.video')" prop="video">
              <input-file-uploader name="video" v-model="model.video" block></input-file-uploader>
            </form-item>
          </div>
        </tab-pane>
        <tab-pane label="生产信息" name="produceInfo">
          <div class="content-padding">
            <form-item :label="$t('app.application.product.originEnterprise')" prop="orginEnterpriseId">
              <enterprise-select name="orginEnterpriseId" v-model="model.orginEnterpriseId" block></enterprise-select>
            </form-item>
            <form-item :label="$t('app.application.product.growthProcess')" prop="growthProcessId">
              <growth-process-select name="growthProcessId" v-model="model.growthProcessId" block></growth-process-select>
            </form-item>
            <form-item :label="$t('app.application.product.factoryEnterprise')" prop="factoryEnterpriseId">
              <enterprise-select name="factoryEnterpriseId" v-model="model.factoryEnterpriseId" block></enterprise-select>
            </form-item>
            <form-item :label="$t('app.application.product.produceProcess')" prop="produceProcessId">
              <produce-process-select name="produceProcessId" v-model="model.produceProcessId" block></produce-process-select>
            </form-item>
            <form-item :label="$t('app.application.product.certifications')" prop="certificationIds">
              <certification-select :multiple="true" name="certificationIds" v-model="model.certificationIds" block></certification-select>
            </form-item>
          </div>
        </tab-pane>
      </tab>
    </i-form>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button size="large" circle border :loading="saving" icon="success" scene="primary" @click="save">{{$t('app.common.action.save')}}</i-button>
    </template>
  </Modal>
</template>

<script>
  import productApi from '../../../../apis/application/product';
  import CommonCreateOrUpdateModal from '../../../mixins/CommonCreateOrUpdateModal';
  import EnterpriseSelect from '../enterprise/EnterpriseSelect';
  import ProductCategorySelect from '../productCategory/ProductCategorySelect';
  import ProduceProcessSelect from '../produceProcess/ProduceProcessSelect';
  import GrowthProcessSelect from '../growthProcess/GrowthProcessSelect';
  import CertificationSelect from '../certification/CertificationSelect';

  export default {
    name: 'CreateOrUpdateModal',
    components: { CertificationSelect, GrowthProcessSelect, ProduceProcessSelect, ProductCategorySelect, EnterpriseSelect },
    mixins: [CommonCreateOrUpdateModal],
    data () {
      return {
        api: productApi,
        activeTab: 'baseInfo',
        rules: {
          name: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.product.name') }) }],
          specification: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.product.specification') }) }],
          productCategoryId: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.product.productCategory') }) }],
          enterpriseId: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.enterprise.enterprise') }) }],
          // produceProcessId: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.product.produceProcess') }) }],
          // growthProcessId: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.product.growthProcess') }) }],
          // factoryEnterpriseId: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.product.factoryEnterprise') }) }],
        },
        defaultModel: {
          photos: [],
          certificationIds: []
        }
      };
    },
    methods: {
      parseGetModel(model) {
        model.photos = model.photos ? model.photos.split(',') : [];
        model.certificationIds = model.certificationIds ? model.certificationIds.split(',').map(item => parseInt(item)) : [];
        return model;
      },
      parsePostModel () {
        return Object.assign({}, this.model, {
          photos: this.model.photos.join(','),
          certificationIds: this.model.certificationIds.join(','),
        });
      }
    }
  };
</script>
