import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchRec, setSearchRec] = useState([]);

  useEffect(() => {
    let timeout = setTimeout(async () => {
      try {
        if (searchValue.length > 0) {
          let response = await axios.post(
            "https://apishop.yerevan-city.am/api/Product/Search",
            {
              search: searchValue,
            }
          );
          setLoader(false);
          setSearchResult(response.data.data.products);
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "https://apishop.yerevan-city.am/api/Page/Get?type=2",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZDMwOWE3Yi04M2E0LTQ2OTUtODJjOC03MTQ4NjcyZWU5ODIiLCJ1bmlxdWVfbmFtZSI6IjE2ODgzNzUwNzUwNTJNbUFQTVlwIiwianRpIjoiM2VhZWRkMjctZDNhNy00MzNkLWI0MGItOGU4ZGViZDA1YjU4IiwiaWF0IjoxNjg4Mzc1MjI4LCJuYmYiOjE2ODgzNzUyMjgsImV4cCI6MTY5NzAxNTIyOCwiaXNzIjoid2ViQXBpIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAyLyJ9._Q0V2d1Ijh6glLBiuHOKaGpjSuy4fZPoDqKjwDco3Ao`,
            },
          }
        );
        setSearchRec(response.data.data.specialItems[0].products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search"
        className={styles.search_field}
        onChange={(evt) => {
          setSearchValue(evt.target.value);
          setLoader(true);
        }}
      />
      <div className={styles.search_box}>
        <div className={styles.search_content}>
          {searchValue.length <= 0 ? (
            <div>
              <h1 className={styles.frequently_searched_title}>
                Frequently searched
              </h1>
              <div className={styles.frequently_searched_box}>
                {searchRec.map((data) => {
                  return (
                    <div className={styles.frequently_searched}>
                      <img src={data.photo} alt="" height={100 + "%"} />
                      <div>{data.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : searchResult.length > 0 && !loader ? (
            searchResult.map((data) => {
              return (
                <div className={styles.search_item}>
                  <img
                    src={data.photo}
                    alt="item"
                    className={styles.search_item_img}
                  />
                  <div>
                    <p>
                      {data.price} <span className={styles.dram}>֏</span>
                    </p>
                    <br />
                    <p>{data.name}</p>
                  </div>
                </div>
              );
            })
          ) : searchResult.length <= 0 && !loader ? (
            <h1 className={styles.no_element_found}>No Element found</h1>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
