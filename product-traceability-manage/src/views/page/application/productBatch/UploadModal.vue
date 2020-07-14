<template>
  <modal class="print-modal" v-model="dialogVisible" @cancel="handleCancel" title="上传测试报告">
    <i-form :model="model" :rules="rules" ref="form">
      <form-item prop="testReport">
        <input-file-uploader name="testReport" v-model="model.testReport" block></input-file-uploader>
      </form-item>
    </i-form>
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button size="large" circle border :loading="saving" icon="success" scene="primary" @click="save">{{$t('app.common.action.save')}}</i-button>
    </template>
  </modal>
</template>

<script>
  import CommonCreateOrUpdateModal from '../../../mixins/CommonCreateOrUpdateModal';
  import productBatchApi from '../../../../apis/application/productBatch';

  export default {
    name: 'UploadModal',
    mixins: [CommonCreateOrUpdateModal],
    data () {
      return {
        api: productBatchApi,
        defaultModel: {
          testReport: null
        }
      };
    }
  };
</script>
