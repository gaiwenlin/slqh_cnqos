<template>
  <div class="verification-code-input">
    <i-input :shadow="shadow" :smallRadius="smallRadius" type="text" size="large" block name="verificationCode" v-model="verificationCode" line :placeholder="$t('app.common.property.verificationCode')">
      <i-button class="send-button" slot="append" @click.stop="sendVerificationCode" :disabled="disableSend">
        <label v-if="!disableSend">{{$t('app.common.action.sendVerificationCode')}}</label>
        <label v-else-if="countdown">{{$t('app.common.action.reSend')}}{{countdown}}</label>
        <label v-else>{{$t('app.common.action.getVerificationCode')}}</label>
      </i-button>
    </i-input>
  </div>
</template>

<script>
  import Emitter from 'canknow-ui-core/src/mixins/emitter';

  export default {
    name: 'VerificationCodeInput',
    mixins: [ Emitter ],
    props: {
      phoneNumber: {
        type: [String, Number]
      },
      shadow: {
        type: Boolean,
        default: false
      },
      smallRadius: {
        type: Boolean,
        default: false
      },
      sendHandle: {
        type: Function
      },
      countdownTime: {
        type: [Number],
        default: 60
      },
      value: {
        type: [String, Number]
      }
    },
    data () {
      return {
        verificationCode: null,
        sending: false,
        countdown: 0
      };
    },
    watch: {
      verificationCode (value) {
        this.$emit('input', this.verificationCode);
        this.dispatch('form-item', this.verificationCode);
      }
    },
    computed: {
      disableSend () {
        return !this.phoneNumber || !!this.countdown || this.sending;
      }
    },
    methods: {
      startCountdown () {
        this.countdown = this.countdownTime;
        const interval = setInterval(() => {
          if (this.countdown <= 0) {
            clearInterval(interval);
            return;
          }
          this.countdown--;
        }, 1000);
      },
      sendVerificationCode () {
        this.sending = true;
        this.sendHandle().then(() => {
            this.$Message.success(this.$t('app.common.message.successfullySended'));
            this.startCountdown();
        }).finally(() => {
          this.sending = false;
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "~canknow-ui/src/scss/variables";
  .verification-code-input{
    .send-button{
      border: $border-width solid $border-color !important;
      padding: $text-padding $content-padding;
      height: auto !important;
      line-height: 1 !important;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
