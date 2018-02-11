import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchNewJourney } from "../../actions/journeys";
import { networkConnectionError } from "../../actions/network";
import { ifIphoneX } from "../global/helpers/iPhoneXHelper";

import CollapsibleDetails from "./components/CollapsibleDetails";
import CollapsibleTitle from "./components/CollapsibleTitle";
import NextThreeModal from "./components/NextThreeModal";
import nextThreeDepartures from "./helpers/nextThreeDepartures";
import ShowErrorMessage from "../global/components/ShowErrorMessage";
import checkNetworkConnection from "../global/helpers/netConnectionHelper";

class CollapsibleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeItem: undefined,
      modalVisible: false,
      nextDepartures: [],
      departStop: "",
      arrivStop: ""
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
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
            isLoading: false
          });
          this.props.networkConnectionError(false);
        })
        .catch(err => {
          this.props.networkConnectionError(true);
          this.setState({
            isLoading: false,
            modalVisible: false
          });
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
    const iOSAnimations = {
      duration: 220,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      }
    };

    const androidAnimations = {
      duration: 190,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      }
    };
    Platform.OS === "android"
      ? LayoutAnimation.configureNext(androidAnimations)
      : LayoutAnimation.configureNext(iOSAnimations);

    let oldItem = this.state.activeItem;
    if (oldItem === index) {
      this.setState({ activeItem: undefined });
    } else {
      this.setState({ activeItem: index });
    }
  };

  render() {
    const { items, headerRender, networkError } = this.props;
    return (
      <View style={styles.container}>
        {networkError === true ? (
          <ShowErrorMessage
            checkConnection={() => {
              checkNetworkConnection(this.props.networkConnectionError);
            }}
          />
        ) : null}
        {items.map((item, index) => {
          return (
            <View style={styles.collapsibleContainer} key={index}>
              <CollapsibleTitle
                toggleDetails={() => this.toggleDetails(index)}
                item={item}
                collapse={this.state.activeItem !== index}
              />
              <View>
                <CollapsibleDetails
                  animateOpacity={() => this.animationStuff()}
                  loading={this.state.isLoading}
                  collapse={this.state.activeItem !== index}
                  content={item}
                  showModal={() => {
                    this.state.fetchError
                      ? null
                      : this.setModalVisible(
                          true,
                          item.arriv,
                          item.arrivStop,
                          item.depart,
                          item.departStop,
                          item.departTime.value
                        );
                  }}
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
  collapsibleContainer: {
    height: "100%",
    flex: 1
  },
  container: {
    flex: 1,
    ...ifIphoneX({
      paddingBottom: 40
    }, {
        paddingBottom: 10
    })
  },
  headerBorder: {
    borderBottomWidth: 1
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
    journeys: state.journeys,
    networkError: state.network.networkError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewJourney: bindActionCreators(fetchNewJourney, dispatch),
    networkConnectionError: bindActionCreators(networkConnectionError, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleList);
