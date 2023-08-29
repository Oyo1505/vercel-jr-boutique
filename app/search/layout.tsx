import FilterList from 'domains/layout/components/search/filter';
import { sorting } from 'lib/constants';

import { Suspense } from 'react';
import styles from './layout.module.scss';
import Loading from './loading';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.container}>
        <div>{children}</div>
        <div>
          <FilterList list={sorting} title="Filtres" />
        </div>
      </div>
    </Suspense>
  );
}
