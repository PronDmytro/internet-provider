import {BaseException} from './base.exeption';

export class NoSuchAuthMethodException extends BaseException {

  public constructor(methodName: string, userInfo: string) {
    super(`Method: ${methodName}; user: ${userInfo}`);
  }

}
