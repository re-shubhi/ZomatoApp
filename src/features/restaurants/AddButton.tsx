import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useCallback, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useStyles} from 'react-native-unistyles';
import {foodStyles} from '@unistyles/foodStyles';
import {useAppSelector} from '@states/reduxHook';
import ScalePress from '@components/ui/ScalePress';
import Icon from '@components/global/Icon';
import {
  addItemToCart,
  removeItemFromCart,
  selectRestaurantCartItem,
} from '@states/reducers/cartSlice';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers';
import CustomModal from '@components/modal/CustomModal';
import AddItemModal from '@components/modal/AddItemModal';

const AddButton: FC<{item: any; restaurant: any}> = ({item, restaurant}) => {
  const dispatch = useDispatch();
  const {styles} = useStyles(foodStyles);
  const cart = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );
  const modalRef = useRef<any>(null);

  const openAddModal = () => {
    modalRef?.current?.openModal(
      <AddItemModal
        item={item}
        onClose={() => modalRef.current.closeModal()}
        restaurant={restaurant}
      />,
    );
  };
  const addCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      if (cart) {
        openAddModal(); // Open modal if already in the cart
        return;
      }
      // Add item to the cart and open modal
      dispatch(
        addItemToCart({
          restaurant: restaurant,
          item: {...item, customization: []},
        }),
      );
      openAddModal();
    } else {
      // Handle non-customizable item
      dispatch(
        addItemToCart({
          restaurant: restaurant,
          item: {...item, customization: []},
        }),
      );
    }
  }, [cart, dispatch, item, restaurant, openAddModal]);

  const removeCartHandler = useCallback(() => {
    dispatch(
      removeItemFromCart({
        restaurant_id: restaurant?.id,
        item_id: item?.id,
      }),
    );
  }, [dispatch, restaurant?.id, item?.id]);

  return (
    <>
      <CustomModal ref={modalRef} />
      <View style={styles.addButtonContainer(cart != null)}>
        {cart ? (
          <View style={styles.selectedContainer}>
            <ScalePress onPress={removeCartHandler}>
              <Icon
                name="minus-thick"
                size={RFValue(13)}
                iconFamily="MaterialCommunityIcons"
                color="#ffff"
              />
            </ScalePress>
            <AnimatedNumbers
              includeComma={false}
              animationDuration={300}
              animateToNumber={cart?.quantity}
              fontStyle={styles.animatedCount}
            />
            <ScalePress onPress={addCartHandler}>
              <Icon
                name="plus-thick"
                size={RFValue(13)}
                iconFamily="MaterialCommunityIcons"
                color="#ffff"
              />
            </ScalePress>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.noSelectionContainer}
            onPress={addCartHandler}
            activeOpacity={0.6}
            accessibilityLabel="Add item to cart">
            <CustomText
              variant="h5"
              fontFamily="Okra-Bold"
              color={Colors.primary}>
              ADD
            </CustomText>
            <CustomText
              variant="h5"
              color={Colors.primary}
              style={styles.plusSmallIcon}>
              +
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      {item?.isCustomizable && (
        <CustomText fontFamily="Okra-Medium" style={styles.customizeText}>
          Customisable
        </CustomText>
      )}
    </>
  );
};

export default AddButton;
