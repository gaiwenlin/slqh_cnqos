import CommonList from './CommonList';

export default {
  mixins: [CommonList],
  data () {
    return {
      dialogCreateOrEdit: {
        isShow: false,
        id: void 0
      }
    };
  },
  methods: {
    handleOnSave () {
      this.getAll();
    },
    create () {
      this.dialogCreateOrEdit.id = null;
      this.dialogCreateOrEdit.isShow = true;
    },
    edit (item) {
      this.dialogCreateOrEdit.id = item.id;
      this.dialogCreateOrEdit.isShow = true;
    }
  }
};
