import { create } from 'zustand';

export type BannerVariant = 'info' | 'success' | 'error' | 'warning';

type Banner = {
  variant: BannerVariant;
  message: string;
  visible: boolean;
};
type UseBannerStoreT = {
  banner: {
    variant: BannerVariant;
    message: string;
    visible: boolean;
  };
  setBanner: (banner: Banner) => void;
};

export const useBannerStore = create<UseBannerStoreT>()((set) => ({
  banner: {
    variant: 'info',
    message: '',
    visible: false,
  },
  setBanner: (banner: Banner) => set({ banner }),
}));
