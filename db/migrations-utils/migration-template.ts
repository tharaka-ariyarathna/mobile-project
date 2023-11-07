import { getDb } from './database-connection';

export const up = async () => {
  const db = await getDb();
};

export const down = async () => {
  const db = await getDb();
};
