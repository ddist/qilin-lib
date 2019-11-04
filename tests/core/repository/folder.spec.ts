import { Folder } from "../../../src/core/repository/folder";

test("Testing Folder constructor with no params", () => {
  let folder = new Folder();
  expect(folder).toBeInstanceOf(Folder);
  expect(folder.name).not.toBeDefined();
  expect(folder.created_at).toBeInstanceOf(Date);
  expect(folder.updated_at).toBeInstanceOf(Date);
});

test("Testing Folder constructor with params", () => {
  let folder = new Folder({
    id: 1,
    name: "Test Folder",
    created_at: "2019-4-5 10:00:00",
    updated_at: "2019-4-6 11:00:00"
  });
  expect(folder).toBeInstanceOf(Folder);
  expect(folder.id).toBe(1);
  expect(folder.name).toBe("Test Folder");
  expect(folder.created_at).toStrictEqual(new Date("2019-4-5 10:00:00"));
  expect(folder.updated_at).toStrictEqual(new Date("2019-4-6 11:00:00"));

  folder = new Folder({
    id: 1,
    name: "Test Folder",
    created_at: "2019-4-5 10:00:00",
    updated_at: "2019-4-6 11:00:00",
    parent: {
      id: 4,
      name: "Parent Folder",
      created_at: "2019-4-5 10:00:00",
      updated_at: "2019-4-6 11:00:00"
    },
    children: [
      {
        id: 2,
        name: "Test Folder 2",
        created_at: "2019-4-5 10:00:00",
        updated_at: "2019-4-6 11:00:00"
      },
      {
        id: 3,
        name: "Test Folder 3",
        created_at: "2019-4-5 10:00:00",
        updated_at: "2019-4-6 11:00:00"
      }
    ],
    documents: [
      {
        id: 1,
        created_at: "2019-4-5 10:00:00",
        updated_at: "2019-4-6 11:00:00",
        document_versions: []
      }
    ]
  });
  expect(folder.parent).toBeInstanceOf(Folder);
  expect(folder.parent.name).toBe("Parent Folder");
  expect(folder.children).toHaveLength(2);
  expect(folder.documents).toHaveLength(1);
});

test("Testing Folder class setters", () => {
  let folder = new Folder();
  folder.name = "Test Folder";
  folder.created_at = new Date("2019-4-5 10:00:00");
  folder.updated_at = new Date("2019-4-6 11:00:00");
  expect(folder.name).toBe("Test Folder");
  expect(folder.created_at).toStrictEqual(new Date("2019-4-5 10:00:00"));
  expect(folder.updated_at).toStrictEqual(new Date("2019-4-6 11:00:00"));
  expect(folder.client).toBeUndefined();
});

test("Testing resource path", () => {
  let folder = new Folder();
  expect(folder.path).toBe("folders");
});

test("Testing parent class methods", () => {
  let folder = new Folder();
  expect(() => {
    folder.save();
  }).toThrow();
  expect(() => {
    folder.destroy();
  }).toThrow();
});
