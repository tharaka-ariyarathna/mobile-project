import { generateHashPassword } from '../../src/utils/password-utils';
import { getDb } from '../migrations-utils/database-connection';

export const up = async () => {
  const db = await getDb();

  await db.collection('user').insertOne({
    username: 'user1',
    password: generateHashPassword('user1'),
  });
};

export const down = async () => {
  const db = await getDb();
};
