'use client';

import { Folder, User } from '@prisma/client';
import { createContext, useContext, useEffect, useState } from 'react';

interface ModalProviderProps {
  children: React.ReactNode;
}

export type ModalData = {
  user?: User;
  folders?: Folder;
};

type ModalContextType = {
  data: ModalData;
  isOpen: boolean;
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void;
  setClose: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  data: {},
  isOpen: false,
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
  setClose: () => {},
});

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState<React.ReactNode>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen = async (
    modal: React.ReactNode,
    fetchData?: () => Promise<any>,
  ) => {
    if (modal) {
      if (fetchData) {
        setData(
          {
            ...data,
            ...(await fetchData()),
          } || {},
        );
      }
      setShowModal(modal);
      setIsOpen(true);
    }
  };

  const setClose = () => {
    setIsOpen(false);
    setData({});
  };

  if (!isMounted) return null;

  return (
    <ModalContext.Provider
      value={{
        data,
        setOpen,
        setClose,
        isOpen,
      }}
    >
      {children}
      {showModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within the modal provider');
  }

  return context;
};
