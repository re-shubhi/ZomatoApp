import {
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {loginStyles} from '@unistyles/authStyles';
import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import PhoneInput from '@components/ui/PhoneInput';
import SocialLogin from '@components/ui/SocialLogin';
import {resetAndNavigate} from '@utils/NavigationUtils';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';

const LoginScreen: FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyoardOffSetHeight = useKeyboardOffsetHeight();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const {styles} = useStyles(loginStyles);

  useEffect(() => {
    if (keyoardOffSetHeight === 0) {
      Animated.timing(animatedValue,{
        toValue:0,
        duration:500,
        useNativeDriver:true
      }).start()
    } else {
      Animated.timing(animatedValue,{
        toValue:-keyoardOffSetHeight*0.25,
        duration:500,
        useNativeDriver:true
      }).start()
    }
  });

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resetAndNavigate('UserBottomTab');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS === 'android'} />
      <Image
        source={require('@assets/images/login.png')}
        style={styles.cover}
      />
      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'on-drag'}
        style={{transform:[{translateY:animatedValue}]}}
        contentContainerStyle={styles.bottomContainer}>
        <CustomText variant="h2" fontFamily="Okra-Bold" style={styles.title}>
          India's #1 Food Delivery App and Dining App
        </CustomText>
        <BreakerText text="Log in or sign up" />
        <PhoneInput
          onFocus={() => {}}
          onBlur={() => {}}
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          disabled={loading}
          onPress={handleLogin}
          activeOpacity={0.5}>
          {loading ? (
            <ActivityIndicator size="small" color={'#fff'} />
          ) : (
            <CustomText color="#ffff" fontFamily="Okra-Medium" variant="h5">
              Continue
            </CustomText>
          )}
        </TouchableOpacity>

        <BreakerText text="or" />
        <SocialLogin />
      </Animated.ScrollView>
      <View style={styles.footer}>
        <CustomText>By continuing you agree to our</CustomText>
        <View style={styles.footerTextContainer}>
          <CustomText style={styles.footerText}>Terms of Service</CustomText>
          <CustomText style={styles.footerText}>Privacy Policy</CustomText>
          <CustomText style={styles.footerText}>Content Policies</CustomText>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
