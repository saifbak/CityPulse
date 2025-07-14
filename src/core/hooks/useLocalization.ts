import { useCallback } from 'react';
import { I18nManager, DevSettings } from 'react-native';
import RNRestart from 'react-native-restart';
import i18n from '../i18n';

export const useLocalization = () => {
  const changeLanguage = useCallback(async (language: string) => {
    if (!language) {
      throw new Error('Language code is required');
    }

    const currentLanguage = i18n.locale;
    const currentRTL = I18nManager.isRTL;
    const newRTL = language === 'ar';

    try {
      i18n.locale = language;

      if (newRTL !== currentRTL) {
        I18nManager.allowRTL(newRTL);
        I18nManager.forceRTL(newRTL);
        setTimeout(() => {
          if (__DEV__) {
            DevSettings.reload();
          } else {
            RNRestart.Restart();
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error changing language:', error);
      i18n.locale = currentLanguage;
      if (newRTL !== currentRTL) {
        I18nManager.allowRTL(currentRTL);
        I18nManager.forceRTL(currentRTL);
      }
      throw error;
    }
  }, []);

  const translate = useCallback((key: string, params?: object) => {
    if (!key) return '';
    
    try {
      return i18n.t(key, params) || key;
    } catch (error) {
      console.error('Translation error:', error);
      return key; 
    }
  }, []);

  return {
    changeLanguage,
    translate,
    isRTL: I18nManager.isRTL,
    currentLocale: i18n.locale,
  };
};