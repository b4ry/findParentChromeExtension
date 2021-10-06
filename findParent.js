const idInput = document.getElementById("child-element-id-input-ext");
const confirmButton = document.getElementById("confirm-element-id-button-ext");

confirmButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const elementId = idInput.value;

  chrome.storage.local.set({ "elementId": elementId });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: myFunction,
  });
});

function myFunction() {
  chrome.storage.local.get("elementId", function(result) {
    console.log('Value currently is ' + result);
  });
}
