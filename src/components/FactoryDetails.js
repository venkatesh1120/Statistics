

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
import { fetchFactoryDetails, setSelectedItem } from '../actions/place';

class Factories extends Component {
  constructor(props) {
     super(props);
     this.state = { selectedItem: null, markets: []};
     // this.selectedItem = null;
     this.fetchFactoryDetails();
   }

   fetchFactoryDetails = () => {
    this.props.fetchFactoryDetails(this.props.userdetails.token, this.props.navigation.getParam('itemId'));
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

      this.setState({markets:   responseJson});

     });
   }

  //  const factMarkets = this.props.factory.markets;
  // const marketsList = responseJson.filter(function(value){
  //   return factMarkets.indexOf(parseInt(value.id)) > -1;
  // });

render() {

  let totalData = {};
  let keys = Object.keys(this.props.factory.statistics);
  let currentSelectedItem = this.props.selectedItem ? this.props.selectedItem : keys[0] || null;
   const factMarkets = this.props.factory.markets;
  let marketsList = [];
  console.log("markets list");
  console.log(factMarkets);
  if(factMarkets){
  marketsList = this.props.markets.filter(function(value){
    return factMarkets.indexOf(parseInt(value.id)) > -1;
  });
}
  if(currentSelectedItem && this.props.factory.statistics[currentSelectedItem])
  {

    let data = []
    const sample = this.props.factory.statistics[currentSelectedItem];
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
  else {
    this.currentSelectedItem = null;
  }
    const mapLabels = Object.keys(this.props.factory.statistics).map(function(s){ return s; });
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
        selectedValue={this.props.selectedItem}
  style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>{
    //this.selectedItem= itemValue;
    this.props.setSelectedItem(itemValue);
    this.setState({ markets: []});}
  }>
{   Object.keys(this.props.factory.statistics).map(function(s){ return <Picker.Item key={s} label={s} value={s} /> })}
</Picker>
{currentSelectedItem && totalData.data  ? <StackedBarChart
data={totalData}
width={Dimensions.get('window').width}
height={220}
chartConfig={chartConfig}
/> : null}
{
marketsList.length > 0 ?
  marketsList.map(function(s, index){ return <Text key={index}>{s.name}</Text>; }) :
null
}


        </View>
        )
    }

}

const mapStateToProps = state => {
  return {
    userdetails: state.sample.userdetails,
    factory: state.sample.factory,
    markets: state.sample.markets,
    selectedItem: state.sample.selectedItem,
    errormessage: state.sample.errormessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFactoryDetails: (token, itemId) => {
      dispatch(fetchFactoryDetails(token, itemId));
    },
    setSelectedItem: (item) => {
      dispatch(setSelectedItem(item));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Factories);
