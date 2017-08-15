import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const CollapsibleTitle = props => {
  const item = props.item;
  
  return (
    <View style={styles.headerItem}>
      <Text style={styles.headerText}>
        {`${item.departStop} to ${item.arrivStop}`}
      </Text>
      <Text style={styles.headerText}>
        {`Departs at ${item.departTime.text} arrives at ${item.arrivTime.text}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerItem: {
    padding: 10,
    backgroundColor: "#fff"
  },
  headerText: {
    color: "grey"
  }
});

CollapsibleTitle.propTypes = {
  item: PropTypes.object.isRequired
};

export default CollapsibleTitle;
