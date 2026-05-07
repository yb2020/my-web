function formatDate(now) {
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  return year + "-" + (month = month < 10 ? ("0" + month) : month) + "-" + (date = date < 10 ? ("0" + date) : date) + " " + (hour = hour < 10 ? ("0" + hour) : hour) + ":" + (minute = minute < 10 ? ("0" + minute) : minute) + ":" + (second = second < 10 ? ("0" + second) : second);
}
var output;
var websocket;

function init() {
  output = document.getElementById("output");
  testWebSocket();
}

function addsocket() {
  var wsaddr = $("#wsaddr").val();
  if (wsaddr == '') {
    msgError("请填写websocket的地址");
    return false;
  }
  StartWebSocket(wsaddr);
}

function closesocket() {
  if (websocket) {
    if(websocket.readyState === 3) {
      msgError('已断开');
      return
    }
    if (websocket.readyState === 0) {
      msgError('连接中，请稍候');
      return
    }
    $('#websockCloseClose').button('loading');
    websocket.close();
  } else {
    msgError('还未建立连接')
  }

}

function StartWebSocket(wsUri) {

  if (websocket && websocket.readyState === 2) {
    msgError('断开中，请稍候');
    return
  }
  $('#websockContentConnect').button('loading');

  try {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function (evt) {
      onOpen(evt);
    };
    websocket.onclose = function (evt) {
      onClose(evt);
    };
    websocket.onmessage = function (evt) {
      onMessage(evt)
    };
    websocket.onerror = function (evt) {
      onError(evt)
    };
  }catch (e) {
    $('#websockContentConnect').button('reset');
    msgError('错误的websocket链接')
  }
}

function onOpen(evt) {
  writeToScreen("<span class='text-success'>连接成功，现在你可以发送信息啦！！！</span>");
  $('#websockContentConnect').button('reset');
}

function onClose(evt) {
  writeToScreen("<span style='color:red;'>websocket连接已断开!!!</span>");
  websocket.close();
  $('#websockCloseClose').button('reset');
}

function onMessage(evt) {
  writeToScreen('<span style="color:blue;">服务端回应&nbsp;' + formatDate(new Date()) + '</span><br/><span class="bubble" style="">' + evt.data + '</span>');
  $('#websocketSend').button('reset');
}

function onError(evt) {
  writeToScreen('<span style="color: red;">发生错误:</span> ' + evt.data);
  $('#websockContentConnect').button('reset')
}

function doSend() {
  var message = $("#message").val();
  if (message == '') {
    msgError("请先填写发送信息");
    $("#message").focus();
    return false;
  }

  if (typeof websocket === "undefined") {
    msgError("websocket还没有连接，或者连接失败，请检测");
    return false;
  }
  if (websocket.readyState == 3) {
    msgError("websocket已经关闭，请重新连接");
    return false;
  }
  $("#message").val('');
  $('#websocketSend').button('loading');
  writeToScreen('<span style="color:green;">你发送的信息&nbsp;' + formatDate(new Date()) + '</span><br/><span style="">' + message+'</span>');
  websocket.send(message);
}

function writeToScreen(message) {
  var div = "<div class='newmessage' style=''>" + message + "</div>";
  var d = $("#output");
  var d = d[0];
  var doScroll = d.scrollTop == d.scrollHeight - d.clientHeight;
  $("#output").append(div);
  if (doScroll) {
    d.scrollTop = d.scrollHeight - d.clientHeight;
  }
}


function en(event) {
  var evt = evt ? evt : (window.event ? window.event : null);
  if (evt.keyCode == 13) {
    doSend()
  }
}


function saveAdr() {
  window.localStorage.setItem("bejson_ws_adr", wsaddr.value);
}
$(function () {
  var ws_adr = window.localStorage.getItem("bejson_ws_adr");
  if (ws_adr != null && ws_adr != "") {
    wsaddr.value = ws_adr;
  }
})

$("#websocketDemo").click(function () {
  var src = (document.location.protocol == "http:") ? "ws://echo.websocket.org" :
      "wss://echo.websocket.org";
  $('#wsaddr').val(src)
});

$('#websockContentConnect').on('click',function(){
  addsocket();
  saveAdr()
});
$('#websockCloseClose').on('click',function(){
  closesocket();
});
$('#websocketSend').click(function(){
  doSend()
});
$('#websocketClear').click(function(){
  wsaddr.value='';
  window.localStorage.removeItem('bejson_ws_adr')
});