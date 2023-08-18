'use client';
import { usePathname } from 'next/navigation';
import { createContext, FC, useContext, useState } from 'react';

export interface ISearchbarContext {
  isShowSearchBar?: boolean;
  onClickSearBar?: () => void;
  pathname?: string;
}

const initialRechercheFiltersContext: ISearchbarContext = {
  isShowSearchBar: false
};

export const SearchbarContext = createContext<ISearchbarContext>(initialRechercheFiltersContext);

const SearchbarContextContextProvider: FC = ({ children }) => {
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const pathname = usePathname();

  const onClickSearBar = () => {
    setIsShowSearchBar(!isShowSearchBar);
  };
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SearchbarContext.Provider
      value={{
        isShowSearchBar,
        onClickSearBar,
        pathname
      }}
    >
      {children}
    </SearchbarContext.Provider>
  );
};

export default SearchbarContextContextProvider;

export const useSearchbarContext = (): ISearchbarContext => useContext(SearchbarContext);
