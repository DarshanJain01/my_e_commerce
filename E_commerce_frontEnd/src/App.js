import React, {useContext, useEffect} from "react"

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Products from "./components/products"
import About from "./components/about"
import Home from "./components/home"
import Navigation from "./components/navigation"
import Cart from "./components/cart"

import Footer from "./components/footer"
import SingleProduct from "./components/singleProduct"
import {AppContext} from "./components/context"
import Sidebar from "./components/sidebar"

function App() {
  const {isSidebarOpen, filters} = useContext(AppContext)

  if (isSidebarOpen) return <Sidebar />
  else
    return (
        <Router>
        <Navigation />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route path="/products/:id">
              <SingleProduct />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
          </Switch>
          <Footer />
        </Router>
    )
}

export default App
