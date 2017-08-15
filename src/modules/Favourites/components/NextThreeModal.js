import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Text, Button, View, StyleSheet } from "react-native";

const NextThreeModal = props => {
  renderModalContent = (data) => {
    if (data.length) {
      return data.map((item, index) => {
        return (
          <View key={index}>
            <Text>
              {item.departure_time.text} - {item.arrival_time.text}
            </Text>
          </View>
        );
      });
    }
  }

  return (
    <Modal animationType={"fade"} onRequestClose={() => null} transparent={true} visible={props.visible}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}
      >
        <View style={{ backgroundColor: "gainsboro", width: 300, height: 300 }}>
          <View style={styles.closeModal}>
            <Button title="Hide Modal" onPress={props.hideModal} />
          </View>
          <View style={styles.modalContent}>
            {this.renderModalContent(props.nextThreeData)}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeModal: {
    backgroundColor: "#fff"
  },
  modalContainer: {
    height: 200,
    width: 300
  }
});

NextThreeModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}

export default NextThreeModal;
