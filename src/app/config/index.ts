import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url_local: process.env.DATABASE_URL_LOCAL,
  database_url_atlas: process.env.DATABASE_URL_ATLAS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_pass: process.env.DEFAULT_PASS,
};
