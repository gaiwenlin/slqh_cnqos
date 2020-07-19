<template>
  <div class="product-base-info">
    <van-swipe class="product-swiper" :autoplay="3000" indicator-color="black" v-if="pictures.length>0">
      <van-swipe-item class="swiper-item" v-for="(picture,index) in pictures" :key="index">
        <van-image class="image-item" :src="changeImageUrl(picture)" fit="cover" lazy-load>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <van-tabs class="tabs" v-model="activeTab" swipeable>
      <van-tab title="食品简介">
        <description :model="model"></description>
      </van-tab>
      <van-tab title="原产地信息">
        <source-area :model="model"></source-area>
      </van-tab>
      <van-tab title="工厂信息">
        <factory :model="model"></factory>
      </van-tab>
      <van-tab title="抽检报告">
        <certificate :model="model"></certificate>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import Description from './Description';
  import SourceArea from './SourceArea';
  import Factory from './Factory';
  import Certificate from './Certificate';
  import {changeImageUrl} from '../../../../../utils/prefixUtils'
  export default {
    props: {
      model: null
    },
    components: {
      Description,
      SourceArea,
      Factory,
      Certificate
    },
    data(){
      return {
        activeTab: 0,
        ifCertifications: true
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
<style lang="scss">
  .product-base-info {
    .van-tab {
      background-color: #000000;
      color: #ffffff;
    }
    .van-tab--active {
      color: #49A251;
    }
    .van-tabs__line {
      height: 3px;
      background: #49A251;
    }
    .van-tabs__content {
      padding: 10px 0;
    }
  }
</style>
<style lang="scss" scoped>
  .product-swiper {
    background: #FFFFFF;
    height: 212px;
    .swiper-item{
      display: flex;
      align-items: center;
      justify-content: center;
      .image-item{
        width: 100%;
      }
    }
  }
  .vanImage{
    width:100px ;
    height: 100px;
  }
</style>
