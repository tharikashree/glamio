import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {
    // Build the base URL
    let query = `/products?populate[categories][filters][id][$eq]=${catId}`;
   
    
    // Check if there are selected subcategories
    if (subCats.length > 0) {
        let subCatsArray=Object.values(subCats);
        subCats=subCatsArray.map((item)=>item +1);
        query += `&populate[sub_categories][filters][id][$in]=${subCatsArray.join(",")}`;
    }

    // // Add the price and sorting filters
    query += `&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`;

    // Fetch the data using the constructed query
    const { data, loading, error } = useFetch(query);
    console.log(data);
    

    
    // const { data, loading, error } = useFetch(
    //     `/products?populate=*&[filters][categories][id]=${catId}&[filters][sub_categories][id][$in]=${subCats.map((item)=>`${item}`)}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
    // );


    return (
        <div className="list">
            { loading
                    ? "loading"
                    : data?.map((item) => <Card item={item} key={item.id} />)}
        </div>
    );
};

export default List;