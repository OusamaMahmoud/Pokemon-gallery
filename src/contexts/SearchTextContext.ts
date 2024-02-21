import React from "react";
import { useContext } from "react";

interface SearchTextContextType {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchTextContext = React.createContext<SearchTextContextType>(
  {} as SearchTextContextType
);

export const useSearchText = () => useContext(SearchTextContext);

export default SearchTextContext;
