<template>
  <modal :maskClosable="false" :title="$t('core.crud.createOrEdit', { 0: $t('app.application.role.role') })"
         v-model="dialogVisible"
         @cancel="handleCancel">
    <Alert type="warning">
      如果您正在更改自己的权限，则可能需要刷新页面（F5），以在您所做的权限更改生效！
    </Alert>
    <tab v-model="activeName">
      <tab-pane :label="$t('app.application.role.roleProperties')" name="first">
        <div class="content-padding">
          <i-form :model="model" :rules="rules" ref="form" :label-width="100">
            <form-item :label="$t('app.application.role.name')" prop="name">
              <i-input maxlength="10" show-word-limit v-model="model.name" block></i-input>
            </form-item>
            <form-item :label="$t('app.common.status.default')" prop="isDefault">
              <checkbox v-model="model.isDefault">{{$t('app.common.status.default')}}</checkbox>
            </form-item>
          </i-form>
        </div>
      </tab-pane>
      <tab-pane :label="$t('app.application.role.permissions')" name="second">
        <div class="content-padding" style="max-height: 300px;overflow: auto;">
          <PermissionTree :defaultCheckedKeys="grantedPermissionNames" ref="permissionTree" :showCheckbox="true"></PermissionTree>
        </div>
      </tab-pane>
    </tab>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button :loading="saving" size="large" border circle icon="save" scene="primary" @click="save">{{$t('app.common.action.save')}}</i-button>
    </template>
  </modal>
</template>

<script>
  import PermissionTree from '../permission/PermissionTree';
  import roleApi from '../../../../apis/application/role';
  import CommonCreateOrUpdateModal from '../../../mixins/CommonCreateOrUpdateModal';
  import { parsePermissionByPath, reParsePermissionByName } from '../../../../utils/permission';

  export default {
    name: 'CreateOrUpdateModal',
    mixins: [CommonCreateOrUpdateModal],
    components: {
      PermissionTree
    },
    data () {
      return {
        api: roleApi,
        activeName: 'first',
        dialogVisible: this.visible,
        grantedPermissionNames: [],
        title: '',
        rules: {
          name: [{ required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.application.role.name') }), trigger: 'change' }]
        }
      };
    },
    methods: {
      handleCancel () {
        this.$emit('input', false);
      },
      parseGetModel(result) {
        result.permissions = result.permissions || [];
        this.grantedPermissionNames = result.permissions.map(parsePermissionByPath);
        return result;
      },
      parsePostModel () {
        const grantedPermissionNames = this.$refs.permissionTree.getCheckedKeys();
        return {
          ...this.model,
          permissions: grantedPermissionNames.map(reParsePermissionByName)
        };
      }
    }
  };
</script>
