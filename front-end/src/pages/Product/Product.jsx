import React, { useState } from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import "./Product.scss";
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';

const Product = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(0);
  const uploadUrl= import.meta.env.VITE_ASSETS_UPLOAD_URL;
  const { data, loading, error } = useFetch(`/products/?populate=*&[filters][id][$eq]=${id}`);

  return (
    <div className='product'>
      {error ? `There is an Error 👻${error}`:
      (loading ? "Loading" :
          (data && <>
            <div className="left">
              <div className="images">
                {data[0].img &&
                  <img src={`${uploadUrl}${data[0]?.img?.url}`} alt="" onClick={(e) => { setSelectedImg("img") }} />}
                {data[0].img2 &&
                  <img src={`${uploadUrl}${data[0]?.img2?.url}`} alt="" onClick={(e) => { setSelectedImg("img2") }} />}
              </div>
              <div className="mainImg">
                <img src={`${uploadUrl}${data[0]?.[selectedImg]?.url}`} alt=""></img>
              </div>
            </div>
            <div className="right">
              <h1>{data[0]?.title}</h1>
              <span>₹{data[0]?.price}</span>
              <p>{data[0]?.desc}</p>
              <div className="quantity">
                <button onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}>-</button>
                {quantity}
                <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
              </div>
              <button className='add' onClick={() => dispatch(addToCart({
                id: data[0].id,
                documentId: data[0].documentId,
                title: data[0].title,
                desc: data[0].desc,
                price: data[0].price,
                img: data[0].img.url,
                quantity:quantity,
              }
              ))}>
                <AddShoppingCartIcon />ADD TO CART
              </button>
              <div className="link">
                <div className="item">
                  <FavoriteBorderIcon />ADD TO WISHLIST
                </div>
                <div className="item">
                  <BalanceIcon />ADD TO COMPARE
                </div>
              </div>
              <hr />
              <div className="info">
                <span>DESCRIPTION</span>
                <hr />
                <span>ADDITIONAL INFORMATION</span>
                <hr />
                <span>FAQ</span>
              </div>
            </div>
          </>
        ))
      }
    </div>
  )
}

export default Product