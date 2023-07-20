import Header from "../Components/Header/Header";
import Slider from "../Components/Slider/Slider";
import React from "react";
import MultiSlider from "../Components/MultiSlider/MultiSlider";
import ProductsSlider from "../Components/ProductsSlider/ProductsSlider";

function Home() {
  return (
    <React.StrictMode>
      <Header />
      <Slider/>
      <MultiSlider/>
      <ProductsSlider/>
    </React.StrictMode>
  );
}

export default Home;
