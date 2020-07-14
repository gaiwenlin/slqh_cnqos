const appConfig = {
  name: 'system manage template',
  logo: '',
  version: '1.0',
  baseUrl: process.env.VUE_APP_API_BASE_URL,
  useQiniuLocalUpload: false,
  get domain () {
    return window.location.protocol + '//' + window.location.host;
  },
  superAdmin: process.env.VUE_APP_SUPERADMIN,
  qiniu: {
  }
};
export default appConfig;
