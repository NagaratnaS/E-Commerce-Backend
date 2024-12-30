import * as bcrypt from 'bcrypt';

export async function createHash(password: string): Promise<string> {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function isPasswordMatch(
  passwordEnteredByUser: string,
  passwordInDb: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(passwordEnteredByUser, passwordInDb);
  return isMatch;
}
