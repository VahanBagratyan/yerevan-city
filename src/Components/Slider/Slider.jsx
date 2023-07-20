import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slider.module.css";
import "./slider.css";
import axios from "axios";

const SliderComp = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.post(
          "https://apishop.yerevan-city.am/api/Banner/GetByType",
          {
            type: 2,
          },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZDMwOWE3Yi04M2E0LTQ2OTUtODJjOC03MTQ4NjcyZWU5ODIiLCJ1bmlxdWVfbmFtZSI6IjE2ODgzNzUwNzUwNTJNbUFQTVlwIiwianRpIjoiM2VhZWRkMjctZDNhNy00MzNkLWI0MGItOGU4ZGViZDA1YjU4IiwiaWF0IjoxNjg4Mzc1MjI4LCJuYmYiOjE2ODgzNzUyMjgsImV4cCI6MTY5NzAxNTIyOCwiaXNzIjoid2ViQXBpIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAyLyJ9._Q0V2d1Ijh6glLBiuHOKaGpjSuy4fZPoDqKjwDco3Ao`,
              Referer: 'http://localhost:3000',  }
          }
        );
        setData(response.data.data.banners);
      } catch (error) {}
    };
    fetchData();
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{display: "block", marginRight: "55px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    console.log(className );
    return (
      <div
        className={className}
        style={{ left: "7px", zIndex: "1"}}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className={styles.slider_root}>
      <Slider {...settings}>
        {data.map((element) => {
          return (
            <div className={styles.slider_item}>
              <img src={element.path} alt="" className={styles.slider_img} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderComp;
