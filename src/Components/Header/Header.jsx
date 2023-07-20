import styles from "./header.module.css";
import { useEffect, useState } from "react";

//Compoenents
import MenuBar from "../Menu/Menu";
import Search from "../Search/Search";
import Hamburger from "hamburger-react";

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [language, setLanguage] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.first_layer}>
          {windowWidth <= 1000 ? (
            <div className={styles.logo_search_container}>
              <div
                className={
                  burgerMenu ? styles.burger_box_close : styles.burger_box_open
                }
              >
                <Hamburger
                  onToggle={() => {
                    setBurgerMenu(!burgerMenu);
                  }}
                />
              </div>
              <a href="http://localhost:3000" className={styles.logo}>
                <img src="/images/logo.svg" alt="logo" height={70 + "%"} />
              </a>
              <div
                className={
                  burgerMenu
                    ? styles.mobile_menu_open
                    : styles.mobile_menu_close
                }
              ></div>
            </div>
          ) : (
            <div className={styles.logo_search_container}>
              <a href="http://localhost:3000" className={styles.logo}>
                <img src="/images/logo.svg" alt="logo" height={100 + "%"} />
              </a>
              <Search />
            </div>
          )}
          {windowWidth >= 1000 ? (
            <div className={styles.navigation_bar}>
              <div className={styles.country_dropdown}>
                <div className={styles.flag}>
                  <img
                    src="/images/flags/armenia.png"
                    alt="flag"
                    className={styles.flag_img}
                  />
                </div>
                <h1 className={styles.dram}>֏</h1>
                <h1 className={styles.dram}>AMD</h1>
                <p className={styles.down}></p>
              </div>
              <div className={styles.country_dropdown}>
                <div className={styles.flag}>
                  <img
                    src="/images/flags/britain.png"
                    alt="flag"
                    className={styles.flag_img}
                  />
                </div>
                <h1 className={styles.dram}>English</h1>
                <p className={styles.down}></p>
              </div>
              <p>Sign In </p>
              <img
                src="/images/icons/favorite.svg"
                alt=""
                className={styles.icon}
              />
              <img
                src="/images/icons/card.svg"
                alt=""
                className={styles.icon}
              />
            </div>
          ) : (
            <div className={styles.navigation_bar}>
              <div height={"70px"} style={{ marginTop: "4px" }}>
                <div
                  onClick={() => {
                    setLanguage(!language);
                  }}
                  style={{cursor: "pointer"}}
                >
                  <img
                    src="https://cdn.onlinewebfonts.com/svg/img_412122.png"
                    alt=""
                    height={21 + "px"}
                  />
                  <p
                    className={styles.down}
                    style={{ marginBottom: "9px", marginLeft: "10px" }}
                  ></p>
                </div>
                <div
                  className={
                    language
                      ? styles.country_dropdown_box_open
                      : styles.country_dropdown_box_close
                  }
                >
                  <div className={styles.country_dropdown_sub}>
                    <div className={styles.flag}>
                      <img
                        src="/images/flags/armenia.png"
                        alt="flag"
                        className={styles.flag_img}
                      />
                      &nbsp;Language <p className={styles.right}></p>
                    </div>
                  </div>
                  <div className={styles.country_dropdown_sub}>
                    <div className={styles.flag}>
                      <img
                        src="/images/flags/britain.png"
                        alt="flag"
                        className={styles.flag_img}
                      />
                      &nbsp;Currency{" "}
                      <p
                        className={styles.right}
                        style={{ marginLeft: 10 + "px" }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "14px" }}>Sign In </p>
              <img src="/images/icons/favorite.svg" className={styles.icon} />
              <img src="/images/icons/card.svg" className={styles.icon} />
            </div>
          )}
        </div>
        {windowWidth >= 1000 ? (
          <div className={styles.menu_root}>
            <MenuBar />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
