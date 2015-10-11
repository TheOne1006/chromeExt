chrome.runtime.onMessage.addListener( function(mes, sender, sendResponse) {
  if( mes == 'hello') {
    sendResponse('hello form background');
  }
});