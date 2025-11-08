export interface NewUserModel {
  username: string;
  age: number;
  hobbies: string[];
}

export interface SavedUserModel extends NewUserModel {
  id: string;
}
