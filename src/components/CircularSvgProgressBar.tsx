import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";

import Svg, { Circle } from "react-native-svg";
import { AnimatedText } from "./Animated/AnimatedText";

const BACKGROUND_COLOR = "#FFFFFF";
const BACK_STROKE_COLOR = "#E5E5E5";
const FRONT_STROKE_COLOR = "#C4E851";
const STROKE_WIDTH = 9;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularSvgProgressBar = ({
  width = 213,
  height = 191,
  percent = 1,
}) => {
  const progress = useSharedValue(0);
  const radius = (width - STROKE_WIDTH) / 2;
  const length = 2 * Math.PI * radius;

  useEffect(() => {
    progress.value = withTiming(percent, { duration: 1000 });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const offset = interpolate(progress.value, [0, 1], [length, length * 0.3]);
    return {
      strokeDashoffset: withSpring(offset),
    };
  });

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: width,
          height: height,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            width: width,
            height: width,
            transform: [{ rotate: `${0.77 * Math.PI}rad` }],
          }}
        >
          <Svg width={width} height={width}>
            <Circle
              cx={width / 2}
              cy={width / 2}
              r={radius}
              stroke={BACK_STROKE_COLOR}
              strokeWidth={STROKE_WIDTH / 2}
              strokeDasharray={length}
              strokeDashoffset={length * 0.3}
              strokeLinecap="round"
              fill={BACKGROUND_COLOR}
            />
            <AnimatedCircle
              cx={width / 2}
              cy={width / 2}
              r={radius}
              stroke={FRONT_STROKE_COLOR}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={length}
              animatedProps={animatedProps}
              strokeLinecap="round"
              fill={BACKGROUND_COLOR}
            />
          </Svg>
        </View>

        <AnimatedText style={styles.text} text={progressText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    zIndex: 1,
    fontSize: 46,
    lineHeight: 63,
    fontWeight: "600",
    textAlign: "center",
    paddingLeft: 8,
  },
});
