'use client';

import clsx from 'clsx';
import { useSearchbarContext } from 'domains/common/context/search-bar-context';
import { motion } from 'framer-motion';
import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './search.module.scss';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isShowSearchBar } = useSearchbarContext();
  
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
        className={clsx(styles.search, searchParams && styles.isNotEmpty)}
      >
        <input
          type='text'
          name='search'
          placeholder='Tapez votre recheche'
          autoComplete='off'
          defaultValue={searchParams?.get('q') || ''}
          className={styles.searchInput}
        />
      </motion.form>
    )
  );
}
