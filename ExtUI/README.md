## 扩展UI

### 3.2 Browser Actions

1. 扩展图标 - 将扩展图片位于地址栏右侧
2. 如果声明了popup页面，用户点击时会打开
3. 图片上还可附带 badge

#### 3.2.1 图标 

```
  "browser_action":{
    "default_icon": {
      "19": "images/icon19.png",
      "38": "images/icon38.png"
    }
  }
```

一般情况使用19像素的图片,视网膜屏使用38px  
如果未指定"default_icon",chrome将指定默认图标

__动态更改__:  

```
chrome.browerAction.setIcon(details, callback)
```

details类型为对象属性可以包括 imageData 、 path、tabId :

1. imageDate 的值可以是`imageData`,可以是对象{size:imageData}
2. path 值可以是字符串,也可是对象{size:imgPath}, path/imageData 不必同时指定
3. tabId 限定了图片将在浏览哪个标签被更改


#### 3.2.2 popup页面
点击扩展图标时，弹出的展示页面。

1. popup页面更多用来展示结果。
2. 不要模仿原生UI
3. 屏蔽右键菜单
4. 不要在popup.js中存储数据

#### 3.2.3 标题和badge
扩展标题  

```
  "browser_action":{
    "default_title": "默认标题",
  }
```

动态修改标题  
```
chrome.browerAction.setTitle ({itle:'newTitle'});
```

badge 为用户提供有限信息的另一种方式。多用户Email,微博等  

只能通过js设置  

```
// 设置颜色 十六进制
chrome.browerAction.setBadgeBackgroundColor({color:'#0000FF'});
// 设置颜色 rgba 方式
chrome.browerAction.setBadgeBackgroundColor({color:[0,255,0,128]});
// 设置文字
chrome.browerAction.setBadgeText({text:'Dog'});
```

不支持Badge更改字体颜色,只能是白色

### 3.3 右键菜单

在浏览网页时,右键网页可唤出一些工具菜单,要扩展右键菜单需要申明`contextMenus`权限在`permissions`域中。同时icons域中申明16像素的图标,这样右键菜单才有图标显示


Chrome提供操作右键菜单的方法:

1. create 创建
   ```
    chrome.contextMenus.create({
     type:'',
     title:'title',
     id:'id',
     parentId:'parentId',
     contexts:['link']
    })
   ```
2. update 更新
   ```
    chrome.contextMenus.update('id',{
        'title':'使用Google翻译“'+message+'”'
    });
   ```
3. remove 移除


### 3.4 桌面提醒

在`permissions`中声明`notifications`权限, 在`web_accessible_resources`域中申明图片

创建桌面提醒 ???

### 3.5 omnibox 多功能框
地址栏不止于地址  
声明`omnibox` 指定 `keyword`,同时指定16像素的图标
```
  "icons": {
      "16": "images/icon16.png"
  },
  "omnibox": {
      "keyword": "usd"
  }
```

设置默认提示信息:
chrome.omnibox.setDefaultSuggestion({'description':'默认建议提示信息'});

omnibox的事件:

1. onInputStarted 开始输入
2. onInputChanged 输入变化
3. onInputEnterd 执行指令 用户回车 或者鼠标点击加你结果的动作
4. onInputCanelled 取消输入


`onInputChageed`用法

```
  chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    // text [string] 用户当前输入的值
    // suggest [function] 用于返回建议结果 
    suggest([{
            'content': '$1 = ¥'+price,
            'description': '$1 = ¥'+price
        },{
            'content': '¥1 = $'+(1/price).toFixed(6),
            'description': '¥1 = $'+(1/price).toFixed(6)
        }]);
  });
```

`onInputEntered`用法

```
  chrome.omnibox.onInputEntered.addListener(function(text, desposition){
    // text [string] 当前输入值
    // desposition [string]  建议打开方式, 没有实际用处
    window.open('http://finance.yahoo.com/q?s=USDCNY=X');
  });
```






