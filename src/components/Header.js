import React, { useState, useEffect } from "react";
import "./Header.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  const [searchInput, setSearchInput] = useState();

  const inputHandler = e => {
    setSearchInput(e.target.value);
  };

  const searchHandler = e => {
    e.preventDefault();
  };

  const filterHandler = e => {
    e.preventDefault();
  };

  return (
    <div className="gridHeader">
      <div className="searchBar">
        <div>
          <img className="logoImg"></img>
        </div>

        <form className="search" onSubmit={searchHandler}>
          <input
            type="text"
            className="searchTerm"
            placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
            onChange={inputHandler}
          ></input>
          <button className="searchButton" type="submit">
            {" "}
            <FontAwesomeIcon style={{ color: "gray" }} icon={faSearch} />
          </button>
        </form>
        <button onClick={filterHandler} className="filterButton">
          <FontAwesomeIcon
            style={{ width: "23px", height: "23px", color: "darkblue" }}
            icon={faFilter}
          />
        </button>
      </div>

      <div className="header">
        <h4 className="hardCodedText1">หน้าแรก / ค้นหา</h4>
      </div>

      <div>
        <h3 className="hardCodedText2">
          ผลการค้นหา ร้านอาหารและเครื่องดื่มทั้งหมด
        </h3>
      </div>
    </div>
  );
}

export default Header;
