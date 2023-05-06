import { createContext } from 'react';

import { DomainStore, IDomainStore } from '../stores/domain';
import { UserStore } from '../stores/user';
import {IChildrenProps} from "../../utils/shared_types/Children";
import {useCustomContext} from "../../utils/hooks/useCustomContext";

const userStore = UserStore.create({
    isLoading: true
});

const store = DomainStore.create({
    userStore
});

const DomainContext = createContext<IDomainStore>(store);

export const DomainStoreProvider = ({ children }: IChildrenProps) => (
    <DomainContext.Provider value={store}>{children}</DomainContext.Provider>
);

export const useDomainStore = () => useCustomContext<IDomainStore>(DomainContext);

export const useUserStore = () => {
    const domainStore = useDomainStore();

    return domainStore.userStore;
};
