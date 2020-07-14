import Vue from 'vue';
import VueI18n from 'vue-i18n';
import cookie from 'js-cookie';
import zhCN from './zh-CN';
import enUS from './en-US';

export const messages = {
  'zh-CN': Object.assign({}, zhCN),
  'en-US': Object.assign({}, enUS)
};

function getLanguage () {
  const chooseLanguage = cookie.get('Abp.Localization.CultureName');
  if (chooseLanguage) {
    return chooseLanguage;
  }

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'zh-CN';
}

Vue.use(VueI18n);

export const locale = getLanguage();

const i18n = new VueI18n({
  locale,
  messages
});
export default i18n;
