import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  Platform,
  LayoutAnimation,
  UIManager,
  AppState
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { fetchNewJourney, toggleEditing } from "../actions/journeys";
import { networkConnectionError } from "../actions/network";

import SortableListView from "../modules/Favourites/components/SortableListView";
import CollapsibleList from "../modules/Favourites/CollapsibleList";
import RenderRowComponent from "../modules/Favourites/components/SortableList";
import journeyArrayHelper from "../modules/global/helpers/journeyArrayHelper";
import NoJourneys from "../modules/Favourites/components/NoJourneys";
import NoJourneysToEdit from "../modules/Favourites/components/NoJourneysToEdit";
import {
  iOSButtons,
  iOSEditButtons
} from "../modules/global/components/IOSNavigationButtons";
import {
  androidButtons,
  androidEditButtons
} from "../modules/global/components/AndroidNavigationButtons";

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
      refreshing: false,
      isLoading: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    if (Platform.OS === "android") {
      this.props.navigator.setStyle({ statusBarColor: "#0a8c7c" });
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  static navigatorButtons = Platform.OS === "ios" ? iOSButtons : androidButtons;

  static navigatorStyle = {
    navBarBackgroundColor: "#0ca794",
    statusBarTextColorScheme: "light"
  };

  pushScreen = () => {
    if (this.props.journeys.editing === true) {
      this.props.toggleEditing();
    }
    this.props.navigator.push({
      screen: "app.NewJourney",
      title: "New Journey",
      animationType: "slide-horizontal",
      navigatorButtons: {
        leftButtons: [
          {
            title: "Back",
            id: "back",
            buttonColor: "#fff"
          }
        ]
      }
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    // Create promise to ensure interval is set after initial async/remote fetch
    const handleInitialLoad = new Promise((resolve, reject) => {
      resolve(this.fetchAsyncStorageData());
    });
    handleInitialLoad.then(() => {
      this.intervalId = setInterval(this.fetchNewJourneyIfNeeded, 30000);
    });
    // Watch app state and fetch, if needed, remote data each time app is re-opened
    AppState.addEventListener("change", state => {
      if (state === "active") {
        this.fetchAsyncStorageData();
      }
    });
  }

  componentWillUnmount() {
    // Clear auto-fetch interval
    clearInterval(this.intervalId);
  }

  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "add") {
        this.pushScreen();
      }
      if (event.id == "edit") {
        this.fireEditingEvents(event);
      } else if (event.id == "done") {
        this.fireEditingEvents(event);
      }
    }
  }

  fireEditingEvents = event => {
    this.props.toggleEditing();
    LayoutAnimation.configureNext(this.layoutAnimationSettings());
    this.setNavigationButtonsByPlatform(event);
  };

  setNavigationButtonsByPlatform = event => {
    if (event.id == "done") {
      return Platform.OS === "ios"
        ? this.props.navigator.setButtons({
            ...iOSButtons
          })
        : this.props.navigator.setButtons({
            ...androidButtons
          });
    } else {
      Platform.OS === "ios"
        ? this.props.navigator.setButtons({
            ...iOSEditButtons
          })
        : this.props.navigator.setButtons({
            ...androidEditButtons
          });
    }
  };

  layoutAnimationSettings = () => {
    return (CustomAnimation = {
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
    });
  };

  fetchNewJourneyIfNeeded = () => {
    if (!this.props.journeys.editing) {
      this.state.favourites.map(item => {
        const departTime = item.departTime.value * 1000;
        if (departTime < Date.now()) {
          const fetchObj = {
            depart: item.depart,
            arriv: item.arriv,
            departStop: item.departStop,
            arrivStop: item.arrivStop,
            id: item.id
          };
          // Fetches target journey from API, updates journey
          // and keeps correct position
          this.handleFetchandUpdateAsyncStorage(fetchObj, item);
        }
      });
    } else return;
  };

  handleFetchandUpdateAsyncStorage = (fetchObj, item) => {
    const tempArray = this.state.favourites;

    this.props
      .fetchNewJourney(fetchObj, "now")
      .then(res => {
        // Helper function for creating new journey array
        const newStepsArr = journeyArrayHelper(res);
        // Create new object and ensure array order is not interrupted
        const asyncObject = Object.assign({
          ...fetchObj,
          departTime: res.journey.routes[0].legs[0].departure_time,
          arrivTime: res.journey.routes[0].legs[0].arrival_time,
          steps: newStepsArr
        });
        const foundIndex = tempArray.findIndex(
          journey => journey.id == item.id
        );

        tempArray.splice(foundIndex, 1, asyncObject);
        this.setAsyncStorage(tempArray, true);
      })
      .catch(err => {
        this.props.networkConnectionError(true);
        this.setState({ isLoading: false });
      });
  };

  fetchAsyncStorageData = () => {
    AsyncStorage.getItem("@NextTrain:MyKey")
      .then(journeyStr => {
        if (journeyStr === null) {
          this.setState({ isLoading: false });
          return;
        } else {
          this.setState({
            favourites: JSON.parse(journeyStr),
            isLoading: false
          });
          // Fetch journey data on initial app load
          this.fetchNewJourneyIfNeeded();
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        return err;
      });
  };

  removeJourneyFromAsync = id => {
    const favArr = this.state.favourites.filter(item => {
      if (id !== item.id) {
        return item;
      }
    });
    this.setAsyncStorage(favArr);
    if (favArr.length === 0) {
      this.props.toggleEditing();
      this.setNavigationButtonsByPlatform("done");
    }
  };

  setAsyncStorage = (array, networkErrorFunction) => {
    return AsyncStorage.setItem("@NextTrain:MyKey", JSON.stringify(array))
    .then(() => {
      networkErrorFunction ? this.props.networkConnectionError(false) : null;
      this.setState({ favourites: array });
      this.setState({ isLoading: false });
    })
    .catch(err => {
      this.setState({ isLoading: false });
      return err;
    });
  }

  handlePullRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchNewJourneyIfNeeded();
    this.setState({ refreshing: false });
  };

  updateListOrder = item => {
    var updateArray = this.state.favourites;
    updateArray.splice(item.to, 0, updateArray.splice(item.from, 1)[0]);
    this.setAsyncStorage(updateArray);
  };

  render() {
    // array of indexes used for sortable list
    const order = Object.keys(this.state.favourites);
    const newFavArr = this.state.favourites;
    const editing = this.props.journeys.editing;
    const renderContent = data => {
      return <View>{data}</View>;
    };

    // Show ActivityIndicator
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator style={styles.activityIndicator} size="small" />
        </View>
      );
    }
    // Show SortableListView
    if (editing && this.state.favourites.length) {
      return (
        <View style={styles.favouritesContainer}>
          <SortableListView
            data={this.state.favourites}
            order={order}
            onRowMoved={item => {
              order.splice(item.to, 0, order.splice(item.from, 1)[0]);
              this.updateListOrder(item);
            }}
            renderRow={row => (
              <RenderRowComponent
                removeJourney={id => this.removeJourneyFromAsync(id)}
                data={row}
              />
            )}
          />
        </View>
      );
    }
    if (editing && this.state.favourites.length === 0) {
      return <NoJourneysToEdit />;
    }
    if (this.state.favourites.length === 0) {
      return <NoJourneys />;
    } else {
      // Show CollapsibleList
      return (
        <View style={styles.favouritesContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.handlePullRefresh()}
              />
            }
          >
            <CollapsibleList
              items={this.state.favourites}
              contentRender={renderContent}
              maxHeight={150}
              duration={200}
              editing={this.props.journeys.editing}
            />
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  favouritesContainer: {
    flex: 1,
    backgroundColor: "#d8d9dd"
  },
  activityIndicator: {
    marginTop: 20
  }
});

Favourites.propTypes = {
  journeys: PropTypes.object,
  fetchNewJourney: PropTypes.func,
  toggleEditing: PropTypes.func,
  navigator: PropTypes.object.isRequired
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
    toggleEditing: bindActionCreators(toggleEditing, dispatch),
    networkConnectionError: bindActionCreators(networkConnectionError, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
