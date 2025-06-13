import { useState } from 'react';
import { KhorusContext } from '~/src/context/khorus';
import { khoros } from '~/src/libs/khoros';
import { KhorusContextT } from '~/src/types/khorus';

type KhorusProviderProps = {
  children: React.ReactNode;
};

export const KhorusProvider = ({ children }: KhorusProviderProps) => {
  const [khorusIndex, setKhorusIndex] = useState<number>(0);

  const currentKhorus = khoros[khorusIndex] || null;
  const isNotFound = !currentKhorus;
  const isLast = khorusIndex === khoros.length - 1;

  const ChangeKhorus = (khorusNo: number) => {
    const index = khoros.findIndex((khorus) => khorus.metadata.number === khorusNo);
    if (index !== -1) {
      setKhorusIndex(index);
    }
  };

  const onNextKhorus = () => {
    if (khorusIndex < khoros.length - 1) {
      setKhorusIndex((prev) => prev + 1);
    }
  };

  const onPrevKhorus = () => {
    if (khorusIndex > 0) {
      setKhorusIndex((prev) => prev - 1);
    }
  };

  const value: KhorusContextT = {
    khorus: currentKhorus,
    ChangeKhorus: ChangeKhorus,
    currentKhorusIndex: khorusIndex,
    isLastKhorus: isLast,
    isNotFound,
    onNextKhorus: onNextKhorus,
    onPreviousKhorus: onPrevKhorus,
  };

  return <KhorusContext.Provider value={value}>{children}</KhorusContext.Provider>;
};
