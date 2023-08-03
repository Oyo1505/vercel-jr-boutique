import { useOnClickOutside } from 'domains/common/hooks/use-on-click-outside';
import { motion } from 'framer-motion';
import { FC, MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './custom-modal.module.scss';
interface Props {
  children: ReactNode;
  openModal: boolean;
  closeOnClickOutside?: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
  direction: string;
  maxWidth?: string;
}

const CustomModal: FC<Props> = ({
  children,
  openModal,
  closeOnClickOutside = true,
  setIsOpen,
  direction = 'right',
}) => {
  const ref = useRef<Element | null>(null);
  const modalRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [mounted, setMounted] = useState(false);

  useOnClickOutside(modalRef, () => {
    if (closeOnClickOutside) setIsOpen(false);
  });
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#portal');
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <motion.div
          ref={modalRef}
          transition={{ duration: 0.2, delay: 0.1 }}
          initial={{ opacity: 0 }}
          animate={{
            right: direction === 'right' && openModal ? 0 : direction === 'left' ? 'inherit' : -700,
            left: direction === 'left' && openModal ? 0 : direction === 'right' ? 'inherit' : -700,
            opacity: openModal ? 1 : 0
          }}
          style={{boxShadow : direction === 'right' ? '-7px 4px 15px -3px rgba(0, 0, 0, 0.1)' :'7px 4px 15px -3px rgba(0, 0, 0, 0.1)'}}
          className={styles.dialog}
        >
          {children}
        </motion.div>,
        ref.current
      )
    : null;
};

export default CustomModal;
