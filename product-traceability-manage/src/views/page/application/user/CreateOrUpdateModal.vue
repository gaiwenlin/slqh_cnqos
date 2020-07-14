<template>
  <Modal :maskClosable="false" v-model="dialogVisible" width="960" :title="$t('core.crud.createOrEdit', { 0: $t('app.common.property.user') })" @cancel="handleCancel">
    <i-form :model="model" :rules="rules" ref="form" :label-width="170">
      <form-item :label="$t('app.common.property.userName')" prop="userName">
        <i-input maxlength="10" show-word-limit name="userName" block v-model="model.userName" :placeholder="$t('app.common.property.userName')" :disabled="!!model.id"></i-input>
      </form-item>
      <form-item :label="$t('app.common.property.phoneNumber')" prop="phoneNumber">
        <i-input name="phoneNumber" block v-model="model.phoneNumber" :placeholder="$t('app.common.property.phoneNumber')"></i-input>
      </form-item>
      <form-item :label="$t('app.application.user.enterprise')" prop="enterpriseId" v-if="enterpriseSettable">
        <enterprise-selector name="enterpriseId" v-model="model.enterpriseId" block></enterprise-selector>
      </form-item>
      <form-item :label="$t('app.application.user.roles')" prop="roleId">
        <role-select :multiple="true" name="roleId" block v-model="model.roleId" :placeholder="$t('app.application.user.roles')"></role-select>
      </form-item>
    </i-form>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button :loading="loading" size="large" border circle icon="save" scene="primary" @click="save">{{$t('app.common.action.save')}}</i-button>
    </template>
  </Modal>
</template>

<script type="text/jsx">
  import userApi from '../../../../apis/application/user';
  import userNameValidator from '../../../../common/validators/userNameValidator';
  import CommonCreateOrUpdateModal from '../../../mixins/CommonCreateOrUpdateModal';
  import RoleSelect from '../role/RoleSelect';
  import EnterpriseSelector from '../enterprise/EnterpriseSelect';
  import appConfig from '../../../../config/app';

  export default {
    name: 'CreateOrUpdateModal',
    mixins: [CommonCreateOrUpdateModal],
    components: { EnterpriseSelector, RoleSelect },
    data () {
      return {
        api: userApi,
        rules: {
          userName: [
            { required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.common.property.userName') }), trigger: 'change' },
            { validator: userNameValidator, trigger: 'change' }
          ],
          phoneNumber: [
            { required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.common.property.phoneNumber') }), trigger: 'change' }
          ],
        },
        defaultModel: {
          roleId: []
        }
      };
    },
    computed: {
      enterpriseSettable () {
        return this.$store.state.session.user.userName === appConfig.superAdmin;
      }
    }
  };
</script>
