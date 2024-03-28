import { useEffect, useRef } from 'react';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Modal({ isOpen, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return <dialog ref={modalRef}>{children}</dialog>;
}
