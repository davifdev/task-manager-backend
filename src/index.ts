import express from 'express';
import { db } from '../lib/prisma';
import bcrypt from 'bcryptjs';

import { type RegisterSchema } from './schemas/register.schema';
import { validateResgister } from './middlewares/register.validation';
import { generateAccessToken, generateRefreshToken } from './helpers/tokens';

const app = express();
app.use(express.json());

const PORT = 3000;

app.post('/register', validateResgister, async (req, res) => {
  const { username, email, password }: RegisterSchema = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.status(201).json({
    email,
    tokens: {
      accessToken,
      refreshToken,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
