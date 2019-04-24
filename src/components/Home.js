

import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
     super(props);
   }

    render() {
        return (
          <View id="1" style={{padding: 10}}>

          <Text style={{padding: 10, fontSize: 42, color: '#f00'}}>
          Hello
          </Text>
   </View>
        )
    }

}

export default Home;
