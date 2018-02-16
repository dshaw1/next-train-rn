import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DuplicateJourneyMessage = props => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.duplicateText}>
          This journey is already saved to your favourites!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    maxHeight: 20,
    width: "100%"
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  duplicateText: {
    textAlign: "center",
    color: "#fff"
  }
});

export default DuplicateJourneyMessage;
