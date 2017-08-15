import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

const NoSearchResults = props => {
  return (
    <View>
      <Text>No Results :(</Text>
    </View>
  )
}

NoSearchResults.propTypes = {

}

export default NoSearchResults;