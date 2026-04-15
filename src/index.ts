import 'dotenv/config';
import express from 'express';
import { db } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { type RegisterSchema } from './schemas/register.schema';
import { validateResgister } from './middlewares/register.validation';

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

  const accessToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY!, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.SECRET_REFRESH_KEY!,
    {
      expiresIn: '30d',
    },
  );

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
