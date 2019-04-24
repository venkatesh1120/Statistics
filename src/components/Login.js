
import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { loginUser, postLoginError } from '../actions/place';


class Login extends Component {
  constructor(props) {
     super(props);
     this.state = { text: '', username: 'sandra', password: 'password', };
     this.checkNavigation();
   }

   checkNavigation = () => {
     this.props.navigation.navigate(this.props.userdetails.username ? 'App' : 'Auth');
   }

   DoLogin = () => {
      fetch('https://code-challenge.quizrr.se/api/auth/signin', {
    method: 'POST',
    headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     username: this.state.username,
     password: this.state.password,
    }),
    }).then((response) => response.json())
     .then((responseJson) => {
       if(responseJson.message)
       {
         this.props.postLoginError(responseJson.message);
       }
      else
       {
         this.props.loginUser(responseJson);
         this.props.navigation.navigate(responseJson.username ? 'App' : 'Auth');
       }
     });
   }

    render() {
        return (
          <View id="1" style={{padding: 10}}>
          <Text style={{padding: 10, fontSize: 42}}>
        Username:
        </Text>
     <TextInput
       style={{height: 40}}
       onChangeText={(text) => this.setState({username: text})}
       value={this.state.username}
     />
     <Text style={{padding: 10, fontSize: 42}}>
     Password:
   </Text>
<TextInput
  style={{height: 40}}
  onChangeText={(text) => this.setState({password: text})}
  value={this.state.password}
/>
<Button
onPress={this.DoLogin}
  title="Login"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
