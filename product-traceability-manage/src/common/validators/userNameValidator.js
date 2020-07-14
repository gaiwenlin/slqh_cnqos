export default (rule, value, callback) => {
  const pattern = /^[a-zA-Z0-9_]{1,}$/;
  if (!value.match(pattern)) {
    callback(new Error('用户名只能由字母数字下划线组成'));
  }
  else {
    callback();
  }
};
