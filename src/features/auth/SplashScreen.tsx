import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {splashStyles} from '@unistyles/authStyles';
import Animated, {FadeInDown} from 'react-native-reanimated';
import CustomText from '@components/global/CustomText';

const SplashScreen: FC = () => {
  const {styles} = useStyles(splashStyles);

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <Image
        source={require('@assets/images/logo_t.png')}
        style={styles.logoImage}
      />
      <Animated.View
        style={styles.animatedContainer}
        entering={FadeInDown.delay(400).duration(800)}>
        <Image
          source={require('@assets/images/tree.png')}
          style={styles.treeImage}
        />

        <CustomText
          variant="h4"
          style={styles.msgText}
          fontFamily="Okra-Medium"
          color="#fff">
          Carbon and Plastic Neutral Deliveries in India
        </CustomText>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
