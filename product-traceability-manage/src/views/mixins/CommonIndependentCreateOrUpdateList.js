import CommonList from './CommonList';

export default {
  mixins: [CommonList],
  data () {
    return {

    };
  },
  methods: {
    edit (item) {
      this.$router.push({ path: 'createOrUpdate', query: { id: item.id } });
    },
    create () {
      this.$router.push({ path: 'createOrUpdate' });
    },
  },
};
