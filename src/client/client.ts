export class QilinClient {
  private _endpoint: URL;

  get endpoint(): URL {
    return this._endpoint;
  }

  set endpoint(_endpoint: URL) {
    this._endpoint = _endpoint;
  }
}
