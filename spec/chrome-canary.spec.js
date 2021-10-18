describe("Chrome object", () => {
  test("is mocked", () => {
    expect(chrome).toBeDefined();
    expect(chrome.runtime.onMessage).toBeDefined();
  });
});
