<template>
  <FileUploader v-model="model"
                ref="uploader"
                :progress="progress"
                :actionUrl="actionUrl"
                :ratio="ratio"
                :block="block"
                @input="handleInput"
                :width="width"
                :shouldBeRatio="shouldBeRatio"
                :maxFileSize="maxFileSize"
                :showUploadList="showUploadList"
                :triggerSelect="false">
    <i-input v-model="model" block>
      <i-button type="icon" icon="upload" slot="append" @click="selectFile"></i-button>
      <i-button type="icon" icon="download" slot="append" @click="download"></i-button>
    </i-input>
  </FileUploader>
</template>

<script>
  import FileUploader from './FileUploader';
  export default {
    name: 'InputFileUploader',
    component: {
      FileUploader
    },
    props: {
      value: {
        type: String
      },
      progress: {
        type: Boolean,
        default: false
      },
      actionUrl: {
        type: String
      },
      ratio: {
        type: Number
      },
      shouldBeRatio: {
        type: Number
      },
      maxFileSize: {
        type: Number
      },
      showUploadList: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: false
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
        model: this.value,
        baseUrl: this.$store.getters.baseUrl
      };
    },
    watch: {
      value () {
        this.model = this.value;
      }
    },
    methods: {
      handleInput (value) {
        this.$emit('input', value);
      },
      download () {
        if (this.value) {
          const url = this.getDownloadUrl();
          window.open(url);
        }
      },
      getDownloadUrl () {
        if (!this.value.includes('//')) {
          return this.baseUrl + this.value;
        }
        return this.value;
      },
      selectFile () {
        this.$refs.uploader.selectFile();
      }
    }
  };
</script>
