<template>
  <Modal v-model="dialogVisible" @cancel="handleCancel" :title="$t('core.crud.createOrEdit', { 0: $t('app.application.enterprise.enterprise') })">
    <i-form :model="model" :rules="rules" ref="form" :label-width="100">
      <form-item :label="$t('app.common.property.name')" prop="name">
        <i-input maxlength="50" show-word-limit name="name" v-model="model.name" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.address')" prop="address">
        <i-input maxlength="200" show-word-limit name="address" v-model="model.address" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.telephone')" prop="telephone">
        <i-input name="telephone" v-model="model.telephone" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.description')" prop="description">
        <i-input maxlength="1000" show-word-limit type="textarea" name="description" v-model="model.description" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.additionalInformation')" prop="additionalInformation">
        <i-input maxlength="1000" show-word-limit name="additionalInformation" type="textarea" v-model="model.additionalInformation" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.photos')" prop="photos">
        <pictures-uploader name="photos" v-model="model.photos" block></pictures-uploader>
      </form-item>
    </i-form>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button size="large" circle border :loading="saving" icon="success" scene="primary" @click="save">{{$t('app.common.action.save')}}</i-button>
    </template>
  </Modal>
</template>

<script>
  import enterpriseApi from '../../../../apis/application/enterprise';
  import CommonCreateOrUpdateModal from '../../../mixins/CommonCreateOrUpdateModal';

  export default {
    name: 'CreateOrUpdateModal',
    mixins: [CommonCreateOrUpdateModal],
    data () {
      return {
        api: enterpriseApi,
        defaultModel: {
          photos: [],
          parentId: null
        },
        rules: {
          name: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.common.property.name') }) }],
        }
      };
    },
    methods: {
      parseGetModel(model) {
        model.photos = model.photos ? model.photos.split(',') : [];
        return model;
      },
      handleAfterOpen () {
        this.model.parentId = this.model.parentId || this.$store.state.session.user.enterpriseId;
      },
      parsePostModel () {
        return Object.assign({}, this.model, {
          photos: this.model.photos.join(',')
        });
      }
    }
  };
</script>
