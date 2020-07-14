export default {
  props: {
    value: {
      type: [Number, String, Array]
    },
    placeholder: {
      type: String
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
  data () {
    return {
      model: this.value,
      items: [],
      config: {
        label: 'name',
        value: 'id'
      }
    };
  },
  computed: {
    options () {
      return this.items;
    },
    computedPlaceholder () {
      return this.placeholder || this.$t('core.select.placeholder', { 0: this.$t(`app.application.${this.entityName}.${this.entityName}`) });
    }
  },
  watch: {
    value (value) {
      this.model = value;
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('input', value);
    }
  }
};
