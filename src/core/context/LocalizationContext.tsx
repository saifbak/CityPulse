import React, { createContext, useContext, useState } from 'react';
import { I18nManager } from 'react-native';
// import RNRestart from 'react-native-restart';

interface Ctx {
  language: 'en' | 'ar';
  setAppLanguage: (lang: 'en' | 'ar') => Promise<void>;
  translate: (key: string) => string;
}

const LocalizationContext = createContext<Ctx>(null!);
export const useLocalizationContext = () => useContext(LocalizationContext);

const translations: Record<string, Record<'en' | 'ar', string>> = {
  'profile.language': { en: 'Language', ar: 'اللغة' },
  'profile.profile': { en: 'My Profile', ar: 'ملفي الشخصي' },
  'profile.logout': { en: 'Sign Out', ar: 'تسجيل الخروج' },
  'home.favorites': { en: 'Favorite Events', ar: 'الفعاليات المفضلة' },
  'common.error': { en: 'Error', ar: 'خطأ' },
  'common.retry': { en: 'Please try again', ar: 'يرجى المحاولة مرة أخرى' },
  'common.cancel': { en: 'Cancel', ar: 'إلغاء' },
  'common.save': { en: 'Save', ar: 'حفظ' },
  'common.loading': { en: 'Loading...', ar: 'جاري التحميل...' },
  'common.search': { en: 'Search', ar: 'بحث' },
  'common.confirm': { en: 'Confirm', ar: 'تأكيد' },
  'common.welcome': { en: 'Welcome to CityPulse', ar: 'مرحباً بكم في CityPulse' },
  'common.favorites': { en: 'Favorites', ar: 'المفضلة' },
  'login.welcome': {
    en: 'Biometric auth failed, Try email + password instead.',
    ar: 'فشل التحقق البيومتري، جرِّب تسجيل الدخول بالبريد الإلكتروني وكلمة المرور بدلًا من ذلك.',
  },
  'login.login': { en: 'Login', ar: 'تسجيل الدخول' },
  'login.signup': { en: 'Sign Up', ar: 'إنشاء حساب' },
  'login.noAccount': { en: "Don't have an account? Sign Up", ar: 'ليس لديك حساب؟ أنشئ حساباً' },
  'login.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'login.password': { en: 'Password', ar: 'كلمة المرور' },
  'login.biometric': { en: 'Login with Biometric', ar: 'تسجيل الدخول بالبصمة' },
  'login.enableBiometric': { en: 'Use Biometric', ar: 'تفعيل تسجيل الدخول بالبصمة' },
  'login.biometricFailed': { en: 'Biometric authentication failed', ar: 'فشل التحقق بالبصمة' },
  'login.biometricNotAvailable': {
    en: 'Biometric authentication is not available on this device',
    ar: 'التحقق بالبصمة غير متوفر على هذا الجهاز'
  },
  'login.loginFailed': { en: 'Login failed', ar: 'فشل تسجيل الدخول' },
  'signup.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'signup.password': { en: 'Password', ar: 'كلمة المرور' },
  'signup.conpassword': { en: 'Confirm password', ar: 'تأكيد كلمة المرور' },
  'signup.create': { en: 'Create Account', ar: 'إنشاء حساب' },
  'signup.haveAnAccount': { en: 'Already have an account? Login', ar: 'هل لديك حساب بالفعل؟ تسجيل الدخول' },
  'signup.signup': { en: 'Sign Up', ar: 'إنشاء حساب' },
  'event.title': { en: 'Events', ar: 'الفعاليات' },
  'event.details': { en: 'Event Details', ar: 'تفاصيل الفعالية' },
  'event.buyTickets': { en: 'Buy Tickets', ar: 'شراء التذاكر' },
  'search.keyword': { en: 'Keyword', ar: 'كلمة مفتاحية' },
  'search.city': { en: 'City', ar: 'المدينة' },
};



export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const setAppLanguage = async (lang: 'en' | 'ar') => {
    setLanguage(lang);
    const rtl = lang === 'ar';
    if (I18nManager.isRTL !== rtl) {
      I18nManager.forceRTL(rtl);
      I18nManager.allowRTL(rtl);
      // RNRestart.restart();
    }
  };

  const translate = (key: string): string =>
    translations[key]?.[language] ?? key;

  return (
    <LocalizationContext.Provider
      value={{ language, setAppLanguage, translate }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
