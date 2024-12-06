import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@states/store';

interface CartItem {
  isVeg: boolean;
  id: string;
  name: string;
  price: number;
  quantity: number;
  cartPrice: number;
  isCustomizable?: boolean;
  customization?: any[];
}

interface RestaurantDetails {
  id: string;
  name: string;
  discount: string;
  discountAmount: string;
  time: string;
  distance: string;
  rating: number;
  imageUrl: string;
}

interface RestaurantCart {
  restaurant: RestaurantDetails;
  items: CartItem[];
}
interface CartState {
  carts: RestaurantCart[];
}

const initialState: CartState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{
        restaurant: RestaurantDetails;
        item: CartItem;
      }>,
    ) => {
      const {restaurant, item} = action.payload;
      const existingRestaurantCart = state.carts.find(
        cart => cart.restaurant.id === restaurant.id,
      );

      if (existingRestaurantCart) {
        const existingItem = existingRestaurantCart?.items?.find(
          cartItem => cartItem.id === item.id,
        );

        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.cartPrice =
            (existingItem.price || 0) + existingItem.price;
        } else {
          existingRestaurantCart?.items.push({
            ...item,
            quantity: 1,
            cartPrice: item?.price,
          });
        }
      } else {
        state.carts.push({
          restaurant,
          items: [{...item, quantity: 1, cartPrice: item.price}],
        });
      }
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        item_id: string;
      }>,
    ) => {
      const {restaurant_id, item_id} = action.payload;
      const restaurantCart = state?.carts?.find(
        cart => cart?.restaurant?.id === restaurant_id,
      );
      if (!restaurantCart) return;

      const itemIndex = restaurantCart?.items?.findIndex(
        item => item?.id === item_id,
      );
      if (itemIndex !== -1) {
        const item = restaurantCart?.items[itemIndex];
        if (item?.quantity > 1) {
          item.quantity -= 1;
          item.cartPrice = (item?.cartPrice || 0) - item.cartPrice;
        } else {
          restaurantCart.items.splice(itemIndex, 1);
        }
      }
      if (restaurantCart?.items?.length === 0) {
        state.carts = state.carts.filter(
          cart => cart.restaurant.id !== restaurant_id,
        );
      }
    },
  },
});

export const {addItemToCart,removeItemFromCart} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectRestaurantCartItem = (
  restaurantId: string,
  itemId: string,
) =>
  //to memorize the data the createSelector is used
  createSelector(
    (state: RootState) =>
      state.cart.carts.find(cart => cart.restaurant.id === restaurantId)?.items,
    items => items?.find(item => item?.id === itemId) || null,
  );

export default cartSlice.reducer;
