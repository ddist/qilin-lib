import { Document } from "../../../src/core/repository/document";

test("Testing Document constructor with no params", () => {
  let doc = new Document();
  expect(doc.id).toBeUndefined();
  expect(doc.created_at).toBeInstanceOf(Date);
  expect(doc.updated_at).toBeInstanceOf(Date);
  expect(doc.client).toBeUndefined();
});

test("Testing Document constructor with params", () => {
  let doc = new Document({
    id: 1,
    created_at: "2019-4-5 10:00:00",
    updated_at: "2019-4-6 11:00:00",
    document_versions: []
  });
  expect(doc.id).toBe(1);
  expect(doc.updated_at).toBeInstanceOf(Date);
  expect(doc.created_at).toBeInstanceOf(Date);
  expect(doc.client).toBeUndefined();
  expect(doc.versions).toHaveLength(0);
});

test("Testing resource path", () => {
  let doc = new Document();
  expect(doc.path).toBe("documents");
});

test("Testing parent class methods", () => {
  let doc = new Document();
  expect(() => {
    doc.save();
  }).toThrow();
  expect(() => {
    doc.destroy();
  }).toThrow();
});
