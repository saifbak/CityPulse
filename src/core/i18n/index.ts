import { I18n } from 'i18n-js';
import { getLocales } from 'react-native-localize';
import { I18nManager } from 'react-native';

import en from './translations/en';
import ar from './translations/ar';

type Translations = {
  en: typeof en;
  ar: typeof ar;
};


const deviceLocales = getLocales();
const deviceLanguage = deviceLocales[0]?.languageCode || 'en';
const isRTL = deviceLanguage === 'ar';

const translations: Translations = {
  en,
  ar,
};

const i18n = new I18n(translations);


i18n.enableFallback = true;
i18n.defaultLocale = 'en';
i18n.locale = deviceLanguage;


I18nManager.allowRTL(true);
I18nManager.forceRTL(isRTL);


if (!Object.prototype.hasOwnProperty.call(translations, deviceLanguage)) {
  console.warn(`Translation not available for ${deviceLanguage}, falling back to English`);
  i18n.locale = 'en';
}

export default i18n;