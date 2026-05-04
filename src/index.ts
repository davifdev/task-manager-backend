import express from 'express';
import { router } from './routes/route';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

app.use(router);

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
