const contentScript = require("../scripts/content-script");

describe("Content script", () => {
  test("chrome.runtime.onMessage must have a listener registered", () => {
    expect(chrome.runtime.onMessage.hasListeners()).toBe(true);
  });
  // test("clear test", () => {
  //   contentScript.clear();
  // });
  // test("findParent test", () => {
  //   contentScript.clear();
  // });
});
