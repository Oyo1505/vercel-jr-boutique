import Footer from 'domains/common/footer/footer';
import Collections from 'domains/layout/search/collections';
import FilterList from 'domains/layout/search/filter';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className='mx-auto flex max-w-7xl flex-col bg-white py-6 text-black dark:bg-black dark:text-white md:flex-row'>
        <div className='order-first flex-none md:w-1/6'>
          <Collections />
        </div>
        <div className='order-last min-h-screen w-full md:order-none'>{children}</div>
        <div className='order-none md:order-last md:w-1/6 md:flex-none'>
          <FilterList list={sorting} title='Sort by' />
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
