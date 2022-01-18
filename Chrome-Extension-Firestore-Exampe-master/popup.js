console.log("first")


window.onload = function() {
  document.getElementById("save").onclick = function(){
    console.log("clicked button"); 
            chrome.tabs.sendMessage(tabs[0].id, {greeting: "msg"}, function(response) {
                console.log("received message from content script: ");
            });
        
   
  }
  
}
