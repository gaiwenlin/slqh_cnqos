<template>
  <div>
    <div class="content-padding">
      <div class="mb10">产品名称</div>
      <div class="title-box">
        <span class="label">{{model.product.name}}</span>
        <div class="btn">再次购买</div>
      </div>
      <div class="product-description" v-if="model.product.description">{{model.product.description}}</div>
      <template v-if="certifications.length">      
        <van-divider />
        <div>认证信息</div>
        <van-row class="certification-wrap">
          <van-col class="certification-item" span="6" v-for="(certification, index) in certifications" :key="index">
            <van-image @click="preview(index)" :src="certification" fit="cover" lazy-load>
            </van-image>
          </van-col>
        </van-row>
      </template>
      <template v-if="model.product.edibleMethod">
        <van-divider />
        <div>食用方法</div>
        <div class="product-description">{{model.product.edibleMethod}}</div>
      </template>
      <div class="product-video" v-if="model.product.video">
        <video controls :src="model.product.video|filePath"></video>
      </div>
    </div>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  import {changeImageUrl} from '../../../../../utils/prefixUtils'
  export default {
    name: 'Description',
    props: {
      model: null
    },
    computed: {
      certifications () {
        let list =[];
        if(this.model.product.certifications){
          this.model.product.certifications.forEach(item=>{
            if(item.logo){
              list.push(changeImageUrl(item.logo));
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
          images: this.certifications,
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
  @import "~canknow-ui-core/src/scss/variables";
  .product-video {
    margin-top: $component-span;
    video {
      width: 100%;
    }
  }
  .title-box {
    margin-top: 3px;
    display: flex;
    .label {
      color: #333333;
      font-weight: bold;
      font-size: 18px;
      flex: 1;
    }
    .btn {
      height: 28px;
      line-height: 28px;
      padding: 0 10px;
      font-size: 14px;
      background-color: #49A251;
      color: #ffffff;
      margin-top: -5px;
    }
  }
  .product-description {
    padding: 10px 0 0 0;
    font-size: 14px;
    color: #333333;
  }
  .certification-wrap {
    margin-top: 16px;
      display: flex;
      align-items: center;
    .certification-item {
      padding: 10px;
    }
  }
</style>
