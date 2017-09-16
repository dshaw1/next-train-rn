import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NoSearchResults = props => {

  renderResultsIcon = () => {
    if(Platform.OS === "ios") {
      return (
        <Icon name="ios-sad-outline" size={60} color="#ebebeb" />
      )
    } else {
      return (
        <Icon name="md-sad" size={60} color="#ebebeb" />
      )
    }
  }

  return (
    <View style={styles.container}>
      {renderResultsIcon()}
      <Text style={styles.noResultsText}>No Search Results</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  noResultsText: {
    marginTop: (Platform.OS === "ios") ? 0 : 10,
    color: "#ebebeb",
    fontSize: 18
  }
})

export default NoSearchResults;