import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import NoSearchResults from "./NoSearchResults";

const StopsModal = props => {

  renderNoResultsComponent = () => {
    if (props.value.length > 2 && props.resultsLength === 0) {
      return <NoSearchResults />;
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Modal
        onRequestClose={() => null}
        animationType={"slide"}
        transparent={false}
        visible={props.visible}
      >
        <View style={styles.closeModal}>
          <TouchableOpacity onPress={props.hideModal}>
            <Icon name="md-close" size={32} color="#3e4450" />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <View>
            <TextInput
              onChangeText={props.onChangeText}
              value={props.value}
              style={styles.searchInput}
              placeholder="Start typing to search..."
              autoCorrect={false}
            />
          </View>
          {props.content}
          {this.renderNoResultsComponent()}
        </View>
      </Modal>
    </View>
  );
};

StopsModal.propTypes = {
  visible: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  hideModal: PropTypes.func.isRequired,
  modalContent: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  closeModal: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Platform.OS === "ios" ? 5 : 5,
    marginRight: Platform.OS === "ios" ? 15 : 10
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#fff"
  },
  modalContent: {
    flex: 1,
    flexDirection: "column"
  }
});

export default StopsModal;
