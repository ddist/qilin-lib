import { Resource } from "../../client/resource";
import { QilinClient } from "../../client/client";

/**
 * Interface for the API response of Folder resources
 *
 * @remarks Matches the serialized Folder objects in the Qilin Engine
 */
export interface IFolderResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  parent?: IFolderResponse;
  children?: IFolderResponse[];
}
/**
 * Interface for the expected payload of Folder resources
 */
export interface IFolderPayload {
  attrs?: {
    name: string;
  };
  parent?: number | null;
  children?: (
    | {
        id: number;
      }
    | {
        name: string;
        parent: number;
      })[];
}
/**
 * Main class for the Folder resource in the Qilin Engine.
 *
 * The Folder model implements a nested tree structure through the
 * Materialized Path strategy, so every folder resource has an *ancestry*
 * property with a subtree in the format '... /folder_id/subfolder_id/ ...' .
 *
 * With the folder also comes his parent folder and children, which can be both
 * other folders or documents.
 */
export class Folder extends Resource {
  protected _name: string;
  protected _created_at: Date;
  protected _updated_at: Date;
  protected _parent: Folder;
  protected _children: Folder[];
  /**
   * Class constructor
   *
   * @param folder Optional constructor argument
   */
  constructor(folder?: IFolderResponse, client?: QilinClient) {
    super(client);
    this._path = "folders";

    if (folder) {
      this._id = folder.id;
      this._name = folder.name;
      this._created_at = new Date(folder.created_at);
      this._updated_at = new Date(folder.updated_at);
      if (folder.parent) this._parent = new Folder(folder.parent);
      if (folder.children) {
        this._children = folder.children.map(
          (child: IFolderResponse): Folder => {
            return new Folder(child);
          }
        );
      }
    } else {
      this._created_at = new Date();
      this._updated_at = new Date();
    }
  }
  /**
   * Returns the folder name
   */
  get name() {
    return this._name;
  }
  /**
   * Sets the folder name
   *
   * @param _name The new folder name
   */
  set name(_name: string) {
    this._name = _name;
  }
  /**
   * Returns the folder created_at property
   */
  get created_at() {
    return this._created_at;
  }
  /**
   * Sets the folder created_at property
   *
   * @param _created_at The new folder created_at property.
   */
  set created_at(_created_at: Date) {
    this._created_at = _created_at;
  }
  /**
   * Returns the folder updated_at property
   */
  get updated_at() {
    return this._updated_at;
  }
  /**
   * Sets the folder updated_at property
   *
   * @param _created_at The new folder updated_at property.
   */
  set updated_at(_updated_at: Date) {
    this._updated_at = _updated_at;
  }
  /**
   * Creates or updates the folder
   *
   * @remarks Calls the inherited _save method from [[Resource]], with the corresponding
   * template parameters.
   */
  save() {
    return this._save<IFolderPayload, IFolderResponse>({});
  }
}
