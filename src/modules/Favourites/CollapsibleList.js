import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TouchableHighlight, Text, LayoutAnimation } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchNewJourney } from "../../actions/journeys";

import CollapsibleDetails from "./components/CollapsibleDetails";
import CollapsibleTitle from "./components/CollapsibleTitle";
import NextThreeModal from "./components/NextThreeModal";
import nextThreeDepartures from "./helpers/nextThreeDepartures";
import ShowErrorMessage from "../global/components/ShowErrorMessage";

class CollapsibleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeItem: undefined,
      modalVisible: false,
      nextDepartures: [],
      departStop: "",
      arrivStop: "",
      fetchError: false
    };
  }

  setModalVisible(visible, arriv, arrivStop, depart, departStop, time) {
    const data = { arriv, depart, arrivStop, departStop };
    const newTime = time + 60;
    const fetchJourneys = this.props.fetchNewJourney;
    this.setState({ isLoading: true, modalVisible: visible });
    if (this.state.modalVisible === false) {
      const nextThree = nextThreeDepartures(fetchJourneys, data, newTime)
        .then(nextDepartures => {
          return this.setState({
            ...nextDepartures,
            arrivStop: arrivStop,
            departStop: departStop,
            isLoading: false,
            fetchError: false
          });
        })
        .catch(err => {
          this.setState({ fetchError: true, isLoading: false });
          return err;
        });
    }
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
      nextDepartures: []
    });
  };

  toggleDetails = index => {
    const CustomAnimation = {
      duration: 220,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      }
    };
    LayoutAnimation.configureNext(CustomAnimation);

    let oldItem = this.state.activeItem;
    if (oldItem === index) {
      this.setState({ activeItem: undefined });
    } else {
      this.setState({ activeItem: index });
    }
  };

  render() {
    const { items, headerRender } = this.props;
    return (
      <View style={styles.container}>
        {this.state.fetchError ? <ShowErrorMessage /> : null}
        {items.map((item, index) => {
          return (
            <View key={index}>
              <CollapsibleTitle
                toggleDetails={() => this.toggleDetails(index)}
                item={item}
                collapse={this.state.activeItem !== index}
              />
              <View style={styles.detailsContainer}>
              <CollapsibleDetails
                loading={this.state.isLoading}
                collapse={this.state.activeItem !== index}
                content={item}
                showModal={() =>
                  this.setModalVisible(
                    true,
                    item.arriv,
                    item.arrivStop,
                    item.depart,
                    item.departStop,
                    item.departTime.value
                  )}
              />
              </View>
            </View>
          );
        })}
        <NextThreeModal
          loading={this.state.isLoading}
          nextThreeData={this.state.nextDepartures}
          arrivStop={this.state.arrivStop}
          departStop={this.state.departStop}
          visible={this.state.modalVisible}
          hideModal={() => {
            this.hideModal();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerBorder: {
    borderBottomWidth: 1
  },
  detailsContainer: {
    overflow: "hidden"
  },
  collapseItem: {
    paddingBottom: 0
  },
  headerText: {
    color: "grey"
  }
});

CollapsibleList.propTypes = {
  items: PropTypes.array,
  removeJourney: PropTypes.func,
  headerRender: PropTypes.func,
  contentRender: PropTypes.func,
  fetchNewJourney: PropTypes.func
};

const mapStateToProps = state => {
  return {
    journeys: state.journeys
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewJourney: bindActionCreators(fetchNewJourney, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleList);
