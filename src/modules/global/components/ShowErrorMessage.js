import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ShowErrorMessage = () => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        Error retrieving data.
      </Text>
      <Text style={styles.errorText}>
      Please check your network connection.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    padding: 10,
    backgroundColor: "red"
  },
  errorText: {
    textAlign: 'center',
    color: '#ffffff'
  }
})

export default ShowErrorMessage;
