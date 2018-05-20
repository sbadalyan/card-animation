import React, {Component} from "react";
import {
    View,
    Animated, 
    StyleSheet,
    PanResponder, 
    Dimensions,
    LayoutAnimation,
    UIManager} from "react-native";
import CardItem from "./CardItem";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SCREEN_DURATION = 250;

class Cards extends Component {
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    };

    constructor (props) {
        super(props);

        const position = new Animated.ValueXY();
        const prevPosition = new Animated.ValueXY();
        const panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: (event, gesture) => {
              if(
                (this.state.index === this.props.data.length - 1 && gesture.dx < 0) ||
                (this.state.index === 0 && gesture.dx > 0)
              ){
                return;
              }
              if(gesture.dx < 0) {
                position.setValue({x: gesture.dx});
              } else {
                prevPosition.setValue({x: gesture.dx - SCREEN_WIDTH});
              } 
          },
          onPanResponderRelease: (event, gesture) => {
              if(gesture.dx > SWIPE_THRESHOLD){
                this.forceSwipe("right");
              } else if(gesture.dx < -SWIPE_THRESHOLD ){
                this.forceSwipe("left");
              } else{
                this.resetPostion();
              }
          }

        });
        
        this.position = position;
        this.prevPosition = prevPosition;
        this.state = {panResponder, index: 0 };
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        if(
            this.state.index === this.props.data.length - 1 && direction === "left" ||
            this.state.index === 0 && direction === "right"
        ){
          return;
        }
        if(direction === "right"){
            Animated.timing(this.prevPosition, {
                toValue: {x: 0, y: 0},
                duration: SCREEN_DURATION
            }).start(() => this.onSwipeComplete(direction));
        } else {
            Animated.timing(this.position, {
                toValue: {x: -SCREEN_WIDTH, y: 0},
                duration: SCREEN_DURATION
            }).start(() => this.onSwipeComplete(direction));   
        }
   
    }

    onSwipeComplete(direction) {
        const {onSwipeRight, onSwipeLeft} = this.props;
        const item = this.props.data[this.state.index];

        direction === "right" ? onSwipeRight(item): onSwipeLeft(item); 
        this.position.setValue({x: 0, y: 0});
        this.prevPosition.setValue({x: -SCREEN_WIDTH, y: 0});
        const nextIndex = this.state.index + (direction === "right" ? -1 : 1);
        this.setState({index: nextIndex});
        this.props.onChangeIndex(nextIndex);
    }

    resetPostion() {
        Animated.spring(this.position, {
            toValue: {x: 0, y: 0}
        }).start();

        Animated.spring(this.prevPosition, {
            toValue: {x: -SCREEN_WIDTH, y: 0}
        }).start();
    }
    getLayout(index) {
        if(index === this.state.index){
            return this.position.getLayout();
        }
        if(index === this.state.index - 1){
            return this.prevPosition.getLayout();
        }    
    }
    getCardStyle(index) {
        const { position } = this.state;  
        const cardStyle =  {...this.getLayout(index)};
       
        if (index > this.state.index) {
            cardStyle.top =  20 * (index - this.state.index);
            cardStyle.left = 40 * (index - this.state.index);
            cardStyle.opacity = .2;   
        }  

        if(index < this.state.index -1) {
            cardStyle.left = -SCREEN_WIDTH;
        }
        return cardStyle;
    }


    renderCards() {
        return  this.props.data.map((item, i) => {          
            return (
                <Animated.View
                    key={item.id}
                    style={[styles.cardStyle, this.getCardStyle(i)]}
                >                    
                    <CardItem item={item}/>
                </Animated.View>
            );
        }).reverse();
    }

    render () {
        return (
            <View  {... this.state.panResponder.panHandlers}>
               {this.renderCards()}
            </View>
        );
    }

}

export default Cards;

const styles = StyleSheet.create({
    cardStyle: {
        position: "absolute",
        width: SCREEN_WIDTH - 80,  
    }
});