/**
 * @jest-environment jsdom
 */

const contentScript = require("../scripts/content-script");

describe("Content script unit tests:", () => {
  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  test("chrome.runtime.onMessage must have a listener registered", () => {
    expect(chrome.runtime.onMessage.hasListeners()).toBe(true);
  });

  test("clear() must remove the css 'first-parent-extension' class", () => {
    document.body.innerHTML = '<div class="first-parent-extension"></div>';

    contentScript.clear();

    expect(document.getElementsByClassName("first-parent-extension")).toHaveLength(0);
  });

  test("findParent() calls the alert when no child selector provided", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    contentScript.findParent();

    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  test(`findParent() calls the alert with a message that no child selector was provided
    when no child selector provided`, () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    contentScript.findParent();

    expect(alertMock)
      .toHaveBeenCalledWith("The element's selector has not been provided.\nPlease, provide an element's selector.");
  });

  test("findParent() calls the alert when no child found with the provided child selector", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    contentScript.findParent("testSelector");

    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  test("findParent() calls the alert with a message that no element could be found with the provided child selector",
    () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    const childSelector = "testSelector";

    contentScript.findParent(childSelector);

    const alertMessage = `Could not find element by provided selector: ${childSelector}`;
    expect(alertMock).toHaveBeenCalledWith(alertMessage);
  });

  test("findParent() finds the first parent with a non static (absolute) position", () => {
    const childSelector = "#test";
    document.body.innerHTML = `
      <div class="parent-element1" style="position: absolute;">
        <div class="child-element-initial-position"></div>
        <div class="parent-element2" style="position: absolute;">
      	 <div class="child-element" id="test"></div>
        </div>
      </div>
    `;

    contentScript.findParent(childSelector);

    const parent = document.querySelector(".parent-element2");
    expect(parent.classList[1]).toBe("first-parent-extension");
    expect(document.getElementsByClassName("first-parent-extension")).toHaveLength(1);
  });

  test("findParent() finds the first parent with a non static (relative) position", () => {
    const childSelector = "#test";
    document.body.innerHTML = `
      <div class="parent-element1" style="position: relative;">
        <div class="child-element-initial-position"></div>
        <div class="parent-element2" style="position: relative;">
      	 <div class="child-element" id="test"></div>
        </div>
      </div>
    `;

    contentScript.findParent(childSelector);

    const parent = document.querySelector(".parent-element2");
    expect(parent.classList[1]).toBe("first-parent-extension");
    expect(document.getElementsByClassName("first-parent-extension")).toHaveLength(1);
  });

  test("findParent() finds the first parent with a non static (sticky) position", () => {
    const childSelector = "#test";
    document.body.innerHTML = `
      <div class="parent-element1" style="position: relative;">
        <div class="child-element-initial-position"></div>
        <div class="parent-element2" style="position: sticky;">
      	 <div class="child-element" id="test"></div>
        </div>
      </div>
    `;

    contentScript.findParent(childSelector);

    const parent = document.querySelector(".parent-element2");
    expect(parent.classList[1]).toBe("first-parent-extension");
    expect(document.getElementsByClassName("first-parent-extension")).toHaveLength(1);
  });

  test("findParent() finds the first parent with a non static (fixed) position", () => {
    const childSelector = "#test";
    document.body.innerHTML = `
      <div class="parent-element1" style="position: relative;">
        <div class="child-element-initial-position"></div>
        <div class="parent-element2" style="position: fixed;">
      	 <div class="child-element" id="test"></div>
        </div>
      </div>
    `;

    contentScript.findParent(childSelector);

    const parent = document.querySelector(".parent-element2");
    expect(parent.classList[1]).toBe("first-parent-extension");
    expect(document.getElementsByClassName("first-parent-extension")).toHaveLength(1);
  });

  test("findParent() finds the first parent with a correct position when the direct parent does not have it", () => {
    const childSelector = "#test";
    document.body.innerHTML = `
      <div class="parent-element1" style="position: relative;">
        <div class="child-element-initial-position"></div>
        <div class="parent-element2">
      	 <div class="child-element" id="test"></div>
        </div>
      </div>
    `;

    contentScript.findParent(childSelector);

    const parent = document.querySelector(".parent-element1");
    expect(parent.classList[1]).toBe("first-parent-extension");
    expect(document.getElementsByClassName("first-parent-extension")).toHaveLength(1);
  });

  test("findParent() calls the alert when there is no parent with a non static position", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    const childSelector = "#test";
    document.body.innerHTML = `
      <div class="parent-element1">
      	<div class="child-element" id="test"></div>
      </div>
    `;

    contentScript.findParent(childSelector);

    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  test(`findParent() calls the alert with a message that the html element is the element's parent
    when there is no parent with a non static position`, () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    const childSelector = "#test";
    document.body.innerHTML = `
      <div class="parent-element1">
      	<div class="child-element" id="test"></div>
      </div>
    `;

    contentScript.findParent(childSelector);

    expect(alertMock).toHaveBeenCalledWith("HTML element is the parent.");
  });
});
