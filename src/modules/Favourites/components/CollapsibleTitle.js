import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

const CollapsibleTitle = props => {
  renderDownIcon = () => {
    if (Platform.OS === "ios") {
      return <Icon name="ios-arrow-down" size={18} color="#3e4450" />;
    } else {
      return <Icon name="md-arrow-dropdown" size={18} color="#3e4450" />;
    }
  };

  renderUpIcon = () => {
    if (Platform.OS === "ios") {
      return <Icon name="ios-arrow-up" size={18} color="#3e4450" />;
    } else {
      return <Icon name="md-arrow-dropup" size={18} color="#3e4450" />;
    }
  };

  const item = props.item;
  // Render travel icons based on travel_mode
  checkTravelMode = item.steps.map((step, index) => {
    if (
      step.travel_mode === "TRANSIT" &&
      step.transit_details.line.vehicle.type === "HEAVY_RAIL"
    ) {
      return (
        <Icon
          key={index}
          name="ios-subway-outline"
          size={22}
          color="#00a4d8"
          style={styles.iconStyle}
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
          name="ios-bus-outline"
          size={22}
          color="#fc9a1f"
          style={styles.iconStyle}
        />
      );
    }
    if (step.travel_mode === "WALKING" && step.distance.value >= 500) {
      return (
        <Icon
          key={index}
          name="ios-walk-outline"
          size={22}
          color="#3e4450"
          style={styles.iconStyle}
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
          name="ios-train-outline"
          size={22}
          color="#73bd48"
          style={styles.iconStyle}
        />
      );
    }
  });

  return (
    <View>
    <TouchableOpacity
      activeOpacity={1}
      style={!props.collapse ? styles.selectedItemContainer : styles.itemContainer}
      onPress={index => {
        props.toggleDetails(index);
      }}
    >
      <View style={styles.headerItem}>
        <View style={styles.headerRow}>
          <Text style={styles.timeText}>
            {item.departTime.text}
          </Text>
          <View>
            <Text style={styles.titleText}>
              {item.departStop}
            </Text>
          </View>
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.timeText}>
            {item.arrivTime.text}
          </Text>
          <View>
            <Text style={styles.titleText}>
              {item.arrivStop}
            </Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.flexRow}>
            {checkTravelMode}
          </View>
          <View style={styles.flexRow}>
            {!props.collapse ? renderUpIcon() : renderDownIcon()}
          </View>
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 4,
    height: 110,
    backgroundColor: "#ffffff"
  },
  selectedItemContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: 110,
    backgroundColor: "#ffffff"
  },
  headerItem: {
    padding: 15,
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
    fontSize: 13,
    width: 60,
    marginRight: 5
  },
  iconStyle: {
    marginRight: 5
  },
  flexRow: {
    flexDirection: 'row'
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 10
  },
  headerRow: {
    flexDirection: "row",
    height: 24
  }
});

CollapsibleTitle.propTypes = {
  item: PropTypes.object.isRequired
};

export default CollapsibleTitle;
