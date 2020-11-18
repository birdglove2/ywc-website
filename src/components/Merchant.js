import React, { useState, useEffect } from "react";
import "./Merchant.css";
import car from "./icon/cargreen.png";
import naimg from "./icon/fast-food.png";
import motorcycle from "./icon/motorcycle.png";
import reserve from "./icon/reserve.png";
import pet from "./icon/pet.png";

function Merchant(props) {
  // console.log("props", props);
  const coverImageId = props.merchant.coverImageId;
  const shopNameTH = props.merchant.shopNameTH;
  const isOpen = props.merchant.isOpen;
  const categoryName = props.merchant.categoryName;
  const subcategoryName = props.merchant.subcategoryName;
  const facilities = props.merchant.facilities;
  const priceLevel = props.merchant.priceLevel;
  const highlightText = props.merchant.highlightText;
  const recommendedItems = props.merchant.recommendedItems;
  const addressProvinceName = props.merchant.addressProvinceName;
  const addressDistrictName = props.merchant.addressDistrictName;

  const [isOpenM, setisOpenM] = useState();

  const [priceLevelMerchant, setPriceLevelMerchant] = useState(0);

  let openCloseSticker;
  if (isOpen === "Y") {
    openCloseSticker = <div className="isOpenSticker">เปิดอยู่</div>;
  } else if (isOpen === "N") {
    openCloseSticker = <div className="isCloseSticker">ปิดแล้ว</div>;
  } else {
    openCloseSticker = <div></div>;
  }

  let levelOfPrice = [];
  for (let i = 0; i < 4; i++) {
    if (i < priceLevel) {
      levelOfPrice.push(<span style={{ color: "black" }}>฿</span>);
    } else {
      levelOfPrice.push(<span style={{ color: "gray" }}>฿</span>);
    }
  }
  let facilitiesM = [];
  for (let i = 0; i < facilities.length; i++) {
    if (facilities[i] === "ที่จอดรถ") {
      facilitiesM.push(<img className="iconImg" src={car}></img>);
    } else if (facilities[i] === "สามารถนำสัตว์เลี้ยงเข้าได้") {
      facilitiesM.push(<img className="iconImg" src={pet}></img>);
    } else if (facilities[i] === "รับจองล่วงหน้า") {
      facilitiesM.push(<img className="iconImg" src={reserve}></img>);
    }
  }

  let additionalInfo;
  if (isOpen !== "N/A") {
    let recItem = recommendedItems.map((item, index) => {
      return <span>{(index ? ", " : "") + item}</span>;
    });

    additionalInfo = (
      <div>
        <div>{highlightText}</div>
        <div>
          <b className="boldmenu">เมนูแนะนำ: </b> {recItem}
        </div>

        <div className="facility">{facilitiesM}</div>
      </div>
    );
  }

  let imgInfo;
  if (isOpen === "N/A") {
    imgInfo = (
      <div className="center">
        <img className="NAimg" src={naimg}></img>
        <img className="merchantImgClosed" src={coverImageId}></img>
      </div>
    );
  } else {
    imgInfo = <img className="merchantImg" src={coverImageId}></img>;
  }

  return (
    <div className="merchantBox">
      {imgInfo}
      {/* <img className="iconImg" src={car}></img> */}
      <div className="merchantTextbox">
        <div className="titleContainer">
          <div className="shopNameText">{shopNameTH} </div>
          <div className="openCloseSticker">{openCloseSticker}</div>
        </div>

        <div className="secondTitleContainer">
          {subcategoryName} | {levelOfPrice}| {addressDistrictName}{" "}
          {addressProvinceName}
        </div>
        <div className="keedkeed">
          -----------------------------------------------------------------------------------------------------------------------------------------------
        </div>

        <div className="additionalInfo">{additionalInfo}</div>
      </div>
    </div>
  );
}

export default Merchant;
