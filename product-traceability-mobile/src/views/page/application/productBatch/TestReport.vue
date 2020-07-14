<template>
  <modular title="抽检报告">
    <img slot="icon" src="../../../../assets/icons/section/chanpin-05.png">
    <div class="test-report-wrap content-padding">
      <div class="test-report-item" v-for="(picture, index) in pictures" :key="index">
        <van-image :src="picture" fit="cover" lazy-load @click="preview(index)">
        </van-image>
        <!--<img @click="preview(index)" :src="picture">-->
      </div>
    </div>
    <div class="product-description" v-if="standardDescription">
      <p>{{standardDescription}}</p></div>
  </modular>
</template>

<script>
  // import filePath from '../../../../filters/filePath';
  import { ImagePreview } from 'vant';
  import {changeImageUrl} from '../../../../utils/prefixUtils'

  export default {
    name: 'TestReport',
    props: {
      model: null,
      },
    computed: {
      pictures () {
        if (!this.model.testReportPicture) {
          return [];
        }
        return this.model.testReportPicture.split(',').map(item => changeImageUrl(item));
      },
      standardDescription(){
        return this.model.product.standardDescription ? this.model.product.standardDescription : "";
        }
    },
    methods: {
      changeImageUrl,
      preview (index) {
        ImagePreview({
          images: this.pictures,
          showIndex: true,
          loop: true,
          startPosition: index,
          closeable: true
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/index";
  .test-report-wrap {
    align-items: flex-start;
    display: flex;
    justify-content: flex-start;
    .test-report-item {
      width: 40%;
      &:not(:last-child) {
        margin-right: $component-span;
      }
      img {
        display: block;
      }
    }
  }
  .product-description{
    margin:20px;
    word-break: break-word;
  }
</style>
