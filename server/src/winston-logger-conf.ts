import {format, transports} from 'winston';
import conf from './conf';

export const winstonConf = {

  level: conf.env.prod ? 'info' : 'debug',
  exitOnError: false,
  format: format.combine(),
  transports: [
    new transports.Console({
      format: format.combine(
        format.errors({stack: true}),
        format.timestamp(),
        conf.env.prod ? format.json() : format.prettyPrint({colorize: true}),
      ),
    }),
  ],
};
