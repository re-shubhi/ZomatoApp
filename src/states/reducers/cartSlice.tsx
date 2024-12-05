import {createSelector, createSlice} from '@reduxjs/toolkit';
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
  reducers: {},
});

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
