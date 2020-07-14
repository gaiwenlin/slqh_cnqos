<template>
  <portlet :title="$t('app.application.me.enterprise')">
    <div slot="actions">
      <i-button border circle :loading="saving" icon="save" scene="primary" @click="save">{{$t('app.common.action.save')}}</i-button>
    </div>
    <i-form :model="model" :rules="rules" ref="form" :label-width="100">
      <form-item :label="$t('app.common.property.name')" prop="name">
        <i-input maxlength="10" show-word-limit name="name" v-model="model.name" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.address')" prop="address">
        <i-input maxlength="200" show-word-limit name="address" v-model="model.address" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.telephone')" prop="telephone">
        <i-input name="telephone" v-model="model.telephone" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.description')" prop="description">
        <i-input maxlength="200" show-word-limit type="textarea" name="description" v-model="model.description" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.additionalInformation')" prop="additionalInformation">
        <i-input maxlength="200" show-word-limit type="textarea" name="additionalInformation" v-model="model.additionalInformation" block></i-input>
      </form-item>
      <form-item :label="$t('app.application.enterprise.photos')" prop="photos">
        <pictures-uploader name="photos" v-model="model.photos" block></pictures-uploader>
      </form-item>
    </i-form>
  </portlet>
</template>

<script>
  import enterpriseApi from '../../../../apis/application/enterprise';

  export default {
    name: 'Enterprise',
    data () {
      return {
        api: enterpriseApi,
        saving: false,
        loading: false,
        model: {},
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
      async getModel () {
        this.model = this.parseGetModel(await this.api.get({ id: this.$store.state.session.user.enterpriseId }));
      },
      parsePostModel () {
        return Object.assign({}, this.model, {
          photos: this.model.photos.join(',')
        });
      },
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true;
            this.api.update(this.parsePostModel()).then(() => {
              this.$Message.success(this.$t('app.common.message.successfullySaved'));
              this.$emit('input', false);
              this.$emit('save', this.model);
            }).finally(() => {
              this.saving = false;
            });
          }
        });
      }
    },
    async created() {
      await this.getModel();
    }
  };
</script>

