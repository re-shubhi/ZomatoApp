import {View, Text, Platform, FlatList} from 'react-native';
import React, {FC} from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import RestaurantHeader from '@components/restaurant/RestaurantHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute, RouteProp} from '@react-navigation/native';
import { useStyles } from 'react-native-unistyles';
import { restaurantHeaderStyles } from '@unistyles/restuarantStyles';
import SortingAndFilters from '@components/home/SortingAndFilters';
import { restaurantItemsData, restaurantsItemfiltersOption } from '@utils/dummyData';
import DottedLine from '@components/ui/DottedLine';
import FoodCard from './FoodCard';

type RouteParams = {
  RestaurantScreen: {item: any}; // Update `any` with the type of your `item` if possible
};

const RestaurantScreen: FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'RestaurantScreen'>>();
  const restaurant = route?.params?.item;
  console.log('restaurant', restaurant); // Debugging statement to verify the data
  const {styles} = useStyles(restaurantHeaderStyles)
  const insets = useSafeAreaInsets();

  const rendeItem = ({item}:any) =>{
    return(
      <FoodCard  item={item} restaurant={restaurant} />
    )

  }

  return (
    <View
      style={{
        height: Platform.OS === 'android' ? insets.top : 0,
        flex: 1,
      }}>
      <CustomSafeAreaView>
        <RestaurantHeader title={restaurant?.name} />
        <View style={styles.sortingContainer}>
          <SortingAndFilters menuTitle='Filter' options={restaurantsItemfiltersOption}/>
        </View>
        <FlatList 
        data={restaurantItemsData}
        renderItem={rendeItem}
        scrollEventThrottle={16}
        keyExtractor={(item)=>item.id}
        ItemSeparatorComponent={()=>(
          <View style={styles.mainPadding}>
            <DottedLine />

          </View>
        )}
        contentContainerStyle={styles.scrollContainer}
        />
      </CustomSafeAreaView>
    </View>
  );
};

export default RestaurantScreen;
