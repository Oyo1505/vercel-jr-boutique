'use client';
import { FC } from 'react';
import logoFiabilite from '../../../../public/images/page-acceuil/Fiabilité.png';
import logoFlexibilite from '../../../../public/images/page-acceuil/Flexibilité.png';
import logoQualite from '../../../../public/images/page-acceuil/Qualité.png';
import styles from './acceuil-avantages.module.scss';
import { motion } from 'framer-motion';
import Card from '../card/card';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const cardData = [
  {
    logoSrc: logoFiabilite,
    altText: 'fiabilité',
    title: 'Fiabilité',
    description:
      'JR Distribution, un services flexible et de qualité auprès des professionels du métier de la bouche bisontins depuis 2002 !'
  },
  {
    logoSrc: logoQualite,
    altText: 'qualite',
    title: 'Qualité',
    description:
      'Un vaste choix de produits AOC & AOP pour une meilleure qualité et une juste rétribution de nos producteurs partenaires.',
    isMiddleCard: true
  },
  {
    logoSrc: logoFlexibilite,
    altText: 'flexibilite',
    title: 'Flexibilité',
    description:
      'Livraison sur Besançon en camion refrigeré, retrait sur place ou envoi dans toute la France via Colissimo.'
  }
];

const AcceuilAvantages: FC = () => {
  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Les avantages JR Distribution
      </motion.h1>
      <motion.div className={styles.cards} variants={container} initial="hidden" animate="visible">
        {cardData.map((card, index) => (
          <Card
            key={index}
            logoSrc={card.logoSrc}
            altText={card.altText}
            title={card.title}
            description={card.description}
            isMiddleCard={card.isMiddleCard}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AcceuilAvantages;
