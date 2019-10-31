import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { QilinClient } from "./client";

export abstract class Resource {
  protected _client: QilinClient | undefined;
  protected _path: string;
  protected _id: number | undefined;

  constructor(client?: QilinClient) {
    this._client = client instanceof QilinClient ? client : undefined;
  }
  /**
   * Returns the resource URL path
   */
  get path() {
    return this._path;
  }
  /**
   * Returns the resource client
   */
  get client() {
    return this._client;
  }
  /**
   * Returns the resource id
   */
  get id() {
    return this._id;
  }
  /**
   * Sets the folder id
   *
   * @param _id The new resource id
   */
  set id(_id: number | undefined) {
    this._id = _id;
  }
  /**
   * Low level save method for resources. It performs one of these two actions:
   * - POST '\<client_endpoint\>/\<resource_path\>'
   * - PUT  '\<client_endpoint\>/\<resource_path\>/\<resource_id\>'
   *
   * @typeparam T  Type of the payload param
   * @typeparam K  Type for the promise response data
   * @param payload  Data sent to the Qilin Engine to create or update the resource
   *
   * @return Promise that resolves when the resource is saved
   */
  protected _save = <T, K>(payload: T): Promise<AxiosResponse<K>> => {
    if (this._client) {
      let url = new URL(this.client.endpoint.toJSON());
      url.pathname += this._path;
      if (this.id) url.pathname += "/" + this.id.toString();
      const config: AxiosRequestConfig = {
        url: url.toJSON(),
        method: this.id ? "PUT" : "POST",
        data: payload
      };

      return Axios.request<K>(config);
    } else {
      throw new Error("The Qilin Client for this resource is undefined");
    }
  };
  /**
   * Creates the resource or updates the resource if it already exists
   *
   * @remarks Must be implemented by classes extending this class
   */
  abstract save(): any;
}
