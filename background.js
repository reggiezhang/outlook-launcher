/*
 * outlook-launcher
 * Copyright (C) 2017 Reggie Zhang <reggy.zhang@gmail.com>
 * Licensed under the terms of The GNU Lesser General Public License (LGPLv3):
 * http://www.opensource.org/licenses/lgpl-3.0.html
 *
 */
function getOutlookUrl() {
  return "https://outlook.live.com/mail/";
}

function isOutlookUrl(url) {
  // Return whether the URL starts with the Outlook prefix.
  return url.startsWith(getOutlookUrl());
}
function gotoInbox() {
  console.log('Going to inbox...');
  chrome.tabs.getAllInWindow(undefined, function (tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isOutlookUrl(tab.url)) {
        console.log('Found Outlook tab: ' + tab.url);
        chrome.tabs.update(tab.id, {active: true, pinned: true});
        return;
      }
    }
    console.log('Could not find Outlook tab. Creating one...');
    chrome.tabs.create({url: getOutlookUrl(), pinned: true});
  });
}

chrome.browserAction.onClicked.addListener(gotoInbox);
