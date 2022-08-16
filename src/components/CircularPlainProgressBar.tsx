import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { CircularProgress } from "./Animated/CircularProgress";

const { width } = Dimensions.get("window");

export const { PI } = Math;
export const TAU = 2 * PI;
export const RADIUS = width / 2 - 16;
export const STROKE_WIDTH = 100;
export const COLOR_FG = "green";
export const COLOR_BG = "white";

export const CircularPlainProgressBar = () => {
  const progress = useSharedValue(0);
  const theta = useDerivedValue(() => progress.value * 1.3 * PI);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <CircularProgress
          bg={COLOR_BG}
          fg={COLOR_FG}
          {...{ progress, theta }}
        />
      </View>
      <View style={styles.overlay}>
        <View
          style={{
            width: RADIUS * 2 - STROKE_WIDTH,
            height: RADIUS * 2 - STROKE_WIDTH,
            borderRadius: RADIUS - STROKE_WIDTH / 2,
            backgroundColor: COLOR_BG,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: `${-0.15 * PI}rad` }],
  },
});
