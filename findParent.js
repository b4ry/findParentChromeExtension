const confirmButton = document.getElementById("confirm-element-id-button-ext");

confirmButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const elementId = document.getElementById("child-element-id-input-ext").value;

  chrome.storage.local.set({ "elementId": elementId });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: myFunction,
  });
});

function myFunction() {
  chrome.storage.local.get("elementId", function(result) {
    alert('Value currently is ' + result.elementId);
  });
}
