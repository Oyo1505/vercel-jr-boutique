'use client';

import clsx from 'clsx';
import { useSearchbarContext } from 'domains/common/context/search-bar-context';
import { motion } from 'framer-motion';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './search.module.scss';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isShowSearchBar } = useSearchbarContext();
  const [valueSearchBar, setValueSearchBar] = useState<string>()
  const  inputSearch = useRef(null)
  
  useEffect(() => {

  }, [] )

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

  function handleChange (event: React.FormEvent<HTMLFormElement>) {
    setValueSearchBar(() => event.target.value);
  }
  return (
    isShowSearchBar && (
      <motion.form
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          height: isShowSearchBar ? 25 : 0,
          opacity: isShowSearchBar ? 1 : 0
        }}
        onSubmit={onSubmit}
        className={styles.search}
      >
        <input
          type='text'
          name='search'
          placeholder='Tapez votre recheche'
          autoComplete='off'
          ref={inputSearch}
          defaultValue={searchParams?.get('q') || ''}
          className={clsx(styles.searchInput , valueSearchBar && styles.isNotEmpty)}
          onChange={handleChange}
        />
      </motion.form>
    )
  );
}
