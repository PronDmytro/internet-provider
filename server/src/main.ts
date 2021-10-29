import conf from './conf';
import {createMainApp} from './app';

async function bootstrap() {
  const app = await createMainApp();

  await app.listen(conf.port);
}

bootstrap();
