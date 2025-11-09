import { type SavedUserModel } from '../models/UserModel.ts';

class Database {
  _savedUsers: SavedUserModel[] = [];

  addUser(user: SavedUserModel) {
    this._savedUsers.push(user);
  }

  deleteUser(id: string) {
    this._savedUsers = this._savedUsers.filter((elem) => elem.id !== id);
  }

  getAllUsers() {
    return this._savedUsers;
  }

  getUser(id: string) {
    return this._savedUsers.find((elem) => elem.id === id);
  }

  updateUser(user: SavedUserModel) {
    const index = this._savedUsers.findIndex((elem) => elem.id === user.id);
    this._savedUsers[index] = user;
  }
}

export const database = new Database();
