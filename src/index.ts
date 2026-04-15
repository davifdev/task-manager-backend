import express from 'express';
import { router } from './routes/route';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use(router);

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
