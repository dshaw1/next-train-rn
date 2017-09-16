import { Navigation } from "react-native-navigation";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { registerScreens } from "./screens/index";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: "app.Favourites",
    title: "Favourites"
  },
  appStyle: {
    orientation: "portrait",
    statusBarColor: "#0ca794",
    navBarTitleTextCentered: false,
    navBarTextColor: "#fff",
    navBarButtonColor: '#fff',
  }
});
