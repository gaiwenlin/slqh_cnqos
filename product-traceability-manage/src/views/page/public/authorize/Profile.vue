<template>
  <portlet icon="user" :title="$t('app.common.property.myProfile')">
    <i-form :model="user" :rules="rules" ref="form" :label-width="150">
      <form-item :label="$t('app.common.property.avatar')" prop="avatar">
        <PictureUploader :height="96" v-model="user.avatar"></PictureUploader>
      </form-item>
      <form-item :label="$t('app.common.property.userName')" prop="userName">
        <i-input block name="userName" disabled v-model="user.userName" :placeholder="$t('app.common.property.userName')"></i-input>
      </form-item>
      <form-item :label="$t('app.common.property.name')" prop="name">
        <i-input block name="name" v-model="user.name" :placeholder="$t('app.common.property.name')"></i-input>
      </form-item>
      <form-item :label="$t('app.common.property.surname')" prop="surname">
        <i-input block name="surname" v-model="user.surname" :placeholder="$t('app.common.property.surname')"></i-input>
      </form-item>
      <form-item :label="$t('app.common.property.emailAddress')" prop="emailAddress">
        <i-input block name="emailAddress" disabled v-model="user.emailAddress" :placeholder="$t('app.common.property.emailAddress')"></i-input>
      </form-item>
      <form-item>
        <i-button border circle scene="primary" @click="save" icon="save" :loading="saving">{{$t('app.common.action.save')}}</i-button>
      </form-item>
    </i-form>
  </portlet>
</template>

<script>
  import profileApi from '../../../../apis/public/profile';

  export default {
    components: {},
    name: 'Profile',
    data () {
      return {
        saving: false,
        user: {},
        rules: {}
      };
    },
    methods: {
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true;
            profileApi.updateCurrentUserProfile(this.user).then(() => {

            }).finally(() => {
              this.saving = false;
            });
          }
        });
      }
    },
    mounted () {
      this.user = this.$store.getters.user;
    }
  };
</script>
