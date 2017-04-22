chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "https://outlook.live.com/owa/";
  chrome.tabs.create({ url: newURL });
});