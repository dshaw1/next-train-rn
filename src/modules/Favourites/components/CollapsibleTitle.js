import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import { moderateScale } from "../../global/helpers/scalingHelper";

export default class CollapsibleTitle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: null
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setCountdownInterval(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setCountdownInterval() {
    // Set the date we're counting down to
    const countDownDate = new Date(
      this.props.item.departTime.value * 1000
    ).getTime();
    const now = new Date().getTime();
    // Find the distance between now an the count down date
    const distance = countDownDate - now;
    return this.calculateTimes(distance);
  }

  calculateTimes = distance => {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.setState(prevState => ({
      days: days,
      hours: hours,
      minutes: minutes
    }));
  };

  renderDownIcon = () => {
    if (Platform.OS === "ios") {
      return this.renderArrowIcon("ios-arrow-down");
    } else {
      return this.renderArrowIcon("md-arrow-dropdown");
    }
  };

  renderUpIcon = () => {
    if (Platform.OS === "ios") {
      return this.renderArrowIcon("ios-arrow-up");
    } else {
      return this.renderArrowIcon("md-arrow-dropup");
    }
  };

  renderArrowIcon = name => {
    return <Icon name={name} size={moderateScale(16, 0.5)} color="#6b6b6b" />;
  };

  // Render travel icons based on travel_mode
  checkTravelMode = item => {
    return item.steps.map((step, index) => {
      if (
        step.travel_mode === "TRANSIT" &&
        step.transit_details.line.vehicle.type === "HEAVY_RAIL"
      ) {
        return this.renderTravelIcon(index, "ios-subway-outline", "#0071cd");
      }
      if (
        step.travel_mode === "TRANSIT" &&
        step.transit_details.line.vehicle.type === "BUS"
      ) {
        return this.renderTravelIcon(index, "ios-bus-outline", "#fc9a1f");
      }
      if (step.travel_mode === "WALKING" && step.distance.value >= 500) {
        return this.renderTravelIcon(index, "ios-walk-outline", "#3e4450");
      }
      if (
        step.travel_mode === "TRANSIT" &&
        step.transit_details.line.vehicle.type === "TRAM"
      ) {
        return this.renderTravelIcon(index, "ios-train-outline", "#73bd48");
      }
    });
  };

  renderTravelIcon = (index, name, colour) => {
    return (
      <Icon
        key={index}
        name={name}
        size={moderateScale(24, 0.5)}
        color={colour}
        style={styles.iconStyle}
      />
    );
  };

  timerCountdown = () => {
    if (this.state.minutes == 0 || this.state.minutes < 0) {
      return <Text style={styles.countdownText}> 0m</Text>;
    } else {
      return (
        <Text style={styles.countdownText}>
          {this.state.days ? ` ${this.state.days}d` : null}
          {this.state.hours ? ` ${this.state.hours}h` : null}
          {this.state.minutes ? ` ${this.state.minutes}m` : null}
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
            !this.props.collapse
              ? styles.selectedItemContainer
              : styles.itemContainer
          }
          onPress={index => {
            this.props.toggleDetails(index);
          }}
        >
          <View>
            <View style={styles.contentContainer}>
              <View style={styles.headerRow}>
                <View>
                  <Text style={styles.titleText}>{item.departStop}</Text>
                  <View style={styles.titleRow}>
                    <Text style={styles.smallText}>to </Text>
                    <Text style={styles.titleText}>{item.arrivStop}</Text>
                  </View>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeTitleText}>DEPART</Text>
                  <Text style={styles.timeText}>{item.departTime.text}</Text>
                </View>
              </View>
              <View style={styles.headerRow}>
                <View style={styles.iconsContainer}>
                  {this.checkTravelMode(item)}
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeTitleText}>ARRIVE</Text>
                  <Text style={styles.timeText}>{item.arrivTime.text}</Text>
                </View>
              </View>
              <View style={styles.iconsContainer}>
                <View style={[styles.flexRow, styles.countdownContainer]}>
                  <Icon
                    name="ios-time-outline"
                    size={moderateScale(16, 0.5)}
                    color="#3e4450"
                  />
                  {this.timerCountdown()}
                </View>
                <View style={styles.flexRow}>
                  <View style={styles.iconsContainer}>
                    {!this.props.collapse
                      ? this.renderUpIcon()
                      : this.renderDownIcon()}
                  </View>
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
  contentContainer: {
    padding: 10,
    paddingBottom: 15,
    flex: 4
  },
  itemContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: Platform.OS === "ios" ? 4 : 2,
    backgroundColor: "#ffffff"
  },
  selectedItemContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderTopLeftRadius: Platform.OS === "ios" ? 4 : 2,
    borderTopRightRadius: Platform.OS === "ios" ? 4 : 2,
    borderBottomLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: "#ffffff"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Platform.OS === "ios" ? 2 : 5
  },
  titleText: {
    color: "#3e4450",
    fontWeight: "500",
    fontSize: moderateScale(13.5, 0.5)
  },
  smallText: {
    color: "#3e4450",
    fontWeight: "400",
    fontSize: moderateScale(10, 0.5)
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
    width: moderateScale(55, 0.75),
    height: Platform.OS === "ios" ? moderateScale(28, 0.5) : 32,
    justifyContent: "center"
  },
  timeText: {
    color: "#3e4450",
    fontWeight: "500",
    fontSize: moderateScale(10, 0.5),
    textAlign: "center"
  },
  timeTitleText: {
    color: "#3e4450",
    fontWeight: "100",
    fontSize: Platform.OS === "ios" ? moderateScale(8, 0.5) : 11,
    textAlign: "center",
    marginBottom: Platform.OS === "ios" ? 0 : -3
  },
  countdownText: {
    fontSize: moderateScale(11, 0.5),
    color: "#3e4450",
    fontWeight: "400",
    alignItems: "flex-end"
  },
  iconStyle: {
    marginRight: 5
  },
  flexRow: {
    flexDirection: "row",
    marginBottom: Platform.OS === "ios" ? -10 : -5,
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
  item: PropTypes.object.isRequired,
  collapse: PropTypes.bool,
  toggleDetails: PropTypes.func.isRequired
};
