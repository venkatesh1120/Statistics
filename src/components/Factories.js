

import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchFactories, getMarketDetails } from '../actions/place';

class Factories extends Component {
  constructor(props) {
     super(props);
     this.fetchFactories();
   }

   fetchFactories = () => {
     this.props.fetchFactories(this.props.userdetails.token);
     this.props.getMarketDetails(this.props.userdetails.token);
   }

    render() {
        return (
          <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}>
        <Text style={{padding: 10, fontSize: 42, color: '#f00'}}>
        List of Factories:
        </Text>
  {  this.props.factories.map((factory) =>
    <Button
    key={factory.id}
title={factory.name}
onPress={ () => {
  this.props.navigation.navigate('Factory', {
                itemId: factory.id
              })
}}
color="#841584"
/>
)}
        </View>
        )
    }

}

const mapStateToProps = state => {

  return {
    userdetails: state.sample.userdetails,
    factories: state.sample.factories,
    errormessage: state.sample.errormessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFactories: (token) => {
      dispatch(fetchFactories(token));
    },
    getMarketDetails: (token) => {
      dispatch(getMarketDetails(token));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Factories);
