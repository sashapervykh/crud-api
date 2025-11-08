export function getTypeCheckedBody(body: string) {
  const bodyObject: unknown = JSON.parse(body);
  if (!bodyObject || typeof bodyObject !== 'object')
    throw new Error('The received body is not an object');

  if (
    !('username' in bodyObject) ||
    typeof bodyObject['username'] !== 'string'
  ) {
    throw new Error(
      'The username property does not exist in the body or has the wrong type!',
    );
  }

  if (!('age' in bodyObject) || typeof bodyObject['age'] !== 'number') {
    throw new Error(
      'The age property does not exist in the body or has the wrong type!',
    );
  }

  if (!('hobbies' in bodyObject) || !Array.isArray(bodyObject['hobbies'])) {
    throw new Error(
      'The hobbies property does not exist in the body or has the wrong type!',
    );
  }

  if (!bodyObject['hobbies'].every((elem) => typeof elem === 'string')) {
    throw new Error('Not all hobbies are string!');
  }

  return {
    username: bodyObject['username'],
    age: bodyObject['age'],
    hobbies: bodyObject['hobbies'],
  };
}
