import React, { useState } from "react";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { Link, Route, Router, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import Test from "./screens/Test";
import useBasket from "./hooks/useBasket"; // @ts-ignore
import "../css/app.css"; // @ts-ignore
import "../css/navbar.css"; // @ts-ignore
import "../css/footer.css";
import AuthenticationModal from "./components/auth";

function App() {
  const location = useLocation(); // uselocation react router domning hook i bzga object va path beradi

  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setsignupOpen] = useState<boolean>(false);
  const [loginOpen, setloginOpen] = useState<boolean>(false);

  /** HANDLERS **/
  const handleSignupClose = () => setsignupOpen(false);
  const handleLoginClose = () => setloginOpen(false);

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setsignupOpen={setsignupOpen}
          setloginOpen={setloginOpen}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setsignupOpen={setsignupOpen}
          setloginOpen={setloginOpen}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
      />
    </>
  );
}

export default App;
