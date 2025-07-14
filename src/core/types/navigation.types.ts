export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Login: undefined;
  Signup: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Favourites: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  EventDetail: { id: string };
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
