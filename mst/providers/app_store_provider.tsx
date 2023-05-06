import { createContext } from 'react';

import { AppStore, IAppStore } from '../stores/app';
import { LocalStore } from '../stores/local';
import {useCustomContext} from "../../utils/hooks/useCustomContext";
import {IChildrenProps} from "../../utils/shared_types/Children";

const localStore = LocalStore.create({
    isLoading: true
});

const store = AppStore.create({
    localStore
});

const AppContext = createContext<IAppStore>(store);

export const AppStoreProvider = ({ children }: IChildrenProps) => (
    <AppContext.Provider value={store}>{children}</AppContext.Provider>
);

export const useAppStore = () => useCustomContext<IAppStore>(AppContext);

export const useLocalStore = () => {
    const appStore = useAppStore();

    return appStore.localStore;
};
