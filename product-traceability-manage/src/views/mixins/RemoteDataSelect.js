export default {
  props: {
    value: {
      type: [Number, String]
    },
    block: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value (newValue) {
      this.selectedValue = newValue;
    }
  },
  data () {
    return {
      api: null,
      selectedValue: this.value,
      items: []
    };
  },
  methods: {
    handleChange (value) {
      this.$emit('input', value);
      this.$emit('change', this.items.find((item) => {
        return item.id === value;
      }));
    },
    async getAll () {
      const result = await this.api.getAll();
      this.items = result.items;
    }
  },
  async created () {
    await this.getAll();
  }
};
