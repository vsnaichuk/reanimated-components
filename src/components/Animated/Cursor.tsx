import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { canvas2Polar, clamp, polar2Canvas } from "../../util";

import { StyleGuide } from "../UI";

const THRESHOLD = 0.001;

type ContextProps = {
  offset: {
    x: number;
    y: number;
  };
};

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: SharedValue<number>;
}

export const Cursor = ({ r, strokeWidth, theta }: CursorProps) => {
  const center = { x: r, y: r };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextProps
  >({
    onStart: (event, ctx) => {
      ctx.offset = polar2Canvas({ theta: theta.value, radius: r }, center);
    },
    onActive: (event, ctx) => {
      const x = ctx.offset.x + event.translationX;
      const y1 = ctx.offset.y + event.translationY;
      let y: number;
      if (x < r) {
        y = y1;
      } else if (theta.value < Math.PI) {
        y = clamp(y1, 0, r - THRESHOLD);
      } else {
        y = clamp(y1, r, 2 * r);
      }
      const value = canvas2Polar({ x, y }, center).theta;
      theta.value = value > 0 ? value : 2 * Math.PI + value;
    },
    onEnd: (event, ctx) => {},
  });

  const style = useAnimatedStyle(() => {
    const { x, y } = polar2Canvas({ theta: theta.value, radius: r }, center);
    return {
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            borderColor: "white",
            borderWidth: 5,
            backgroundColor: StyleGuide.palette.primary,
          },
          style,
        ]}
      />
    </PanGestureHandler>
  );
};
