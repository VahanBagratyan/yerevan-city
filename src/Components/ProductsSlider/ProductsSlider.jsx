import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./productsSlider.module.css";
import axios from "axios";

const ProductsSliderComp = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        "https://apishop.yerevan-city.am/api/Page/Get?type=1",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZDMwOWE3Yi04M2E0LTQ2OTUtODJjOC03MTQ4NjcyZWU5ODIiLCJ1bmlxdWVfbmFtZSI6IjE2ODgzNzUwNzUwNTJNbUFQTVlwIiwianRpIjoiM2VhZWRkMjctZDNhNy00MzNkLWI0MGItOGU4ZGViZDA1YjU4IiwiaWF0IjoxNjg4Mzc1MjI4LCJuYmYiOjE2ODgzNzUyMjgsImV4cCI6MTY5NzAxNTIyOCwiaXNzIjoid2ViQXBpIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAyLyJ9._Q0V2d1Ijh6glLBiuHOKaGpjSuy4fZPoDqKjwDco3Ao`,
          },
        }
      );

      setData(response.data.data.specialItems);
    };
    fetchData();
  }, []);

  function SampleNextArrow({ className, onClick }) {
    // const  = props;
    return (
      <div
        className={className}
        style={{ display: "block", right: "0", top: "130px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: "block", top: "130px" }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.root}>
      {data.map((section) => {
        return (
          <div className={styles.slider_row}>
            <p className={styles.title}>{section.title}</p>
            <Slider {...settings}>
              {section.products.map((item) => {
                return (
                  <div className={styles.products_container}>
                    <div className={styles.products_box}>
                      <div className={styles.products_img_box}>
                        <div className={styles.image_wrapper}>
                          <img
                            src={item.photo}
                            className={styles.products_img}
                            onError={(e) => {
                              e.target.src = "/images/logo-small.png";
                            }}
                          />
                        </div>
                        <a
                          href={
                            "http://localhost:3000/productdetails/" + item.id
                          }
                          className={styles.leran_more}
                        >
                          Learn More
                        </a>
                      </div>

                      <div className={styles.product_name_box}>
                        <p>{item.name}</p>
                      </div>
                      <p>{Math.round(item.price)} ֏</p>
                      <div className={styles.add_to_cart}>
                        <p>Add To Cart</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsSliderComp;
