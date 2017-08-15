import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

const Row = props => {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>
        {props.content}
      </Text>
    </View>
  );
};

Row.propTypes = {
  content: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  row: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.054)"
  },
  text: {
    fontSize: 16
  }
});

export default Row;
