/* eslint-disable @typescript-eslint/no-namespace */
import express from 'express';
import Routes from './routes';
import { CustomRequest } from './utils/interface';
import Limiter from './middleawre/rate';

const app = express();

app.use(Limiter);

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
app.use('/api/location/', Routes.locationRouter);
app.use('/api/docs/', Routes.docRouter);

app.use((req, res) =>
  res.status(404).send({
    status: 'error',
    error: 'Not found',
    message: 'Route not correct kindly check url.'
  })
);

export default app;
