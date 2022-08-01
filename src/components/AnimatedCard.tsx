import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Card, Cards, StyleGuide } from "./UI";

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

interface AnimatedCardProps {
  transition: any; //TODO: add type
  index: number;
  card: Cards;
}

export const AnimatedCard = ({
  index,
  card,
  transition,
}: AnimatedCardProps) => {
  const style = useAnimatedStyle(() => {
    const rotate = interpolate(
      transition.value,
      [0, 1],
      [0, ((index - 1) * Math.PI) / 6]
    );

    return {
      transform: [
        { translateX: origin },
        { rotate: `${rotate}rad` },
        { translateX: -origin },
      ],
    };
  });
  return (
    <Animated.View key={card} style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};
