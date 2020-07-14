<template>
  <portlet>
    <div class="clearfix margin-bottom-1">
      <div class="pull-right">
        <i-button border circle scene="primary" icon="add" @click="create">{{$t('app.common.action.create')}}</i-button>
      </div>
    </div>
<!--    <div>-->
<!--      <i-form type="inline">-->
<!--        <form-item>-->
<!--          <i-button border circle scene="primary" icon="search" @click="getAll">{{$t('app.common.action.search')}}</i-button>-->
<!--        </form-item>-->
<!--      </i-form>-->
<!--    </div>-->
    <i-table class="data-table"
             :data="items"
             :fit="true"
             v-loading="loading">
      <table-column
        min-width="120"
        :label="$t('app.application.role.name')">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
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
      <table-column
        width="200"
        :label="$t('app.common.action.actions')">
        <template slot-scope="scope">
          <i-button border circle scene="primary" @click="edit(scope.row)">{{$t('app.common.action.edit')}}</i-button>
          <i-button border circle scene="danger"
                    v-if="!scope.row.isStatic"
                    @click="deleteItem(scope.row)">{{$t('app.common.action.delete')}}</i-button>
        </template>
      </table-column>
    </i-table>
    <Pagination :total="totalCount" :current="filterParams.pageIndex" :page-size="filterParams.pageSize" show-elevator @change="handlePageChange"></Pagination>
    <CreateOrUpdateModal :id="dialogCreateOrEdit.id" v-model="dialogCreateOrEdit.isShow" @save="handleOnSave"></CreateOrUpdateModal>
  </portlet>
</template>

<script>
  import roleApi from '../../../../apis/application/role';
  import CreateOrUpdateModal from './CreateOrUpdateModal';
  import CommonCreateAndUpdateModalList from '../../../mixins/CommonCreateAndUpdateModalList';

  export default {
    name: 'RoleIndex',
    mixins: [CommonCreateAndUpdateModalList],
    components: {
      CreateOrUpdateModal
    },
    data () {
      return {
        api: roleApi,
        filterParams: {
          permissionId: null
        }
      };
    }
  };
</script>
