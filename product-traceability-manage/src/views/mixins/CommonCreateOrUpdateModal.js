export default {
  props: {
    value: Boolean,
    id: {
      type: Number
    }
  },
  data () {
    return {
      api: null,
      dialogVisible: this.visible,
      entityName: null,
      saving: false,
      loading: false,
      model: {},
      defaultModel: {
      },
      rules: {
      },
    };
  },
  computed: {
    modalTitle () {
      return this.$t(`common.${this.id ? 'update' : 'create'}`, this.entityName);
    }
  },
  watch: {
    value (val) {
      if (val !== this.dialogVisible) {
        this.dialogVisible = val;
      }
    },
    dialogVisible (value) {
      if (value) {
        this.$nextTick(async () => {
          await this.handleOpen();
        });
      }
    }
  },
  methods: {
    handleCancel () {
      this.$emit('input', false);
    },
    parseGetModel(result) {
      return result;
    },
    async handleOpen () {
      this.model = { };
      this.loading = true;
      this.$refs.form.resetFields();
      if (this.id) {
        await this.getModel();
      }
      else {
        this.model = Object.assign({}, this.defaultModel);
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      this.handleAfterOpen();
      this.loading = false;
    },
    handleAfterOpen () {

    },
    async getModel () {
      this.model = this.parseGetModel(await this.api.get({ id: this.id }));
    },
    parsePostModel () {
      return this.model;
    },
    save () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.saving = true;
          const action = this.id ? 'update' : 'create';
          this.api[action](this.parsePostModel()).then(() => {
            this.$Message.success(this.$t('app.common.message.successfullySaved'));
            this.$emit('input', false);
            this.$emit('save', this.model);
          }).finally(() => {
            this.saving = false;
          });
        }
      });
    }
  }
};
