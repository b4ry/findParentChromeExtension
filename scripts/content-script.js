chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch(message.type) {
      case "findParent":
        clear();
        findParent(message.data);
        break;
      case "clear":
        clear();
        break;
    }
  }
);

function findParent(childSelector) {
  if(childSelector) {
    const element = document.querySelector(childSelector);

    if(element) {
      findParentRec(element.parentElement);
    } else {
      alert(`Could not find element by provided selector: ${childSelector}`);
    }
  } else {
    alert("The element's selector has not been provided. Please, provide an element's selector.");
  }

  function findParentRec(parent) {
    if(parent) {
      const parentPosition = getComputedStyle(parent).position;

      if(parentPosition !== "absolute" && parentPosition !== "relative") {
        findParentRec(parent.parentElement);
      } else {
        parent.classList.add("first-parent-extension");
      }
    } else {
      alert("HTML element is the parent.")
    }
  }
};

function clear() {
  const firstParent = document.getElementsByClassName("first-parent-extension")[0];

  if(firstParent) {
    firstParent.classList.remove("first-parent-extension");
  }
};
