import { NetInfo } from "react-native";

export default (checkNetworkConnection  = dispatchFunction => {
  NetInfo.isConnected.fetch().then(isConnected => {});
  handleFirstConnectivityChange = (isConnected) => {
    dispatchFunction(!isConnected);
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      handleFirstConnectivityChange
    );
  }
  NetInfo.isConnected.addEventListener("connectionChange", handleFirstConnectivityChange);
});
