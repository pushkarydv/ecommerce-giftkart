import React, { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
export default function HomeSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const searchProduct = debounce((e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5500/products?searchQuery=${search}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Failed to search products:", error);
      });
  }, 500);
  useEffect(() => {
    if (search.length < 2) {
      setResults([]);
    }
  }, [search]);
  return (
    <div>
      <form
        className="home_search_form"
        onChange={(e) => {
          searchProduct(e);
        }}
      >
        <input
          type="text"
          name=""
          className="home_search_input"
          autoComplete="off"
          maxLength={50}
          placeholder="Search for products"
          id=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {results.map((result) => (
        <div key={result._id} className="product_search_box">
          <img src={result.listOfImages[0]} alt="" />
          <div className="product_search_box_details">
            <p>{result.name}</p>
            <p>{result.brandName}</p>
          </div>
        </div>
      ))}
      <style jsx>{`
        .home_search_form {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .home_search_input {
          width: 100%;
          height: 50px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          padding: 0 20px;
          font-size: 16px;
          color: #757575;
          outline: none;
        }
        .product_search_box {
          width: 100%;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 20px;
          border-bottom: 1px solid #e0e0e0;
        }
        .product_search_box img {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }
        .product_search_box_details {
          margin-left: 20px;
        }
        .product_search_box_details p {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
