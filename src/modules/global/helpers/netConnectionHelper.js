import { NetInfo } from "react-native";

export default (checkNetworkConnection  = dispatchFunction => {
  NetInfo.isConnected.fetch().then(isConnected => {});
  handleFirstConnectivityChange = (isConnected) => {
    dispatchFunction(!isConnected);
    NetInfo.isConnected.removeEventListener(
      "change",
      handleFirstConnectivityChange
    );
  }
  NetInfo.isConnected.addEventListener("change", handleFirstConnectivityChange);
});
