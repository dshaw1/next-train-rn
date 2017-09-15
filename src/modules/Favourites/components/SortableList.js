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

export default class RenderRowComponent extends Component {
  renderRemoveIcon = () => {
    if (Platform.OS === "ios") {
      return (
        <View>
          <Icon
            style={{ flex: 0 }}
            name="ios-remove-circle"
            size={24}
            color="red"
          />
        </View>
      );
    } else {
      return (
        <View>
          <Icon
            style={{ flex: 0 }}
            name="md-remove-circle"
            size={24}
            color="red"
          />
        </View>
      );
    }
  };

  renderReorderIcon = () => {
    if (Platform.OS === "ios") {
      return (
        <View>
          <Icon
            style={{ flex: 0 }}
            name="ios-reorder-outline"
            size={32}
            color="#3e4450"
          />
        </View>
      );
    } else {
      return (
        <View>
          <Icon
            style={{ flex: 0 }}
            name="md-reorder"
            size={32}
            color="#3e445"
          />
        </View>
      );
    }
  };

  render() {
    const { departStop, arrivStop, id } = this.props.data;
    if (this.props) {
      return (
        <View style={styles.itemContainer}>
          <View style={styles.headerItem}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => this.props.removeJourney(id)}
              >
                {this.renderRemoveIcon()}
              </TouchableOpacity>
              <View>
                <Text style={styles.titleText}>
                  {this.props.data ? departStop : null}
                </Text>
                <View style={styles.row}>
                <Text style={styles.smallText}>to </Text>
                <Text style={styles.titleText}>
                  {this.props.data ? arrivStop : null}
                </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.sortButton} {...this.props.sortHandlers}>
            {this.renderReorderIcon()}
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,

    borderRadius: 4,
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    color: "#3e4450",
    fontWeight: "500",
    fontSize: 13
  },
  smallText: {
    color: "#3e4450",
    fontWeight: "400",
    fontSize: 11
  },
  removeIcon: {
    width: 50
  },
  flexRow: {
    flexDirection: "row"
  },
  sortButton: {
    width: 70,
    justifyContent: "flex-end",
    flexDirection: "row"
  }
});

RenderRowComponent.propTypes = {
  removeJourney: PropTypes.func.isRequired,
  sortHandlers: PropTypes.object,
  data: PropTypes.object.isRequired
};
