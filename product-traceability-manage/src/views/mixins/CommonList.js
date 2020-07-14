export default {
  data () {
    return {
      api: null,
      loaded: false,
      loading: false,
      deleteFieldName: 'name',
      entityLocalizeName: '',
      getHandleName: 'getAllByPage',
      items: [],
      totalCount: 0,
      filterParams: {
        pageIndex: 1,
        pageSize: 10
      },
      autoFetch: true
    };
  },
  methods: {
    assignFetchResult(result) {
      this.items = result.items;
      this.totalCount = result.total;
    },
    async search() {
      this.filterParams.pageIndex = 1;
      await this.getAll();
    },
    getSearchParams () {
      return Object.assign({}, this.filterParams, {
        pageIndex: this.filterParams.pageIndex - 1
      });
    },
    async getAllHandle() {
      let result = await this.api[this.getHandleName](this.getSearchParams());
      this.assignFetchResult(result);
    },
    async getAll () {
      try {
        this.loading = true;
        await this.getAllHandle();
      }
      finally {
        this.loading = false;
        this.loaded = true;
      }
    },
    async handlePageChange (pageIndex) {
      this.filterParams.pageIndex = pageIndex;
      await this.getAll();
    },
    async handleSizeChange (value) {
      this.filterParams.pageSize = value;
      await this.getAll();
    },
    handleSortChange () {

    },
    deleteItem (item) {
      this.$confirm(this.$t('app.common.message.deleteWarningMessage', { 0: item[this.deleteFieldName] })).then(async (result) => {
        if (!result) {
          return;
        }
        await this.api.delete({ id: item.id });
        await this.search();
        this.$Message.success(this.$t('app.common.message.successfullyDeleted'));
      });
    },
    createdHandle () {

    }
  },
  created () {
    this.createdHandle();
    if (this.autoFetch) {
      this.search();
    }
  }
};
