import Emitter from 'canknow-ui-core/src/mixins/emitter';

export default {
  mixins: [Emitter],
  props: {
    value: {
      type: [Number, String, Array]
    },
    placeholder: {
      type: String
    },
    width: {
      type: Number,
      default: 200
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedPlaceholder () {
      return this.placeholder || this.$t('core.select.placeholder', { 0: this.$t(`app.application.${this.entityName}.${this.entityName}`) });
    }
  },
  watch: {
    value (value) {
      this.selectedValue = value;
    }
  },
  data () {
    return {
      api: null,
      entityName: null,
      items: [],
      selectedValue: null
    };
  },
  methods: {
    handleChange (value) {
      value = value || null;
      this.$emit('input', value);
      this.dispatch('FormItem', 'form.change', value);
    },
    getFetchParams() {
      return {};
    },
    fetchData () {
      this.api.getAll(this.getFetchParams()).then((result) => {
        this.items = result.items;
      });
    }
  },
  created () {
    this.selectedValue = this.value;
    this.fetchData();
  }
};
