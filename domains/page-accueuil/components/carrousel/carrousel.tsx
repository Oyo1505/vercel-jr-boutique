'use client';
import GridProductLabels from 'domains/grid/components/grid_product-labels/grid-product-labels';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './carrousel.module.scss';
import { useInView } from 'framer-motion';

interface Props {
  title: string;
  products?: any;
}

const Carrousel: FC<Props> = ({ title, products }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const settings = {
    dots: true,
    dotsClass: styles.dots,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 6000
  };

  if (!products?.length) return null;

  return (
    <div
      ref={ref}
      className={styles.container}
      style={{
        opacity: isInView ? 1 : 0
      }}
    >
      <h4 className={styles.title}>{title}</h4>

      <Slider {...settings}>
        {products &&
          products?.map((product: any, index: number) => (
            <div key={`${product?.name}-${index}`} className={styles.lastProducts}>
              <Link href={`product/${product?.handle}`}>
                <div className={styles.imageProduct}>
                  <Image
                    src={product?.images?.[0]?.url}
                    loading="lazy"
                    alt={product?.handle}
                    width={250}
                    height={250}
                    quality={90}
                  />
                </div>
              </Link>
              <GridProductLabels product={product} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Carrousel;
