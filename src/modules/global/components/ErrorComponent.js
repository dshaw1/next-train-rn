import React from "react";
import { View, Text, StyleSheet, NetInfo } from "react-native";
import PropTypes from "prop-types";

const ErrorComponent = (props) => {
  return (
    <View>
      <Text>Oops! Something went wrong :(</Text>
    </View>
  )
}

ErrorComponent.propTypes = {

}

export default ErrorComponent;
