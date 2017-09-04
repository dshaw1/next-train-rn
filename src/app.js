import { Navigation } from "react-native-navigation";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { registerScreens } from "./screens/index";
import rootReducer from "./reducers/rootReducer";
import { AddButton } from "./modules/global/components/NavigationButtons";

const store = createStore(rootReducer, applyMiddleware(thunk));

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: "app.Favourites",
    title: "Favourites"
  },
  appStyle: {
    orientation: "portrait",
    statusBarColor: "#0081ab",
    navBarTitleTextCentered: false,
    navBarTextColor: "#fff",
    navBarButtonColor: '#fff',
  }
});
