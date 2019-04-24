

import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { loginUser, postLoginError } from './actions/place';
import Home from './components/Home';
import Login from './components/Login';


class Main extends Component {
  constructor(props) {
     super(props);
     this.state = { text: '', username: '', password: '', };
   }

    render() {
        return (
          <View id="1" style={{padding: 10}}>
          {this.props.userdetails.username ? <Home /> : <Login postLoginError={this.props.postLoginError} loginUser={this.props.loginUser} />}
          <Text style={{padding: 10, fontSize: 42, color: '#f00'}}>
          {this.props.errormessage}
          </Text>
   </View>
        )
    }

}

const mapStateToProps = state => {
  return {
    userdetails: state.sample.userdetails,
    errormessage: state.sample.errormessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (data) => {
      dispatch(loginUser(data));
    },
    postLoginError: (message) => {
      dispatch(postLoginError(message));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
