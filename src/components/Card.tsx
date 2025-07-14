import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';
import { CardEvent } from '../core/utils/helper';
import { Icons } from '../assets';

interface Props {
  item: CardEvent;
  isFav: boolean;
  isRtl?: boolean;
  onFavouriteToggle: (id: string) => void;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function EventCard({
  item,
  isFav,
  onFavouriteToggle,
  onPress,
  style,
  isRtl,
}: Props) {
  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : null}

      <View style={[styles.content, { alignItems: isRtl ? 'flex-end' : 'flex-start' }]}>
        <View style={[styles.row, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>

          <Pressable
            hitSlop={10}
            onPress={() => onFavouriteToggle(item.id)}
            style={styles.star}
          >
            <Image resizeMode='contain' style={[styles.star, { width: vs(25), height: vs(15) }]} source={isFav ? Icons.fav : Icons.notFav} />
          </Pressable>
        </View>

        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: '12@s',
    marginBottom: '10@vs',
    borderRadius: '8@ms',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '110@s',
    height: '100@vs'
  },
  content:
  {
    flex: 1,
    padding: '12@s'
  },
  row:
  {
    justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    fontSize: '15@ms',

    fontWeight: '600',
    color: '#222'
  },
  star: {
    marginLeft: '6@s'
  },
  subtitle: {
    fontSize: '12@ms',
    color: '#666',
    marginTop: '4@vs'
  },
  date: {
    fontSize: '12@ms',
    color: '#FF6B00',
    marginTop: '6@vs'
  },
});
