<template>
  <div>
    <div>
      <i-form type="inline">
        <form-item>
          <i-input :placeholder="$t('core.placeholder', { 0: $t('app.application.user.userName') })" v-model="filters.userName"></i-input>
        </form-item>
        <form-item>
          <i-input :placeholder="$t('core.placeholder', { 0: $t('app.application.user.nickName')})" v-model="filters.nickName"></i-input>
        </form-item>
        <form-item>
          <i-button border circle scene="primary" icon="search" @click="handleSearch">{{$t('app.common.action.search')}}</i-button>
        </form-item>
      </i-form>
    </div>
    <div class="data-table-container margin-bottom-1">
      <i-table class="data-table"
               :data="data"
               @row-click="handleRowClick"
               highlight-current-row>
        <table-column
          min-width="350"
          :label="$t('app.common.property.user')">
          <template slot-scope="scope">
            <Profile :user="scope.row"></Profile>
          </template>
        </table-column>
        <table-column
          min-width="250"
          prop="userName"
          :label="$t('app.common.property.userName')">
        </table-column>
        <table-column
          min-width="200"
          prop="number"
          :label="$t('app.common.property.number')">
        </table-column>
        <table-column
          min-width="200"
          :label="$t('app.common.property.creationTime')">
          <template slot-scope="scope">
            {{scope.row.creationTime|momentFormat}}
          </template>
        </table-column>
      </i-table>
    </div>
    <Pagination :total="totalCount" :current="filters.pageIndex" :page-size="filters.pageSize" show-elevator @change="handlePageChange"></Pagination>
  </div>
</template>

<script>
  import userApi from '../../../../apis/application/user';

  export default {
    name: 'UserSelectorPage',
    data () {
      return {
        loadingData: false,
        totalCount: 0,
        data: [],
        filters: {
          userSource: null,
          userName: null,
          nickName: null,
          filter: void 0,
          permission: void 0,
          role: void 0,
          sorting: void 0,
          pageSize: 10,
          pageIndex: 1
        }
      };
    },
    methods: {
      handleRowClick (row) {
        this.$emit('select', row);
      },
      handleSearch () {
        this.fetchData();
      },
      handlePageChange (pageIndex) {
        this.filters.pageIndex = pageIndex;
        this.fetchData();
      },
      async fetchData () {
        this.loadingData = true;
        let result = await userApi.getUsers(this.filters).catch(() => {
          this.loadingData = false;
        });
        this.data = result.items;
        this.totalCount = result.totalCount;
        this.loadingData = false;
      }
    },
    mounted () {
      this.fetchData();
    }
  };
</script>
