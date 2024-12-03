import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '@unistyles/cardStyles';
import {recommendedListData} from '@utils/dummyData';
import ScalePress from '@components/ui/ScalePress';
import {navigate} from '@utils/NavigationUtils';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import CustomGradient from '@components/global/CustomGradient';

const RecommendedList = () => {
  const {styles} = useStyles(cardStyles);

  const renderItem = ({item}: any) => {
    return (
      <ScalePress
        style={styles.itemContainer}
        onPress={() => navigate('RestaurantScreen')}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item?.imageUrl}} style={styles.itemImage} />
          {item?.discount && (
            <View style={styles.discountContainer}>
              <CustomText
                color={Colors?.background}
                fontFamily="Okra-Bold"
                fontSize={10}>
                {item?.discount}
              </CustomText>
              {item?.discountAmount && (
                <CustomText
                  style={{lineHeight: 11}}
                  color={Colors.background}
                  fontFamily="Okra-Medium"
                  fontSize={9}>
                  {item?.discountAmount}
                </CustomText>
              )}
            </View>
          )}
          <TouchableOpacity style={styles.bookmarkIcon}>
            <Image
              style={styles.bookmarkIconImage}
              source={require('@assets/icons/bookmark.png')}
            />
          </TouchableOpacity>

          <CustomGradient position="bottom" />
          
        </View>
        <View style={styles.itemInfo}>
          <CustomText
            fontSize={10}
            color={Colors.text}
            numberOfLines={1}
            fontFamily="Okra-Bold">
            {item?.name}
          </CustomText>
          <View style={styles.flexRow}>
            <Image
              source={require('@assets/icons/clock.png')}
              style={styles.clockIcon}
            />
            <CustomText
              fontFamily="Okra-Medium"
              color={Colors.lightText}
              numberOfLines={1}
              fontSize={9}>{`${item?.time} • ${item?.distance}`}</CustomText>
          </View>
        </View>
      </ScalePress>
    );
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        numColumns={Math.ceil(recommendedListData?.length / 2)}
        data={recommendedListData}
        renderItem={renderItem}
        scrollEnabled={false}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={styles.listContainer}
        style={styles.recommendedContainer}
      />
    </ScrollView>
  );
};

export default RecommendedList;
