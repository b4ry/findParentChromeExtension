const confirmButton = document.getElementById("confirm-button-ext");
const clearButton = document.getElementById("clear-button-ext");

confirmButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const elementSelector = document.getElementById("element-selector-input-ext").value;

  chrome.storage.local.set({ "elementSelector": elementSelector });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: findAbsoluteOrRelativeParentElement
  });
});

clearButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: clear
  });
});

function findAbsoluteOrRelativeParentElement() {
  chrome.storage.local.get("elementSelector", function(result) {
    if(result.elementSelector) {
      const element = document.querySelector(result.elementSelector);

      if(element) {
        findParentRec(element.parentElement);
      } else {
        alert(`Could not find element by provided selector: ${result.elementSelector}`);
      }
    } else {
      alert("The element's selector has not been provided. Please, provide an element's selector.");
    }
  });

  function findParentRec(parent) {
    if(parent) {
      const parentPosition = getComputedStyle(parent).position;

      if(parentPosition !== "absolute" && parentPosition !== "relative") {
        findParentRec(parent.parentElement);
      } else {
        chrome.storage.local.set({ "previousBorder": parent.style.border });
        parent.style.border = "thick solid red";
        /* unfortunately cannot store the parent element in the storage cuz it is being serialized to {}
           hence decided to add a class with unpredictable name to the parent element to be able
           to restore its borders
        */
        parent.classList.add("first-parent-chrome-extension123421");
      }
    } else {
      alert("HTML element is the parent.")
    }
  }
}

function clear() {
  chrome.storage.local.get("previousBorder", function(result) {
    const firstParent = document.getElementsByClassName("first-parent-chrome-extension123421")[0];

    if(firstParent) {
      firstParent.style.border = result.previousBorder;
      firstParent.classList.remove("first-parent-chrome-extension123421");
    }

    if(result.previousBorder) {
      chrome.storage.local.remove("previousBorder");
    }
  });
}
