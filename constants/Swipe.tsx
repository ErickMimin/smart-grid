import React from "react";
import { PanResponder, useWindowDimensions } from "react-native";

const Swipe = ({swipeLeft, swipeRight}: any) => {
    const {width: windowWidth} = useWindowDimensions();
    return React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                    if(Math.abs(gestureState.dx) > windowWidth * 0.5){
                        if(gestureState.dx > 0 && swipeLeft)
                            swipeLeft();
                        else if(swipeRight)
                            swipeRight();
                    }
                }
            })
        ).current;
}

export default Swipe;