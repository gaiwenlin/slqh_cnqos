<template>
  <div class="product-base-info">
    <van-swipe class="product-swiper" :autoplay="3000" indicator-color="black" v-if="pictures.length>0">
      <van-swipe-item class="swiper-item" v-for="(picture,index) in pictures" :key="index">
        <van-image class="image-item" :src="changeImageUrl(picture)" fit="cover" lazy-load>
        </van-image>
      </van-swipe-item>
    </van-swipe>

    <modular class="margin-top-1" title="产品信息">
      <img slot="icon" src="../../../../assets/icons/section/chanpin-01.png">
      <detailed-list direction="column" class="margin-bottom-1">
        <detailed-item label="产品名称" v-if="model.product.name">{{model.product.name}}</detailed-item>
        <detailed-item label="认证信息" v-if="certifications.length>0">
          <div class="picture-list">
            <div class="picture-item" v-for="(certification,index) in certifications" :key="index">
              <van-image :src="certification" fit="contain" lazy-load class="vanImage">
              </van-image>
            </div>
          </div>
        </detailed-item>
      </detailed-list>
    </modular>
  </div>
</template>

<script>
  import {changeImageUrl} from '../../../../utils/prefixUtils'
  export default {
    props: {
      model: null
    },
    data(){
      return {
      };
    },
    computed: {
      pictures () {
        return this.model.product.photos.split(',');
      },
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
    }
  };
</script>

<style lang="scss" scoped>
  .product-swiper {
    background: #FFFFFF;
    height: 375px;
    .swiper-item{
      display: flex;
      align-items: center;
      justify-content: center;
      .image-item{
        width: 300px;
        height: 265px;
      }
    }
  }
  .vanImage{
    width:100px ;
    height: 100px;
  }
</style>
