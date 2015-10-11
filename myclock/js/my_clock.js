function myclock (el) {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();

  el.innerHTML = h+":"+m+":"+s;
  setTimeout(function(){
    myclock(el);
  },1000);
}

var clock_div = document.getElementById('clock_div');
myclock(clock_div);