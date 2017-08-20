import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ActivityIndicator
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchNewJourney } from "../../actions/journeys";
import CollapsibleDetails from "./components/CollapsibleDetails";
import CollapsibleTitle from "./components/CollapsibleTitle";
import NextThreeModal from "./components/NextThreeModal";
import nextThreeDepartures from "./helpers/nextThreeDepartures";

class CollapsibleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeItem: undefined,
      modalVisible: false,
      nextDepartures: []
    };
  }

  // PUT THIS INTO A HELPER FUNCTION?
  setModalVisible(visible, arriv, depart, time) {
    const data = { arriv, depart };
    const newTime = time + 60;
    const fetchJourneys = this.props.fetchNewJourney;
    this.setState({ isLoading: true });
    if (this.state.modalVisible === false) {
      const nextThree = nextThreeDepartures(
        fetchJourneys,
        data,
        newTime
      ).then(nextDepartures => {
        return this.setState({
          ...nextDepartures,
          isLoading: false,
          modalVisible: visible
        });
      })
      .catch((err) => {
        return console.log(err);
      })
    }
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
      nextDepartures: []
    });
  };

  toggleDetails = index => {
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
        {items.map((item, index) => {
          return (
            <View key={index}>
              <CollapsibleTitle
                toggleDetails={() => this.toggleDetails(index)}
                item={item}
              />
              <CollapsibleDetails
                collapse={this.state.activeItem !== index}
                content={item}
                showModal={() =>
                  this.setModalVisible(
                    true,
                    item.arriv,
                    item.depart,
                    item.departTime.value
                  )}
              />
            </View>
          );
        })}
        {this.state.isLoading
          ? <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="small" />
            </View>
          : <NextThreeModal
              nextThreeData={this.state.nextDepartures}
              visible={this.state.modalVisible}
              hideModal={() => {
                this.hideModal();
              }}
            />}
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
  collapseContainer: {
    paddingTop: 0
  },
  collapseItem: {
    paddingBottom: 0
  },
  headerItem: {
    padding: 10,
    backgroundColor: "#fff"
  },
  headerText: {
    color: "grey"
  },
  activityIndicatorContainer: {
    marginTop: 22
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
