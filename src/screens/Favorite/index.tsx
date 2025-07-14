import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/Header';
import EventCard from '../../components/Card';
import { ScaledSheet } from 'react-native-size-matters';
import { useFavourites } from '../../core/hooks/useFavorite';
import { toCardEvent } from '../../core/utils/helper';
import { fetchEventsByIds } from '../../core/services/api';
import { useLocalizationContext } from '../../core/context/LocalizationContext';

export default function FavouriteScreen() {
    const { favIds, toggleFav } = useFavourites();

    const { data = [], isLoading } = useQuery({
        queryKey: ['favDetails', favIds],
        queryFn: () => fetchEventsByIds(favIds),
        enabled: favIds.length > 0,
    });

    const events = data.map(toCardEvent);
    const { translate, language } = useLocalizationContext()
    const isRtl = language === "ar"
    return (
        <View style={styles.container}>
            <Header title={translate('common.favorites')} />
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={events}
                    keyExtractor={e => e.id}
                    renderItem={({ item }) => (
                        <EventCard
                            isFav={favIds.includes(item.id)}
                            onFavouriteToggle={toggleFav}
                            item={item}
                            isRtl={isRtl}
                            onPress={() => toggleFav(item.id)}
                            style={[styles.card, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}
                        />
                    )}
                    ListEmptyComponent={<Text style={styles.empty}>No favourites yet.</Text>}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
}

const styles = ScaledSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    card: { marginTop: '8@vs' },
    empty: {
        textAlign: 'center',
        marginTop: '40@vs',
        fontSize: '14@ms',
        color: '#777',
    },
});
