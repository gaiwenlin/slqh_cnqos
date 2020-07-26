<template>
  <div class="certificate">
    <div class="content-padding">
      <div class="mb10">证书及抽检报告</div>
      <div v-if="model.product.standardDescription" style="color:#333;" class="f14 mb10">{{model.product.standardDescription}}</div>
      <template v-if="pictures.length">
        <van-swipe :width="150" class="product-swiper" :loop="false" :show-indicators="false" indicator-color="black" v-if="model&&pictures.length>0">
          <van-swipe-item class="swiper-item" v-for="(picture,index) in pictures" :key="index">
            <van-image @click="preview(picture, index)" class="image-item" :src="picture" fit="contain" lazy-load>
            </van-image>
          </van-swipe-item>
        </van-swipe>
      </template>
    </div>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  import {changeImageUrl} from '../../../../../utils/prefixUtils'
  export default {
    name: 'Certificate',
    props: {
      model: null
    },
    computed: {
      pictures () {
        let list =[];
        if(this.model.testReportPicture){
          this.model.testReportPicture.split(',').forEach(item=>{
              list.push(changeImageUrl(item));
          })
        }
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
      preview (src, index) {
        if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
          if (wx && wx.previewImage) {
            wx.previewImage({
                current: src, // 当前显示图片的http链接
                urls: this.pictures // 需要预览的图片http链接列表
            });
          }
        } else {
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
    },
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  .certificate {
    .product-swiper {
      background: #FFFFFF;
      height: 180px;
      margin-top: 10px;
      .swiper-item{
        display: flex;
        align-items: center;
        position: relative;
        .image-item{
          width: 80%;
        }
        .swiper-desc {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 10%;
          color: #ffffff;
          padding: 0px 5px;
          background-color: rgba($color: #333333, $alpha: 0.5);
        }
      }
    }
  }
</style>