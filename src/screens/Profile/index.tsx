import React from 'react';
import { View, Text, Image, Alert, ScrollView, I18nManager } from 'react-native';
import { Button } from 'react-native-paper';
import { ScaledSheet, } from 'react-native-size-matters';

import useAuth from '../../core/hooks/useAuth';
import { useFavourites } from '../../core/hooks/useFavorite';
import { useLocalizationContext } from '../../core/context/LocalizationContext';
import Header from '../../components/Header';
import LanguageSelector from '../../components/LanguageSelector';
import { Icons } from '../../assets';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();
    const { favIds } = useFavourites();
    const { translate } = useLocalizationContext();

    if (!user) {
        return (
            <View style={styles.center}>
                <Text>{translate('common.error')}</Text>
            </View>
        );
    }

    const { displayName, email, uid, photoURL } = user;

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Header title={translate('profile.profile')} />

                {photoURL ? (
                    <Image source={{ uri: photoURL }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.placeholder]}>
                        <Text style={styles.initial}>
                            {displayName?.charAt(0).toUpperCase() ?? email?.charAt(0)}
                        </Text>
                    </View>
                )}

                <Text style={styles.name}>{displayName ?? '—'}</Text>
                <Text style={styles.email}>{email}</Text>

                <View style={styles.favEvents} >
                    <Image source={Icons.fav} style={styles.iconStyle} />
                    <Text style={styles.favs}>
                        {translate('home.favorites')}: <Text style={styles.favCount}>{favIds.length}</Text>
                    </Text>
                </View>

                <Text style={styles.uid}>UID: {uid}</Text>

                <LanguageSelector />

                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() =>
                        Alert.alert(
                            translate('profile.logout'),
                            translate('common.confirm'),
                            [
                                { text: translate('common.cancel'), style: 'cancel' },
                                { text: translate('profile.logout'), style: 'destructive', onPress: signOut },
                            ]
                        )
                    }
                >
                    {translate('profile.logout')}
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = ScaledSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: '32@vs',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: '100@vs',
        height: '100@vs',
        borderRadius: '50@vs',
        marginTop: '32@vs'
    },
    placeholder: {
        backgroundColor: '#d1d1d6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    initial: {
        fontSize: '32@ms',
        color: '#fff',
        fontWeight: '600'
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginTop: 10,
        alignSelf: "center",
    },
    name: {
        fontSize: '20@ms',
        fontWeight: '600',
        marginTop: '12@vs',
        color: '#222'
    },
    email: {
        fontSize: '14@ms',
        color: '#666',
        marginTop: '4@vs'
    },
    favs: {
        fontSize: '14@ms',
        color: '#222',
        marginTop: '10@vs'
    },
    favCount: {
        fontWeight: '700',
        color: '#FF6B00'
    },
    uid: {
        fontSize: '12@ms',
        color: '#8e8e93',
        marginTop: '12@vs'
    },
    button: {
        marginTop: '24@vs',
        backgroundColor: '#FF6B00',
        width: '80%',
    },
    favEvents: {
        flex: 1,
        gap: '5@s',
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
        justifyContent: "center",
        alignItems: 'center'
    }
});
