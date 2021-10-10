const confirmButton = document.getElementById("confirm-button-ext");
const clearButton = document.getElementById("clear-button-ext");

window.onload = async function() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [ "scripts/content-script.js" ]
  });

  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: [ "css/content.css" ]
  });
}

confirmButton.addEventListener("click", async () => {
  const elementSelector = document.getElementById("element-selector-input-ext").value;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "findParent", data: elementSelector });
  });
});

clearButton.addEventListener("click", async () => {
  document.getElementById("element-selector-input-ext").value = null;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "clear" });
  });
});
