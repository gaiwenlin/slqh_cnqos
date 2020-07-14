<template>
  <portlet>
    <div class="clearfix margin-bottom-1">
      <div class="pull-right">
        <i-button :to="{path: '/application/role'}" border circle icon="permission">
          {{$t('app.application.role.role')}}
        </i-button>
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
               highlight-current-row
               v-loading="loading">
        <table-column
          min-width="100"
          show-overflow-tooltip
          prop="userName"
          :label="$t('app.common.property.userName')">
        </table-column>
        <table-column
          min-width="200"
          show-overflow-tooltip
          prop="phoneNumber"
          :label="$t('app.common.property.phoneNumber')">
        </table-column>
        <table-column
          min-width="200"
          show-overflow-tooltip
          :label="$t('app.application.user.roles')">
          <template slot-scope="scope">
            <i-label scene="info" border v-for="item in scope.row.roleName" :key="item">{{item}}</i-label>
          </template>
        </table-column>
        <table-column
          min-width="100"
          show-overflow-tooltip
          prop="enterpriseName"
          :label="$t('app.application.user.enterprise')">
          <template slot-scope="scope">
            {{scope.row.enterpriseName||'-'}}
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
            <i-button border circle scene="primary" @click="edit(scope.row)">
              {{$t('app.common.action.edit')}}
            </i-button>
            <i-button v-if="scope.row.userName !== 'superAdmin'" border circle scene="danger" @click="deleteItem(scope.row)">
              {{$t('app.common.action.delete')}}
            </i-button>
          </template>
        </table-column>
      </i-table>
    </div>
    <Pagination :total="totalCount" :current="filterParams.pageIndex" :page-size="filterParams.pageSize" show-elevator @change="handlePageChange"></Pagination>
    <CreateOrUpdateModal :id="dialogCreateOrEdit.id" v-model="dialogCreateOrEdit.isShow" @save="handleOnSave"></CreateOrUpdateModal>
  </portlet>
</template>

<script>
  import userApi from '../../../../apis/application/user';
  import CreateOrUpdateModal from './CreateOrUpdateModal';
  import CommonCreateAndUpdateModalList from '../../../mixins/CommonCreateAndUpdateModalList';

  export default {
    name: 'UserIndex',
    components: {
      CreateOrUpdateModal
    },
    mixins: [CommonCreateAndUpdateModalList],
    data () {
      return {
        api: userApi,
        filterParams: {
          userName: null,
          phoneNumber: null
        }
      };
    }
  };
</script>
