/** REACT APP STATE **/

import { Member } from "./member";
import { Product } from "./product";

// screen component based type integration/ target oriented
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
}

/** HOMEPAGE **/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** PRODUCTS PAGE **/

export interface ProductsPageState {    // reduxni qurishni type
  restaurant: Member | null;           // integrationdan boshlayapmiz
  chosenProduct: Product | null;
  products: Product[];
}

/** ORDERS PAGE **/

