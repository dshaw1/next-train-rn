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
      <View style={styles.container}>
        <TouchableOpacity style={styles.row} onPress={props.onDepartPress}>
          <Icon
            style={styles.icon}
            name="ios-subway-outline"
            size={34}
            color="#fff"
          />
          <Text style={styles.text}>
            {props.departureStop !== "" ? props.departureStop : "Departure"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.row} onPress={props.onArrivPress}>
          <Icon
            style={styles.icon}
            name="ios-subway-outline"
            size={34}
            color="#fff"
          />
          <Text style={styles.text}>
            {props.arrivalStop !== "" ? props.arrivalStop : "Arrival"}
          </Text>
        </TouchableOpacity>
        {props.departureStop && props.arrivalStop ? (
          this.renderAddButton()
        ) : null}
      </View>
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
    height: 40
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 4,
    borderColor: "#fff",
    borderStyle: "solid",
    borderRadius: 14
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    textAlign: "center"
  },
  text: {
    fontSize: 18,
    color: "#ffffff"
  },
  fetchBtn: {
    alignItems: "center",
    marginTop: 50,
    color: "#ffffff"
  }
});

export default NewJourneyButtons;
