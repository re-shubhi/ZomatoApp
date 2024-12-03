import React, {FC, useRef, useState} from 'react';
import {
  View,
  Text,
  SectionList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from 'react-native';
import ExploreSection from '@components/home/ExploreSection';
import RestaurantSection from '@components/home/RestaurantSection';
import {useStyles} from 'react-native-unistyles';
import {restaurantStyles} from '@unistyles/restuarantStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import BackToTopButton from '@components/ui/BackToTopButton';
import SortingAndFilters from '@components/home/SortingAndFilters';
import {filtersOption} from '@utils/dummyData';

const sectionData = [
  {
    title: 'Explore',
    data: [{}],
    renderItem: () => <ExploreSection />,
  },
  {
    title: 'Restaurant',
    data: [{}],
    renderItem: () => <RestaurantSection />,
  },
];

const MainList: FC = () => {
  const {styles} = useStyles(restaurantStyles);
  const {scrollY, scrollYGlobal, scrollToTop} = useSharedState();
  const previousScrollYTopButton = useRef<number>(0);
  const previousScrollY = useRef(0);
  const sectionListRef = useRef<SectionList<any>>(null);

  const [isRestaurantVisible, setisRestaurantVisible] = useState(false);
  const [isNearEnd, setisNearEnd] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentscrollY = event?.nativeEvent?.contentOffset?.y;

    scrollY.value = currentscrollY
      ? withTiming(1, {duration: 300})
      : withTiming(0, {duration: 300});

    scrollYGlobal.value = currentscrollY;
    previousScrollY.current = currentscrollY;

    const containerHeight = event?.nativeEvent?.contentSize?.height;
    const layoutHeight = event?.nativeEvent?.layoutMeasurement?.height;
    const offSet = event?.nativeEvent?.contentOffset?.y;

    setisNearEnd(offSet + layoutHeight >= containerHeight - 500);
  };

  const handleScrollToTop = async () => {
    scrollToTop();
    sectionListRef?.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
    });
  };

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollYGlobal.value < previousScrollYTopButton.current &&
      scrollYGlobal.value > 180;
    const opacity = withTiming(
      isScrollingUp && (isRestaurantVisible || isNearEnd) ? 1 : 0,
      {duration: 300},
    );
    const translateY = withTiming(
      isScrollingUp && (isRestaurantVisible || isNearEnd) ? 0 : 10,
      {duration: 300},
    );

    previousScrollYTopButton.current = scrollYGlobal.value;
    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80, // Percentage of the item that needs to be visible
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    const restaurantVisible = viewableItems.some(
      item => item?.section?.title === 'Restaurant' && item?.isViewable,
    );
    setisRestaurantVisible(restaurantVisible);
  };

  return (
    <>
      <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
        <BackToTopButton onPress={handleScrollToTop} />
      </Animated.View>
      <SectionList
        sections={sectionData}
        overScrollMode="always"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        ref={sectionListRef}
        renderSectionHeader={({section}) => {
          if (section?.title != 'Restaurant') {
            return null;
          }
          return (
            <Animated.View
              style={[
                isRestaurantVisible || isNearEnd ? styles.shadowBottom : null,
              ]}>
              <SortingAndFilters menuTitle="sort" options={filtersOption} />
            </Animated.View>
          );
        }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContainer}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </>
  );
};

export default MainList;
