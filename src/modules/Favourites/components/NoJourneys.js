import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NoJourneys = () => {
  return (
    <View style={styles.resultsContainer}>
      <Icon name="ios-subway-outline" size={90} color="#ebebeb" />
      <Text style={styles.text}>Add up to 6 journeys</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    alignItems: "center",
    marginTop: "20%"
  },
  text: {
    textAlign: "center",
    color: "#ebebeb",
    fontSize: 18
  }
});

export default NoJourneys;
