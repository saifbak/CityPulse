import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormTextInput from '../FormTextInput';
import { BiometricSchema } from '../../core/schema/biometricValidation.schema';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (email: string, password: string) => Promise<void>;
}

const BiometricCredentialModal: React.FC<Props> = ({ visible, onClose, onSave }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.backdrop}>
      <View style={styles.sheet}>
        <Text style={styles.title}>Link credentials</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={BiometricSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await onSave(values.email, values.password);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <>
              <FormTextInput name="email" label="E-mail" keyboardType="email-address" />
              <FormTextInput name="password" label="Password" secure />
              <Button title="Save & Continue" onPress={handleSubmit as any} disabled={isSubmitting} />
            </>
          )}
        </Formik>
        <Button title="Cancel" onPress={onClose} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#0006', justifyContent: 'center', alignItems: 'center' },
  sheet: { width: '85%', padding: 20, borderRadius: 12, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
});

export default BiometricCredentialModal;
