// The app's Firebase configuration(change it to fit your database).
var firebaseConfig = {
    apiKey: "AIzaSyAc5Dwm_v7cBIR0WKOlaSUuHIyHF2F-0sg",
    authDomain: "content-curation-extension.firebaseapp.com",
    projectId: "content-curation-extension",
    storageBucket: "content-curation-extension.appspot.com",
    messagingSenderId: "129616645089",
    appId: "1:129616645089:web:c4df817038e5707e1b60a0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);
var db = firebase.firestore();
var links = db.collection("links");




let activeTabId, lastUrl, lastTitle;

async function getTabInfo(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if(lastUrl != tab.url || lastTitle != tab.title){
      console.log(lastUrl = tab.url, lastTitle = tab.title);
      // links.add({
      //   url : tab.url})

      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          
            console.log("received message from popup: "+request.greeting);
        
               links.add({
              url : tab.url})
        });

    } 
  });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  getTabInfo(activeTabId = activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(activeTabId == tabId) {
    getTabInfo(tabId);
  }
});

