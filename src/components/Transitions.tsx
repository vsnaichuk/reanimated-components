import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { StyleGuide, cards, Button } from "./UI";

import { AnimatedCard } from "./Animated/AnimatedCard";
import {
  useDerivedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

function useSpring(state: boolean | number, config?: WithSpringConfig) {
  return useDerivedValue(() => withSpring(state ? 1 : 0, config));
}

export const UseTransition = () => {
  const [toggled, setToggle] = useState(false);
  const transition = useSpring(toggled);

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
    </View>
  );
};
