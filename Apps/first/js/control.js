// 获取当前 窗口
var current_window = chrome.app.window.current();

document.getElementById('minimize').onclick = function(){
  // 最小化
  current_window.minimize();
};

document.getElementById('close').onclick = function(){
  // 关闭
  current_window.close();
};

