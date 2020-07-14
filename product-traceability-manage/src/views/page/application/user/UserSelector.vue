<template>
  <div class="">
    <i-input block :value="inputValue" @focus="handleFocus" endIcon="user"></i-input>
    <Modal :maskClosable="false" v-model="showModal" :width="960" :title="$t('app.common.action.select')">
      <UserSelectorPage @select="handleSelect" v-if="showModal"></UserSelectorPage>
    </Modal>
  </div>
</template>

<script>
  import UserSelectorPage from './UserSelectorPage';
  import userApi from '../../../../apis/application/user';
  export default {
    name: 'UserSelector',
    components: {
      UserSelectorPage
    },
    props: {
      value: {
        type: [Number, String]
      },
      placeholder: {
        type: String
      }
    },
    data () {
      return {
        showModal: false,
        selectedUser: null
      };
    },
    computed: {
      inputValue () {
        return this.selectedUser ? this.selectedUser.userName : (this.placeholder || this.$t('core.select.placeholder', { 0: this.$t('app.common.property.user') }));
      }
    },
    watch: {
      value (newValue) {
        if (newValue) {
          this.getUserByValue();
        }
      }
    },
    methods: {
      handleFocus () {
        this.showModal = true;
      },
      getUserByValue () {
        userApi.get({ id: this.value }).then((result) => {
          this.selectedUser = result;
        });
      },
      handleSelect (user) {
        this.selectedUser = user;
        this.$emit('input', user.id);
        this.showModal = false;
      }
    },
    mounted () {
      if (this.value) {
        this.getUserByValue();
      }
    }
  };
</script>
