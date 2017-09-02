import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Button,
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const NewJourneyButtons = props => {
  renderAddButton = () => {
    if (Platform.OS === "ios") {
      return (
        <Button
          title="Add Journey"
          style={styles.fetchBtn}
          disabled={props.disabled}
          onPress={props.onFetch}
        />
      );
    } else {
      return (
        <TouchableNativeFeedback
          style={styles.fetchBtn}
          disabled={props.disabled}
          onPress={props.onFetch}
        >
          <View>
            <Text style={styles.fetchBtnText}>Add Journey</Text>
          </View>
        </TouchableNativeFeedback>
      );
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={props.onDepartPress}>
        <View style={styles.row}>
          <Icon name="ios-subway-outline" size={22} color="#fff" />
          <Text style={styles.text}>
            {props.departureStop !== "" ? props.departureStop : "Departure"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.onArrivPress}>
        <View style={styles.row}>
          <Icon name="ios-subway-outline" size={22} color="#fff" />
          <Text style={styles.text}>
            {props.arrivalStop !== "" ? props.arrivalStop : "Arrival"}
          </Text>
        </View>
      </TouchableOpacity>

      {this.renderAddButton()}
    </View>
  );
};

NewJourneyButtons.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  onFetch: PropTypes.func,
  onDepartPress: PropTypes.func,
  onArrivPress: PropTypes.func,
  departureStop: PropTypes.string,
  arrivalStop: PropTypes.string
};

const styles = StyleSheet.create({
  row: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.054)"
  },
  text: {
    fontSize: 16,
    color: "#ffffff"
  },
  fetchBtn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    color: "#ffffff"
  }
});

export default NewJourneyButtons;
