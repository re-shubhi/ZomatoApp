import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';
import RollingContent from 'react-native-rolling-bar';
import CustomText from '@components/global/CustomText';
import {setVegMode} from '@states/reducers/userSlice';

const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const searchItems: string[] = [
    'Search "chai samosa',
    'Search "chai samosa',
    'Search "biryani',
    'Search "chicken',
    'Search "chai cakes',
  ];
  const isVegMode = useAppSelector(state => state.user.isVegMode);
  const {styles} = useStyles(homeStyles);
  const {scrollYGlobal} = useSharedState();

  const textColorAnimation = useAnimatedStyle(() => {
    const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0]);
    return {
      color: `rgb(${textColor},${textColor},${textColor})`,
    };
  });

  return (
    <>
      <SafeAreaView />
      <View style={[styles.flexRowBetween, styles.padding]}>
        <TouchableOpacity
          style={styles.searchInputContainer}
          activeOpacity={0.8}>
          <Icon
            name="search"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
            iconFamily="Ionicons"
          />

          <RollingContent
            interval={3000}
            defaultStyle={false}
            customStyle={styles.textContainer}>
            {searchItems.map((item, index) => (
              <CustomText
                fontFamily="Okra-Medium"
                fontSize={12}
                key={index}
                style={styles.rollingText}>
                {item}
              </CustomText>
            ))}
          </RollingContent>
          <Icon
            name="mic-outline"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
            iconFamily="Ionicons"
          />
        </TouchableOpacity>
        <Pressable
          style={styles.vegMode}
          onPress={() => {
            dispatch(setVegMode(!isVegMode));
          }}>
          <Animated.Text style={[textColorAnimation, styles.animatedText]}>
            VEG
          </Animated.Text>
          <Animated.Text style={[textColorAnimation, styles.animatedSubText]}>
            MODE
          </Animated.Text>

          <Image
            source={
              isVegMode
                ? require('@assets/icons/switch_on.png')
                : require('@assets/icons/switch_off.png')
            }
            style={styles.switch}
          />
        </Pressable>
      </View>
    </>
  );
};

export default SearchBar;
