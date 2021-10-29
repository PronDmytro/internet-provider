import {Module} from '@nestjs/common';
import {UserNotFoundException} from './user-not-found.exception';
import {WrongPasswordException} from './wrong-password.exception';
import {BaseException} from './base.exeption';
import {AllExceptionsFilter} from './all-exceptions.filter';

@Module({
  providers: [
    AllExceptionsFilter,
    BaseException,
    UserNotFoundException,
    WrongPasswordException,
  ],
  exports: [
    AllExceptionsFilter,
    BaseException,
    UserNotFoundException,
    WrongPasswordException,
  ],
})
export class ExceptionsModule {
}
