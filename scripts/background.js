/*
  remove the current tabId from the registered tabIds in order to reattach the content-script.
  runs on the complete status which is when a tab is loaded (opened, refreshed, etc).
*/
chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo) {
    if(changeInfo.status === "complete") {
      console.log(tabId);
      chrome.storage.local.get({ tabIds: [] }, function (result) {
        let tabIds = result.tabIds;
        console.log(tabIds);

        const index = tabIds.indexOf(tabId);
        if(index === -1) return;

        tabIds.splice(index, 1);
        console.log(tabIds);
        chrome.storage.local.set({ tabIds: tabIds });
      });
    }
  }
);
