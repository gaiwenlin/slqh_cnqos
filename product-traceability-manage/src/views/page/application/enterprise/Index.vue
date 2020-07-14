<template>
  <div>
    <portlet>
      <div class="clearfix margin-bottom-1">
        <div class="pull-right">
          <i-button border circle scene="primary" icon="add" @click="create">
            {{$t('app.common.action.create')}}
          </i-button>
        </div>
      </div>
<!--      <div>-->
<!--        <i-form type="inline">-->
<!--          <form-item>-->
<!--            <i-button border circle scene="primary" icon="search" @click="search">{{$t('app.common.action.search')}}</i-button>-->
<!--          </form-item>-->
<!--        </i-form>-->
<!--      </div>-->
      <div class="data-table-container margin-bottom-1">
        <i-table class="data-table"
                 :data="items"
                 v-loading="loading">
          <table-column
            min-width="120"
            prop="name"
            show-tooltip-when-overflow
            :label="$t('app.application.enterprise.name')"></table-column>
          <table-column
            width="190"
            show-tooltip-when-overflow
            prop="address"
            :label="$t('app.application.enterprise.address')">
            <template slot-scope="scope">
              {{scope.row.address||'-'}}
            </template>
          </table-column>
          <table-column
            width="190"
            prop="telephone"
            :label="$t('app.application.enterprise.telephone')">
            <template slot-scope="scope">
              {{scope.row.telephone||'-'}}
            </template>
          </table-column>
          <table-column
            width="190"
            prop="description"
            show-tooltip-when-overflow
            :label="$t('app.application.enterprise.description')">
            <template slot-scope="scope">
              {{scope.row.description||'-'}}
            </template>
          </table-column>
          <table-column
            width="190"
            show-tooltip-when-overflow
            prop="additionalInformation"
            :label="$t('app.application.enterprise.additionalInformation')">
            <template slot-scope="scope">
              {{scope.row.additionalInformation||'-'}}
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
              <i-button border circle scene="primary" @click="edit(scope.row)">
                {{$t('app.common.action.edit')}}
              </i-button>
              <i-button border circle scene="danger" @click="deleteItem(scope.row)">{{$t('app.common.action.delete')}}</i-button>
            </template>
          </table-column>
        </i-table>
      </div>
      <Pagination :total="totalCount" :current="filterParams.pageIndex" :page-size="filterParams.pageSize" show-elevator @change="handlePageChange"></Pagination>
    </portlet>
    <CreateOrUpdateModal :id="dialogCreateOrEdit.id" v-model="dialogCreateOrEdit.isShow" @save="handleOnSave"></CreateOrUpdateModal>
  </div>
</template>

<script type="text/jsx">
  import enterpriseApi from '../../../../apis/application/enterprise';
  import CommonCreateAndUpdateModalList from '../../../mixins/CommonCreateAndUpdateModalList';
  import CreateOrUpdateModal from './CreateOrUpdateModal';

  export default {
    mixins: [CommonCreateAndUpdateModalList],
    components: {
      CreateOrUpdateModal
    },
    data () {
      return {
        api: enterpriseApi,
        filterParams: {
          name: null,
          id: this.$store.state.session.user.enterpriseId
        }
      };
    },
    methods: {
      handleOnSave () {
        this.getAll();
      },
      clearSelect () {
        this.$refs.tree.clearSelect();
        this.filterParams.id = this.$store.state.session.user.enterpriseId;
        this.search();
      }
    }
  };
</script>
