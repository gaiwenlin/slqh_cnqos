<template>
  <modular title="产品证书" v-if="pictures.length>0">
    <img slot="icon" src="../../../../assets/icons/section/chanpin-04.png">
    <div class="certificate-wrap content-padding">
      <div class="certificate-item" v-for="(certification, index) in pictures" :key="index">
        <van-image @click="preview(index)" :src="certification" fit="cover" lazy-load>
        </van-image>

        <!--<img @click="preview(index)" :src="certification.license|filePath">-->
      </div>
    </div>
  </modular>
</template>

<script>
  import { ImagePreview } from 'vant';
  // import filePath from '../../../../filters/filePath';
  import {changeImageUrl} from '../../../../utils/prefixUtils'

  export default {
    name: 'Certificate',
    props: {
      model: null
    },
    computed: {
      pictures () {
        let list =[];
        if(this.model.product.certifications){
          this.model.product.certifications.forEach(item=>{
            if(item.license){
              list.push(changeImageUrl(item.license));
            }
          })
        }
        return list;
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
          closeable: true,
          closeOnPopstate:true
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/index";
  .certificate-wrap {
    align-items: flex-start;
    display: flex;
    justify-content: flex-start;
    overflow-x: auto;
    .certificate-item {
      width: 40%;
      &:not(:last-child) {
        margin-right: $component-span;
      }
      img {
        display: block;
      }
    }
  }
</style>
