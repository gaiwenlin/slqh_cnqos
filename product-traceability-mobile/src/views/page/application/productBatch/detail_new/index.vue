<template>
  <div v-if="loaded">
    <base-info :model="model"></base-info>
    <!-- 
    <factory :model="model" v-if="ifFactoryEnterprise"></factory>
    <certificate :model="model" v-if="ifCertifications"></certificate>
    <test-report :model="model" v-if="ifTestReport"></test-report>
    <description :model="model" v-if="ifDescription"></description>
    <Video :model="model" v-if="ifVideo"></Video> -->
  </div>
</template>

<script>
  import BaseInfo from './BaseInfo';
  // import SourceArea from './SourceArea';
  // import Factory from './Factory';
  // import Certificate from './Certificate';
  // import TestReport from './TestReport';
  // import Description from './Description';
  // import Video from './Video';
  import { detail } from '../../../../../apis/application/productBatch';

  export default {
    name: 'ProductBatchDetail',
    components: {
    //   Description,
    //   TestReport,
    //   Certificate,
    //   Factory,
    //   SourceArea,
      BaseInfo,
    //   Video
    },
    data () {
      return {
        id: null,
        model: {},
        loaded: false,
        loading: false,
        //是否有检测报告
        ifTestReport:false,
        //是否有产品简介
        ifDescription:false,
        //是否有产品视频
        ifVideo:false,
        //是否有产品证书
        ifCertifications:false,
        ifFactoryEnterprise:false,
        ifOriginEnterprise:false,
      };
    },
    methods: {
      async get () {
        this.loading = true;
        const result = await detail({ id: this.id });
        if(result.testReportPicture){
          this.ifTestReport = true;
        }
        const {product={}} = result;
        if(product.description){
          this.ifDescription = true;
        }
        if(product.video){
          this.ifVideo = true;
        }
        if(product.certifications){
          this.ifCertifications = true;
        }
        if(product.factoryEnterprise&&product.factoryEnterprise.name&&product.produceProcess.steps.length>0){
          this.ifFactoryEnterprise = true;
        }
        if(product.originEnterprise&&product.originEnterprise.name){
          this.ifOriginEnterprise = true;
        }
        this.model = result;
        this.loading = false;
        this.loaded = true;
      }
    },
    created () {
      this.id = this.$route.query.id;
      this.get();
    }
  };
</script>

<style lang="scss" scoped>
  .detail_new {

  }
</style>
