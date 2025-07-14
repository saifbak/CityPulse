import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Icons } from '../../assets';

const SplashScreen: FC = () => (
    <View style={styles.container}>
        <Image source={Icons.logo} style={styles.logo} />
    </View>
);

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    logo: {
        width: '150@s',
        height: '150@s',
        marginBottom: '20@vs',
    },

    title: {
        fontSize: '24@ms',
        fontWeight: 'bold',
    },
});

export default SplashScreen;
