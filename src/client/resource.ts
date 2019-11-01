import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { QilinClient } from "./client";

/**
 * Parent class for Qilin Engine resources. Has reference to a client
 * instance that interacts with the backend and provides template save/destroy
 *  methods.
 */
export abstract class Resource {
  protected _client: QilinClient | undefined;
  protected _path: string;
  protected _id: number | undefined;
  protected _created_at: Date;
  protected _updated_at: Date;
  /**
   * All resources must have a valid QilinClient instance that connects to
   * the backend and can handle authentication.
   *
   * @param client Client instance for backend connection
   */
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
   * Sets the resource id
   *
   * @param _id The new resource id
   */
  set id(_id: number | undefined) {
    this._id = _id;
  }
  /**
   * Returns the folder created_at property
   */
  get created_at() {
    return this._created_at;
  }
  /**
   * Sets the resource created_at property
   *
   * @param _created_at The new resource created_at property.
   */
  set created_at(_created_at: Date) {
    this._created_at = _created_at;
  }
  /**
   * Returns the resource updated_at property
   */
  get updated_at() {
    return this._updated_at;
  }
  /**
   * Sets the resource updated_at property
   *
   * @param _created_at The new resource updated_at property.
   */
  set updated_at(_updated_at: Date) {
    this._updated_at = _updated_at;
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
      // Calculate the endpoint for the resource
      let url = new URL(this.client.endpoint.toJSON());
      url.pathname += this._path;
      if (this.id) url.pathname += "/" + this.id.toString();
      // Get base config object from the client
      const config: AxiosRequestConfig = this._client.getXhrConfig();
      // Add other config
      config.url = url.toJSON();
      config.method = this.id ? "PUT" : "POST";
      config.data = payload;
      // Perform the request
      return Axios.request<K>(config);
    } else {
      throw new Error("The Qilin Client for this resource is undefined");
    }
  };
  /**
   * Low level destroy method for resources. It performs the following action:
   * - DELETE  '\<client_endpoint\>/\<resource_path\>/\<resource_id\>'
   *
   * @typeparam K  Type for the promise response data
   *
   * @return Promise that resolves when the resource is destroyed
   */
  protected _destroy = <K>(): Promise<AxiosResponse<K>> => {
    if (this._client) {
      // Calculate the endpoint for the resource
      let url = new URL(this.client.endpoint.toJSON());
      url.pathname += this._path;
      if (this.id) {
        url.pathname += "/" + this.id.toString();
      } else {
        throw new Error(
          "The resource hasn't been persisted yet so it can't be destroyed"
        );
      }
      // Get base config object from the client
      const config: AxiosRequestConfig = this._client.getXhrConfig();
      // Add other config
      config.url = url.toJSON();
      config.method = "DELETE";
      // Perform the request
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
  /**
   * Destroys the resource
   *
   * @remarks Must be implemented by classes extending this class
   */
  abstract destroy(): any;
}
