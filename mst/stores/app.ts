import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { LocalStore } from './local';
import { UserStore } from './user';

export const AppStore = types
    .model('AppStore', {
        localStore: types.optional(LocalStore, {
            isLoading: false
        })
    })
    .actions(self => ({}));

export interface IAppStore extends Instance<typeof AppStore> {}
export interface IAppStoreSnapshotIn extends SnapshotIn<typeof AppStore> {}
export interface IAppStoreSnapshotOut extends SnapshotOut<typeof AppStore> {}
