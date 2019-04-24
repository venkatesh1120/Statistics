import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

class SideMenu extends Component {
  navigateToScreen = (route,args) => () => {
    console.log("item clickd");
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: args
    });
    console.log(this.props);
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
      <Text style={styles.sectionHeadingStyle}>
                   Menu
      </Text>
        <ScrollView>
      {  this.props.factories.map((factory) =>

      <Text key={factory.id} style={styles.navItemStyle} onPress={this.navigateToScreen('Factory', {
                    itemId: factory.id
                  })} >
                  {factory.name}
                  </Text>

      )}
        </ScrollView>
      </View>
    );
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
