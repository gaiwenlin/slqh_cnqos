import appConfig from '../config/app';

export default (value) => {
  if (!value) {
    return value;
  }
  if (value.includes('//') || value.includes('data:')) {
    return value;
  }
  return appConfig.resourceBaseUrl + value;
};
