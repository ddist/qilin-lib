import { AxiosRequestConfig } from "axios";

export class QilinClient {
  private _endpoint: URL;

  get endpoint(): URL {
    return this._endpoint;
  }

  set endpoint(_endpoint: URL) {
    this._endpoint = _endpoint;
  }
  /**
   * Returns an AxiosRequestConfig object with Authentication headers
   *
   * TODO Implement authentication mechanisms
   */
  getXhrConfig = (): AxiosRequestConfig => {
    return {};
  };
}
