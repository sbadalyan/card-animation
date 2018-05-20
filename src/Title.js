import React, {Component} from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Entypo } from "@expo/vector-icons";

 class Title extends Component {     
 
    getItem(index) {
        return this.props.data[index];
    }

    render() {
        const { data, currentIndex } = this.props;    
        const currentTitleStyle = {opacity: 1, top: 30};       
        return data.map((item, index) => {
            const itemStyles = [styles.title];
            if (index === currentIndex) {
                itemStyles.push(currentTitleStyle);
            } 
            return (
                <Animated.View key={item.id} style={itemStyles}>
                    <View>
                        <Text style={styles.titleText}>{item.title}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <Entypo name="location" size={12}/>
                        <Text style={styles.location}>{item.location}</Text>
                    </View>
                </Animated.View>
            );
        });    
    }

}

export default Title;

const styles = StyleSheet.create({
    title: {
        position: "absolute",
        top: 0,
        opacity: 0,
        paddingLeft: 20,
        paddingRight: 20
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    location: {
        fontSize: 12,
        paddingLeft: 10
    }
});