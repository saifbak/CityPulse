import React, { FC } from 'react';
import { View, Button, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { ScaledSheet } from 'react-native-size-matters';

import useAuth from '../../core/hooks/useAuth';
import { SignUpSchema } from '../../core/schema/signupValidation.schema';
import { RootStackParamList } from '../../navigation/RootNavigator';
import FormTextInput from '../../components/FormTextInput';
import { useLocalizationContext } from '../../core/context/LocalizationContext';
import { Icons } from '../../assets';

export const SignUpScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signUp } = useAuth();
  const { translate, language } = useLocalizationContext();
  const isRtl = language === 'ar' ? true : false;
  return (
    <View style={styles.container}>
      <Image source={Icons.logo} style={styles.logo} />
      <Text style={styles.header}>{translate('signup.create')}</Text>

      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', general: '' }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await signUp(values.email, values.password);
          } catch (e: any) {
            setFieldError('general', e?.message ?? 'Sign-up failed');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <>
            {errors.general && <Text style={styles.error}>{errors.general}</Text>}

            <FormTextInput
              isRtl={isRtl}
              name="email"
              label={translate('signup.email')}
              placeholder={translate('signup.email')}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <FormTextInput
              isRtl={isRtl}
              name="password"
              label={translate('signup.password')}
              placeholder={translate('signup.password')}
              secure
            />

            <FormTextInput
              isRtl={isRtl}
              name="confirmPassword"
              label={translate('signup.conpassword')}
              placeholder={translate('signup.conpassword')}
              secure
            />

            <Button title={translate('signup.signup')} onPress={handleSubmit as any} disabled={isSubmitting} />

            <TouchableOpacity style={styles.linkWrapper} onPress={() => navigation.goBack()}>
              <Text style={styles.link}>{translate('signup.haveAnAccount')}</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '20@s',
    justifyContent: 'center'
  },
  logo: {
    width: '150@s',
    height: '150@s',
    marginBottom: '20@vs',
    alignSelf: 'center'
  },
  header: {
    fontSize: '28@ms',
    fontWeight: 'bold',
    marginBottom: '20@vs',
    textAlign: 'center'
  },
  linkWrapper: {
    marginTop: '16@vs'
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: '14@ms'
  },
  error: {
    color: 'red',
    marginBottom: '6@vs',
    textAlign: 'left',
    fontSize: '12@ms'
  },
});

export default SignUpScreen;
