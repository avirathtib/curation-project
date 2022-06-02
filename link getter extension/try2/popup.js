window.onload = function () {
  document.getElementById("btn1").onclick = function () {
    alert("button 1 was clicked");
    console.log("button 1 was clicked");
    chrome.runtime.sendMessage({
      msg: "startFunc",
      data: "Test data",
      tab: "change later",
    });
    getCurrentTabUrl();
  };
};

const getCurrentTabUrl = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab);
};
