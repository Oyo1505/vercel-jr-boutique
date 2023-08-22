import { SortFilterItem } from 'lib/constants';
import styles from './index.module.scss';
import { FilterItem } from './item';
export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <div>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </div>
  );
}

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <>
      <nav>
        {title ? <h3 className={styles.title}>{title}</h3> : null}
        <ul className={styles.listFilters}>
          <FilterItemList list={list} />
        </ul>
      </nav>
    </>
  );
}
