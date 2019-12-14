import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import Navigation from './Navigation.js'
import axiosWithAuth from "./AxiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(()=>{
    axiosWithAuth.get('http://localhost:5000/api/colors')
      .then(result => {
        console.log(result.data)
        setColorList(result.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[setColorList])

  return (
    <>
      <Navigation />
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
