import Modal from './Modal';
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

type DeleteButtonProps<T> = {
  title: string;
  setData: (arg0: T) => void;
  apiEndPoint: string;
};

export default function DeleteButton<T>({ title, setData, apiEndPoint }: DeleteButtonProps<T>) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      {createPortal(
        isModalOpen && (
          <Modal isOpen={isModalOpen}>
            <form onSubmit={handleDelete} ref={formRef}>
              <p>Are you sure you want to delete {title}</p>
              <button
                onClick={() => {
                  handleModal();
                  formRef.current?.requestSubmit();
                }}>
                Yes
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleModal();
                }}>
                No
              </button>
            </form>
          </Modal>
        ),
        document.body
      )}
      <button onClick={() => setIsModalOpen(true)} disabled={loading}>
        Delete
      </button>
    </>
  );

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(apiEndPoint, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include'
      });

      if (res.ok) {
        const resResult: T = await res.json();
        setData(resResult);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }
}
