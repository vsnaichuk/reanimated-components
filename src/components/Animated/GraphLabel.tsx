/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { round } from "../../util";
import { AnimatedText } from "./AnimatedText";

import { StyleGuide } from "../UI";

const styles = StyleSheet.create({
  date: {
    ...StyleGuide.typography.title3,
    textAlign: "center",
  },
  price: {
    ...StyleGuide.typography.title2,
    textAlign: "center",
  },
});

console.log({ styles });

export interface DataPoint {
  coord: {
    x: number;
    y: number;
  };
  data: {
    x: number;
    y: number;
  };
}

interface GraphLabelProps {
  point: Animated.SharedValue<DataPoint>;
}

export const GraphLabel = ({ point }: GraphLabelProps) => {
  const date = useDerivedValue(() => {
    const d = new Date(point.value.data.x);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  const price = useDerivedValue(() => {
    const p = point.value.data.y;
    return `$ ${round(p, 2).toLocaleString("en-US", { currency: "USD" })}`;
  });
  return (
    <View>
      <AnimatedText style={styles.date} text={date} />
      <AnimatedText style={styles.price} text={price} />
    </View>
  );
};
