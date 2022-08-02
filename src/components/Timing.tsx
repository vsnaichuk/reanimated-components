import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { withPause } from "../util";

import { Button, StyleGuide } from "./UI";
import { ChatBubble } from "./Animated/ChatBubble";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background,
  },
});

export const Timing = () => {
  const [play, setPlay] = useState(false);
  const paused = useSharedValue(!play);
  const progress = useSharedValue<number>(0);

  return (
    <View style={styles.container}>
      <ChatBubble progress={progress} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => {
          setPlay((prev) => !prev);
          paused.value = !paused.value;

          if (progress.value === 0) {
            progress.value = withPause(
              withRepeat(
                withTiming(1, {
                  duration: 1000,
                  easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true
              ),
              paused
            );
          }
        }}
      />
    </View>
  );
};
