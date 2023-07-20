import { useParams } from "react-router-dom";
import styles from "./productDetails.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "https://apishop.yerevan-city.am/api/Product/Get/" + id,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZDMwOWE3Yi04M2E0LTQ2OTUtODJjOC03MTQ4NjcyZWU5ODIiLCJ1bmlxdWVfbmFtZSI6IjE2ODgzNzUwNzUwNTJNbUFQTVlwIiwianRpIjoiM2VhZWRkMjctZDNhNy00MzNkLWI0MGItOGU4ZGViZDA1YjU4IiwiaWF0IjoxNjg4Mzc1MjI4LCJuYmYiOjE2ODgzNzUyMjgsImV4cCI6MTY5NzAxNTIyOCwiaXNzIjoid2ViQXBpIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAyLyJ9._Q0V2d1Ijh6glLBiuHOKaGpjSuy4fZPoDqKjwDco3Ao`,
            },
          }
        );
        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.product_details_root}>
      <div className={styles.go_back}>
        <span>asdfghjkl</span> <span>asdfghjkl</span>
      </div>
      <div className={styles.product_info}>
        <div className={styles.product_img_box}>
          <img
            src={product.photo}
            alt=""
            className={styles.product_img}
          />
        </div>
        <div className={styles.product_text}>
          <h1>{product.name}</h1>
          <p>{Math.round(product.price)} ֏</p>
          <div className={styles.add_to_cart}>Add to cart</div>
          <div className={styles.product_details}>
            <h1>Details</h1>
            <p>Produced in: &nbsp;{product.country}</p> <br />
            <p>Manufacturer: &nbsp;{product.manufacturer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
