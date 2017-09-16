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
        <View style={!props.disabled ? styles.btnContainer : styles.disabledBtn}>
          <TouchableOpacity
            style={styles.row}
            disabled={props.disabled}
            onPress={props.onFetch}
          >
            <Text style={styles.fetchBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={!props.disabled ? styles.btnContainer : styles.disabledBtn}>
          <TouchableNativeFeedback
            style={styles.fetchBtn}
            disabled={props.disabled}
            onPress={props.onFetch}
          >
            <View>
              <Text style={styles.fetchBtnText}>Add</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.row} onPress={props.onDepartPress}>
          <Icon
            style={styles.icon}
            name="ios-subway-outline"
            size={45}
            color="#3e4450"
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {props.departureStop !== "" ? (
                props.departureStop
              ) : (
                "Departure stop"
              )}
            </Text>
          </View>
        </TouchableOpacity>
        <Icon
          style={styles.smallIcon}
          name="ios-arrow-round-down"
          size={20}
          color="#3e4450"
        />
        <TouchableOpacity style={styles.row} onPress={props.onArrivPress}>
          <Icon
            style={styles.icon}
            name="ios-subway-outline"
            size={45}
            color="#3e4450"
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {props.arrivalStop !== "" ? props.arrivalStop : "Arrival stop"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

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
  container: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 4,
    padding: 20,
    backgroundColor: "#ffffff",
    marginTop: 80
  },
  btnContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: "#0dd3bb",
    padding: 10,
    marginTop: 40
  },
  disabledBtn: {
    display: "none"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    textAlign: "left",
    paddingLeft: (Platform.OS === 'ios') ? 10 : 30
  },
  smallIcon: {
    textAlign: "left",
    paddingLeft: (Platform.OS === 'ios') ? 0 : 10
  },
  fetchIcon: {
    textAlign: "center"
  },
  text: {
    fontSize: 14,
    color: "#3e4450",
    flex: 1,
    textAlign: "left"
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "rgba(62, 68, 80, 0.35)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    marginLeft: 40,
    marginRight: 10,
    paddingBottom: 5
  },
  fetchBtnText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    paddingLeft: 10
  }
});

export default NewJourneyButtons;
