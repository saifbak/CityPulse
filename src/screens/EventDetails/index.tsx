import React from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, Linking, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'react-native-paper';
import { HomeStackParamList } from '../../core/types/navigation.types';
import { fetchEventById, TMEvent } from '../../core/services/api';
import Header from '../../components/Header';
import { useLocalizationContext } from '../../core/context/LocalizationContext';

type Route = RouteProp<HomeStackParamList, 'EventDetail'>;

export default function EventDetailScreen() {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const { translate, language } = useLocalizationContext()
  const { id } = params;
  const isRtl = language === 'ar'
  const { data: event, isLoading, error } = useQuery<TMEvent, Error>({
    queryKey: ['event', id],
    queryFn: () => fetchEventById(id),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;

  if (error || !event)
    return (
      <View style={styles.center}>
        <Text>Error loading event.</Text>
      </View>
    );

  const hero =
    event.images?.find((i: { ratio: string; width: number; }) => i.ratio === '16_9' && i.width >= 1024)?.url ||
    event.images?.[0]?.url;

  const venue = event._embedded?.venues?.[0];
  const date =
    new Date(event.dates.start.dateTime || `${event.dates.start.localDate}T${event.dates.start.localTime ?? '00:00'}`)
      .toLocaleString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });

  return (
    <>
      <Header title={translate('event.details')} onBack={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        {hero && <Image source={{ uri: hero }} style={styles.hero} />}
        <View style={[styles.content,]}>
          <View style={[isRtl && { alignItems: 'flex-end', }]}>

            <Text style={[styles.title, isRtl && { textAlign: 'right', }]}>{event.name}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.venue}>{venue?.name}</Text>
            <Text style={styles.city}>{venue?.city?.name}</Text>
          </View>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              if (event.url) Linking.openURL(event.url).catch(() => Alert.alert('Could not open link'));
            }}
          >
            {translate('event.buyTickets')}
          </Button>

          {venue?.location?.latitude && venue?.location?.longitude && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(venue.location.latitude),
                longitude: parseFloat(venue.location.longitude),
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(venue.location.latitude),
                  longitude: parseFloat(venue.location.longitude),
                }}
                title={venue.name}
                description={venue.city?.name}
              />
            </MapView>
          )}

          {event.info ? (
            <View style={{ alignItems: isRtl ? 'flex-end' : 'flex-start', }}>
              <Text style={styles.sectionTitle}>Info</Text>
              <Text style={[styles.paragraph, isRtl && { textAlign: 'right' }]}>{event.info}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </>

  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  hero: {
    width: '100%',
    height: '200@vs'
  },
  content: {
    padding: '16@s'
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '700',
    color: '#222'
  },
  date: {
    fontSize: '14@ms',
    color: '#FF6B00',
    marginTop: '4@vs'
  },
  venue: {
    fontSize: '14@ms',
    color: '#444',
    marginTop: '4@vs'
  },
  city: {
    fontSize: '12@ms',
    color: '#666',
    marginTop: '2@vs'
  },
  button: {
    marginTop: '16@vs',
    backgroundColor: '#FF6B00'
  },
  map: {
    width: '100%', height: '180@vs', borderRadius: '8@ms', marginTop: '16@vs'
  },
  sectionTitle: {
    fontSize: '16@ms', fontWeight: '600',
    marginTop: '16@vs'
  },
  paragraph: {
    fontSize: '13@ms', color: '#444',
    marginTop: '6@vs'
  },
  center: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center'
  },
});
