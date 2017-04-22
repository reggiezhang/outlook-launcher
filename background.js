function getOutlookUrl() {
  return "https://outlook.live.com/owa/";
}

function isOutlookUrl(url) {
  // Return whether the URL starts with the Outlook prefix.
  return url.startsWith(getOutlookUrl());
}
function goToInbox() {
  console.log('Going to inbox...');
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isOutlookUrl(tab.url)) {
        console.log('Found Outlook tab: ' + tab.url);
        chrome.tabs.update(tab.id, {selected: true});
        return;
      }
    }
    console.log('Could not find Outlook tab. Creating one...');
    chrome.tabs.create({url: getOutlookUrl()});
  });
}

chrome.browserAction.onClicked.addListener(goToInbox);

/*chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "https://outlook.live.com/owa/";
  chrome.tabs.create({ url: newURL });
});*/