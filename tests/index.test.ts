import hello from "../src/index";

test("Testing 'hello' function", () => {
  expect(hello()).toBe("Qilin Lib v1.0.0");
});
