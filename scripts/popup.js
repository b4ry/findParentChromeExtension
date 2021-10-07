const confirmButton = document.getElementById("confirm-element-id-button-ext");

confirmButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const elementId = document.getElementById("child-element-id-input-ext").value;

  chrome.storage.local.set({ "elementId": elementId });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: findAbsoluteOrRelativeParentElement,
  });
});

function findAbsoluteOrRelativeParentElement() {
  chrome.storage.local.get("elementId", function(result) {
    const element = document.getElementById(result.elementId);

    if(element) {
      findParentRec(element.parentElement);
    } else {
      alert(`Could not find element by provided id: ${result.elementId}`);
    }
  });

  function findParentRec(parent) {
    if(parent) {
      const parentPosition = getComputedStyle(parent).position;

      if(parentPosition != "absolute" && parentPosition != "relative") {
        findParentRec(parent.parentElement);
      } else {
        parent.style.border = "thick solid red";
      }
    } else {
      alert("HTML element is the parent.")
    }
  }
}
