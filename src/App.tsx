import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import NewCoupon from "./components/NewCoupon/NewCoupon";
import RedeemCoupon from "./components/RedeemCoupon/RedeemCoupon";

function App() {
  return (
    <BrowserRouter>
      <Route path="/*" component={Navbar} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/new" exact component={NewCoupon} />
        <Route path="/redeem" exact component={RedeemCoupon} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
