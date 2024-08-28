import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <div className='flex flex-row items-center justify-between px-6'>
      <div className='w-[518px] h-[42px] bg-[#0E1421] rounded-[50px] flex items-center'>
        <input
          type="text"
          placeholder='Search City'
          className='bg-transparent outline-none border-none text-white pl-4 flex-grow'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className='w-[42px] h-[42px] rounded-full bg-[#1E2A38] text-white flex items-center justify-center hover:bg-[#2E3A50] transition-all'
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
