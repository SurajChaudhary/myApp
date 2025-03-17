import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SearchBar from '../searchBar/SearchBar';
import MultiTabs from '../tabs/MultiTabs';
import styles from '../../styles/home/HomePage.module.css';

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.searchBar}>
        <SearchBar 
          searchText={searchText} 
          onSearchChange={setSearchText} 
        />
      </div>
      <div className={styles.multiTabs}>
        <MultiTabs searchText={searchText} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
