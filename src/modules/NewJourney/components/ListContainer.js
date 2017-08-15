import React from "react";
import PropTypes from "prop-types";
import { View, Text, ListView, FlatList, StyleSheet } from "react-native";

const ListContainer = props => {
  renderItemSeparator = () => {
    return <View style={styles.separatorStyle} />;
  };

  return (
    <FlatList
      style={styles.listContainer}
      data={props.data}
      extraData={props.extraData}
      renderItem={props.renderItem}
      getItemLayout={props.getItemLayout}
      initialNumToRender={props.initialNumToRender}
      keyExtractor={props.keyExtractor}
      ItemSeparatorComponent={this.renderItemSeparator}
      ListHeaderComponent={props.ListHeaderComponent}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
    />
  );
};

ListContainer.propTypes = {
  renderItem: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  extraData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  initialNumToRender: PropTypes.number,
  ListHeaderComponent: PropTypes.func,
  ItemSeparatorComponent: PropTypes.func,
  keyExtractor: PropTypes.func,
  getItemLayout: PropTypes.func
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    marginBottom: 40,
    borderTopWidth: 0.5,
    borderColor: "gainsboro",
    backgroundColor: "#ffffff"
  },
  separatorStyle: {
    height: 1,
    backgroundColor: "#CED0CE",
    height: StyleSheet.hairlineWidth
  }
})

export default ListContainer;
