## 应用开发

### 安全策略
Chrome 扩展和应用都使用CSP策略。但是扩展相对宽松

### 生命周期
1. 扩展的周期 可以一直存在
2. 应用周期
   * Event Page 是Chrome应用的后台脚本,用于监听事件
   * Event Page加载完成后,onLaunched事件会被触发。可以创建应用窗口
   * Event Page创建的窗口关闭, 且没有其他任务是，Chrome会彻底关闭应用
   * 关闭是会触发 onSuspend事件


### 创建窗口
manifest配置
```
  "app": {
    "background": {
      "scripts": ["background.js"]
    }
  }
```

`background.js`中指定创建窗口
```
  // 监听事件
chrome.app.runtime.onLaunched.addListener(function(){
  // 创建函数
  chrome.app.window.create('main.html', {
    id:'指定id',
    // 窗口尺寸
    innerBounds: {
      width: 800,
      height:400,
      max-width: 1000,
      top:0
    },
    // 不可调整窗口尺寸
    resizable: false,
    // 状态 normal, maximized 和 minimized
    state: 'fullscreen',
    // 总在最前面
    alwaysOnTop: true,
    // 窗口隐藏类似于后台运行
    hidden: true,
    // 新建窗口不显示标题栏
    frame: 'none'

   }, function (appWindow){
    // 回调函数,参数1为创建的window
   })
})
```


### 第一个应用

#### Manifest配置
通过app属性中通过background域定义Event Page
```
  "app": {
    "background": {
      "scripts": ["background.js"]
    }
  }
```
