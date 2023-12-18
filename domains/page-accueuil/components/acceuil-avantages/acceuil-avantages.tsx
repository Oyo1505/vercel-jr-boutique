import cn from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import logoFiabilite from '../../../../public/images/page-acceuil/Fiabilité.png';
import logoFlexibilite from '../../../../public/images/page-acceuil/Flexibilité.png';
import logoQualite from '../../../../public/images/page-acceuil/Qualité.png';
import styles from './acceuil-avantages.module.scss';

const AcceuilAvantages: FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Les avantages JR Distribution</h1>
    <div className={styles.cards}>
      <div className={styles.card}>
        <Image src={logoFiabilite} alt="fiabilité" loading="lazy" />
        <div className={styles.containerCard}>
          <div className={styles.titleCard}>Fiabilité</div>
          <div className={styles.text}>
            JR Distribution, un services flexible et de qualité auprès des professionels du métier
            de la bouche bisontins depuis 2002 !
          </div>
        </div>
      </div>
      <div className={cn(styles.card, styles.cardMiddle)}>
        <Image src={logoQualite} alt="qualite" loading="lazy" />
        <div className={styles.containerCard}>
          <div className={styles.titleCard}>Qualité</div>
          <div className={styles.text}>
            Un vaste choix de produits AOC & AOP pour une meilleure qualité et une juste rétribution
            de nos producteurs partenaires.
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <Image src={logoFlexibilite} alt="flexibilite" loading="lazy" />
        <div className={styles.containerCard}>
          <div className={styles.titleCard}>Flexibilité</div>
          <div className={styles.text}>
            Livraison sur Besançon en camion refrigeré , retrait sur place ou envoi dans toute la
            france via Colissimo.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AcceuilAvantages;
