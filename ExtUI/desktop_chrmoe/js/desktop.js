function show() {
  var opt = {
        type: "basic",
        title: "PriceRadar",
        message: "Item added successfully",
        iconUrl: "images/icon48.png"
  };


  var notification = chrome.notifications.create('itemAdd',opt,callback);

  // notification.show();

}

function callback() {

}


show();