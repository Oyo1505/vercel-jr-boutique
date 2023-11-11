"use client"
import { useSearchbarContext } from 'domains/common/context/search-bar-context'
import SearchIcon from 'domains/icons/search'
import styles from './search-navbar-button.module.scss'

const SearchNavbarButton = () => {
  const {onClickSearBar} = useSearchbarContext()
  return (
    <div className={styles.button} onClick={onClickSearBar}>
      <SearchIcon className={styles.loupe} />
    </div>
  )
}

export default SearchNavbarButton