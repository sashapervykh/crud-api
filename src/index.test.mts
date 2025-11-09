import server from './index.mts';
import { SavedUserModel } from './models/UserModel.ts';
import { validate } from 'uuid';

beforeAll(() => {
  server.listen(4000);
});

afterAll(() => {
  server.close();
});

const baseLink = 'http://localhost:4000/api/users';
let createdUser: SavedUserModel;
const mockedUserData = { username: 'John', age: 35, hobbies: ['fishing'] };

describe('The App', () => {
  it('should return empty array for first get request', async () => {
    const response = await fetch(baseLink, { method: 'GET' });
    const data = await response.json();
    expect(data).toStrictEqual([]);
  });
  it('should return created user for post response', async () => {
    const response = await fetch(baseLink, {
      method: 'POST',
      body: JSON.stringify(mockedUserData),
    });
    const data = await response.json();
    expect(data.username).toBe(mockedUserData.username);
    expect(data.age).toBe(mockedUserData.age);
    expect(data.hobbies).toStrictEqual(mockedUserData.hobbies);
    expect(data.id).toEqual(expect.any(String));
    expect(validate(data.id)).toBe(true);
  });
});
