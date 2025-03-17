import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import '../../styles/searchBar/SearchBar.module.css';

interface SearchBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearchChange }) => {
  return (
    <Box
      sx={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5'
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="Search Templates and Documents"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
};

export default SearchBar;
