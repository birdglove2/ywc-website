import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { webData } from "../data";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import filter from "./icon/filter.png";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../UserContext";

function Header() {
  const provinces = webData.provinces;
  const [categoryNow, setCategoryNow] = useState(webData.categories[0]);
  const { state, setState } = useContext(UserContext);

  let provinceBody = provinces.map(province => {
    return <option>{province}</option>;
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    e.target.reset();
  };

  const provinceChangeHandler = e => {
    setState({ ...state, provinceSelected: e.target.value });
  };

  return (
    <div className="gridHeader">
      <div className="searchBar">
        <div>
          <img className="logoImg"></img>
        </div>
        <div>
          <div className="mapIconHead">
            <FontAwesomeIcon style={{ color: "black" }} icon={faMapMarkerAlt} />
          </div>

          <select
            className="provinceSelectorHeader"
            onChange={provinceChangeHandler}
          >
            <option value="0">พื้นที่ใกล้ฉัน</option>
            {provinceBody}
          </select>
        </div>
        <form className="search" onSubmit={onSubmitHandler}>
          <input
            type="text"
            className="searchTerm"
            placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
            onChange={e => setState({ ...state, search: e.target.value })}
          ></input>
          <button className="searchButton" type="submit">
            {" "}
            <FontAwesomeIcon style={{ color: "gray" }} icon={faSearch} />
          </button>
        </form>

        <button
          onClick={() => setState({ ...state, modalIsOpen: true })}
          className="filterButton"
        >
          <img className="filterIcon" src={filter}></img>
        </button>
      </div>

      <div className="header">
        <div className="homeAndSearch">
          <a
            href={"https://birdglove2.github.io/ywc-website/"}
            className="hardCodedText1"
          >
            หน้าแรก
          </a>{" "}
          &nbsp;
          <div>/</div>
          &nbsp;
          <div>
            <b>ค้นหา</b>
          </div>
        </div>
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
