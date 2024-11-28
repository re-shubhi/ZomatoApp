import {View, Text, Platform} from 'react-native';
import React, {FC} from 'react';
import {homeStyles} from '@unistyles/homeStyles';
import {useStyles} from 'react-native-unistyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSharedState} from '@features/tabs/SharedContext';
import HeaderSection from '@components/home/HeaderSection';
import Graphics from '@components/home/Graphics';

const DeliveryScreen: FC = () => {
  const insets = useSafeAreaInsets();
  const {styles} = useStyles(homeStyles);
  const {scrollYGlobal} = useSharedState();

  const backgroundColourChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [1, 50], [0, 1]);
    return {
      backgroundColor: `rgba(255,255,255,${opacity})`,
    };
  });

  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 50],
      [0, -50],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY: translateY}],
    };
  });

  const moveUpStyleNotExtrapolate = useAnimatedStyle(() => {
    const translateY = interpolate(scrollYGlobal.value, [0, 50], [0, -50]);
    return {
      transform: [{translateY: translateY}],
    };
  });

  return (
    <View style={styles.container}>
      <View style={{height: Platform.OS === 'android' ? insets.top : 0}} />
      <Animated.View style={[moveUpStyle]}>
        <Animated.View style={[moveUpStyleNotExtrapolate]}>
          <Graphics />
        </Animated.View>
        <Animated.View
          style={[backgroundColourChanges, styles.topHeader]}>
            <HeaderSection />
          </Animated.View>
      </Animated.View>
    </View>
  );
};

export default DeliveryScreen;
