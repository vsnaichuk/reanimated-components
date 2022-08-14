import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  withDecay,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import { clamp, Vector } from "../../util";
import { Card, Cards, CARD_HEIGHT, CARD_WIDTH } from "../UI";

export const useTranslate = (vector: Vector<Animated.SharedValue<number>>) =>
  useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: vector.x.value },
        { translateY: vector.y.value },
      ],
    };
  });

type ContextProps = {
  offsetX: number;
  offsetY: number;
};

interface DraggableCardProps {
  width: number;
  height: number;
  translate: {
    x: SharedValue<number>;
    y: SharedValue<number>;
  };
}

export const DraggableCard = ({
  width,
  height,
  translate,
}: DraggableCardProps) => {
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextProps
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translate.x.value;
      ctx.offsetY = translate.y.value;
    },
    onActive: (event, ctx) => {
      translate.x.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translate.y.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: (event) => {
      translate.x.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, boundX],
      });
      translate.y.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, boundY],
      });
    },
  });

  const style = useTranslate(translate);

  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View {...{ style }}>
        <Card card={Cards.Card1} />
      </Animated.View>
    </PanGestureHandler>
  );
};
