import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Platform,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

const CollapsibleTitle = props => {
  renderIcon = () => {
    if (Platform.OS === "ios") {
      return <Icon name="ios-arrow-down" size={30} color="#3e4450" />;
    } else {
      return <Icon name="md-return-right" size={34} color="#3e4450" />;
    }
  };

  const item = props.item;
  console.log(item.steps);
  // Render travel icons based on travel_mode
  checkTravelMode = item.steps.map((step, index) => {
    if (
      step.travel_mode === "TRANSIT" &&
      step.transit_details.line.vehicle.type === "HEAVY_RAIL"
    ) {
      return (
        <Icon
          key={index}
          name="ios-subway"
          size={22}
          color="#3e4450"
          style={{ marginLeft: 5 }}
        />
      );
    }
    if (
      step.travel_mode === "TRANSIT" &&
      step.transit_details.line.vehicle.type === "BUS"
    ) {
      return (
        <Icon
          key={index}
          name="ios-bus"
          size={22}
          color="#3e4450"
          style={{ marginLeft: 5 }}
        />
      );
    }
    if (step.travel_mode === "WALKING" && step.distance.value >= 500) {
      return (
        <Icon
          key={index}
          name="ios-walk"
          size={22}
          color="#3e4450"
          style={{ marginLeft: 5 }}
        />
      );
    }
    if (
      step.travel_mode === "TRANSIT" &&
      step.transit_details.line.vehicle.type === "TRAM"
    ) {
      return (
        <Icon
          key={index}
          name="ios-train"
          size={22}
          color="#3e4450"
          style={{ marginLeft: 5 }}
        />
      );
    }
  });

  return (
    <TouchableHighlight
      underlayColor={"rgba(0,0,0,0.2)"}
      style={styles.itemContainer}
      onPress={index => {
        props.toggleDetails(index);
      }}
    >
      <View style={styles.headerItem}>
        <View style={{ flexDirection: "row", height: 24 }}>
          <Text style={styles.timeText}>
            {item.departTime.text}
          </Text>
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.titleText}>
              {item.departStop}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", height: 24 }}>
          <Text style={styles.timeText}>
            {item.arrivTime.text}
          </Text>
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.titleText}>
              {item.arrivStop}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 10
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {checkTravelMode}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon name="ios-arrow-down" size={18} color="#3e4450" />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 4,
    height: 100,
    backgroundColor: "#ffffff"
  },
  headerItem: {
    padding: 10,
    flex: 1
  },
  titleText: {
    color: "#3e4450",
    fontWeight: "500",
    fontSize: 13
  },
  timeText: {
    color: "#3e4450",
    fontWeight: "100",
    fontSize: 13
  }
});

CollapsibleTitle.propTypes = {
  item: PropTypes.object.isRequired
};

export default CollapsibleTitle;
