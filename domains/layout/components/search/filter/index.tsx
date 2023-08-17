import { SortFilterItem } from 'lib/constants';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <div className='hidden md:block'>
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
        {title ? (
          <h3>{title}</h3>
        ) : null}
        <ul className='hidden md:block'>
          <FilterItemList list={list} />
        </ul>
        <ul className='md:hidden'>
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  );
}
