import appConfig from '../config/app';
const assist = {};

assist.createRandomBetween = function (min, max) {
  const range = max - min;
  const random = Math.random();
  return min + Math.floor(random * range);
};

assist.isWeiXin = function () {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i)) {
    return true;
  }
  else {
    return false;
  }
};

assist.getFullUrlByRoute = function (route) {
  return window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + route.fullPath;
};

assist.getInterfaceUrl = function () {
  return appConfig.baseUrl;
};

assist.getImageUrl = function (url) {
  if (!url) {
    return url;
  }
  let imageUrl = url;
  if (!imageUrl.includes('//')) {
    imageUrl = assist.getInterfaceUrl() + url;
  }
  return imageUrl;
};

assist.setPageTitle = function (title) {
  document.title = title;
};

assist.getQueryVariable = function (name) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === name) {
      return pair[1];
    }
  }
  return false;
};

assist.checkPhoneNumber = function (value) {
  const pattern = /^1[345678]\d{9}$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
};

assist.checkIdNumber = function (idNumber) {
  // 加权因子
  const weightFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  const checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  const code = idNumber + '';
  const last = idNumber[17]; // 最后一位

  const seventeen = code.substring(0, 17);

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  const arr = seventeen.split('');
  const len = arr.length;
  let num = 0;
  for (let i = 0; i < len; i++) {
    num = num + arr[i] * weightFactor[i];
  }

  // 获取余数
  const resisue = num % 11;
  const lastNo = checkCode[resisue];

  // 格式的正则
  // 正则思路
  /*
  第一位不可能是0
  第二位到第六位可以是0-9
  第七位到第十位是年份，所以七八位为19或者20
  十一位和十二位是月份，这两位是01-12之间的数值
  十三位和十四位是日期，是从01-31之间的数值
  十五，十六，十七都是数字0-9
  十八位可能是数字0-9，也可能是X
  */
  const pattern = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

  // 判断格式是否正确
  const format = pattern.test(idNumber);

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return !!(last === lastNo && format);
};

export default assist;
