import { NetInfo } from "react-native";

export default (checkNetworkConnection  = dispatchFunction => {
  NetInfo.isConnected.fetch().then(isConnected => {});
  function handleFirstConnectivityChange(isConnected) {
    NetInfo.isConnected.removeEventListener(
      "change",
      handleFirstConnectivityChange
    );
    dispatchFunction(!isConnected);
  }
  NetInfo.isConnected.addEventListener("change", handleFirstConnectivityChange);
});
