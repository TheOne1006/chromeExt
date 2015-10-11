var runtimeDiv = document.getElementById('runtimeDiv');
chrome.runtime.sendMessage( 'hello', function( res){
  runtimeDiv.innerHTML = res;
});