import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ShowErrorMessage = props => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Error retrieving data.</Text>
      <TouchableOpacity
        onPress={() => props.checkConnection()}
        style={styles.row}
      >
        <Text style={styles.fetchButton}>Check connection</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    padding: 10,
    backgroundColor: "#cb2431",
    position: "absolute",
    width: "100%",
    minHeight: 50,
    zIndex: 2
  },
  errorText: {
    textAlign: "center",
    color: "#ffffff"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  fetchButton: {
    fontSize: 12,
    textAlign: "center",
    color: "#ffffff",
    borderRadius: 7,
    padding: 2,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
    width: "40%",
    marginTop: 5
  }
});

export default ShowErrorMessage;
