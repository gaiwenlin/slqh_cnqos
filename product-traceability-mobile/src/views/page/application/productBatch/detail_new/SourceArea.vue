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
          <van-swipe-item class="swiper-item" v-for="(item,index) in pictures" :key="index">
            <van-image class="image-item" @click="preview(item.picture, index,1)" :src="item.picture" fit="cover" lazy-load>
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
          <van-swipe :width="260" class="product-swiper" :loop="false" :show-indicators="false" indicator-color="black" v-if="steps.length>0">
            <van-swipe-item class="swiper-item" v-for="(item,index) in steps" :key="index">
              <van-image class="image-item" @click="preview(item.picture, index,2)" :src="item.picture" fit="cover" lazy-load>
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
        let pictures = [];
        if(this.enterpriseData.photos){
          this.enterpriseData.photos.split(',').forEach(item => {
            pictures.push({
              name: '',
              picture: changeImageUrl(item)
            })
          })
        }
        return pictures;
      },
      steps(){
        let list =[];
        if(this.model.product.growthProcess.steps){
          this.model.product.growthProcess.steps.forEach(item=>{
            if(item.picture){
              list.push({
                name: item.name,
                picture: changeImageUrl(item.picture)
              });
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
      preview (src, index, type) {
        let pictures = [];
        if (type == 1) {
          this.pictures.forEach(item => {
            pictures.push(item.picture)
          })
        } else {
          this.steps.forEach(item => {
            pictures.push(item.picture)
          })
        }
        if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
          if (wx && wx.previewImage) {
            wx.previewImage({
              current: src, // 当前显示图片的http链接
              urls: pictures // 需要预览的图片http链接列表
            });
          }
        } else {
          ImagePreview({
            images: pictures,
            showIndex: true,
            loop: true,
            startPosition: index,
            closeable: true,
            closeOnPopstate:true
          });
        }
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
          height: 160px;
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