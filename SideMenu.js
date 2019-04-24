import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
//import { clearData } from '../src/actions/place';
import {clearData} from './src/actions/place';

class SideMenu extends Component {
  navigateToScreen = (route,args) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: args,
      key: args.itemId
    });

    this.props.navigation.dispatch(navigateAction);
  }

  clearDataAndLogout = () => {
    this.props.clearData();
    this.props.navigation.navigate("Auth");
  }

  render () {
    return (
      <View style={styles.container}>
      <Text style={styles.sectionHeadingStyle}>
                   Menu
      </Text>
        <ScrollView>
        <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home', {
                    })} >
                    HOME
                    </Text>
      {  this.props.factories.map((factory) =>

      <Text key={factory.id} style={styles.navItemStyle} onPress={this.navigateToScreen('Factory', {
                    itemId: factory.id
                  })} >
                  {factory.name}
                  </Text>

      )}
      <Text style={styles.navItemStyle} onPress={this.clearDataAndLogout} >
                  Sign Out
                  </Text>
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
    },
    clearData: () => {
      dispatch(clearData());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
