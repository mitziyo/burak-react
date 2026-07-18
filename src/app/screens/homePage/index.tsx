import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events"; //@ts-ignore
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

/*****   REDUX SLICE & SELECTOR    *****/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);
  // 3. Selector : Sore => Data

  useEffect(() => {
    // 1. Backend server data request => Data
    const result = [
      {
        _id: "6a3a2c8fde66d2df9f6ed567",
        productStatus: "PROCESS",
        productCollection: "DISH",
        productName: "Kebab",
        productPrice: 12,
        productLeftCount: 122,
        productSize: "LARGE",
        productVolume: 1,
        productDesc: "delicious kebab",
        productImages: [
          "uploads/products/38dc7114-35e3-4b31-9140-2da6dc02a83f.jpg",
        ],
        productViews: 0,
        createdAt: "2026-06-23T06:49:51.402Z",
        updatedAt: "2026-06-23T06:49:51.402Z",
        __v: 0,
      },
      {
        _id: "6a3a230e1db9491983c7c3ee",
        productStatus: "PROCESS",
        productCollection: "DISH",
        productName: "lavash",
        productPrice: 12,
        productLeftCount: 233,
        productSize: "NORMAL",
        productVolume: 1,
        productDesc: "mazza",
        productImages: [
          "uploads/products/023224d4-af00-4136-8754-39c2b8853302.jpg",
          "uploads/products/2a3cb61b-e7ba-4893-b3c9-09d200c06382.jpg",
        ],
        productViews: 2,
        createdAt: "2026-06-23T06:09:18.474Z",
        updatedAt: "2026-07-09T10:10:08.120Z",
        __v: 0,
      },
    ];

    // 2. Slice: Data => Store   datani slice orqali Storega saqlaydi.
    //@ts-ignore
    setPopularDishes(result);
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
