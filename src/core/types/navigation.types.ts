import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Login: undefined;
  Signup: undefined;
};

export type BottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Profile: undefined;
  Favourites: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  EventDetail: { id: string | any };
  EventProfile: { id: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type HomeTopTabParamList = {
  ListView: undefined;
  MapView: undefined;
};
