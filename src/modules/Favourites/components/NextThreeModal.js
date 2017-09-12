import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NextThreeModal = props => {
  renderModalContent = data => {
    if (data.length) {
      return data.map((item, index) => {
        return (
          <View style={styles.textContainer} key={index}>
            <Text style={styles.itemText}>
              {item.departure_time.text} - {item.arrival_time.text}
            </Text>
          </View>
        );
      });
    }
  };

  return (
    <Modal
      animationType={"fade"}
      onRequestClose={() => null}
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          {props.loading ? (
            <View style={styles.activityIndicatorContainer}>
              <View style={styles.innerActivityContainer}>
                <ActivityIndicator size="large" />
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.closeModal}>
                <TouchableOpacity onPress={props.hideModal}>
                  <Icon name="md-close" size={32} color="#3e4450" />
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View
                  style={styles.row}
                >
                  <Icon
                    style={styles.icon}
                    name="ios-subway-outline"
                    size={30}
                    color="#3e4450"
                  />
                  <View style={styles.stationContainer}>
                    <Text style={styles.text}>
                      {props.departStop}
                    </Text>
                  </View>
                </View>
                <Icon
                  style={styles.smallIcon}
                  name="ios-arrow-round-down"
                  size={20}
                  color="#3e4450"
                />
                <View
                  style={styles.row}
                >
                  <Icon
                    style={styles.icon}
                    name="ios-subway-outline"
                    size={30}
                    color="#3e4450"
                  />
                  <View style={styles.stationContainer}>
                    <Text style={styles.text}>
                      {props.arrivStop}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeModal: {
    backgroundColor: "#ebebeb",
    alignItems: "flex-end"
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  innerContainer: {
    backgroundColor: "#ebebeb",
    width: "80%",
    height: "50%",
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  activityIndicatorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  innerActivityContainer: {
    width: 50,
    height: 50
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  itemText: {
    fontSize: 16
  },
  container: {
    borderRadius: 4,
    padding: 20,
    backgroundColor: "#ebebeb"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    textAlign: "left",
    paddingLeft: (Platform.OS === 'ios') ? 10 : 30
  },
  smallIcon: {
    textAlign: "left",
    paddingLeft: (Platform.OS === 'ios') ? 0 : 10
  },
  text: {
    fontSize: 14,
    color: "#3e4450",
    flex: 1,
    textAlign: "left"
  },
  stationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "rgba(62, 68, 80, 0.35)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    marginLeft: 20,
    marginRight: 10,
    paddingBottom: 5
  }
});

NextThreeModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  nextThreeData: PropTypes.array.isRequired
};

export default NextThreeModal;
