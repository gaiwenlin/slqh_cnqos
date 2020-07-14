import store from '../../store';
import appConfig from '../../config/app';
const url = store.getters.baseUrl + '/file/upload';

export default {
  props: {
    actionUrl: {
      type: String
    },
    ratio: {
      type: Number
    },
    shouldBeRatio: {
      type: Number
    },
    maxFileSize: {
      type: Number
    },
    qiniuUrl: {
      type: String,
      default: 'http://qiniu.yax365.vip/'
    },
    useQiniuLocalUpload: {
      type: Boolean,
      default: appConfig.useQiniuLocalUpload
    },
    useQiniu: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      headers: {
        Authorization: `${store.getters['authorization/token']}`
      },
      uploadData: {
        token: ''
      },
      baseUrl: this.useQiniu ? this.qiniuUrl : this.$store.getters.baseUrl
    };
  },
  computed: {
    url () {
      return url;
    },
    computedUrl () {
      if (this.actionUrl) {
        return this.actionUrl;
      }
      return this.useQiniu && this.useQiniuLocalUpload ? 'http://upload.qiniup.com/' :  this.url;
    }
  },
  methods: {
    onSuccess(result)  {
    },
    resultParse (response) {
      return this.useQiniuLocalUpload ? this.baseUrl + response.key : response.data.filePath;
    },
  }
};
