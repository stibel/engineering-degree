import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const User = types
    .model({
        firstName: types.string,
        lastName: types.string,
        email: types.string,
        phone: types.string,
        id: types.identifierNumber,
        uuid: types.string
    })
    .views(self => ({
        get fullName() {
            return `${self.firstName} ${self.lastName}`;
        }
    }))
    .actions(self => ({
        setFirstName(firstName: string) {
            self.firstName = firstName;
        },
        setLastName(lastName: string) {
            self.lastName = lastName;
        },
        setEmail(email: string) {
            self.email = email;
        },
        setPhone(phone: string) {
            self.phone = phone;
        }
    }));

export interface IUser extends Instance<typeof User> {}
export interface IUserSnapshotIn extends SnapshotIn<typeof User> {}
export interface IUserSnapshotOut extends SnapshotOut<typeof User> {}
