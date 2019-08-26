import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getColors = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(response => {
        console.log("get request success", response.data);
        setColorList(response.data);
      })
      .catch(error => console.log(error.response));
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
