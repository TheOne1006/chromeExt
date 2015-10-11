## 扩展基础

### 2.1 操作用户正在浏览的页面

chrome扩展可以对用户当前页面进行操作，通过`Manifest`中`content_scripts`属性(可以指定纳西脚本何时注入哪些页面)

__content\_scripts__属性值为数组类型,每个元素可包含以下属性  

* matches: 哪些页面被注入脚本
* exclude_matches: 哪些页面不会被注入脚本
* css: 对应注入的css
* js: 对应注入的js
* run_at: 定义何时进行注入
* all_frames: 定义了脚本是否会注入嵌入式框架中
* include_globs: 全局url匹配注入, 如果匹配 `include_gloabs`,同时匹配`matches`,会被注入
* exclude_globs: 全局url匹配不注入, 如果匹配 `exclude_gloabs`或者匹配`exclude_matches`,不会被注入

`content_scripts`只是共享dom(dom中自定义属性不会被共享),并不共享页面内嵌的JavaScript命名空间。


案例 Naughty button

```case
  "content_scripts" : [
    {
      "matches": ["*://www.baidu.com/"],
      "js": ["js/connot_touch.js"]
    }
  ]

```

### 2.2 跨域

1. 在chrome 允许Chrome插件应用不必受跨域限制。
2. 但出于安全考虑，需要在Manifest的`permissions`属性中声明

```case
  "permissions": [
      "http://sneezryworks.sinaapp.com/ip.php"
  ]
```


### 2.3 常住后台

1. 在Manifest中指定 `background` 可以使扩展常驻后台
2. `background` 可以包含三种属性分别是
  * scripts [] chrome 会在扩展启动是自动创建一个包含所有脚本的页面
  * pages [] 指定html作为后台运行页面，通常无法看到
  * persistent boolean 常驻后台方式,`true`一直保持，`false` 需要时运行

案例 website_status



### 2.4 带选项页面的扩展

1. 指定`options_page`属性后，扩展秃瓢的右键菜单会包含__"选项"__连接


案例 weatherMap

### 2.5 扩展页面间的通讯接口

1. runtime.sendMessage
  － 用法: chrome.runtime.sendMessage(extensionId, message, options, callback(response) )
2. runtime.onMessage
  - chrome.runtime.onMessage.addLister(callback(message, sender, sendResponse) )
3. runtime.connect (高级接口)
4. runtime.onConnect (高级接口)


__注意__:  
Chrome 提供的大部分API是不支持在`content_scripts`中运行的，但是`runtime.sendMessag` 和 `runtime.onMessage`可以在 `content_scripts` 中运行




### 2.6 数据的存储

1. HTML5的localStorage
2. Chrome提供的存储API
3. WebSQL Database

__Chrome存储API__:  
类似对localStorage的改进,但有以下区别  

* 如果存储区域指定为`sync`,数据可以自动同步
* `content_scripts`可以直接读取数据,而不必通过`background`页面
* 隐身模式下依然可以读取之前数据
* 读写速度更快
* 可以保存为对象类型

对于每个存储区域，Chrome提供5中方法:  

1. **get**:读取数据  
  ```
  chrome.storage.StorageArea.get(keys, function(result){ 
    //.. coding 
  });
  ```
  
  	* keys可以是字符串、包含多个字符串的数组或对象。如果是字符串则同localStorage,如果是数组则相当于一次读取多个数值,如果是对象,则会先读取这个对象属性名的值,如果存在返回，如果没有则返回默认值。
  * 如(keys为{'name':'billy'}),如果name存在返回原有值,如果不存在则返回'billy'

2. **getBytesInUse**: 获取一个或者多个数据所占的总空间,返回字节3. 
  ```
  chrome.storage.StorageArea.getBytesInUse(keys, function(bytes) {
   //... 
  })
  ```
  
  	* keys 只能为null,字符串,或者包含多字符串的数组

3. **set**:写入数据  
  ```
    chrome.storage.StorageArea.set(items, function(){
      //...
    });
  ```
  
 	 * items 为对象类型,形式为"键/值"对,items的属性值如果是string,number,[]则存储格式不会变,如果是对象和函数,会被存储为"{}", 如果是 日期 或者正则，会被存储为字符串形式。
 	 
4. **remove**:删除数据
  ```
    chrome.sotrage.StorageArea.remove(keys, function(){
      //...
    })
  ```
   * keys 可以是字符串,也可以是包含多个字符串的数组
  
5. **clear**:删除所有数据
  ```
    chrome.sotrage.StorageArea.clear(function(){
    // ...
    })
  ```


__onChange事件__:  
当存储区的数据发生改变是,事件会被激发
```
  chrome.storage.onChanged.addListener( function( changes , areaName ) {
    //...
  })
```

1. 第一个参数 changes: 词典对象,键为更改属性名，值包含两个属性,分别为oldValue 和 newValue
2. StorageAread 为 local 或 sync

### 2.7 i18n

使用i18n接口实现程序的国际化,在根目录下创建`_locales`

 


