import React from 'react';
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart, resetCart } from "../../redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../hooks/makeRequest";


const Cart = () => {
    const products = useSelector((state)=>state.cart.products)
    const uploadUrl = import.meta.env.VITE_ASSETS_UPLOAD_URL;
    const dispatch = useDispatch();
    const totalPrice = () => {
        let total = 0;
        products.forEach((item) => {
            total += item.quantity * item.price;
        });
        
        return total.toFixed(2);
    };
    const stripePromise = loadStripe('pk_test_51Q97WiJN3zfaCuQt2aErcm39D3zBdSMVyRHQ98nNSmO8BQrukIR3F9ujbDmjk58AptCLUG05kpzNiuKlMxYbsuAE00S7wbAUHy')
    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makeRequest.post("/orders", {
                products,
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            });

        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div className="cart">
        <h1>Your Cart</h1>
        {products.map(item=>(
            <div className="item" key={item.id}>
                <img src={`${uploadUrl}${item.img}`} alt='image' />
                <div className="details">
                    <h1>{item.title}</h1>
                    <p>{item.desc?.substring(0,100)}</p>
                    <div className="price">{item.quantity} X ₹{item.price}</div>
                </div>
                <DeleteOutlinedIcon className='delete' onClick={() => dispatch(removeFromCart(item.id))} />
            </div>
        )
        )}
        <div className="total">
            <span>SUBTOTAL:</span>
            <span>₹{totalPrice()}</span>
        </div>
        <button onClick={handlePayment} >BUY</button>
          <span className='reset' onClick={() => dispatch(resetCart())}>CLEAR CART</span>
    </div>
  )
}

export default Cart