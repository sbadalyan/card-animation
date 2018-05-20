import React, {Component} from "react";
import { View,  Image, StyleSheet, Animated } from "react-native";

 class CardItem extends Component {

    render() {
       const { item } = this.props;
       return( 
            <View key={item.id}>
                <Image 
                    style={styles.image}
                    source={{uri: item.uri}}
                />
            </View>
        );
    }

}

export default CardItem;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 400,
        borderRadius: 10
    }
});