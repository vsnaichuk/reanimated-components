import React from "react";
import { StyleSheet } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DynamicSpring } from "./src/components/DynamicSpring";

//FIXME: https://github.com/software-mansion/react-native-reanimated/issues/3321

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DynamicSpring />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
