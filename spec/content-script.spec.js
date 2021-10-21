/**
 * @jest-environment jsdom
 */

const contentScript = require("../scripts/content-script");

describe("Content script unit tests:", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  test("findParent() calls the alert when no child selector provided", () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    contentScript.findParent();

    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  test(`findParent() calls the alert with a message that no child selector was provided
    when no child selector provided`, () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    contentScript.findParent();

    expect(alertMock)
      .toHaveBeenCalledWith("The element's selector has not been provided. Please, provide an element's selector.");
  });

  test("findParent() calls the alert when no child found with the provided child selector", () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    contentScript.findParent("testSelector");

    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  test("findParent() calls the alert with a message that no element could be found with the provided child selector",
    () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const childSelector = "testSelector";

    contentScript.findParent(childSelector);

    const alertMessage = `Could not find element by provided selector: ${childSelector}`;
    expect(alertMock).toHaveBeenCalledWith(alertMessage);
  });
});
