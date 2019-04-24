import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import React from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Factories from './src/components/Factories';
import FactoryDetails from './src/components/FactoryDetails';
import thunk from "redux-thunk";
import Login from './src/components/Login';
import AuthLoadingScreen from './AuthLoading';
import AppReducer from './src/reducers/AppReducer';
import SideMenu from './SideMenu';
import stackNav from './src/components/Home';

const drawernav = createDrawerNavigator({
  Home: {
      screen: Factories,
    },
    Factory: {
        screen: FactoryDetails,
      },
    initialRouteName : 'Home'
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});
const AuthStack = createStackNavigator({ SignIn: Login });

const Sample = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: drawernav,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


class ReduxExampleApp extends React.Component {


 store = createStore(
  AppReducer,
  applyMiddleware(thunk)
);
//  store = createStore(AppReducer);

  render() {
    return (
      <Provider store={this.store}>
        <Sample />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ReduxExample', () => ReduxExampleApp);
export default ReduxExampleApp;
