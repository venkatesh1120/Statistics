import React,{Component} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { PieChart } from 'react-native-svg-charts'

class PieChartExample extends Component {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

        return (
        <View style={styles.viewBackground}>
        <View style={styles.view1}>
        <Text style = {styles.red}>Hello world!!</Text>
        </View>
        <View style={styles.view2}>
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
            />
            </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
red:{
color: 'orange'},
blackblue:{
color: 'blue'},
viewBackground:{
backgroundColor: 'orange',
flex: 2
},
view1:{
backgroundColor: 'transparent'},
view2:{
backgroundColor: 'transparent'}
})


export default PieChartExample;
