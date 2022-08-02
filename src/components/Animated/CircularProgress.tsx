import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { StyleGuide } from "../UI";

const { PI } = Math;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  theta: Animated.SharedValue<number>;
  r: number;
  strokeWidth: number;
}

export const CircularProgress = ({
  r,
  strokeWidth,
  theta,
}: CircularProgressProps) => {
  const radius = r - strokeWidth / 2;
  const circumference = radius * 2 * PI;
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: theta.value * radius,
    };
  });
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
      <AnimatedCircle
        animatedProps={animatedProps}
        cx={r}
        cy={r}
        fill="transparent"
        stroke="white"
        r={radius}
        {...{ strokeWidth }}
      />
      <AnimatedCircle
        animatedProps={animatedProps}
        cx={r}
        cy={r}
        fill="transparent"
        r={radius}
        stroke={StyleGuide.palette.primary}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{ strokeWidth }}
      />
    </Svg>
  );
};
