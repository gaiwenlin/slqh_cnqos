<template>
  <i-select v-model="selectValue"
            :placeholder="$t('core.select.placeholder', { 0: $t('app.application.user.userSource')})"
            :name="name" :class="classes" @change="handleChange" :clearable="clearable">
    <i-option :value="userSource.value"
              :key="userSource.value"
              v-for="userSource in userSources">{{$t(userSource.name)}}</i-option>
  </i-select>
</template>

<script>
  export default {
    name: 'user-source-selector',
    props: {
      value: {
        type: Number
      },
      name: {
        type: String,
        default: 'userSource'
      },
      clearable: {
        type: Boolean,
        default: true
      },
      block: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value (value) {
        this.selectValue = value;
      }
    },
    data () {
      return {
        userSources: [
          {
            name: 'System',
            value: 0
          },
          {
            name: 'WebPageRegist',
            value: 1
          },
          {
            name: 'WeixinInteraction',
            value: 2
          },
          {
            name: 'WeixinExternalLogin',
            value: 3
          },
          {
            name: 'OtherExternalLogin',
            value: 4
          }
        ],
        selectValue: null
      };
    },
    computed: {
      classes () {
        return [
          { block: !!this.block }
        ];
      }
    },
    methods: {
      handleChange (value) {
        this.$emit('input', value);
      }
    },
    mounted () {
      this.selectValue = this.value;
    }
  };
</script>
