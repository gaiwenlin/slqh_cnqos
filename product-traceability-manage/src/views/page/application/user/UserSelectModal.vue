<template>
  <modal :maskClosable="false" v-model="dialogVisible" :title="$t('core.select.placeholder', { 0: $t('app.common.property.user')})" width="1080">
    <UserSelectorPage @select="handleSelect" v-if="dialogVisible"></UserSelectorPage>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="cancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button size="large" border circle icon="save" scene="primary" :disabled="!selectedUser" @click="ok">{{$t('app.common.action.ok')}}</i-button>
    </template>
  </modal>
</template>

<script>
  import UserSelectorPage from './UserSelectorPage';

  export default {
    name: 'UserSelectModal',
    components: {
      UserSelectorPage
    },
    props: {
      value: Boolean
    },
    data () {
      return {
        selectedUser: null,
        dialogVisible: false
      };
    },
    watch: {
      value (value) {
        this.dialogVisible = value;
      }
    },
    methods: {
      handleSelect (user) {
        this.selectedUser = user;
      },
      ok () {
        this.$emit('select', this.selectedUser);
      },
      cancel () {
        this.$emit('input', false);
      }
    }
  };
</script>
