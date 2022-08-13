import React, { forwardRef, useImperativeHandle } from "react";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Dimensions, StyleSheet } from "react-native";

import { Profile, ProfileModel, α } from "./Profile";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { snapPoint } from "../../util";

const { width, height } = Dimensions.get("window");

const A = Math.round(width * Math.cos(α) + height * Math.sin(α));
const snapPoints = [-A, 0, A];

const swipe = (
  translateX: Animated.SharedValue<number>,
  dest: number,
  velocity: number,
  cb: () => void
) => {
  "worklet";
  translateX.value = withSpring(
    dest,
    {
      velocity,
      overshootClamping: dest === 0 ? false : true,
      restSpeedThreshold: dest === 0 ? 0.01 : 100,
      restDisplacementThreshold: dest === 0 ? 0.01 : 100,
    },
    () => {
      if (dest !== 0) {
        runOnJS(cb)();
      }
    }
  );
};

type ContextProps = {
  x: number;
  y: number;
};

export interface Swiper {
  swipeLeft: () => void;
  swipeRight: () => void;
}

interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  onTop: boolean;
}

export const Swiper = forwardRef(
  ({ profile, onTop, onSwipe }: SwiperProps, ref) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      swipeLeft: () => {
        swipe(translateX, -A, 5, onSwipe);
      },
      swipeRight: () => {
        swipe(translateX, A, 5, onSwipe);
      },
    }));

    const onGestureEvent = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      ContextProps
    >({
      onStart: (event, ctx) => {
        ctx.x = translateX.value;
        ctx.y = translateY.value;
      },
      onActive: (event, ctx) => {
        translateX.value = ctx.x + event.translationX;
        translateY.value = ctx.y + event.translationY;
      },
      onEnd: ({ velocityX, velocityY }) => {
        const dest = snapPoint(translateX.value, velocityX, snapPoints);
        swipe(translateX, dest, 5, onSwipe);
        translateY.value = withSpring(0, { velocity: velocityY });
      },
    });

    return (
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Profile
            profile={profile}
            onTop={onTop}
            translateX={translateX}
            translateY={translateY}
          />
          ;
        </Animated.View>
      </PanGestureHandler>
    );
  }
);
