'use client';

import clsx from 'clsx';
import { useSearchbarContext } from 'domains/common/context/search-bar-context';
import { AnimatePresence, motion } from 'framer-motion';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './search.module.scss';

export default function Search() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const { isShowSearchBar, valueSearch, pathname } = useSearchbarContext();
  const [valueSearchBar, setValueSearchBar] = useState<string>();
  const inputSearch = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pathname !== '/search' && inputSearch.current && inputSearch.current.value) {
      setValueSearchBar(() => '');
      inputSearch.current.value = '';
    }
  }, [pathname]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams?.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setValueSearchBar(() => newValue);
  }

  return (
    <AnimatePresence>
      {isShowSearchBar && (
        <motion.form
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{
            height: 25,
            opacity: 1,
            marginTop: 20
          }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          onSubmit={onSubmit}
          className={styles.search}
        >
          <input
            type='text'
            name='search'
            placeholder='Tapez votre recheche'
            autoComplete='off'
            ref={inputSearch}
            defaultValue={valueSearch || ''}
            className={clsx(
              styles.searchInput,
              (valueSearchBar || valueSearch) && styles.isNotEmpty
            )}
            onChange={handleChange}
          />
        </motion.form>
      )}
    </AnimatePresence>
  );
}
