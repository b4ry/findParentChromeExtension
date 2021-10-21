/**
 * @jest-environment jsdom
 */

const contentScript = require("../scripts/content-script");

describe("Content script unit tests:", () => {
  test("chrome.runtime.onMessage must have a listener registered", () => {
    expect(chrome.runtime.onMessage.hasListeners()).toBe(true);
  });
  test("clear() must remove the css 'first-parent-extension' class", () => {
    document.body.innerHTML =
      '<div class="first-parent-extension">' +
      '</div>';

    contentScript.clear();

    expect(document.getElementsByClassName("first-parent-extension")).toHaveLength(0);
  });
  // test("findParent test", () => {
  //   contentScript.clear();
  // });
});
