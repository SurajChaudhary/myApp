import React, { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SearchBar from "../searchBar/SearchBar";
import MultiTabs from "../tabs/MultiTabs";
import styles from "../../styles/home/HomePage.module.css";

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.content}>
        <SearchBar searchText={searchText} onSearchChange={setSearchText} />
        <MultiTabs searchText={searchText} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
