import { Folder } from "../../../src/core/repository/folder";
import { Document } from "../../../src/core/repository/document";

test("Testing Resource abstract class methods", () => {
  let folder = new Folder({
    id: 1,
    name: "Test Folder",
    created_at: "2019-4-5 10:00:00",
    updated_at: "2019-4-6 11:00:00"
  });
  expect(folder.id).toBe(1);
  expect(folder.path).toBe("folders");
  expect(folder.equals(new Folder())).toBeFalsy();
  expect(folder.client).toBeUndefined();
  let doc = new Document({
    id: 1,
    created_at: "2019-4-5 10:00:00",
    updated_at: "2019-4-6 11:00:00",
    document_versions: []
  });
  expect(folder.equals(doc)).toBeFalsy();
  expect(folder.equals(folder)).toBeTruthy();
});
