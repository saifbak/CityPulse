import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import { debounce } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core';
import { ScaledSheet } from 'react-native-size-matters';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import EventCard from '../../components/Card';
import { useInfiniteEvents } from '../../core/hooks/useInfiniteEvents';
import { HomeStackParamList } from '../../core/types/navigation.types';
import { toCardEvent } from '../../core/utils/helper';
import { useFavourites } from '../../core/hooks/useFavorite';
import { useLocalizationContext } from '../../core/context/LocalizationContext';


export default function EventsListScreen() {
  const nav = useNavigation<NavigationProp<HomeStackParamList>>();
  const [filters, setFilters] = useState({ keyword: '', city: '' });
  const { translate, language } = useLocalizationContext()

  const debounced = useMemo(
    () => ({
      keyword: debounce((t: string) => setFilters(p => ({ ...p, keyword: t })), 300),
      city: debounce((t: string) => setFilters(p => ({ ...p, city: t })), 300),
    }),
    []
  );

  const { keyword, city } = filters;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteEvents(keyword.trim(), city.trim());

  const { favIds, toggleFav } = useFavourites();

  const events =
    data?.pages
      .flatMap(p => p.events)
      .filter(
        ev =>
          !city ||
          ev._embedded?.venues?.[0]?.city?.name
            .toLowerCase()
            .includes(city.toLowerCase())
      )
      .map(toCardEvent) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  return (
    <View style={styles.container}>
      <Header title={translate('event.title')} />

      <SearchBar
        placeholder={translate('search.keyword')}
        onChangeText={debounced.keyword}
        style={[styles.search, { textAlign: language === "ar" ? 'right' : "left" }]}
      />
      <SearchBar
        placeholder={translate('search.city')}
        onChangeText={debounced.city}
        style={[styles.search, { textAlign: language === "ar" ? 'right' : "left" }]}
      />

      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={e => e.id}
          renderItem={({ item }) => (
            <EventCard
              style={{ flexDirection: language == "ar" ? "row-reverse" : 'row' }}
              item={item}
              isFav={favIds.includes(item.id)}
              onFavouriteToggle={toggleFav}
              isRtl={language === 'ar'}
              onPress={() => nav.navigate('EventDetail', { id: item.id })}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{ marginVertical: 12 }} />
            ) : null
          }
          refreshing={isLoading}
          ListEmptyComponent={
            <Text style={styles.empty}>No events found.</Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  search: {
    marginTop: '10@vs',
    marginBottom: '6@vs',
    marginStart: '12@s',
    marginEnd: '12@s',
  },

  empty: {
    textAlign: 'center',
    marginTop: '40@vs',
    fontSize: '14@ms',
    color: '#777',
  },
});
