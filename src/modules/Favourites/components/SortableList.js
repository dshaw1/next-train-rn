import React, { Component } from "react";
import PropTypes from 'prop-types';
import { TouchableHighlight, TouchableOpacity, Text, View, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class RenderRowComponent extends Component {
  renderIcon = () => {
    if(Platform.OS === 'ios') {
      return (
        <Icon style={{ flex: 0 }} name="ios-remove-circle" size={22} color="red" />
      )
    } else {
      return (
        <Icon style={{ flex: 0 }} name="md-remove-circle" size={22} color="red" />
      )
    }
  }

  render() {
    const { departStop, arrivStop, id } = this.props.data;
    if (this.props) {
      return (
        <TouchableHighlight
          underlayColor={"#eee"}
          style={{
            padding: 25,
            backgroundColor: "#F8F8F8",
            borderBottomWidth: 1,
            borderColor: "#eee"
          }}
          {...this.props.sortHandlers}
        >
          <View style={{ flexDirection: 'row'}}>
            <Text style={{ flex: 1 }}>
              {this.props.data ? departStop : null} -{" "}
              {this.props.data ? arrivStop : null}
            </Text>
            <TouchableOpacity onPress={() => this.props.removeJourney(id)}>
              {this.renderIcon()}
            </TouchableOpacity>
          </View>
        </TouchableHighlight>
      );
    }
  }
}

RenderRowComponent.propTypes = {
  removeJourney: PropTypes.func.isRequired,
  sortHandlers: PropTypes.object,
  data: PropTypes.object.isRequired
}
