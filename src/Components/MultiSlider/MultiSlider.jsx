import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import styles from "./multiSlider.module.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} style={{ display: "block" }} onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block", left: "-46px", zIndex: "1" }}
      onClick={onClick}
    />
  );
}

const MultiSlider = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "https://apishop.yerevan-city.am/api/Brand/GetTrendingBrand",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZDMwOWE3Yi04M2E0LTQ2OTUtODJjOC03MTQ4NjcyZWU5ODIiLCJ1bmlxdWVfbmFtZSI6IjE2ODgzNzUwNzUwNTJNbUFQTVlwIiwianRpIjoiM2VhZWRkMjctZDNhNy00MzNkLWI0MGItOGU4ZGViZDA1YjU4IiwiaWF0IjoxNjg4Mzc1MjI4LCJuYmYiOjE2ODgzNzUyMjgsImV4cCI6MTY5NzAxNTIyOCwiaXNzIjoid2ViQXBpIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAyLyJ9._Q0V2d1Ijh6glLBiuHOKaGpjSuy4fZPoDqKjwDco3Ao`,
            },
          }
        );
        setData(response.data.data.brands);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div className={styles.slider_root}>
      <div className={styles.title}>
        <h2>Trending brands</h2>
      </div>
      <Slider {...settings} >
        {data.map((element) => {
          if (!element.photo) {
            return null;
          }
          return (
            <div className={styles.slider_item}>
              <img
                src={element.photo}
                className={styles.slider_img}
                onError={(e) => {
                  e.target.src = "/images/logo-small.png";
                }}
              />
              <p>{element.name}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default MultiSlider;
