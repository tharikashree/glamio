import React from "react";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import { BrowserRouter, Routes, Route,Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.scss";

const Layout=()=>{
  return(
    <div className="app">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
};


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<Products />} />
        <Route path="product/:id" element={<Product />} />
      </Route>
      
    </Routes>
  </BrowserRouter>;
}

export default App;
