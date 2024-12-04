import {View, Text, Platform} from 'react-native';
import React, {FC} from 'react';
import {useRoute} from '@react-navigation/native';
import {useStyles} from 'react-native-unistyles';
import {restaurantHeaderStyles} from '@unistyles/restuarantStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';

const RestaurantScreen: FC = () => {
  const route = useRoute() as any;
  const restaurant = route?.params?.item;
  const {styles} = useStyles(restaurantHeaderStyles);
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={{height: Platform.OS === 'android' ? insets.top : 0}}>

        <CustomSafeAreaView> 

        </CustomSafeAreaView>
      </View>
    </>
  );
};

export default RestaurantScreen;
