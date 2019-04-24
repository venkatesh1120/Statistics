import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
    this.props.navigation.navigate(this.props.userdetails.username ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
      <Text style={{padding: 10, fontSize: 42}}>
    Loading
    </Text>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
