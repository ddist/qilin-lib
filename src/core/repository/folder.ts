import { Resource } from "../../client/resource";
import { QilinClient } from "../../client/client";
import { Document, IDocumentResponse } from "./document";

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
  documents?: IDocumentResponse[];
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

  protected _parent: Folder;
  protected _children: Folder[];
  protected _documents: Document[];
  /**
   * Class constructor
   *
   * @param folder Optional constructor argument
   * @param client QilinClient instance for backend interaction
   */
  constructor(folder?: IFolderResponse, client?: QilinClient) {
    super(client);
    this._path = "folders";

    if (folder) {
      this.id = folder.id;
      this.name = folder.name;
      this.created_at = new Date(folder.created_at);
      this.updated_at = new Date(folder.updated_at);
      // Create the parent folder object
      if (folder.parent) this._parent = new Folder(folder.parent);
      // Create all children folder objects
      if (folder.children) {
        this._children = folder.children.map(
          (child: IFolderResponse): Folder => {
            return new Folder(child);
          }
        );
      }
      // Create all children document objects
      if (folder.documents) {
        this._documents = folder.documents.map(
          (doc: IDocumentResponse): Document => {
            return new Document(doc);
          }
        );
      }
    } else {
      this.created_at = new Date();
      this.updated_at = new Date();
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
   * Creates or updates the folder
   *
   * @remarks Calls the inherited _save method from Resource, with the corresponding
   * template parameters.
   */
  save() {
    return this._save<IFolderPayload, IFolderResponse>({});
  }
  /**
   * Destroys the folder
   *
   * @remarks Calls the inherited _destroy method from Resource, with the corresponding
   * template parameters.save
   */
  destroy() {
    return this._destroy<IFolderResponse>();
  }
}
