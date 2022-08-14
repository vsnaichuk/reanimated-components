import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { DraggableCard } from "./Animated/DraggableCard";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "./UI";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

export const DynamicSpring = () => {
  const translate = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };

  const translateX2 = useDerivedValue(() => withSpring(translate.x.value));
  const translateY2 = useDerivedValue(() => withSpring(translate.y.value));

  const translate2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX2.value },
      { translateY: translateY2.value },
    ],
  }));

  const translate3 = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(translateX2.value) },
      { translateY: withSpring(translateY2.value) },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, translate3]}>
        <Card card={Cards.Card3} />
      </Animated.View>
      <Animated.View style={[styles.card, translate2]}>
        <Card card={Cards.Card2} />
      </Animated.View>
      <DraggableCard {...{ width, height, translate }} />
    </View>
  );
};
