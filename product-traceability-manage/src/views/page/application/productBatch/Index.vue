<template>
  <portlet>
    <div class="clearfix margin-bottom-1">
      <div class="pull-right">
        <i-button border circle scene="primary" icon="add" @click="create">
          {{$t('app.common.action.create')}}
        </i-button>
      </div>
    </div>
<!--    <div>-->
<!--      <i-form type="inline">-->
<!--        <form-item>-->
<!--          <i-button border circle scene="primary" icon="search" @click="search">{{$t('app.common.action.search')}}</i-button>-->
<!--        </form-item>-->
<!--      </i-form>-->
<!--    </div>-->
    <div class="data-table-container margin-bottom-1">
      <i-table class="data-table"
               :data="items"
               v-loading="loading">
        <table-column width="190" :label="$t('app.application.productBatch.produceDateTime')">
          <template slot-scope="scope">
            {{scope.row.produceDateTime|momentFormat}}
          </template>
        </table-column>
        <table-column show-tooltip-when-overflow min-width="150" prop="batchNumber" :label="$t('app.application.productBatch.batchNumber')"></table-column>
        <table-column width="190" :label="$t('app.application.productBatch.productName')">
          <template slot-scope="scope">
            {{scope.row.productName}}
          </template>
        </table-column>
        <table-column width="190" :label="$t('app.application.productBatch.productSpecification')">
          <template slot-scope="scope">
            {{scope.row.specification}}
          </template>
        </table-column>
        <table-column width="190" :label="$t('app.application.productBatch.name')">
          <template slot-scope="scope">
            {{scope.row.enterpriseName}}
          </template>
        </table-column>
        <table-column width="190" :label="$t('app.application.productBatch.testReport')">
          <template slot-scope="scope">
            <button-group>
              <i-button :disabled="!scope.row.testReportPicture" scene="primary" border @click="viewReport(scope.row)">查看</i-button>
              <i-button scene="primary" border @click="upload(scope.row)">上传</i-button>
            </button-group>
          </template>
        </table-column>
        <table-column width="100" :label="$t('app.application.productBatch.printNum')">
          <template slot-scope="scope">
            {{scope.row.printNum}}
          </template>
        </table-column>
        <table-column
          width="190"
          :label="$t('app.common.property.creationTime')">
          <template slot-scope="scope">
            {{scope.row.creationTime|momentFormat}}
          </template>
        </table-column>
        <table-column
          width="190"
          :label="$t('app.common.property.lastModificationTime')">
          <template slot-scope="scope">
            {{scope.row.lastModificationTime|momentFormat}}
          </template>
        </table-column>
        <table-column fixed="right" min-width="200" :label="$t('app.common.action.actions')">
          <template slot-scope="scope">
            <i-button border circle scene="primary" @click="edit(scope.row)">{{$t('app.common.action.edit')}}</i-button>
            <i-button border circle scene="primary" @click="print(scope.row)">打印</i-button>
          </template>
        </table-column>
      </i-table>
    </div>
    <Pagination :total="totalCount" :current="filterParams.pageIndex" :page-size="filterParams.pageSize" show-elevator @change="handlePageChange"></Pagination>
    <CreateOrUpdateModal :id="dialogCreateOrEdit.id" v-model="dialogCreateOrEdit.isShow" @save="handleOnSave"></CreateOrUpdateModal>
    <upload-modal :id="dialogUpload.id" v-model="dialogUpload.isShow" @save="handleOnSave"></upload-modal>
    <print-modal @print="handlePrint" :model="printData.model" v-model="printData.isPrintDialogVisibility"></print-modal>
    <view-report-modal :pictures="dialogViewReport.pictures" v-model="dialogViewReport.isShow"></view-report-modal>
  </portlet>
</template>

<script>
  import productBatchApi from '../../../../apis/application/productBatch';
  import CreateOrUpdateModal from './CreateOrUpdateModal';
  import CommonCreateAndUpdateModalList from '../../../mixins/CommonCreateAndUpdateModalList';
  import PrintModal from './PrintModal';
  import UploadModal from './UploadModal';
  import ViewReportModal from './ViewReportModal';

  export default {
    name: 'ProductBatchIndex',
    mixins: [CommonCreateAndUpdateModalList],
    components: {
      ViewReportModal,
      UploadModal,
      PrintModal,
      CreateOrUpdateModal
    },
    data () {
      return {
        api: productBatchApi,
        isPrintDialogVisibility: false,
        filterParams: {
          name: null
        },
        printData: {
          model: null,
          isPrintDialogVisibility: false
        },
        dialogUpload: {
          isShow: false,
          id: void 0
        },
        dialogViewReport: {
          isShow: false,
          pictures: ''
        }
      };
    },
    methods: {
      handlePrint () {
        // this.search();
      },
      upload (item) {
        this.dialogUpload.id = item.id;
        this.dialogUpload.isShow = true;
      },
      viewReport (item) {
        this.dialogViewReport.pictures = item.testReportPicture;
        this.dialogViewReport.isShow = true;
      },
      print (item) {
        this.printData.model = item;
        this.printData.isPrintDialogVisibility = true;
      }
    }
  };
</script>
