"use client"
import { createContext, FC, useContext, useState } from 'react';

export interface ISearchbarContext {
  isShowSearchBar?: boolean
  onClickSearBar?: () => void
}

const initialRechercheFiltersContext: ISearchbarContext = {
  isShowSearchBar: false,
  
};

export const SearchbarContext = createContext<ISearchbarContext>(initialRechercheFiltersContext);

const SearchbarContextContextProvider: FC = ({ children }) => {
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  const onClickSearBar = () => {
    setIsShowSearchBar(!isShowSearchBar)
  }
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SearchbarContext.Provider value={{
      isShowSearchBar, onClickSearBar
    }}
    >
      {children}
    </SearchbarContext.Provider>
  );
};

export default SearchbarContextContextProvider;

export const useSearchbarContext = (): ISearchbarContext => useContext(SearchbarContext);
