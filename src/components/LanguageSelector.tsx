import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalizationContext } from '../core/context/LocalizationContext';

const LanguageSelector = () => {
  const { language, setAppLanguage, translate } = useLocalizationContext();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  const handleLanguageChange = async (code: 'en' | 'ar') => {
    if (code === language || isLoading) return;
    try {
      setIsLoading(code);
      await setAppLanguage(code);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate('profile.language')}</Text>
      <View style={styles.buttonContainer}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              language === lang.code && styles.activeButton,
              isLoading === lang.code && styles.loadingButton,
            ]}
            onPress={() => handleLanguageChange(lang.code as 'en' | 'ar')}
            disabled={!!isLoading}
          >
            {isLoading === lang.code ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  language === lang.code && styles.activeText,
                ]}
              >
                {lang.label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 100,
    alignItems: 'center',
  },
  activeButton: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  loadingButton: { backgroundColor: '#66A5FF', borderColor: '#66A5FF' },
  buttonText: { fontSize: 14, color: '#333' },
  activeText: { color: '#fff' },
});

export default LanguageSelector;
