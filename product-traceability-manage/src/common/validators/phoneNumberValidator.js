export default (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter your password'));
  }
  else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(value)) {
      callback();
    }
    else {
      return callback(new Error('请输入正确的手机号'));
    }
  }
};
