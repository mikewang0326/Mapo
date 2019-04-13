/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import ListItem from "./src/components/ListItem/ListItem"
import PlaceItem from "./src/components/PlaceInput/PlaceInput"
import PlaceList from "./src/components/PlaceList/PlaceList"
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail"
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName)
    console.log('Place Added')
  }

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key)
    console.log('Place selected')
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace()
    console.log('Place deleted')
  }

  modalCloseHandler = () => {
    this.props.onDeseletePlace()
    console.log('Modal closed')
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalCloseHandler}
        />
        <PlaceItem onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps = state => {
  return  {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace:() => dispatch(deletePlace()),
    onSelectPlace:(key) => dispatch(selectPlace(key)),
    onDeseletePlace:() => dispatch(deselectPlace())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
