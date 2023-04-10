import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "../globals/Carousel";
export default function HomeProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  return (
    <>
      <h1 align="center">Our Products</h1>
      <div className="home_products__container">
        {products.map((product) => (
          <div className="home_products__container__content">
            <Carousel images={product.listOfImages} />
            <h2>{product.name}</h2>
            <div>{product.brandName}</div>
            <div>Rating: {product.Rating}</div>
          </div>
        ))}

        <style jsx>{`
          .home_products__container {
            width: 100%;
            display: flex;
            flex-direction: row;
            fles-wrap: wrap;
            margin: 1rem auto;
          }
          .home_products__container__content {
            width: 400px;
            padding: 1rem;
          }

          .home_products__container__content > img {
            width: 100%;
            object-fit: cover;
            border-radius: 0.5rem;
          }
        `}</style>
      </div>
    </>
  );
}
