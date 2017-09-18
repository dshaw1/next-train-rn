import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NoJourneys = (props) => {
  return (
    <View style={styles.resultsContainer}>
      <Icon style={styles.icon} name="ios-subway-outline" size={120} color="#0dd3bb" />
      <Text style={styles.text}>Add your first journey,</Text>
      <Text style={styles.text}>you can save up to six favourites.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    alignItems: "center",
    marginTop: "20%"
  },
  icon: {
    marginBottom: Platform.OS === "ios" ? 0 : 10
  },
  text: {
    textAlign: "center",
    color: "#cccccc",
    fontSize: 18
  }
});

export default NoJourneys;
