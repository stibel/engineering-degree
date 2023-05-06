import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { IUserSnapshotIn, User } from '../models/user_model';

export const UserStore = types
    .model('UserStore', {
        user: types.maybeNull(User),
        isLoading: types.boolean
    })
    .actions(self => ({
        setUser(user: IUserSnapshotIn) {
            self.user = User.create(user);
        },
        setLoading(isLoading: boolean) {
            self.isLoading = isLoading;
        },
        logIn(user: IUserSnapshotIn) {
            self.user = User.create(user);
            self.isLoading = false;
        },
        logOut() {
            self.user = null;
            self.isLoading = false;
        }
    }));

export interface IUserStore extends Instance<typeof UserStore> {}
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStore> {}
export interface IUserStoreSnapshotOut extends SnapshotOut<typeof UserStore> {}
