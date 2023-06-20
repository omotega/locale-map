/* eslint-disable @typescript-eslint/no-namespace */
import express from 'express';
import Routes from './routes';
import { CustomRequest } from './utils/interface';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Request extends CustomRequest {}
  }
}

app.get('/', (req, res) => {
  res.send('welcome to locale application');
});

app.use('/api/user/', Routes.userRouter);

export default app;
