import Header from "../Components/Header/Header";
import Products from "../Components/Products/Products";
import React from "react";

function Home() {
  return (
    <React.StrictMode>
      <Header />
      <Products/>
    </React.StrictMode>
  );
}

export default Home;
