import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Animated, ScrollView, View, Text } from "react-native";

export default class CollapsibleDetails extends Component {
  static defaultProps = {
    height: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(this.props.height)
    };
    this.getContentHeight = this.getContentHeight.bind(this);
    this.handleHeight = this.handleHeight.bind(this);

    this.contentInit = true;
    this.contentHeight = 0;
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
            <Text
              style={styles.contentText}
              key={index}
            >{`Train departs ${departStop} at ${departTime} and arrives ${arrivStop} at ${arrivTime}`}</Text>
          );
        }
        if (stop.transit_details.line.vehicle.type === "BUS") {
          journeyArr.push(
            <Text
              style={styles.contentText}
              key={index}
            >{`${shortName} Bus departs ${departStop} at ${departTime} and arrives ${arrivStop} at ${arrivTime}`}</Text>
          );
        }
        if (stop.transit_details.line.vehicle.type === "TRAM") {
          journeyArr.push(
            <Text
              style={styles.contentText}
              key={index}
            >{`${shortName} Tram departs ${departStop} at ${departTime} and arrives ${arrivStop} at ${arrivTime}`}</Text>
          );
        }
      } else if (stop.travel_mode === "WALKING" && stop.distance.value >= 500) {
        journeyArr.push(
          <Text
            style={styles.contentText}
            key={index}
          >{`${stop.html_instructions} - ${stop.distance.text}`}</Text>
        );
      }
    });
    return journeyArr;
  };

  getContentHeight(event) {
    if (!this.contentInit) {
      this.props.maxHeight ? this.contentHeight = Math.min(this.props.maxHeight, event.nativeEvent.layout.height) : this.contentHeight = event.nativeEvent.layout.height;
      this.contentInit = true;

    }
  }

  handleHeight() {
    if (this.props.collapse) {
      Animated.timing(
        this.state.height,
        {toValue: 0,
          duration: this.props.duration}
      ).start();
    } else {
      Animated.timing(
        this.state.height,
        {toValue: this.contentHeight,
          duration: this.props.duration}
      ).start();
    }
  }
  render() {
    if (this.contentInit) {
      this.handleHeight();
    }
    return (
      <View style={styles.detailsContainer}>
        {!this.props.collapse
          ? <View >
              <Text
                style={styles.nextThreeBtn}
                onPress={() => this.props.showModal()}
              >
                Next 3
              </Text>
              <View style={styles.detailsCtonainer}>
                {this.renderListContent(this.props.content)}
              </View>
              <View style={styles.bottomBorderRadius}></View>
            </View>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailsCtonainer: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4
  },
  contentText: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    color: "#3e4450"
  },
  nextThreeBtn: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    color: "#3e4450",
    fontSize: 20,
    backgroundColor: "#fff"
  },
  bottomBorderRadius: {
    height: 10, 
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  }
});

CollapsibleDetails.propTypes = {
  collapse: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired
};
