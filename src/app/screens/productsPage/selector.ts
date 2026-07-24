import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
import ProductsPage from ".";

// butun storedan faqat productsPageni olib beradi
const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.restaurant,
);
export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.chosenProduct,
);
export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products,
);
