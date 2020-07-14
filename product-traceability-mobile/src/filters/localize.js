import appConfig from './../config/app';
export default (value) => {
  if (!value) {
 return '';
}
  return window.abp.localization.localize(value, appConfig.localization.defaultLocalizationSourceName);
};
