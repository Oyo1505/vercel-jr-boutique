import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const RestrictedPage: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default RestrictedPage;
