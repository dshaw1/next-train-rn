import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  AsyncStorage,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { fetchNewJourney } from "../actions/journeys";
import { networkConnectionError } from "../actions/network";

import ListContainer from "../modules/NewJourney/components/ListContainer";
import ListItem from "../modules/NewJourney/components/ListItem";
import StopsModal from "../modules/NewJourney/components/StopsModal";
import NewJourneyButtons from "../modules/NewJourney/components/NewJourneyButtons";
import DuplicateJourneyMessage from "../modules/NewJourney/components/DuplicateJourneyMessage";
import journeyArrayHelper from "../modules/global/helpers/journeyArrayHelper";
import ShowErrorMessage from "../modules/global/components/ShowErrorMessage";
import checkNetworkConnection from "../modules/global/helpers/netConnectionHelper";

// JSON data of all stops
import stops from "../utils/stops";

class NewJourney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      isLoading: false,
      modalVisible: false,
      modalType: "",
      departureStop: "",
      departureLat: "",
      departureLong: "",
      arrivalStop: "",
      arrivalLat: "",
      arrivalLong: "",
      dataSource: stops,
      duplicateJourney: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorStyle = {
    navBarBackgroundColor: "#0dd3bb",
    statusBarTextColorScheme: "light"
  };

  // handle back navigation buttons
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "back") {
        this.props.navigator.popToRoot({
          animated: true,
          animationType: "slide-horizontal"
        });
      }
    }
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
      filterText: "",
      dataSource: stops
    });
  }

  // Determine which component state to update on modal open
  handleShowModal = (stop, lat, long) => {
    this.state.modalType === "DEP"
      ? this.setState({
          departureStop: stop,
          departureLat: lat,
          departureLong: long
        })
      : this.setState({
          arrivalStop: stop,
          arrivalLat: lat,
          arrivalLong: long
        });
    this.setModalVisible(!this.state.modalVisible);
  };

  // Filter list items with search input
  filterSearch(text) {
    const newData = stops.filter(function(item) {
      const itemData = item.stop_name.toUpperCase();
      const textData = text.toUpperCase();
      if (textData.length > 1) {
        return itemData.indexOf(textData) > -1;
      }
    });
    this.setState({
      dataSource: newData,
      filterText: text
    });
  }

  // Ensure this is working properly with correct heights
  getItemLayout = (data, index) => ({
    length: 40,
    offset: 40 * index,
    index
  });

  renderListItem = ({ item }) => {
    if (
      (this.state.modalType === "DEP" &&
        item.stop_name !== this.state.arrivalStop) ||
      (this.state.modalType === "ARR" &&
        item.stop_name !== this.state.departureStop)
    ) {
      return (
        <ListItem
          content={item.stop_name}
          onPress={() =>
            this.handleShowModal(
              item.stop_name,
              item.stop_latitude,
              item.stop_longitude
            )}
        />
      );
    }
  };

  renderListContainer = () => {
    return (
      <ListContainer
        keyExtractor={(item, index) => index}
        getItemLayout={this.getItemLayout}
        data={this.state.dataSource}
        renderItem={item => this.renderListItem(item)}
      />
    );
  };

  //
  //////////////////////// CLEAN UP THIS //////////////////////// 
  //
  handleAsyncStorage = journey => {
    // Local state item ID used to check against journey ID's in asyncStorage
    const itemId = `${this.state.departureLat},${this.state.departureLong}${this
      .state.arrivalLat},${this.state.arrivalLong}`;
    this.setState({ duplicateJourney: false });

    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("@NextTrain:MyKey")
        .then(data => {
          if (JSON.parse(data) && JSON.parse(data).length === 6) {
            this.setState({ isLoading: false });
            return alert("You've reached the journey limit!");
          }
          const journeys = data == null ? [] : JSON.parse(data);
          journeys.map(item => {
            // Check for duplicate journeys here
            if (item.id === itemId) {
              return this.setState({ duplicateJourney: true });
            }
          });
          if (!this.state.duplicateJourney) {
            journeys.push(journey);
            resolve(
              AsyncStorage.setItem("@NextTrain:MyKey", JSON.stringify(journeys))
            );
          } else return;
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  //
  //////////////////////// CLEAN UP THIS //////////////////////// 
  //
  handleJourneyFetch = () => {
    const {
      departureLat,
      departureLong,
      departureStop,
      arrivalLat,
      arrivalLong,
      arrivalStop
    } = this.state;

    const journeyDetails = {
      depart: `${departureLat},${departureLong}`,
      arriv: `${arrivalLat},${arrivalLong}`,
      departStop: departureStop,
      arrivStop: arrivalStop,
      id: `${departureLat}${departureLong}${arrivalLat}${arrivalLong}`
    };
    this.setState({ isLoading: true });
    this.props
      .fetchNewJourney(journeyDetails, "now")
      .then(res => {
        // Helper function for creating new journey array
        const newStepsArr = journeyArrayHelper(res);
        const asyncObject = Object.assign({
          ...journeyDetails,
          departTime: res.journey.routes[0].legs[0].departure_time,
          arrivTime: res.journey.routes[0].legs[0].arrival_time,
          steps: newStepsArr
        });

        // Saving favourites to phone's asyncStorage
        this.handleAsyncStorage(asyncObject).then(() => {
          this.props.networkConnectionError(false);
          this.setState({ isLoading: false });
          this.props.navigator.resetTo({
            screen: "app.Favourites",
            title: "Favourites",
            animationType: "slide-horizontal"
          });
        });
      })
      .catch(err => {
        this.props.networkConnectionError(true);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const networkError = this.props.networkError;
    // Render duplicate journey message if needed
    const renderDuplicateMsg = this.state.duplicateJourney ? (
      <DuplicateJourneyMessage />
    ) : null;
    // Disable fetch button unless both stops are selected
    const btnDisabled =
      this.state.departureStop === "" || this.state.arrivalStop === ""
        ? true
        : false;
    const renderContent =
      this.state.filterText.length >= 1 ? this.renderListContainer() : null;
    const statusBarToggle = this.state.modalVisible
      ? this.props.navigator.setStyle({ statusBarColor: "#3e4450" })
      : this.props.navigator.setStyle({ statusBarColor: "#0ca794" });

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator style={styles.activityIndicator} size="small" />
        </View>
      );
    }
    return (
      <View style={styles.contentContainer}>
        {networkError === true ? (
          <ShowErrorMessage
            checkConnection={() =>
              checkNetworkConnection(this.props.networkConnectionError)}
          />
        ) : null}
        <NewJourneyButtons
          onDepartPress={() => {
            this.setState({ modalType: "DEP" });
            this.setModalVisible(true);
          }}
          onArrivPress={() => {
            this.setState({ modalType: "ARR" });
            this.setModalVisible(true);
          }}
          disabled={btnDisabled}
          onFetch={() => this.handleJourneyFetch()}
          {...this.state}
        />
        {/* Temporary duplicate message */}
        {renderDuplicateMsg}
        <StopsModal
          visible={this.state.modalVisible}
          hideModal={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          onChangeText={text => this.filterSearch(text)}
          value={this.state.filterText}
          resultsLength={this.state.dataSource.length}
          content={<View>{renderContent}</View>}
        />
      </View>
    );
  }
}

NewJourney.propTypes = {
  fetchNewJourney: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  journeys: PropTypes.object
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#3e4450",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  activityIndicator: {
    marginTop: 20
  }
});

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

export default connect(mapStateToProps, mapDispatchToProps)(NewJourney);
