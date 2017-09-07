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

export default class CollapsibleTitle extends Component {
  componentDidMount() {
    this.countdownInterval = setInterval(() => {
      this.timerCountdown();
    }, 30000);
  }

  componentWillUnmount() {
    // Clear auto-fetch interval
    clearInterval(this.countdownInterval);
  }

  renderDownIcon = () => {
    if (Platform.OS === "ios") {
      return <Icon name="ios-arrow-down" size={18} color="#6b6b6b" />;
    } else {
      return <Icon name="md-arrow-dropdown" size={18} color="#6b6b6b" />;
    }
  };

  renderUpIcon = () => {
    if (Platform.OS === "ios") {
      return <Icon name="ios-arrow-up" size={18} color="#6b6b6b" />;
    } else {
      return <Icon name="md-arrow-dropup" size={18} color="#6b6b6b" />;
    }
  };

  // Render travel icons based on travel_mode
  checkTravelMode = item => {
    return item.steps.map((step, index) => {
      if (
        step.travel_mode === "TRANSIT" &&
        step.transit_details.line.vehicle.type === "HEAVY_RAIL"
      ) {
        return (
          <Icon
            key={index}
            name="ios-subway-outline"
            size={26}
            color="#0071cd"
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
            size={26}
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
            size={26}
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
            size={26}
            color="#73bd48"
            style={styles.iconStyle}
          />
        );
      }
    });
  };

  timerCountdown = () => {
    // Set the date we're counting down to
    const countDownDate = new Date(
      this.props.item.departTime.value * 1000
    ).getTime();

    // Get todays date and time
    const now = new Date().getTime();

    // Find the distance between now an the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours and minutes
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    if (countDownDate < now) {
      return <Text style={styles.countdownText}>  0m</Text>;
    } else {
      return (
        <Text style={styles.countdownText}>
          {days ? `{days}d` : null} {hours ? `${hours}h` : null} {`${minutes}m`}
        </Text>
      );
    }
  };

  render() {
    const item = this.props.item;

    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={
            !this.props.collapse ? (
              styles.selectedItemContainer
            ) : (
              styles.itemContainer
            )
          }
          onPress={index => {
            this.props.toggleDetails(index);
          }}
        >
          <View style={styles.headerItem}>
            <View style={styles.headerRow}>
              <View style={styles.iconsContainer}>
                {this.checkTravelMode(item)}
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeTitleText}>DEPART</Text>
                <Text style={styles.timeText}>{item.departTime.text}</Text>
              </View>
            </View>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.titleText}>{item.departStop}</Text>
                <View style={styles.titleRow}>
                  <Text style={styles.smallText}>to </Text>
                  <Text style={styles.titleText}>{item.arrivStop}</Text>
                </View>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeTitleText}>ARRIVE</Text>
                <Text style={styles.timeText}>{item.arrivTime.text}</Text>
              </View>
            </View>
            <View style={styles.iconsContainer}>
              <View style={[styles.flexRow, styles.countdownContainer]}>
                <Icon name="ios-time-outline" size={18} color="#3e4450" />
                {this.timerCountdown()}
              </View>
              <View style={styles.flexRow}>
                <View style={styles.iconsContainer}>
                  {!this.props.collapse ? (
                    this.renderUpIcon()
                  ) : (
                    this.renderDownIcon()
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 4,
    
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
    
    backgroundColor: "#ffffff"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2
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
  smallText: {
    color: "#3e4450",
    fontWeight: "400",
    fontSize: 11
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  timeContainer: {
    borderColor: "#3e4450",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 4,
    borderRadius: 2,
    width: 70,
    height: 30,
    justifyContent: "center"
  },
  timeText: {
    color: "#3e4450",
    fontWeight: "500",
    fontSize: 12,
    textAlign: "center"
  },
  timeTitleText: {
    color: "#3e4450",
    fontWeight: "100",
    fontSize: 10,
    textAlign: "center"
  },
  countdownText: {
    fontSize: 13,
    color: "#3e4450",
    fontWeight: "400",
    alignItems: "flex-end"
  },
  iconStyle: {
    marginRight: 5
  },
  flexRow: {
    flexDirection: "row",
    marginBottom: -10,
    alignItems: "center"
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5
  }
});

CollapsibleTitle.propTypes = {
  item: PropTypes.object.isRequired
};
