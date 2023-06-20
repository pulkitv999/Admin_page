import React from 'react';
import './Input.css';

function SearchBar({ searchQuery, onSearchQueryChange }) {
  // Function to handle input change
  const handleInputChange = (e) => {
    // Call onSearchQueryChange with the new input value
    onSearchQueryChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name, email or role"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
