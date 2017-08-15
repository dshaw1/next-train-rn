import { Navigation } from 'react-native-navigation';

import Favourites from './Favourites';
import NewJourney from './NewJourney';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.Favourites', () => Favourites, store, Provider);
  Navigation.registerComponent('app.NewJourney', () => NewJourney, store, Provider);
}