import FormContact from 'domains/contact/form-contact/form-contact';
import Map from 'domains/contact/map/map';
import Image from 'next/image';
import logo from '../../public/images/page-acceuil/Fiabilité.png';
import styles from './page.module.scss';
export default async function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <Image src={logo} alt="home" />
        <h2>JR Distribution</h2>
        <div className={styles.line}>25 chemin du sanatorium</div>
        <div className={styles.line}>25 000 Besançon</div>
        <div className={styles.phone}>03 81 53 02 06</div>
      </div>
      <div className={styles.elements}>
        <FormContact />
        <Map />
      </div>
    </div>
  );
}
