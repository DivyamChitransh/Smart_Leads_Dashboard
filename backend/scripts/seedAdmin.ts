
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../src/models/User';

dotenv.config();

const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@smartleads.com';
const password = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@123';
const name = process.env.SEED_ADMIN_NAME ?? 'Admin';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI in backend/.env');
    process.exit(1);
  }

  await mongoose.connect(uri);

  const exists = await User.findOne({ email });
  if (!exists) {
    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
      role: 'admin',
    });
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
