import Footer from 'domains/common/components/footer/footer';
import Collections from 'domains/layout/components/search/collections';
import FilterList from 'domains/layout/components/search/filter';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div>
        <div>
          <Collections />
        </div>
        <div>{children}</div>
        <div>
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
