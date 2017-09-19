import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NoJourneysToEdit = (props) => {
  return (
    <View style={styles.resultsContainer}>
      <Icon style={styles.icon} name="ios-happy-outline" size={120} color="#0dd3bb" />
      <Text style={styles.text}>You don't have any journeys to edit.</Text>
      <Text style={styles.text}>Go back and add some now!</Text>
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

export default NoJourneysToEdit;
