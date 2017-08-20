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
    // this.getContentHeight = this.getContentHeight.bind(this);
    // this.handleHeight = this.handleHeight.bind(this);

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
        } else {
          journeyArr.push(
            <Text
              style={styles.contentText}
              key={index}
            >{`${shortName} Bus departs ${departStop} at ${departTime} and arrives ${arrivStop} at ${arrivTime}`}</Text>
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

  // getContentHeight(event) {
  //   if (!this.contentInit) {
  //     this.props.maxHeight ? this.contentHeight = Math.min(this.props.maxHeight, event.nativeEvent.layout.height) : this.contentHeight = event.nativeEvent.layout.height;
  //     this.contentInit = true;

  //   }
  // }

  // handleHeight() {
  //   if (this.props.collapse) {
  //     Animated.timing(
  //       this.state.height,
  //       {toValue: 0,
  //         duration: this.props.duration}
  //     ).start();
  //   } else {
  //     Animated.timing(
  //       this.state.height,
  //       {toValue: this.contentHeight,
  //         duration: this.props.duration}
  //     ).start();
  //   }
  // }
  render() {
    // if (this.contentInit) {
    //   this.handleHeight();
    // }
    return (
      <ScrollView>
        {!this.props.collapse
          ? <View>
              <Text
                style={{ color: "#0dd3bb", fontSize: 20 }}
                onPress={() => this.props.showModal()}
              >
                Next 3
              </Text>
              {this.renderListContent(this.props.content)}
            </View>
          : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  collapseContainer: {
    paddingTop: 0
  },
  collapseItem: {
    paddingBottom: 0
  },
  contentText: {
    padding: 10,
    backgroundColor: "grey",
    color: "#ffffff"
  }
});

CollapsibleDetails.propTypes = {
  collapse: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired
}
