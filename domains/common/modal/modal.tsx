import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import s from './Modal.module.scss';
export const runtime = 'edge';
interface ModalProps {
  setShowModal: (showModal: boolean) => void;
  title?: string;
  className?: string;
  lockScrollWhenOpen?: boolean;
  closeOnClickOutside?: boolean;
  fixedContainer?: boolean;
  addCloseButton?: boolean;
  fitContent?: boolean;
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({
  children,
  setShowModal,
  className,
  title,
  lockScrollWhenOpen = true,
  closeOnClickOutside = true,
  fixedContainer = true,
  addCloseButton = true,
  fitContent = false
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback(
    // eslint-disable-next-line consistent-return
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true });
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  return (
    <div className={s.root}>
      <div className={s.modal} role="dialog" ref={ref}>
        <button
          type="button"
          onClick={() => onClose()}
          aria-label="Close panel"
          className={s.close}
        ></button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
