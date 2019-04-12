/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import ListItem from "./src/components/ListItem/ListItem"
import PlaceItem from "./src/components/PlaceInput/PlaceInput"
import PlaceList from "./src/components/PlaceList/PlaceList"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    places: []
  };

  placeAddedHandler = placeName => { 
      this.setState(prevState => {
        return {
          places: prevState.places.concat(placeName)
        };
      });
  }

  placeDeletedHandler = index => {
    this.setState(prevState=> {
      return {
        places: prevState.places.filter(
          (place, i) => {
            return i !== index;
          }
        )
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceItem onPlaceAdded={this.placeAddedHandler}/>
        <PlaceList places={this.state.places} onItemDeleted={this.placeDeletedHandler}/>
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
