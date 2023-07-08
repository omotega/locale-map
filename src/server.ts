import app from './app';
import config from './config/env';
import connectDb from './database/connection';
import Cache from './config/redis';

const port = config.PORT;

connectDb();

Cache.connect();

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
