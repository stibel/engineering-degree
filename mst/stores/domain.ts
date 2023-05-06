import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { UserStore } from './user';

export const DomainStore = types
    .model('DomainStore', {
        userStore: types.optional(UserStore, {
            user: null,
            isLoading: true
        })
    })
    .actions(self => ({}));

export interface IDomainStore extends Instance<typeof DomainStore> {}
export interface IDomainStoreSnapshotIn extends SnapshotIn<typeof DomainStore> {}
export interface IDomainStoreSnapshotOut extends SnapshotOut<typeof DomainStore> {}
