import React from 'react';
import { Image, ImageStyle } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FavouriteScreen from '../screens/Favorite';
import ProfileScreen from '../screens/Profile';
import { BottomTabParamList } from '../core/types/navigation.types';
import { Icons } from '../assets';
import { vs } from 'react-native-size-matters';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size }) => {
          let source: number;
          switch (route.name) {
            case 'Home':
              source = Icons.home;
              break;
            case 'Favourites':
              source = Icons.favorite;
              break;
            case 'Profile':
              source = Icons.profile;
              break;
            default:
              source = Icons.home;
          }

          const style: ImageStyle = {
            width: size,
            height: size,
            tintColor: focused ? '#FF6B00' : '#8e8e93',
            marginTop: vs(10),
          };
          return <Image source={source} style={style} resizeMode="contain" />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
