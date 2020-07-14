<template>
  <Uploader type="image"
            ref="uploader"
            multiple
            :value="value"
            @input="handleInput"
            :action="computedUrl"
            :headers="headers"
            :baseUrl="baseUrl"
            :data="uploadData"
            :onSuccess="handleOnSuccess"
            :onRemove="handleOnRemove"
            :resultParse="resultParse"
            :showUploadList="true"></Uploader>
</template>

<script>
  import defaultPicture from '../../assets/images/common-square-default-picture.png';
  import UploaderCommon from '../mixins/UploaderCommon';

  export default {
    name: 'PicturesUploader',
    mixins: [UploaderCommon],
    props: {
      value: {
        type: null
      },
      defaultPicture: {
        type: String
      }
    },
    computed: {
      computedDefaultPicture () {
        return this.defaultPicture || defaultPicture;
      }
    },
    methods: {
      handleInput (value) {
        this.$emit('input', value);
      },
      handleOnRemove () {
      },
      handleOnSuccess () {
      }
    }
  };
</script>
