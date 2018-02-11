import React from "react";
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
import { ifIphoneX } from "../../global/helpers/iPhoneXHelper";
import Icon from "react-native-vector-icons/Ionicons";

import NoSearchResults from "./NoSearchResults";

const StopsModal = props => {
  renderSearchInput = () => {
    if (Platform.OS === "ios") {
      return (
        <TextInput
          onChangeText={props.onChangeText}
          value={props.value}
          style={styles.searchInputIOS}
          placeholder="Start typing to search..."
          autoCorrect={false}
          blurOnSubmit={true}
        />
      );
    } else {
      return (
        <TextInput
          onChangeText={props.onChangeText}
          value={props.value}
          style={styles.searchInputAndroid}
          placeholder="Start typing to search..."
          placeholderTextColor="#fff"
          placeholderStyle={{ paddingLeft: 5 }}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          blurOnSubmit={true}
        />
      );
    }
  };

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
            <View
              style={
                Platform.OS === "ios"
                  ? styles.inputContainerIOS
                  : styles.inputContainerAndroid
              }
            >
              <Icon
                style={styles.searchIcon}
                name="ios-search-outline"
                size={20}
              />
              {this.renderSearchInput()}
            </View>
          </View>
          {props.resultsLength === 0 ? null : (
            <View style={styles.listContainer}>{props.content}</View>
          )}
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
    ...ifIphoneX({
      paddingTop: 36
    }, {
        paddingTop: 10
    }),
    paddingBottom: 10,
    fontSize: 14
  },
  searchInputIOS: {
    fontSize: 14,
    height: 40,
    width: "90%",
    backgroundColor: "#fff"
  },
  searchInputAndroid: {
    color: "#fff",
    fontSize: 14,
    height: 40,
    width: "90%",
    backgroundColor: "#3e4450",
    borderBottomWidth: 1,
    borderColor: "#fff"
  },
  modalContent: {
    flex: 1,
    flexDirection: "column"
  },
  inputContainerIOS: {
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
  inputContainerAndroid: {
    backgroundColor: "#3e4450",
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
    marginRight: 10,
    color: Platform.OS === "ios" ? "#3e4450" : "#fff"
  },
  listContainer: {
    flex: 1
  }
});

export default StopsModal;
