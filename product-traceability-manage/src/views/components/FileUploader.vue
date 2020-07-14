<template>
  <Uploader v-model="filePath"
            ref="uploader"
            :action="computedUrl"
            :block="block"
            :progress="progress"
            :showUploadList="showUploadList"
            :headers="headers"
            :data="uploadData"
            :resultParse="resultParse"
            :withCredentials="false"
            @input="handleInput"
            :baseUrl="baseUrl"
            :triggerSelect="triggerSelect"
            :onSuccess="onSuccess">
    <slot></slot>
  </Uploader>
</template>

<script>
  import UploaderCommon from '../mixins/UploaderCommon';
  import Emitter from 'canknow-ui-core/src/mixins/emitter';

  export default {
    name: 'FileUploader',
    mixins: [UploaderCommon, Emitter],
    props: {
      value: {
        type: String
      },
      progress: {
        type: Boolean,
        default: false
      },
      showUploadList: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: false
      },
      triggerSelect: {
        type: Boolean,
        default: true
      },
      defaultPicture: {
        type: String
      },
      width: {
        type: Number,
        default: 96
      }
    },
    data () {
      return {
        filePath: null
      };
    },
    watch: {
      value (value) {
        this.filePath = value;
      }
    },
    methods: {
      selectFile () {
        this.$refs.uploader.selectFile();
      },
      handleInput (filePath) {
        if (this.fullPath) {
          filePath = this.$store.getters.baseUrl + filePath;
        }
        this.$emit('input', filePath);
        this.dispatch('form-item', 'on-form-change', filePath);
      }
    },
    created () {
      this.filePath = this.value;
    }
  };
</script>
