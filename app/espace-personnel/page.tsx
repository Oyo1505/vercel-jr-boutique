import Link from 'next/link';
import { FC } from 'react';
import styles from './page.module.scss';
interface Props {
  title: string;
  path: string;
}
const Tuile: FC<Props> = ({ title, path }) => {
  return (
    <>
      <div className={styles.tuile}>
        <Link href={path}>{title}</Link>
      </div>
    </>
  );
};

const Page = () => {
  return (
    <div className={styles.container}>
      <div>
        <p>Bienvenue sur votre page d&apos;acceuil.</p>
        <p>Ici vous pouvez gérer vos informations personnelles ansi que vos commandes</p>
      </div>
      <div className={styles.containerTuiles}>
        <Tuile title={'Mes information'} path={'/mes-information'} />
        <Tuile title={'Mes adresses'} path={'/mes-adresses'} />
        <Tuile title={'Mes Commandes'} path={'/mes-commandes'} />
        <Tuile title={'Mes Alertes'} path={'/mes-alertes'} />
      </div>
    </div>
  );
};

export default Page;
