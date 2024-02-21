import { ReactNode, useState } from "react";
import SearchTextContext from "../contexts/SearchTextContext";

const SearchTextProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <SearchTextContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchTextContext.Provider>
  );
};

export default SearchTextProvider;
