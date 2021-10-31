import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {

  /**
   * e.g. "https://apihost.com"
   */
  public apiHost: string;
  /**
   * e.g. "/api/v1"
   */
  public apiPrefix: string = environment.apiPrefix;

  public constructor() {
    this.apiHost =
      window.location.origin ||
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '');
  }

  /**
   * e.g. https://apihost.com/api/v1
   */
  public get apiUrl(): string {
    return `${this.apiHost}${this.apiPrefix}`;
  }

}
