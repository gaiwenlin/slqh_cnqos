<template>
  <div class="login-page flex-vertical flex-center flex-middle">
    <div class="login-banner-box"></div>
    <row>
      <column :md="8" :offset="8" class="login-box">
        <h1 class="login-title">{{ title }} </h1>
        <i-form type="vertical" class="login-form" ref="loginForm" :model="loginData" :rules="loginRules">
          <form-item prop="phoneNumber">
            <i-input block line front-icon="user" ref="phoneNumber" name="phoneNumber"
                     size="large" v-model="loginData.phoneNumber"
                     :placeholder="$t('core.placeholder', { 0: $t('app.common.property.phoneNumber')})"></i-input>
          </form-item>
          <form-item prop="password">
            <i-input block line front-icon="lock" name="capcha" type="capcha" size="large"
                     v-model="loginData.capcha"
                     :placeholder="$t('core.placeholder', { 0: $t('app.common.property.capcha')})">
              <i-button :disabled="sendCapchaDisabled" :loading="sendingCapcha" size="large" slot="append" @click="sendCapcha">
                <span v-if="sendingCapcha">发送验证码</span>
                <span v-if="!sendingCapcha&&!time">发送验证码</span>
                <span v-if="time">{{this.time + 's后重新获取'}}</span>
              </i-button>
            </i-input>
          </form-item>
          <i-button icon="send" class="margin-top-3" htmlType="submit" block size="large" scene="primary" small-radius @click.native.prevent="submit" v-ripple="true" :loading="loading">{{$t('app.application.login.login')}}</i-button>
        </i-form>
      </column>
    </row>
  </div>
</template>

<script>
  import eventBus from '../../../../utils/eventBus';
  import authorizationService from '../../../../application/authorization';
  import cookie from 'js-cookie';
  import authorizationApi from '../../../../apis/public/authorization';
  import phoneNumberValidator from '../../../../common/validators/phoneNumberValidator';
  import * as settings from './../../../../settings';

  export default {
    name: 'Login',
    data () {
      return {
        title: settings.title,
        loading: false,
        sendingCapcha: false,
        time: 0,
        disabled: false,
        modalShow: false,
        mode: 'login',
        loginRules: {
          phoneNumber: [
            { required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.common.property.phoneNumber') }), trigger: 'blur' },
            { validator: phoneNumberValidator, trigger: 'blur' }
          ],
          capcha: [
            { required: true, message: this.$t('core.validate.common.requiredFiled', { 0: this.$t('app.common.property.capcha') }), trigger: 'blur' }
          ]
        },
        loginData: {
          phoneNumber: null,
          capcha: null
        }
      };
    },
    computed: {
      sendCapchaDisabled () {
        return this.sendingCapcha || this.time;
      }
    },
    methods: {
      async sendCapcha () {
        const phoneNumberPattern = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!phoneNumberPattern.test(this.loginData.phoneNumber)) {
          this.$Message.error('请输入正确的手机号');
        }
        else {
          this.sendingCapcha = true;
          try {
            await authorizationApi.sendCapcha({
              phoneNumber: this.loginData.phoneNumber
            });
            this.time = 60;
            this.disabled = true;
            this.$Message.success('发送成功');
            this.startCountDown();
          }
          finally {
            this.sendingCapcha = false;
          }
        }
      },
      startCountDown () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.startCountDown, 1000);
        }
        else {
          this.time = 0;
          this.disabled = false;
        }
      },
      submit () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            authorizationApi.login(this.loginData).then(async result => {
              cookie.set('phoneNumber', this.loginData.phoneNumber);
              await authorizationService.signIn(result.token);
              eventBus.$emit('onAuthor');

              if (!!localStorage.getItem('authorReturnUrl') && localStorage.getItem('authorReturnUrl') !== '/login') {
                await this.$router.push({ path: localStorage.getItem('authorReturnUrl') });
              }
              else {
                await this.$router.push({ path: '/application/dashboard' });
              }
            }).finally((e) => {
              this.loading = false;
            });
          }
          else {
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "login";
</style>
