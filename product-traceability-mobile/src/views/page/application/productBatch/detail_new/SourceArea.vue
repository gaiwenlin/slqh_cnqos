<template>
  <div class="source-area">
    <div class="content-padding">
      <div class="mb10">原产地名称</div>
      <div class="title-box">
        <span class="label">{{model.product.originEnterprise.name}}</span>
      </div>
      <div class="enterprise-desc">
        <span>企业简介：</span>{{enterpriseData.description || '-'}}
      </div>
      <div class="enterprise-desc">
        <span>企业地址：</span>{{enterpriseData.address || '-'}}
      </div>
      <div class="enterprise-desc">
        <span>企业电话：</span>{{enterpriseData.telephone || '-'}}
      </div>
      <template v-if="pictures.length">
        <div class="enterprise-sub">工厂图片</div>
        <van-swipe :width="260" class="product-swiper" :loop="false" :show-indicators="false" indicator-color="black" v-if="model&&pictures.length>0">
          <van-swipe-item class="swiper-item" v-for="(picture,index) in pictures" :key="index">
            <van-image class="image-item" :src="changeImageUrl(picture)" fit="cover">
            </van-image>
          </van-swipe-item>
        </van-swipe>
      </template>
      <template>
        <van-divider />
        
        <!-- 二期在做 -->
        <!-- <div>生长环境情况</div>
        <van-row class="mt10 f14">
          <van-col span="12">
            <div class="text-bold">大气情况</div>
            <div>PM2.5：</div>
            <div>温度：</div>
            <div>湿度：</div>
          </van-col>
          <van-col span="12">
            <div class="text-bold">土壤情况</div>
            <div>PH：</div>
            <div class="text-bold">水质情况</div>
            <div>xx</div>
          </van-col>
        </van-row> -->
        <template v-if="steps.length">
          <div class="enterprise-sub">生长过程</div>
          <van-swipe :width="260" class="product-swiper" :loop="false" :show-indicators="false" indicator-color="black" v-if="model&&pictures.length>0">
            <van-swipe-item class="swiper-item" v-for="(step,index) in steps" :key="index">
              <van-image class="image-item" :src="changeImageUrl(step.picture)" fit="cover">
              </van-image>
            </van-swipe-item>
          </van-swipe>
        </template>
      </template>
      <!-- 二期在做 -->
      <!-- <template v-if="model.product.video">
        <van-divider />
        <div>生长环境实时视频</div>
        <div class="product-video">
          <video controls :src="model.product.video|filePath"></video>
        </div>
      </template> -->
      
    </div>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  import {changeImageUrl} from '../../../../../utils/prefixUtils'
  import { get } from '../../../../../apis/application/enterprise';
  export default {
    name: 'Description',
    props: {
      model: null
    },
    data() {
      return {
        enterpriseData: {}
      }
    },
    computed: {
      pictures () {
        if(this.enterpriseData.photos){
          return this.enterpriseData.photos.split(',');
        }else{
          return [];
        }
      },
      steps(){
        let list =[];
        if(this.model.product.growthProcess.steps){
          this.model.product.growthProcess.steps.forEach(item=>{
            if(item.name||item.picture){
              list.push(item);
            }
          })
        }
        return list;
      },
    },
    mounted() {
      this.getEnterpriseInfo();
    },
    methods: {
      changeImageUrl,
      preview (index) {
        ImagePreview({
          images: this.certifications,
          showIndex: true,
          loop: true,
          startPosition: index,
          closeable: true,
          closeOnPopstate:true
        });
      },
      // 获取企业详情
      getEnterpriseInfo() {
        if (!this.enterpriseData.id) {
          get({id: this.model.product.originEnterprise.id})
            .then(res => {
              this.enterpriseData = res
            })
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  .source-area {
    .enterprise-desc {
      font-size: 14px;
      margin-top: 5px;
      span {
        font-weight: bold;
      }
    }
    .enterprise-sub {
      margin-top: 15px;
    }
    .product-swiper {
      background: #FFFFFF;
      height: 160px;
      margin-top: 10px;
      .swiper-item{
        display: flex;
        align-items: center;
        .image-item{
          width: 90%;
        }
      }
    }
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
  }
</style>