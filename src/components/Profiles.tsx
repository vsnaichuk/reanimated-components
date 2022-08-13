import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import { StyleGuide } from "./UI";

import { ProfileModel } from "./Animated/Profile";
import { Swiper } from "./Animated/Swiper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "space-evenly",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cards: {
    flex: 1,
    marginHorizontal: 16,
    zIndex: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});

export const PROFILES: ProfileModel[] = [
  {
    id: "1",
    name: "Caroline",
    age: 24,
    profile: require("../../assets/1.jpg"),
  },
  {
    id: "2",
    name: "Jack",
    age: 30,
    profile: require("../../assets/2.jpg"),
  },
  {
    id: "3",
    name: "Anet",
    age: 21,
    profile: require("../../assets/3.jpg"),
  },
  {
    id: "4",
    name: "John",
    age: 28,
    profile: require("../../assets/4.jpg"),
  },
];

export const Profiles = () => {
  const [profiles, setProfiles] = useState(PROFILES);
  const swiperRef = useRef<Swiper>(null);

  const onSwipe = useCallback(() => {
    setProfiles(profiles.slice(0, profiles.length - 1));
  }, [profiles]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="user" size={32} color="gray" />
        <Icon name="message-circle" size={32} color="gray" />
      </View>
      <View style={styles.cards}>
        {profiles.map((profile, index) => {
          const onTop = index === profiles.length - 1;
          return (
            <Swiper
              ref={swiperRef}
              key={profile.id}
              profile={profile}
              onSwipe={onSwipe}
              onTop={onTop}
            />
          );
        })}
      </View>
      <View style={styles.footer}>
        <RectButton
          style={styles.circle}
          onPress={() => swiperRef.current?.swipeLeft()}
        >
          <Icon name="x" size={32} color="#ec5288" />
        </RectButton>
        <RectButton
          style={styles.circle}
          onPress={() => swiperRef.current?.swipeRight()}
        >
          <Icon name="heart" size={32} color="#6ee3b4" />
        </RectButton>
      </View>
    </SafeAreaView>
  );
};
