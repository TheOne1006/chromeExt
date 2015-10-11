chrome.app.runtime.onLaunched.addListener(function () {
  // main.html 页面路径
  chrome.app.window.create('main.html', {
    "id":"main",
    "bounds": {
     'width': 542,
     'height': 360
    },
    "resizable":false,
    "frame":"none"
  });
});