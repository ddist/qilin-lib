import { Resource } from "../../client/resource";
import { QilinClient } from "../../client/client";
import { DocumentVersion } from "./document_version";

export interface IDocumentPayload {}

export interface IDocumentResponse {
  id: number;
  created_at: string;
  updated_at: string;
  document_versions: DocumentVersion[];
}

/**
 * Main class for the Document resource in the Qilin Engine.
 */
export class Document extends Resource {
  protected _versions: DocumentVersion[];

  /**
   * Class constructor
   *
   * @param document Optional constructor argument
   * @param client QilinClient instance for backend interaction
   */
  constructor(document?: IDocumentResponse, client?: QilinClient) {
    super(client);
    this._path = "documents";
    if (document) {
      this.id = document.id;
      this.created_at = new Date(document.created_at);
      this.updated_at = new Date(document.updated_at);
      if (document.document_versions) {
        this.versions = document.document_versions.map(version => {
          return new DocumentVersion();
        });
      }
    } else {
      this.created_at = new Date();
      this.updated_at = new Date();
      this.versions = [];
    }
  }
  /**
   * Returns the document versions
   */
  get versions() {
    return this._versions;
  }
  /**
   * Sets the document versions
   */
  set versions(versions: DocumentVersion[]) {
    this._versions = versions;
  }
  /**
   * Creates or updates the document
   *
   * @remarks Calls the inherited _save method from Resource, with the corresponding
   * template parameters.
   */
  save() {
    return this._save<IDocumentPayload, IDocumentResponse>({});
  }
  /**
   * Destroys the document
   *
   * @remarks Calls the inherited _destroy method from Resource, with the corresponding
   * template parameters.save
   */
  destroy() {
    return this._destroy<IDocumentResponse>();
  }
}
