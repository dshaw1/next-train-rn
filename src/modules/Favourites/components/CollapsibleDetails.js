import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { moderateScale } from "../../global/helpers/scalingHelper";

export default class CollapsibleDetails extends PureComponent {
  constructor(props) {
    super(props);
  }

  //
  //////////////////////// CLEAN UP THIS ////////////////////////
  //
  // Render each journey leg as bus or train method of transport
  renderListContent = item => {
    const journeyArr = [];

    item.steps.map((stop, index) => {
      if (stop.travel_mode !== "WALKING") {
        const departStop = stop.transit_details.departure_stop;
        const departTime = stop.transit_details.departure_time.text;
        const arrivStop = stop.transit_details.arrival_stop;
        const arrivTime = stop.transit_details.arrival_time.text;
        const shortName = stop.transit_details.line.short_name;

        if (stop.transit_details.line.vehicle.type === "HEAVY_RAIL") {
          journeyArr.push(
            <View key={index} style={styles.detailItem}>
              <Icon
                name="ios-subway-outline"
                style={styles.icon}
                size={moderateScale(20, 0.2)}
                color="#0071cd"
              />
              <Text
                style={styles.contentText}
              >{`Train departs ${departStop} at ${departTime} and arrives ${arrivStop} at ${arrivTime}`}</Text>
            </View>
          );
        }
        if (stop.transit_details.line.vehicle.type === "BUS") {
          journeyArr.push(
            <View key={index} style={styles.detailItem}>
              <Icon
                name="ios-bus-outline"
                style={styles.icon}
                size={moderateScale(20, 0.2)}
                color="#fc9a1f"
              />
              <Text
                style={styles.contentText}
                key={index}
              >{`${shortName} Bus departs ${departStop} at ${departTime} and arrives ${arrivStop} at ${arrivTime}`}</Text>
            </View>
          );
        }
        if (stop.transit_details.line.vehicle.type === "TRAM") {
          journeyArr.push(
            <View key={index} style={styles.detailItem}>
              <Icon
                name="ios-train-outline"
                style={styles.icon}
                size={moderateScale(20, 0.2)}
                color="#73bd48"
              />
              <Text
                style={styles.contentText}
                key={index}
              >{`${shortName} Tram departs ${departStop} at ${departTime} and arrives ${arrivStop} at ${arrivTime}`}</Text>
            </View>
          );
        }
      } else if (stop.travel_mode === "WALKING" && stop.distance.value >= 500) {
        journeyArr.push(
          <View key={index} style={styles.detailItem}>
            <Icon
              name="ios-walk-outline"
              style={styles.icon}
              size={moderateScale(20, 0.2)}
              color="#3e4450"
            />
            <Text style={styles.contentText} key={index}>{`${
              stop.html_instructions
            } - ${stop.distance.text}`}</Text>
          </View>
        );
      }
    });
    return journeyArr;
  };

  render() {
    // Remove details view if collapsed and Platform === iOS
    if (Platform.OS !== "android" && this.props.collapse) {
      return null;
    } else {
      return (
        <View style={this.props.collapse ? styles.hide : styles.show}>
          <View onPress={() => this.props.animateOpacity()}>
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
            </View>
            <View style={styles.detailsContainer}>
              {this.renderListContent(this.props.content)}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.nextThreeContainer}
              onPress={() => this.props.showModal()}
            >
              <Icon
                name="ios-eye-outline"
                size={moderateScale(20, 0.2)}
                color="#fff"
              />
              <Text style={styles.nextThreeText}>View Later Journeys</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  show: {
    height: "100%",
    opacity: 1
  },
  hide: {
    height: 0,
    opacity: 0.85
  },
  detailsContainer: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    backgroundColor: "#fff"
  },
  contentText: {
    backgroundColor: "#fff",
    color: "#3e4450",
    paddingLeft: 10,
    width: "95%",
    fontSize: moderateScale(10, 0.5)
  },
  detailItem: {
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  nextThreeContainer: {
    backgroundColor: "#3e4450",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: Platform.OS === "ios" ? moderateScale(2, 1) : 5,
    paddingBottom: Platform.OS === "ios" ? moderateScale(2, 1) : 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomLeftRadius: Platform.OS === "ios" ? 4 : 2,
    borderBottomRightRadius: Platform.OS === "ios" ? 4 : 2,
    flexDirection: "row",
    alignItems: "center"
  },
  nextThreeText: {
    textAlign: "center",
    marginLeft: 10,
    color: "#fff",
    fontSize: moderateScale(10, 0.5),
    fontWeight: "100"
  },
  separatorContainer: {
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10
  },
  separator: {
    backgroundColor: "#ebebeb",
    height: 0.5,
    marginBottom: 5
  },
  icon: {
    width: 15
  }
});

CollapsibleDetails.propTypes = {
  collapse: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired
};
