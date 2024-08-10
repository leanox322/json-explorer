import React from "react";

interface SearchBar {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBar> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleInputChange}
      className="block w-full px-4 py-2 mb-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export default SearchBar;
