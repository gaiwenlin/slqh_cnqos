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
        <table-column min-width="120" prop="name" :label="$t('app.application.product.name')"></table-column>
        <table-column min-width="120" prop="enterpriseName" :label="$t('app.common.property.enterpriseName')"></table-column>
        <table-column min-width="120" prop="standardNo" :label="$t('app.application.product.standardNo')"></table-column>
        <table-column min-width="120" prop="specification" :label="$t('app.application.product.specification')"></table-column>
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
        <table-column min-width="200" :label="$t('app.common.action.actions')">
          <template slot-scope="scope">
            <i-button border circle scene="primary" @click="edit(scope.row)">
              {{$t('app.common.action.edit')}}
            </i-button>
            <i-button border circle scene="danger" @click="deleteItem(scope.row)">{{$t('app.common.action.delete')}}</i-button>
          </template>
        </table-column>
      </i-table>
    </div>
    <Pagination :total="totalCount" :current="filterParams.pageIndex" :page-size="filterParams.pageSize" show-elevator @change="handlePageChange"></Pagination>
    <CreateOrUpdateModal :id="dialogCreateOrEdit.id" v-model="dialogCreateOrEdit.isShow" @save="handleOnSave"></CreateOrUpdateModal>
  </portlet>
</template>

<script>
  import productApi from '../../../../apis/application/product';
  import CreateOrUpdateModal from './CreateOrUpdateModal';
  import CommonCreateAndUpdateModalList from '../../../mixins/CommonCreateAndUpdateModalList';

  export default {
    name: 'ProductIndex',
    mixins: [CommonCreateAndUpdateModalList],
    components: {
      CreateOrUpdateModal
    },
    data () {
      return {
        api: productApi,
        filterParams: {
          name: null
        }
      };
    }
  };
</script>
