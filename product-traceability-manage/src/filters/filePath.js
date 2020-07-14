import store from './../store';

export default (value) => {
  if (!value || value.indexOf('//') > -1) {
    return value;
  }
  if (!value.startsWith('/')) {
    value = '/' + value;
  }
  return store.getters.baseUrl + value;
};
