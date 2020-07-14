export default {
  data () {
    return {
      id: null,
      model: {},
      entityName: null,
      saving: false,
      loading: false,
      rules: {
      }
    };
  },
  methods: {
    save () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.saving = true;
          const action = this.id ? 'update' : 'create';
          this.api[action](this.model).then(() => {
            this.$Message.success(this.$t('app.common.message.successfullySaved'));
            this.$router.push({ name: `${this.entityName}Index` });
          }).finally(() => {
            this.saving = false;
          });
        }
      });
    },
    get () {
      this.loading = true;
      this.api.get({ id: this.id }).then((result) => {
        this.model = result;
      }).finally(() => {
        this.loading = false;
      });
    }
  },
  created () {
    this.id = this.$route.query.id;
    if (this.id) {
      this.get();
    }
  }
};
