import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { moderateScale } from "../../global/helpers/scalingHelper";

const RenderRowComponent = props => {
  renderRemoveIcon = () => {
    if (Platform.OS === "ios") {
      return renderGenericIcon(
        "ios-remove-circle",
        moderateScale(20, 0.25),
        "#bd081d"
      );
    } else {
      return renderGenericIcon(
        "md-remove-circle",
        moderateScale(24, 0.25),
        "#bd081d"
      );
    }
  };

  renderReorderIcon = () => {
    if (Platform.OS === "ios") {
      return renderGenericIcon(
        "ios-reorder-outline",
        moderateScale(30, 0.25),
        "#3e4450"
      );
    } else {
      return renderGenericIcon(
        "md-reorder",
        moderateScale(30, 0.25),
        "#3e4450"
      );
    }
  };

  renderGenericIcon = (name, size, colour) => {
    return (
      <View>
        <Icon style={styles.icon} name={name} size={size} color={colour} />
      </View>
    );
  };

  const { departStop, arrivStop, id } = props.data;

  if (props) {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.headerItem}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() => props.removeJourney(id)}
            >
              {renderRemoveIcon()}
            </TouchableOpacity>
            <View>
              <Text style={styles.titleText}>
                {props.data ? departStop : null}
              </Text>
              <View style={styles.row}>
                <Text style={styles.smallText}>to </Text>
                <Text style={styles.titleText}>
                  {props.data ? arrivStop : null}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.sortButton} {...props.sortHandlers}>
          {renderReorderIcon()}
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: Platform.OS === "ios" ? 4 : 2,
    flexDirection: "row",
    alignItems: "center"
  },
  headerItem: {
    flex: 1
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  titleText: {
    color: "#3e4450",
    fontWeight: "500",
    fontSize: moderateScale(11.5, 0.5)
  },
  smallText: {
    color: "#3e4450",
    fontWeight: "400",
    fontSize: moderateScale(10, 0.5)
  },
  removeIcon: {
    width: 35
  },
  flexRow: {
    flexDirection: "row"
  },
  sortButton: {
    width: 70,
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  icon: {
    flex: 0
  }
});

RenderRowComponent.propTypes = {
  removeJourney: PropTypes.func.isRequired,
  sortHandlers: PropTypes.object,
  data: PropTypes.object.isRequired
};

export default RenderRowComponent;
