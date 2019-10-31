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
});
