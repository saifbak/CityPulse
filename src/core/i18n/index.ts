import { I18n } from 'i18n-js';
import { getLocales } from 'react-native-localize';
import { I18nManager } from 'react-native';

import en from './translations/en';
import ar from './translations/ar';

type Translations = {
  en: typeof en;
  ar: typeof ar;
};

// Get device language
const deviceLocales = getLocales();
const deviceLanguage = deviceLocales[0]?.languageCode || 'en';
const isRTL = deviceLanguage === 'ar';

// Create translations object
const translations: Translations = {
  en,
  ar,
};

// Initialize i18n instance
const i18n = new I18n(translations);

// Configure i18n settings
i18n.enableFallback = true;
i18n.defaultLocale = 'en';
i18n.locale = deviceLanguage;

// Configure RTL after i18n setup
I18nManager.allowRTL(true);
I18nManager.forceRTL(isRTL);

// Ensure translations are available
if (!Object.prototype.hasOwnProperty.call(translations, deviceLanguage)) {
  console.warn(`Translation not available for ${deviceLanguage}, falling back to English`);
  i18n.locale = 'en';
}

export default i18n;