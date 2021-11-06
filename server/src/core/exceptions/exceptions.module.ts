import {Module} from '@nestjs/common';
import {BaseException} from './base.exeption';
import {AllExceptionsFilter} from './all-exceptions.filter';

@Module({
  providers: [
    AllExceptionsFilter,
    BaseException,
  ],
  exports: [
    AllExceptionsFilter,
    BaseException,
  ],
})
export class ExceptionsModule {
}
