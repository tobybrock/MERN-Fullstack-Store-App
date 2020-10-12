import React, { useState }  from 'react';
import Nav from "./components/Nav";
import Home from './components/Home';
import { LoginPage } from './components/LoginPage';
import Product from './components/Product';
import Register from './components/Register';
import Cart from './components/Cart';
import Banner from './components/Banner';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import jwt from "jwt-decode";
import moment from "moment";

import './App.css';

const isLoggedIn = () => {
  const token = window.localStorage.getItem("token");

  try {
    const decoded = jwt(token);    
    const expires = moment.unix(decoded.exp);
    
    //todo set timoute for expiry to auto logout
    //bonus: auto refresh token if user is active and expiry approaches

    //true if token exists & expiry < current time
    return moment().isBefore(expires);
  } catch {
    return false;
  }
};


function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  return (
    <Router>
    <div className="App">

      <Nav logout={setLoggedIn} loginStatus={loggedIn}/>
      <Banner />
      <Switch>
          <Route path="/product">{loggedIn && <Product />}
          </Route>
          <Route path="/cart"> <Cart /></Route>
          <Route path="/login">
            <LoginPage setLoginStatus={setLoggedIn} />
          </Route>
          <Route path="/register"><Register /></Route>
          <Route path="/"> <Home /></Route>
        </Switch>
        
    </div>
    </Router>
  );
}

export default App;
