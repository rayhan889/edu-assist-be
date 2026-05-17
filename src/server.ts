import app from './app';
import { env } from './config/env';

const PORT: number = env.port;

app.listen(PORT, (): void => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on ${PORT}...`);
});
