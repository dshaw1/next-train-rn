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
import { moderateScale } from '../../global/helpers/scalingHelper';

const NextThreeModal = props => {
  renderModalContent = data => {
    if (data.length) {
      return data.map((item, index) => {
        return (
          <View style={styles.textContainer} key={index}>
            <Text style={styles.itemText}>
              {item.departure_time.text}
            </Text>
            <Icon name="ios-arrow-round-forward" size={24} color="#fff" style={styles.iconStyle} />
            <Text style={styles.itemText}>           
              {item.arrival_time.text}
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
                  <Icon name="md-close" size={moderateScale(26, 1.23)} color="#0dd3bb" />
                </TouchableOpacity>
              </View>
                <Text style={styles.titleText}>{props.departStop}</Text>
                <View style={styles.row}>
                  <Text style={styles.smallText}>to </Text>
                  <Text style={styles.titleText}>{props.arrivStop}</Text>
                </View>
              <View style={styles.timesContainer}>
                {renderModalContent(props.nextThreeData)}
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
    backgroundColor: "#3e4450",
    alignItems: "flex-end"
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  },
  innerContainer: {
    backgroundColor: "#3e4450",
    width: "80%",
    height: "35%",
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: (Platform.OS === "ios" ? 4 : 2)
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
  timesContainer: {
    marginTop: 10
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  itemText: {
    fontSize: moderateScale(14, 1),
    color: "#fff",
    width: 80,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: moderateScale(14, 1),
    textAlign: "center"
  },
  smallText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: (Platform.OS === "ios" ? moderateScale(12, 0.25) : moderateScale(14, 0.25))
  },
  iconStyle: {
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10
  }
});

NextThreeModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  nextThreeData: PropTypes.array.isRequired
};

export default NextThreeModal;
