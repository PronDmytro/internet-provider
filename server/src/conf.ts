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
  typeormConfig: getTypeormConf(isProdEnv),
  jwtSecret: env.JWT_SECRET ?? 's0meC0mpl1cat3DS3cRET%!!',
  hostUrl: `http://localhost:${port}`,
  apiUrlPath: '/api/v1',

  forceSsl: parseBool(env.FORCE_SSL, isProdEnv),
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

function parseBool(value: any, defaultValue = false) {
  if (isUndefined(value)) {
    return defaultValue;
  }

  if (value === 'true' || value === '1' || value === 1 || value === true) {
    return true;
  }

  if (value === 'false' || value === '0' || value === 0 || value === false) {
    return false;
  }

  throw new Error('conf#parseBool: can not parse boolean value' + value);
}

function getTypeormConf(isProd: boolean): ConnectionOptions {
  const dbType = String(env.TYPEORM_DB_TYPE);
  let config: SqlServerConnectionOptions;
  if (dbType === 'mssql') {
    config = {
      type: dbType,
      ssl: false,
      synchronize: !isProd,
      url: String(env.DATABASE_URL),
      host: String(env.TYPEORM_HOST),
      port: Number(env.TYPEORM_PORT),
      username: String(env.TYPEORM_USERNAME),
      password: String(env.TYPEORM_PASSWORD),
      database: String(env.TYPEORM_DATABASE),
    } as SqlServerConnectionOptions;
  }

  return {
    ...config,
    entities: [join(__dirname, '**', '**.entity{.ts,.js}')],
  };
}
