import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

type AppType = 'creator' | 'visitor';

export const LocalStore = types
    .model('LocalStore', {
        appType: types.maybeNull(types.enumeration(['creator', 'visitor'])),
        isLoading: types.boolean
    })
    .actions(self => ({
        setAppType(appType: AppType) {
            localStorage.setItem('app-type', appType);
            self.appType = appType;
        }
    }));

export interface ILocalStore extends Instance<typeof LocalStore> {}
export interface ILocalStoreSnapshotIn extends SnapshotIn<typeof LocalStore> {}
export interface ILocalStoreSnapshotOut extends SnapshotOut<typeof LocalStore> {}
