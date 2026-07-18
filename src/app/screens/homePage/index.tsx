import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events"; //ts-ignore
import "../../../css/home.css";

export default function HomePage() {
// 3. Selector : Sore => Data


  useEffect(() => {
      // 1. Backend server data request => Data



      // 2. Slice: Data => Store   datani slice orqali Storega saqlaydi.

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
