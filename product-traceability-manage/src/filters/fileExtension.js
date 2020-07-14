export default (value) => {
  const reg = /\.[^\.]+$/;
  const matches = reg.exec(value);
  if (matches) {
    return matches[0];
  }
  return '';
};
