import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/searchBar/SearchBar.module.css";

interface SearchBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearchChange }) => (
  <div className={styles.searchBar}>
    <TextField
      fullWidth
      variant="outlined"
      label="Search Templates and Documents"
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className={styles.searchIcon} />
          </InputAdornment>
        ),
      }}
    />
  </div>
);

export default SearchBar;
