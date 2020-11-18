import React, { useState, useEffect } from "react";
import "./Header.css";
import pet from "./icon/pet.png";

function Header() {
  const [searchInput, setSearchInput] = useState();

  const inputHandler = e => {
    setSearchInput(e.target.value);
  };

  const searchHandler = e => {
    e.preventDefault();
  };

  return (
    <div className="gridHeader">
      <div className="searchBar">
        <div>
          <img className="logoImg" src={pet}></img>คนละครึ่ง
        </div>
        <form className="example" onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
            onChange={inputHandler}
          ></input>
          <button type="submit">Search</button>
        </form>
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
