import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DuplicateJourneyMessage = props => {
  return (
    <View>
      <Text style={styles.duplicateText}>
        This journey is already saved to your favourites!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  duplicateText: {
    marginTop: 50,
    textAlign: "center"
  }
});

export default DuplicateJourneyMessage;
