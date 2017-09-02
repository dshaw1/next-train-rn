import React, { Component } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { fetchNewJourney, toggleEditing } from "../actions/journeys";

import SortableListView from "react-native-sortable-listview";
import CollapsibleList from "../modules/Favourites/CollapsibleList";
import RenderRowComponent from "../modules/Favourites/components/SortableList";
import journeyArrayHelper from "../modules/global/helpers/journeyArrayHelper";
import ShowErrorMessage from "../modules/global/components/ShowErrorMessage";

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
      refreshing: false,
      isLoading: false,
      fetchError: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorStyle = {
    navBarBackgroundColor: "#00a4d8",
    statusBarTextColorScheme: "light"
  };

  pushScreen = () => {
    if (this.props.journeys.editing === true) {
      this.props.toggleEditing();
      this.props.navigator.setButtons({
        RegularButtons
      });
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
    this.fetchAsyncStorageData();
    this.intervalId = setInterval(this.fetchNewJourneyIfNeeded, 30000);
    // AsyncStorage.clear();
  }

  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "add") {
        this.pushScreen();
      }
      if (event.id == "edit") {
        this.props.toggleEditing();
        this.props.navigator.setButtons({
          leftButtons: [
            {
              title: "Done",
              id: "done",
              buttonColor: "#fff"
            }
          ],
          rightButtons: [
            {
              disabled: true,
              buttonColor: "#fff"
            }
          ]
        });
      } else if (event.id == "done") {
        this.props.toggleEditing();
        this.props.navigator.setButtons({
          leftButtons: [
            {
              title: "Edit",
              id: "edit",
              buttonColor: "#fff"
            }
          ],
          rightButtons: [
            {
              title: "Add",
              id: "add",
              buttonColor: "#fff",
              disabled: false
            }
          ]
        });
      }
    }
  }

  componentWillUnmount() {
    // Clear auto-fetch interval
    clearInterval(this.intervalId);
  }

  fetchNewJourneyIfNeeded = () => {
    if (!this.props.journeys.editing) {
      const tempArray = this.state.favourites;

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
          // Fetches target journey from API and updates said journey, keeping correct position
          this.props
            .fetchNewJourney(fetchObj, "now")
            .then(res => {
              // Helper function for creating new journey array
              const newStepsArr = journeyArrayHelper(res);
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
              AsyncStorage.setItem(
                "@NextTrain:MyKey",
                JSON.stringify(tempArray)
              ).then(() => {
                this.setState({ favourites: tempArray, fetchError: false });
              });
            })
            .catch(err => {
              return this.setState({ isLoading: false, fetchError: true });
            });
        }
      });
    } else return;
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

    AsyncStorage.setItem(
      "@NextTrain:MyKey",
      JSON.stringify(favArr)
    ).then(() => {
      this.setState({ favourites: favArr });
    });
  };

  handlePullRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchNewJourneyIfNeeded();
    this.setState({ refreshing: false });
  };

  updateListOrder = (favArr, item) => {
    favArr.splice(item.to, 0, favArr.splice(item.from, 1)[0]);

    AsyncStorage.setItem(
      "@NextTrain:MyKey",
      JSON.stringify(favArr)
    ).then(() => {
      this.setState({ favourites: favArr });
    });
  };

  render() {
    // array of indexes used for sortable list
    const order = Object.keys(this.state.favourites);
    const newFavArr = this.state.favourites;
    const editing = this.props.journeys.editing;
    const renderContent = data => {
      return (
        <View>
          {data}
        </View>
      );
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
    if (editing) {
      return (
        <View style={styles.favouritesContainer}>
          <SortableListView
            style={{ flex: 1 }}
            data={this.state.favourites}
            order={order}
            onRowMoved={item => {
              order.splice(item.to, 0, order.splice(item.from, 1)[0]);
              this.updateListOrder(newFavArr, item);
            }}
            renderRow={row =>
              <RenderRowComponent
                removeJourney={id => this.removeJourneyFromAsync(id)}
                data={row}
              />}
          />
        </View>
      );
    } else {
      // Show CollapsibleList
      return (
        <View style={styles.favouritesContainer}>
          {this.state.fetchError ? <ShowErrorMessage /> : null}
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
    justifyContent: "center",
    backgroundColor: "#ebebeb"
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
    journeys: state.journeys
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewJourney: bindActionCreators(fetchNewJourney, dispatch),
    toggleEditing: bindActionCreators(toggleEditing, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
