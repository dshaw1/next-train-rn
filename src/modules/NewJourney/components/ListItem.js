import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";

const ListItem = props => {
  return (
    <TouchableOpacity
      underlayColor={styles.underlayColor}
      onPress={props.onPress}
    >
      <View>
        <Text style={styles.itemContainer}>
          {props.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ]),
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    height: 40,
    backgroundColor: "transparent"
  }
});

export default ListItem;
