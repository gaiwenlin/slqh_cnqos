import langs from './../langs';

export default (value) => {
  if (!value) {
    return '';
  }
  return langs.t(value);
};
