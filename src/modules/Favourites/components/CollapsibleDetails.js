import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  UIManager,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class CollapsibleDetails extends PureComponent {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

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
                size={22}
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
                size={22}
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
                size={22}
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
              size={22}
              color="#3e4450"
            />
            <Text
              style={styles.contentText}
              key={index}
            >{`${stop.html_instructions} - ${stop.distance.text}`}</Text>
          </View>
        );
      }
    });
    return journeyArr;
  };

  render() {
    return (
      <View style={styles.detailsContainer}>
        {!this.props.collapse ? (
          <View>
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
            </View>
            <View style={styles.detailsCtonainer}>
              {this.renderListContent(this.props.content)}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.nextThreeContainer}
              onPress={() => this.props.showModal()}
            >
              <Icon name="ios-eye-outline" size={22} color="#fff" />
              <Text style={styles.nextThreeText}>View Later Journeys</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailsCtonainer: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 15,
    backgroundColor: "#fff"
  },
  contentText: {
    backgroundColor: "#fff",
    color: "#3e4450",
    paddingLeft: 15,
    width: "95%",
    fontSize: 12
  },
  detailItem: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  nextThreeContainer: {
    backgroundColor: "#3e4450",
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  nextThreeText: {
    textAlign: "center",
    marginLeft: 15,
    color: "#fff",
    fontSize: 12,
    fontWeight: "100"
  },
  separatorContainer: {
    backgroundColor: "#fff",
    marginLeft: 15,
    marginRight: 15
  },
  separator: {
    backgroundColor: "#CED0CE",
    height: StyleSheet.hairlineWidth,
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
