import * as bcrypt from 'bcrypt';

export const generateHashPassword = (password: string): string => {
  const saltOrRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltOrRounds);
  return hashedPassword;
};

export const validatePassword = (password: string, hash: string): boolean => {
  const isMatchPassword = bcrypt.compareSync(password, hash);
  return isMatchPassword;
};
