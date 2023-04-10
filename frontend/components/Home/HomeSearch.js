import React from "react";

export default function HomeSearch() {
  return (
    <div>
      <form className="home_search_form">
        <input
          type="text"
          name=""
          className="home_search_input"
          autoComplete="off"
          maxLength={50}
          placeholder="Search for products"
          id=""
        />
      </form>
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
      `}</style>
    </div>
  );
}
