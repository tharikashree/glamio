import React from 'react';
import Card from "../Card/Card";
import useFetch from '../../hooks/useFetch';

const FeaturedProducts = ({type}) => {

    const {data,loading,error} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);
    
  return (
    <div className='featuredProducts'>
        <div className="top">
            <h1 style={{textTransform:"capitalize"}}>{type} products</h1>
            <p>
                Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
                amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
                ut labore etdolore.
            </p>
        </div>
        <div className="bottom">
           {error ? "Something went Wrong 👻" :
            (loading ?
             "loading":
             data?.map(item=>
                (
                    <Card item={item} key={item.id}/>
                )
            ))}
        </div>
    </div>
  )
}

export default FeaturedProducts;