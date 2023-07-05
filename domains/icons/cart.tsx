import clsx from 'clsx';
import Image from 'next/image';
import ShoppingBagIcon from '../../public/images/header/PanierMenu.png';

export default function CartIcon({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative">
      <Image src={ShoppingBagIcon} className={clsx(className)} alt="panier" />
      {quantity ? (
        <div className="absolute bottom-0 left-0 -mb-3 -ml-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black text-xs text-white dark:border-black dark:bg-white dark:text-black">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
