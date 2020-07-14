export default (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter your password'));
  }
  else {
    callback();
  }
};
