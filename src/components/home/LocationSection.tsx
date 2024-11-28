import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {useSharedState} from '@features/tabs/SharedContext';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';

const LocationSection: FC = () => {
  const {scrollYGlobal} = useSharedState();
  const {styles} = useStyles(homeStyles);
  const textColor = '#ffff';
  const opacityFadingStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
    return {
      opacity: opacity,
    };
  });
  return (
    <Animated.View style={[opacityFadingStyle]}>
      <SafeAreaView />
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRowGap}>
          <Icon
            iconFamily="MaterialCommunityIcons"
            name="map-marker"
            color={textColor}
            size={32}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.flexRow}>
            <CustomText color={textColor} fontFamily="Okra-Bold" variant="h5">
              Noida, India
            </CustomText>
            <Icon
              name="chevron-down"
              color={textColor}
              iconFamily="MaterialCommunityIcons"
              size={18}
            />
          </TouchableOpacity>
          <CustomText color={textColor} fontFamily="Okra-Medium">
            Lucknow,India
          </CustomText>
        </View>

        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.translation}>
            <Image
              source={require('@assets/icons/translation.png')}
              style={styles.translationIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileAvatar}>
            <Image
              source={require('@assets/icons/golden_circle.png')}
              style={styles.goldenCircle}
            />
            <Image
              source={require('@assets/images/user.jpg')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default LocationSection;
