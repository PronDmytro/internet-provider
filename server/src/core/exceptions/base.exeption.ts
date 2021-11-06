export class BaseException extends Error {

  public constructor(public readonly serverMsg?: string, public readonly clientMsg?: string) {
    super(serverMsg);
  }

  public get type() {
    return this.constructor.name;
  }

}
