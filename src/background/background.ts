chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    console.log(sender);
    sendResponse("From background script");
});