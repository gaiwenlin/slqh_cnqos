<template>
  <modal page class="print-modal" v-model="dialogVisible" @cancel="handleCancel" title="查看测试报告">
    <div class="pictures-wrap">
      <div class="pictures-list">
        <div class="pictures-list-item" v-for="(item, index) in picturePaths" :key="index">
          <img :src="item|filePath">
        </div>
      </div>
    </div>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
    </template>
  </modal>
</template>

<script>
  import productBatchApi from '../../../../apis/application/productBatch';

  export default {
    name: 'ViewReportModal',
    props: {
      value: Boolean,
      pictures: {
        type: String,
        default: ''
      },
    },
    data () {
      return {
        api: productBatchApi,
        dialogVisible: this.visible
      };
    },
    computed: {
      picturePaths () {
        return this.pictures.split(',');
      }
    },
    watch: {
      value (val) {
        if (val !== this.dialogVisible) {
          this.dialogVisible = val;
        }
      }
    },
    methods: {
      handleCancel () {
        this.$emit('input', false);
      }
    },
  };
</script>
<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  .pictures-wrap {
    text-align: center;
    .pictures-list {
      display: inline-block;
      width: 960px;
      overflow-y: auto;
      .pictures-list-item {
        margin-bottom: $component-span;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
</style>
