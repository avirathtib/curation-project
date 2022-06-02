self.importScripts(
  "firebase/firebase-app.js",
  "firebase/firebase-firestore.js",
  "firebase/firebase-database.js"
);

var config = {
  apiKey: "AIzaSyAc5Dwm_v7cBIR0WKOlaSUuHIyHF2F-0sg",
  authDomain: "content-curation-extension.firebaseapp.com",
  projectId: "content-curation-extension",
  storageBucket: "content-curation-extension.appspot.com",
  messagingSenderId: "129616645089",
  appId: "1:129616645089:web:c4df817038e5707e1b60a0",
};
firebase.initializeApp(config);

console.log(firebase);

var db = firebase.firestore();

var selectedText;

var curr;

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.msg == "startFunc") {
    console.log(request.tab);
    await db
      .collection("links")
      .doc("yay")
      .set({ data: curr })
      .then(function () {
        console.log("Document saved successfully");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});

// var links = db.collection("links");

// let activeTabId, lastUrl, lastTitle;

// async function getTabInfo(tabId) {
//   chrome.tabs.get(tabId, function (tab) {
//     if (lastUrl != tab.url || lastTitle != tab.title) {
//       console.log((lastUrl = tab.url), (lastTitle = tab.title));
//       links.add({
//         url: tab.url,
//       });

//       chrome.runtime.onMessage.addListener(function (
//         request,
//         sender,
//         sendResponse
//       ) {
//         console.log("received message from popup: " + request.greeting);

//         links.add({
//           url: tab.url,
//         });
//       });
//     }
//   });
// }

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    curr = tab.url;
    console.log("you are here: " + curr);
  });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.active && change.url) {
    curr = change.url;
    console.log("you are here: " + change.url);
  }
});

chrome.extension.onRequest.addListener(() => {
  selectedText = window.getSelection().toString();
  console.log(selectedText);
});
