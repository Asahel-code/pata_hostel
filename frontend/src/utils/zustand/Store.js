import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: {
          token: null,
          isAdmin: false,
          isLandLord: false,
          username: null
        },
        setToken: (response) =>
          set((state) => ({ user: { ...state.user, token: response?.accessToken, isAdmin: response?.isAdmin, isLandLord: response.isLandLord, isVerified: response.isVerified, username: response?.username } })),
        removeToken: () =>
          set((state) => ({ user: { ...state.user, token: null, isAdmin: false, isLandLord: false, isVerified: false, username: null } })),
      }),
      { name: "pata_hostel_user" }
    )
  )
);

export const useHouseStore = create(
  devtools(
    persist(
      (set) => ({
        house: {
          hostel: null,
          landlord: null,
          name: null,
          slug: null,
          termsAndCondition: null,
        },
        setHouse: (response) =>
          set((state) => ({ house: { ...state.house, hostel: response?.house?._id, landlord: response?.house.landlord, name: response?.house?.name, slug: response?.house?.slug, termsAndCondition: response?.landLord?.termsAndCondition } })),
        removeHouse: () =>
          set((state) => ({ house: { ...state.house, hostel: null, landlord: null, name: null, slug: null, termsAndCondition: null, } })),
      }),
      { name: "pata_hostel_house" }
    )
  )
);


export default useUserStore;