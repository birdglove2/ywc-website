import React, { useState, useEffect } from "react";
import { webData } from "../data";
import "./Body.css";
import Merchant from "./Merchant";

function Body() {
  // from JSON
  const categories = webData.categories;
  const provinces = webData.provinces;
  const priceRange = webData.priceRange;
  const merchants = webData.merchants;

  // States
  const [categoryNameNow, setCategoryNameNow] = useState();
  const [categoryNow, setCategoryNow] = useState(webData.categories[0]);

  const [provinceSelected, setProvinceSelected] = useState("0");
  const [priceSelected, setPriceSelected] = useState("0");

  const [displayMerchant, setDisplayMerchant] = useState(webData.merchants);

  // useEffect(() => {
  //   setDisplayMerchant(merchants);
  // }, []);

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
        setCategoryNow(webData.categories[0]);
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
    if (provinceSelected === "0") {
      webData.merchants.map(merchant => {
        display.push(merchant);
      });
    } else {
      merchants.map(merchant => {
        if (provinceSelected === merchant.addressProvinceName) {
          display.push(merchant);
        }
      });
    }
    setDisplayMerchant(display);
  }, [provinceSelected]);

  const categoryChangeHandler = e => {
    console.log("cate", e.target.value);
    setCategoryNameNow(e.target.value);
  };

  const subcategoryChangeHandler = e => {
    console.log("subcate", e.target.value);
    //setSubCateNow(e.target.value);
  };

  const provinceChangeHandler = e => {
    console.log("province", e.target.value);
    setProvinceSelected(e.target.value);
  };

  const priceChangeHandler = e => {
    console.log("price", typeof e.target.value);
    setPriceSelected(e.target.value);
  };

  const moreoverhandler = e => {};

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
        value="ทั้งหมด"
        onChange={categoryChangeHandler}
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
        value="ทั้งหมด"
        onChange={subcategoryChangeHandler}
      ></input>
      <span>ทั้งหมด</span>
      {eachsubcate}
    </div>
  );

  let provinceBody = provinces.map(province => {
    return <option>{province}</option>;
  });

  let indexPrice = 0;
  let priceBody = priceRange.map(price => {
    return <option value={++indexPrice}>{price}</option>;
  });

  // let merchantBody = merchants.map(merchant => {
  //   return <Merchant merchant={merchant}></Merchant>;
  // });

  let merchantBody = displayMerchant.map(merchant => {
    return <Merchant merchant={merchant}></Merchant>;
  });

  return (
    <div className="grid">
      <div className="leftBody">
        <div className="textHeadLeft">ประเภทร้านค้า</div>
        <div className="ordinaryText">{categoryBody}</div>
        <div>
          <div className="textHeadLeft2">จังหวัด/ใกล้ฉัน </div>
          <select onChange={provinceChangeHandler}>
            <option value="0">พื้นที่ใกล้ฉัน</option>
            {provinceBody}
          </select>
        </div>

        <div>
          <div className="textHeadLeft2">ราคา </div>
          <select onChange={priceChangeHandler}>
            <option value="0">กรุณาเลือก</option>
            {priceBody}
          </select>
        </div>

        <div>
          <div className="textHeadLeft2"> ประเภท{categoryNameNow} </div>
          <div className="ordinaryText">{subcategoryBody}</div>
        </div>
      </div>

      <div className="rightBody">
        {merchantBody}
        <div className="moreoverdiv">
          <button onClick={moreoverhandler} className="moreoverbutton">
            ดูเพิ่มเติม
          </button>
        </div>
      </div>
    </div>
  );
}

export default Body;
