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
      <div class="comment-div" @click="show=true">写评论</div>
      <van-popup v-model="show" round closeable
        close-icon-position="top-left" position="bottom" 
        :style="{ height: '200px' }">
        <div class="comment">
          写评论
          <div class="comment-btn">评论</div>
        </div>
        <div>
          <van-field
            rows="4"
            autosize
            type="textarea"
            placeholder="评论内容"
          />
        </div>
        <div class="rate mb15">
          评分
          <van-rate
            class="ml10"
            :size="20"
            color="#49A251"
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </van-popup>

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
    data() {
      return {
        show: false
      }
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
  .comment-div {
    position: fixed;
    height: 52px;
    line-height: 52px;
    text-align: center;
    bottom: 0;
    left: 15px;
    right: 15px;
    font-size: 14px;
    color: #49A251;
    font-weight: bold;
    background: #ffffff;
    border-top: 1px solid #eee;
  }
  .comment {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #eee;
    .comment-btn {
      position: absolute;
      color: #333333;
      background: #49A251;
      right: 20px;
      top: 12px;
      height: 24px;
      line-height: 24px;
      padding: 0 8px;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .rate {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
</style>
