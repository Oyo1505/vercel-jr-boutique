'use client';
import { usePathname, useSearchParams } from 'next/navigation';

import { createContext, FC, useContext, useState } from 'react';
export interface ISearchbarContext {
  isShowSearchBar?: boolean;
  onClickSearBar?: () => void;
  pathname?: string;
  valueSearch?: string | null;
}

const initialRechercheFiltersContext: ISearchbarContext = {
  isShowSearchBar: false
};
interface SearchbarContextProviderProps {
  children: React.ReactNode;
}

export const SearchbarContext = createContext<ISearchbarContext>(initialRechercheFiltersContext);

const SearchbarContextContextProvider: FC<SearchbarContextProviderProps> = ({ children }) => {
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const valueSearch = searchParams.get('q');

  const onClickSearBar = () => {
    setIsShowSearchBar(!isShowSearchBar);
  };
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SearchbarContext.Provider
      value={{
        isShowSearchBar,
        onClickSearBar,
        pathname,
        valueSearch
      }}
    >
      {children}
    </SearchbarContext.Provider>
  );
};

export default SearchbarContextContextProvider;

export const useSearchbarContext = (): ISearchbarContext => useContext(SearchbarContext);
