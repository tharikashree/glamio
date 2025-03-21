import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import "./Navbar.scss";
import Cart from './Cart/Cart';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const products = useSelector((state) => state.cart.products)
    const [open,setOpen] = useState(false);

  return (
    <div className="navbar">
        <div className="wrapper">
            <div className="left">
                <div className="item">
                    <img src="images/in.png" alt="image1" style={{height:35}}></img>
                    <ArrowDropDownIcon/>
                </div>
                <div className="item">
                    <span>INR</span>
                    <ArrowDropDownIcon/>
                </div>
                <div className="item">
                    <Link className="link" to="/products/1">Women</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/products/2">Men</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/products/3">Kids</Link>
                </div>
            </div>
            <div className="center">
                <Link className="link" to="/">GlaMio</Link>
            </div>
            <div className="right">
                  <div className="icons">
                    <div className="search">
                          <Link className="link" to="/products/1">
                              <SearchIcon />
                          </Link>
                    </div>
                    <PersonIcon/>
                    <FavoriteBorderIcon/>
                    <div className="cartIcon" onClick={()=>setOpen(!open)}>
                        <ShoppingCartIcon />
                        <span>{products.length}</span>
                    </div>
                  </div>
            </div>
        </div>
        {open && <Cart/>}
    </div>
  )
}

export default Navbar;