import React, { useEffect, useState } from 'react';
import qs from 'qs';
import "./Card.scss";
import { Link } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const Card = ({ item }) => {
  // const { data, loading, error } = useFetch(`/products?populate=*&[filters][id][$eq]=${item.id}`);
  const uploadUrl = import.meta.env.VITE_ASSETS_UPLOAD_URL;
  const apiToken = import.meta.env.VITE_API_TOKEN;
  const [img, setImg] = useState("");
  const [img2, setImg2] = useState("");


  useEffect(() => {
    const changeData = async () => {
      try {
        const url = `http://localhost:1337/api/products?populate=*&[filters][id][$eq]=${item.id}`;
        const dataSet = await fetch(url, {
          headers: {
            Authorization: `bearer ${apiToken}`
          }
        })
        const res = await dataSet.json();
        setImg(res.data[0].img.url);
        setImg2(res.data[0].img2.url);
      } catch (error) {
        console.log(error.message)

      }
    }
    changeData();
  }, [])

  return (
    <div className="container">
        <Link className="link" to={`/product/${item.id}`}>
        <div className="card">
          <div className="image">
            {item.isNew && <span>New Season</span>}
            <img src={`${uploadUrl}${img}`} alt="images" className="mainImg"></img>
            <img src={`${uploadUrl}${img2}`} alt="images" className="secondImg"></img>
          </div>
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
          <div className="prices">
            <h3>₹{item.oldPrice || item?.price + 300}</h3>
            <h3>₹{item.price}</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card