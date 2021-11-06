import {isPlainObject, isUndefined} from 'lodash';
import {join} from 'path';
import {ConnectionOptions} from 'typeorm';
import {SqlServerConnectionOptions} from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const env: NodeJS.ProcessEnv = process.env;

require('dotenv').config({path: join(__dirname, '.env')});

const isProdEnv = env.NODE_ENV === 'production';
const isTestEnv = env.NODE_ENV === 'test';
const isDevEnv = env.NODE_ENV === 'development' || (!isProdEnv && !isTestEnv);

const port = Number(env.PORT) || 3000;

const conf = {
  env: {
    prod: isProdEnv,
    test: isTestEnv,
    dev: isDevEnv,
  },
  port: port,
  typeormConfig: getTypeormConf(),
  jwtSecret: env.JWT_SECRET ?? 's0meC0mpl1cat3DS3cRET%!!',
  hostUrl: `http://localhost:${port}`,
  apiUrlPath: '/api/v1',

  forceSsl: false,
};

if (!isTestEnv && findUndefinedProperty(conf)) {
  throw new Error('undefined conf property: conf.' + findUndefinedProperty(conf));
}

if (isDevEnv) {
  console.log(conf);
}

export default conf;

// -----------------------------------------------------
//       helpers
// -----------------------------------------------------

function findUndefinedProperty(obj: object): string | undefined {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    // @ts-ignore
    const value = obj[key];
    if (isUndefined(value)) {
      return key;
    }

    if (isPlainObject(value) && findUndefinedProperty(value)) {
      return key + '.' + findUndefinedProperty(value);
    }
  }
}

function getTypeormConf(): ConnectionOptions {
  const dbType = String(env.DB_TYPE);
  let config: ConnectionOptions;
  if (dbType === 'mssql') {
    config = {
      type: String(env.DB_TYPE),
      host: String(env.DB_HOST),
      port: Number(env.DB_PORT),
      username: String(env.DB_USERNAME),
      password: String(env.DB_PASSWORD),
      database: String(env.DB_NAME),
      ssl: false,
      synchronize: true,
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
      extra: {
        validateConnection: false,
        trustServerCertificate: true,
      },
    } as SqlServerConnectionOptions;
  }
  return {
    ...config,
    entities: [join(__dirname, '**', '**.entity{.ts,.js}')],
  };
}
