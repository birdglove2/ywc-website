import React, { useState } from "react";
import { webData } from "./data";
import Header from "./components/Header";
import Body from "./components/Body";
import { UserContext } from "./UserContext";

function Homepage() {
  const [state, setState] = useState({
    search: "",
    provinceSelected: "0",
    modalIsOpen: false
  });

  return (
    <div>
      <UserContext.Provider value={{ state, setState }}>
        <Header />
        <Body />
      </UserContext.Provider>
    </div>
  );
}

export default Homepage;
