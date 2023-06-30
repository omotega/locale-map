import app from './app';
import config from './config/env';
import connectDb from './database/connection';

const port = config.PORT;

connectDb();

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
