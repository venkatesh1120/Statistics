

import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, Picker, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';

class Factories extends Component {
  constructor(props) {
     super(props);
     this.state = {factory: {statistics: {}}, selectedItem: null, markets: []};
     this.fetchFactoryDetails();
   }

   fetchFactoryDetails = () => {
      fetch('https://code-challenge.quizrr.se/api/factory/'+this.props.navigation.getParam('itemId'), {
    method: 'GET',
    headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
     Authorization: "Bearer " + this.props.userdetails.token
    },
    }).then((response) => response.json())
     .then((responseJson) => {

      this.setState({factory:   responseJson});
     });
   }

   getMarketDetails = () => {
      fetch('https://code-challenge.quizrr.se/api/market', {
    method: 'GET',
    headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
     Authorization: "Bearer " + this.props.userdetails.token
    },
    }).then((response) => response.json())
     .then((responseJson) => {
        const factMarkets = this.state.factory.markets;
       const marketsList = responseJson.filter(function(value){
         return factMarkets.indexOf(parseInt(value.id)) > -1;
       });
      this.setState({markets:   marketsList});

     });
   }

render() {
  let totalData = {};
  let keys = Object.keys(this.state.factory.statistics);
  let currentSelectedItem = this.state.selectedItem ? this.state.selectedItem : keys[0] || null;

  if(currentSelectedItem)
  {
    let data = []
    const sample = this.state.factory.statistics[currentSelectedItem];
    const mapLabels = Object.keys(sample).map(function(s){
        data.push([sample[s].count.male, sample[s].count.female]);
        return s;
      });


    totalData ={
  labels: mapLabels,
  legend: ["male", "female"],
  data: data,
  barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  };
  }
    const mapLabels = Object.keys(this.state.factory.statistics).map(function(s){ return s; });
      const data ={
    labels: ['Test1', 'Test2'],
    legend: ['L1', 'L2', 'L3'],
    data: [
    [60, 60, 60],
    [30,30,60],
    ],
    barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
    };
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2 
    }
        return (
          <View >
        <Picker
  style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({selectedItem: itemValue, markets: []})
  }>
{   Object.keys(this.state.factory.statistics).map(function(s){ return <Picker.Item key={s} label={s} value={s} /> })}
</Picker>
{currentSelectedItem ? <StackedBarChart
data={totalData}
width={Dimensions.get('window').width}
height={220}
chartConfig={chartConfig}
/> : null}
{
this.state.markets.length > 0 ?
  this.state.markets.map(function(s, index){ return <Text key={index}>{s.name}</Text>; }) :
<Button
title="Click for market details"
onPress={ () => {
this.getMarketDetails();
}}
color="#841584"
/>

}


        </View>
        )
    }

// render() {
// const mapLabels = Object.keys(this.state.factory.statistics).map(function(s){ return s; }
//   const data ={
// labels: ['Test1', 'Test2'],
// legend: ['L1', 'L2', 'L3'],
// data: [
// [60, 60, 60],
// [30,30,60],
// ],
// barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
// };
// const chartConfig = {
//   backgroundGradientFrom: '#1E2923',
//   backgroundGradientTo: '#08130D',
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//   strokeWidth: 2 // optional, default 3
// }
//         return (
//           <StackedBarChart
// data={data}
// width={Dimensions.get('window').width}
// height={220}
// chartConfig={chartConfig}
// />
// );
//     }

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

export default connect(mapStateToProps, mapDispatchToProps)(Factories);
