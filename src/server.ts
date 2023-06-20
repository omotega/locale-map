import app from './app';
import config from './config/env';
import connectDb from './database/connection';

const port = config.PORT;


app.listen(port, () => {
  connectDb();
  console.log(`server started at port ${port}`);
});
