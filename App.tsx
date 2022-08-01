import React from "react";
import { StyleSheet } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PanGesture } from "./src/components/PanGesture";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGesture />
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
