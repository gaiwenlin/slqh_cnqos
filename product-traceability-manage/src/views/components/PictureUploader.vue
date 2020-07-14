<template>
  <div class="picture-uploader">
    <div class="picture-uploader-wrap">
      <Uploader v-model="filePath"
                :action="computedUrl"
                type="image"
                :headers="headers"
                :resultParse="resultParse"
                :withCredentials="false"
                @input="handleInput"
                :baseUrl="baseUrl"
                :data="uploadData"
                :onSuccess="onSuccess"></Uploader>
    </div>
  </div>
</template>

<script>
  import defaultPicture from '../../assets/images/common-rectangle-default-picture.png';
  import Emitter from 'canknow-ui-core/src/mixins/emitter';
  import UploaderCommon from '../mixins/UploaderCommon';

  export default {
    name: 'PictureUploader',
    mixins: [Emitter, UploaderCommon],
    props: {
      value: {
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
      fullPath: {
        type: Boolean,
        default: false
      },
      defaultPicture: {
        type: String
      },
      width: {
        type: [Number, String],
        default: 96
      },
      height: {
        type: [Number, String],
        default: 96
      }
    },
    watch: {
      value (newValue) {
        this.filePath = newValue;
      }
    },
    computed: {
      computedDefaultPicture () {
        return this.defaultPicture || defaultPicture;
      }
    },
    data () {
      return {
        showFileSelector: false,
        filePath: null
      };
    },
    methods: {
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
