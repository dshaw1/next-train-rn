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
            <Text style={styles.closeModalText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.inputBackground}>
            <View style={styles.inputContainer}>
              <Icon
                style={styles.searchIcon}
                name="ios-search-outline"
                size={20}
                color="#3e4450"
              />
              <TextInput
                onChangeText={props.onChangeText}
                value={props.value}
                style={styles.searchInput}
                placeholder="Start typing to search..."
                autoCorrect={false}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={styles.listContainer}>
            {props.content}
          </View>
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
  modalContainer: {
    backgroundColor: "#3e4450"
  },
  closeModal: {
    backgroundColor: "#3e4450",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: Platform.OS === "ios" ? 22 : 0,
    paddingRight: Platform.OS === "ios" ? 10 : 10
  },
  closeModalText: {
    color: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14
  },
  searchInput: {
    fontSize: 14,
    height: 40,
    width: "90%",
    backgroundColor: "#fff"
  },
  modalContent: {
    flex: 1,
    flexDirection: "column"
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  inputBackground: {
    backgroundColor: "#3e4450",
    paddingBottom: 10
  },
  searchIcon: {
    marginRight: 10
  },
  listContainer: {
    flex: 1
  }
});

export default StopsModal;
