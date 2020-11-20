import React, { useState, useEffect, useContext } from "react";
import { webData } from "../data";
import "./Body.css";
import Merchant from "./Merchant";
import { UserContext } from "../UserContext";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";

function Body() {
  // from JSON
  const categories = webData.categories;
  // const provinces = webData.provinces;
  const priceRange = webData.priceRange;
  const merchants = webData.merchants;

  // set all cate
  let allCate = [];
  for (let i = 0; i < webData.categories.length; i++) {
    if (webData.categories.length > 1) {
      for (let j = 0; j < webData.categories[i].subcategories.length; j++) {
        allCate.push(webData.categories[i].subcategories[j]);
      }
    }
  }

  // States
  const [categoryNameNow, setCategoryNameNow] = useState();
  const [categoryNow, setCategoryNow] = useState(webData.categories[0]);
  const [allCategory, setAllCategory] = useState({
    name: "ทั้งหมด",
    subcategories: allCate
  });

  const [subcategoryNameNow, setSubcategoryNameNow] = useState("");
  const [priceSelected, setPriceSelected] = useState("0");

  const [displayMerchant, setDisplayMerchant] = useState(webData.merchants);

  const { state, setState } = useContext(UserContext);

  useEffect(() => {
    setDisplayMerchant(
      webData.merchants.filter(merchant => {
        return merchant.shopNameTH
          .toLowerCase()
          .includes(state.search.toLowerCase());
      })
    );
  }, [state.search]);

  useEffect(() => {
    setDisplayMerchant(
      webData.merchants.filter(merchant => {
        return merchant.subcategoryName
          .toLowerCase()
          .includes(subcategoryNameNow.toLowerCase());
      })
    );
  }, [subcategoryNameNow]);

  // display subcategoy for each categotry you chose
  useEffect(() => {
    switch (categoryNameNow) {
      case "ร้านอาหารและเครื่องดื่ม":
        setCategoryNow(webData.categories[0]);
        break;

      case "ร้านค้า OTOP":
        setCategoryNow(webData.categories[1]);
        break;

      case "ร้านธงฟ้า":
        setCategoryNow(webData.categories[2]);
        break;

      case "สินค้าทั่วไป":
        setCategoryNow(webData.categories[3]);
        break;

      default:
        setCategoryNow(allCategory);
    }
  }, [categoryNameNow]);

  useEffect(() => {
    let display = [];
    if (priceSelected === "0") {
      webData.merchants.map(merchant => {
        display.push(merchant);
      });
    } else {
      merchants.map(merchant => {
        if (priceSelected === merchant.priceLevel.toString()) {
          display.push(merchant);
        }
      });
    }
    setDisplayMerchant(display);
  }, [priceSelected]);

  useEffect(() => {
    let display = [];

    if (state.provinceSelected === "0") {
      webData.merchants.map(merchant => {
        display.push(merchant);
      });
    } else {
      merchants.map(merchant => {
        if (state.provinceSelected === merchant.addressProvinceName) {
          display.push(merchant);
        }
      });
    }
    setDisplayMerchant(display);
  }, [state.provinceSelected]);

  const categoryChangeHandler = e => {
    setCategoryNameNow(e.target.value);
  };

  const subcategoryChangeHandler = e => {
    setSubcategoryNameNow(e.target.value);
  };

  const provinceChangeHandler = e => {
    setState({ ...state, provinceSelected: e.target.value });
  };

  const priceChangeHandler = e => {
    setPriceSelected(e.target.value);
  };

  let eachCate = categories.map(category => {
    return (
      <div>
        <input
          type="radio"
          name="chooseOneCategory"
          value={category.name}
          onChange={categoryChangeHandler}
        ></input>
        <span>{category.name}</span>
      </div>
    );
  });

  let categoryBody = (
    <div>
      <input
        type="radio"
        name="chooseOneCategory"
        value=""
        onChange={categoryChangeHandler}
        defaultChecked
      ></input>
      <span>ทั้งหมด</span>
      {eachCate}
    </div>
  );

  let eachsubcate;
  eachsubcate = categoryNow.subcategories.map(subcate => {
    return (
      <div>
        <input
          type="radio"
          name="chooseOneSubCategory"
          value={subcate}
          onChange={subcategoryChangeHandler}
        ></input>
        <span>{subcate}</span>
      </div>
    );
  });

  let subcategoryBody = (
    <div>
      <input
        type="radio"
        name="chooseOneSubCategory"
        value=""
        defaultChecked
        onChange={subcategoryChangeHandler}
      ></input>
      <span>ทั้งหมด</span>
      {eachsubcate}
    </div>
  );

  let provinceBody = state.provinces.map(province => {
    return <option>{province}</option>;
  });

  let indexPrice = 0;
  let priceBody = priceRange.map(price => {
    return <option value={++indexPrice}>{price}</option>;
  });

  const [moreoverShowing, setMoreoverShowing] = useState(true);

  let merchantBody = displayMerchant.map((merchant, index) => {
    if (moreoverShowing) {
      if (index < 5) {
        return <Merchant merchant={merchant}></Merchant>;
      }
    } else {
      return <Merchant merchant={merchant}></Merchant>;
    }
  });

  let moreoverButton;
  if (displayMerchant.length > 4) {
    moreoverButton = (
      <div className="moreoverdiv">
        <button
          onClick={e => setMoreoverShowing(!moreoverShowing)}
          className="moreoverbutton"
        >
          {moreoverShowing ? "ดูเพิ่มเติม" : "ไม่ดูละ"}
        </button>
      </div>
    );
  }

  let leftBody = (
    <div>
      <div className="textHeadLeft">ประเภทร้านค้า</div>
      <div className="ordinaryText">{categoryBody}</div>
      <div>
        <div className="provinceBody">
          <div>
            <FontAwesomeIcon style={{ color: "black" }} icon={faMapMarkerAlt} />
          </div>
        </div>
        <div className="textHeadLeft2">จังหวัด/ใกล้ฉัน </div>
        <select className="provinceSelector" onChange={provinceChangeHandler}>
          <option value="0">พื้นที่ใกล้ฉัน</option>
          {provinceBody}
        </select>
      </div>

      <div>
        <div className="textHeadLeft2">ราคา </div>
        <select className="subcateSelector" onChange={priceChangeHandler}>
          <option value="0">กรุณาเลือก</option>
          {priceBody}
        </select>
      </div>

      <div>
        <div className="textHeadLeft2"> ประเภท{categoryNameNow} </div>
        <div className="ordinaryText">{subcategoryBody}</div>
      </div>
    </div>
  );

  return (
    <div className="grid">
      <div className="leftBody">{leftBody}</div>
      <div className="rightBody">
        {merchantBody}
        {moreoverButton}
      </div>

      <Modal
        isOpen={state.modalIsOpen}
        // shouldCloseOnOverlayClick={false}
        onRequestClose={() => setState({ ...state, modalIsOpen: false })}
        style={{
          overlay: {
            zIndex: "20"
          },
          content: {
            background: "white",
            borderRadius: "10px"
          }
        }}
      >
        {leftBody}
        <div className="modalCloseButtonContainer">
          <button
            className="modalCloseButton"
            onClick={() => setState({ ...state, modalIsOpen: false })}
          >
            ปิด
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Body;
