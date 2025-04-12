import { create } from "zustand";

const defaultAccountData = {
    id: "",
    firstName: "",
    lastName: "",
    occupation: "",
    createdAt: '',
    updatedAt: '',
};

type _typeInterface_ = {
    accounts: typeof defaultAccountData[];
    selectedAccount: typeof defaultAccountData;

    _setAllAcountsData: (accounts: typeof defaultAccountData[]) => void;
    _setAcountData: (accounts: typeof defaultAccountData) => void;
};
  
export const useAccountStore = create<_typeInterface_>((set) => ({
    accounts: [],
    selectedAccount: defaultAccountData,
 
    _setAllAcountsData: (data) => {
    
        set((_state) => {
            return {
                accounts: data,
            };
        });
    },
 
    _setAcountData: (data) => {
    
        set((_state) => {
            return {
                selectedAccount: data,
            };
        });
    },
    
}));
  