<template>
  <div>
  <van-swipe class="product-swiper" :autoplay="3000" indicator-color="black" v-if="model&&pictures.length>0">
    <van-swipe-item class="swiper-item" v-for="(picture,index) in pictures" :key="index">
      <van-image class="image-item" :src="changeImageUrl(picture)" fit="cover" lazy-load>
      </van-image>
    </van-swipe-item>
  </van-swipe>
  <modular stretch title="企业信息" v-if="model">
    <detailed-list direction="column" class="margin-bottom-1">
      <detailed-item label="企业名称">{{model.name}}</detailed-item>
      <detailed-item label="企业地址">{{model.address}}</detailed-item>
      <detailed-item label="企业电话">{{model.telephone}}</detailed-item>
      <detailed-item label="扩展信息">{{model.additionalInformation}}</detailed-item>
    </detailed-list>
  </modular>
  </div>
</template>

<script>
  import * as enterpriseApi from '../../../../apis/application/enterprise';
  import {changeImageUrl} from '../../../../utils/prefixUtils'
  export default {
    name: 'Detail',
    data () {
      return {
        id: null,
        model: null,
      };
    },
    methods: {
      changeImageUrl,
      async get () {
        enterpriseApi.get({ id: this.id }).then(result => {
          this.model = result;
        });
      }
    },
    computed:{
      pictures () {
        if(this.model.photos){
          return this.model.photos.split(',');
        }else{
          return [];
        }

      }
    },
    created () {
      this.id = this.$route.query.id;
      this.get();
    }
  };
</script>
<style lang="scss" scoped>
  .product-swiper {
    background: #FFFFFF;
    height: 185px;
    width: 100%;
    margin-bottom: 10px;
    .swiper-item{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      .image-item{
        width: 100%;
        height: 185px;
      }
    }
  }
</style>
