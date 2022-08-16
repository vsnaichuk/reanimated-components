import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const PI = Math.PI;
const RADIUS = width / 2 - 16;

interface HalfCircleProps {
  color: string;
}

export const HalfCircle = ({ color }: HalfCircleProps) => {
  return (
    <View
      style={{
        width: RADIUS * 2,
        height: RADIUS,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: color,
          width: RADIUS * 2,
          height: RADIUS * 2,
          borderRadius: RADIUS,
        }}
      />
    </View>
  );
};


interface CircularProgressProps {
  theta: Animated.DerivedValue<number>;
  bg: string;
  fg: string;
}

export const CircularProgress = ({ theta, bg, fg }: CircularProgressProps) => {

  const transformTopStyles = useAnimatedStyle(() => ({
    transform: [
      { translateY: RADIUS / 2 },
      { rotate: `${theta.value}rad` },
      { translateY: -RADIUS / 2 }
    ],
  }))
  const transformBottomStyles = useAnimatedStyle(() => ({
    transform: [
      { translateY: RADIUS / 2 },
      { rotate: `${interpolate(theta.value, [PI, 2 * PI], [0, PI], Extrapolate.CLAMP)}rad` },
      { translateY: -RADIUS / 2 }
    ],
  }))
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: theta.value < PI ? 1 : 0,
  }))

  return (
    <>
      <View style={{ zIndex: 1 }}>
        <HalfCircle color={fg} />
        <Animated.View
          style={[StyleSheet.absoluteFillObject, transformTopStyles, opacityStyles]}
        >
          <HalfCircle color={bg} />
        </Animated.View>
      </View>

      <View style={{ transform: [{ rotate: "180deg" }] }}>
        <HalfCircle color={fg} />
        <Animated.View
          style={[StyleSheet.absoluteFillObject, transformBottomStyles]}
        >
          <HalfCircle color={bg} />
        </Animated.View>
      </View>
    </>
  );
};
