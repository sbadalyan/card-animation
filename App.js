import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Animated } from "react-native";
import Cards from "./src/Cards";
import Title from "./src/Title";


const DATA = [
    {
        id: 1, 
        title: "Fashion Tolk",
        date: "Nov 24th, 2017", 
        location: "Armenia, Yervan", uri : "https://i2.wp.com/www.peopleofar.com/wp-content/uploads/Stella-Maxwell-Vogue-Russia-October-2015-Editorial02.jpg"
    },
    {
        id: 2,
        title: "Kabali Show", 
        date: "Nov 24th, 2017", 
        location: "Mumbai, India", 
        uri : "http://tamilomovie.com/wp-content/uploads/2016/07/Kabali-4.jpg"
     },
    {
        id: 3,
        title: "Smoke Show",  
        date: "Nov 24th, 2017", 
        location: "Berlin, Germany", 
        uri : "https://i.pinimg.com/originals/3e/e1/7e/3ee17e5caccf9f16c312238c90f3a8b1.jpg"
    }
];

export default class App extends React.Component {
    state = {
        currentIndex: 0,
    }

    onChangeIndex = (index) => {
        this.setState({currentIndex: index});
    }

    render() {
        return (
            <View style={styles.container}>  
                <View style={styles.title}>
                    <Title
                        data={DATA}
                        currentIndex={this.state.currentIndex}
                    /> 
                </View>         
                <Cards
                    data={DATA}
                    onChangeIndex={this.onChangeIndex}
                /> 
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContet: "center",
        aligneItema: "center",
        margin: 20
    },
    title: {
        width: "100%",
        height: 100, 
        padding: 20
    }  
});
