import React from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

const SQUARE_SIZE = 100;
const CIRCLE_SIZE = 400;

type ContextType = {
  translateX: number;
  translateY: number;
};

export function PanGestureHandlerBasics() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.translateX;
      translateY.value = event.translationY + ctx.translateY;

      // console.log("🚀 ~ translateX.value", translateX.value)
      // console.log("🚀 ~ translateY.value", translateY.value)
    },
    onEnd: (event) => {
      console.log(event);
      const distance = Math.sqrt(
        (0 - translateX.value) ** 2 + (0 - translateY.value) ** 2
      );

      if (distance < CIRCLE_SIZE / 2 + SQUARE_SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedSquareStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }),
    []
  );

  return (
    <View style={s.container}>
      <View style={s.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[s.square, animatedSquareStyle]}
          ></Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: "rgba(0, 0, 256, 0.5)",
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 5,
    borderColor: "rgba(0, 0, 256, 0.5)",
  },
});
