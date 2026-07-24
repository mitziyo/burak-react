import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  // screen,tsdan interface olindi
  restaurant: null,
  chosenProduct: null, // bu boshlangich state: ilova ishga
  products: [], //  tushganda qanday bolishi
};

const productsPageSlice = createSlice({
  name: "productsPage", //slice nomi
  initialState, // tepadagi state obkelinyapdi
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

// alohida ishlatish uchun distraction qlinb olinyapdi
export const { setRestaurant, setChosenProduct, setProducts } =
  productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;  // storega ulash uchun 
