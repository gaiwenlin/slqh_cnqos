import Vue from 'vue';
import VueI18n from 'vue-i18n';
import canknowZhCN from 'canknow-ui/src/locale/lang/zh-CN';
import canknowEn from 'canknow-ui/src/locale/lang/en-US';
import zhCN from './zh-CN';
import enUS from './en-US';
import cookie from 'js-cookie';

export const messages = {
  'zh-Hans': Object.assign({}, canknowZhCN, zhCN),
  'en-US': Object.assign({}, canknowEn, enUS)
};

function getLanguage() {
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
  return 'zh-Hans';
}

Vue.use(VueI18n);

export const locale = getLanguage();

const i18n = new VueI18n({
  locale,
  messages
});

export default i18n;
