var httpRequestOptions = {
    protocol: 'https://',
    url: '',
    type: 'POST',
    code: 'utf-8',
    checked: {
        httpOptionBox: true,
        httpHeaderBox: true,
        httpCookieBox: false,
        httpProxyBox: false
    },
    paramSwitch: [true,false,false],
    param1: {},
    param2: '',
    param3: {},
    headers: {},
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    cookie: '',
    proxy: {
        proxy: '',
        port: ''
    }
};
//初始化数据导入
function initOptions () {
    //更新protoocol
    $('#httpProtocol').val(httpRequestOptions.protocol);
    //更新url
    $('#httpHost').val(httpRequestOptions.url);
    //更新上传请求类型
    $('#httpType').val(httpRequestOptions.type);
    //更新编码
    $('#httpCode').val(httpRequestOptions.code);
    //更新功能开关
    $('.http-switch .http-option-switch').each(function(index,item){
        var id = $(this).attr('data-id');
        $(item).prop('checked', httpRequestOptions.checked[id]);
        if (httpRequestOptions.checked[id]) {
            $('#'+id).show()
        } else {
            $('#'+id).hide()
        }
    });
    //更新所选参数类型
    $('#httpOptionBox .nav-tabs li').each(function(index, item){
        $(item).removeClass('active');
        if (httpRequestOptions.paramSwitch[index]) {
            $(item).addClass('active');
        }
    });

    $('#httpOptionBox .tab-content .tab-pane').each(function(index, item){
        $(item).removeClass('active in');
        if (httpRequestOptions.paramSwitch[index]) {
            $(item).addClass('active in');
        }
    });
    //更新json参数
    addOptionsBoxHeight = 0;
    $('#addOptionsBox').height(addOptionsBoxHeight);
    $('#addOptionsBox').empty();
    $('#httpRemoveOptions').hide();
    $.each(httpRequestOptions.param1, function(key, value) {
        httpAddOptions(key,value)
    });
    //更新get参数
    $('#httpGetOption').val(httpRequestOptions.param2);
    //更新json字符串参数
    $('#httpJsonOption').val(httpRequestOptions.param3);
    //更新请求头部
    addHeadersBoxHeight = 0;
    $('#addHeadersBox').height(addHeadersBoxHeight);
    $('#addHeadersBox').empty();
    $('#httpRemoveHeaders').hide();
    $.each(httpRequestOptions.headers, function(key, value) {
        httpAddHeaders(key,value)
    });
    //更新content-type
    var value = httpRequestOptions.code;
    $('#httpContentType').empty();
    var html = '<option value="application/x-www-form-urlencoded;charset='+value+'">application/x-www-form-urlencoded;charset='+value+'</option>' +
        '<option value="application/json;charset='+value+'">application/json;charset='+value+'</option>';
    $('#httpContentType').append(html);
    $('#httpContentType').val(httpRequestOptions.contentType);
    //更新cookie
    $('#httpCookie').val(httpRequestOptions.cookie);
    //更新代理
    $('#httpProxy').val(httpRequestOptions.proxy.proxy);
    $('#httpProxyPort').val(httpRequestOptions.proxy.port);
}

//初始化保存链接列表
var httpRequestStorage = $.zui.store.get('saved_http_options');
initHttpUrl();
function initHttpUrl (cancelIndex) {
    $('#httpHistoryBox').html('');
    if (cancelIndex === 'all') {
        httpRequestStorage = '';
        $.zui.store.clear('saved_http_options');
    }
    if (httpRequestStorage && httpRequestStorage.length) {
        if (cancelIndex) {
            httpRequestStorage.splice(cancelIndex, 1);
        }
        $(httpRequestStorage).each(function(index, item){
            var lzsItem = JSON.parse(LZString.decompressFromUTF16(item));
            var html = '<li data-index="'+index+'">\n' +
                '<p>'+lzsItem.url+'</p>\n' +
                '<button class="btn history-cancel" type="button">删除</button>\n' +
                '</li>';
            $('#httpHistoryBox').append(html)
        });
        $.zui.store.set('saved_http_options', httpRequestStorage);
    }
}

//更新编码时更新content-type
$('#httpCode').change(function(){
    var value = $('#httpCode').val();
    var contentType = $('#httpContentType').val();
    $('#httpContentType').empty();
    var html = '<option value="application/x-www-form-urlencoded;charset='+value+'">application/x-www-form-urlencoded;charset='+value+'</option>' +
        '<option value="application/json;charset='+value+'">application/json;charset='+value+'</option>';
    $('#httpContentType').append(html);
    $('#httpContentType').val(contentType.split('=')[0] + '=' + value);
});

//删除history
$('body').on('click','#httpHistoryBox .history-cancel',function(e){
    var cancelIndex = $(this).parent().attr('data-index');
    initHttpUrl(cancelIndex);
    $(this).parent().remove();
    e.stopPropagation()
});

//删除全部
$('#httpClearHistory button').click(function(){
    initHttpUrl('all');
    $('#httpHistoryBox').html('');
});

//historyUrl点击事件
$('body').on('click','#httpHistoryBox li',function(){
    var index = $(this).attr('data-index');
    httpRequestOptions = LZString.decompressFromUTF16(httpRequestStorage[index]);
    httpRequestOptions = JSON.parse(httpRequestOptions);
    initOptions();
});
//开关
$('.http-option-switch').change(function () {
    var checked = $(this).prop('checked');
    var index = $(this).attr('data-index');
    var id = '#' + $(this).attr('data-id');
    httpRequestOptions.checked[$(this).attr('data-id')] = checked;
    if (checked) {
        $(id).show()
    } else {
        $(id).hide()
    }
});

//添加一行参数
var addOptionsBoxHeight = $('#addOptionsBox').innerHeight();
function httpAddOptions (value1,value2) {
    var val1 = value1?value1:'';
    var val2 = value2?value2:'';
    var addItem = '<div class="http-option-item">\n' +
        '                                <input type="text" value="'+val1+'" class="form-control" placeholder="请输入参数key">\n' +
        '                                <input type="text" value="'+val2+'" class="form-control" placeholder="请输入参数value，可为空">\n' +
        '                                <button type="button" class="btn http-option-cancel">删除</button>\n' +
        '                            </div>';
    addOptionsBoxHeight = addOptionsBoxHeight + 47;
    $('#addOptionsBox').height(addOptionsBoxHeight);
    $('#addOptionsBox').append(addItem);
    if (val1) {
        httpRequestOptions.param1[val1] = val2
    }
    if ($('#httpOptionBox .http-option-item').length>1) {
        $('#httpRemoveOptions').show()
    } else {
        $('#httpRemoveOptions').hide()
    }
}
$('#httpAddOption').click(function(){
    httpAddOptions();
});
var addHeadersBoxHeight = $('#addHeadersBox').innerHeight();
function httpAddHeaders (value1,value2) {
    var val1 = value1?value1:'';
    var val2 = value2?value2:'';
    var addItem = '<div class="http-option-item">\n' +
        '                                <input type="text" value="'+val1+'" class="form-control" placeholder="请输入参数Header key">\n' +
        '                                <input type="text" value="'+val2+'" class="form-control" placeholder="请输入参数Header，可为空">\n' +
        '                                <button type="button" class="btn http-option-cancel">删除</button>\n' +
        '                            </div>';
    addHeadersBoxHeight = addHeadersBoxHeight + 47;
    $('#addHeadersBox').height(addHeadersBoxHeight);
    $('#addHeadersBox').append(addItem);
    if (val1) {
        httpRequestOptions.headers[val1] = val2
    }
    if ($('#addHeadersBox .http-option-item').length>1) {
        $('#httpRemoveHeaders').show()
    } else {
        $('#httpRemoveHeaderns').hide()
    }
}
$('#httpAddHeader').click(function(){
    httpAddHeaders();
});
//删除添加的参数
$('body').on('click','#addOptionsBox .http-option-cancel',function(){
    addOptionsBoxHeight = addOptionsBoxHeight -47;
    $('#addOptionsBox').height(addOptionsBoxHeight);
    $(this).parent().remove();
    if ($('#httpOptionBox .http-option-item').length>1) {
        $('#httpRemoveOptions').show()
    } else {
        $('#httpRemoveOptions').hide()
    }
});

$('body').on('click','#addHeadersBox .http-option-cancel',function(){
    addHeadersBoxHeight = addHeadersBoxHeight -47;
    $('#addHeadersBox').height(addHeadersBoxHeight);
    $(this).parent().remove();
    if ($('#addHeadersBox .http-option-item').length>1) {
        $('#httpRemoveHeaders').show()
    } else {
        $('#httpRemoveHeaders').hide()
    }
});
//批量删除添加的参数
$('body').on('click','#httpRemoveOptions',function(){
    addOptionsBoxHeight = 0;
    $('#addOptionsBox').height(addOptionsBoxHeight);
    $('#addOptionsBox').empty();
    $('#httpRemoveOptions').hide();
});

$('body').on('click','#httpRemoveHeaders',function(){
    addHeadersBoxHeight = 0;
    $('#addHeadersBox').height(addHeadersBoxHeight);
    $('#addHeadersBox').empty();
    $('#httpRemoveHeaders').hide();
});
//批量添加参数
$('#httpAddOptions').click(function(){
    confirmArea({
        title: '批量添加，支持GET参数和JSON参数类型',
        placeholder: '例如：{"name":"bejson","domain":"www.bejson.com"}或者：name=bejson&domain=www.bejson.com',
        success: function(val){
            try{
                if (typeof JSON.parse(val) == "object") {
                    var paramArr = JSON.parse(val);
                    for (key in paramArr) {
                        httpAddOptions(key, paramArr[key])
                    }
                    $('#confirmAreaModal').modal('hide', 'fit');
                    return;
                }
            } catch (e) {
                var reg = /^\{/gi;
                var reg2 = /\}$/gi;
                if (reg.test(val) && reg2.test(val)) {
                    var jsonError = 'JSON格式错误：'+ e;
                    msgError(jsonError);
                    return
                } else {
                    var getJson = paramParse(val);
                    try {
                        var paramArr = JSON.parse(getJson);
                        for (key in paramArr) {
                            httpAddOptions(key, paramArr[key])
                        }
                        $('#confirmAreaModal').modal('hide', 'fit')
                    } catch (e) {
                        msgError('参数解析错误，请检查格式')
                    }
                }
                return;
            }
            msgError('参数解析错误，请检查格式')
        }
    })
});

$('#httpAddHeaders').click(function(){
    confirmArea({
        title: '批量添加Header，支持JSON和Text',
        placeholder: '可以从抓包工具，或者浏览器控制台复制Header信息直接添加。',
        success: function(val){
            try{
                if (typeof JSON.parse(val) == "object") {
                    var paramArr = JSON.parse(val);
                    for (key in paramArr) {
                        httpAddHeaders(key, paramArr[key]);
                    }
                    $('#confirmAreaModal').modal('hide', 'fit');
                    return;
                }
            } catch (e) {
                var reg = /^\{/gi;
                var reg2 = /\}$/gi;
                if (reg.test(val) && reg2.test(val)) {
                    var jsonError = 'JSON格式错误：'+ e;
                    msgError(jsonError);
                    return
                } else {
                    var getJson = val.replace(/\r\n/g, '&?%$#@?*&^&%#@!').replace(/\r/g, '&?%$#@?*&^&%#@!').replace(/\n/g, '&?%$#@?*&^&%#@!').replace(/,{2,}/g, '&?%$#@?*&^&%#@!');
                    getJson = getJson.split('&?%$#@?*&^&%#@!');
                    var paramJson = {};
                    $(getJson).each(function(index,item){
                        var left = '';
                        var right = '';
                        $(item.split(':')).each(function(key,value){
                            if (key === 0) {
                                left = value
                            } else if (key === 1) {
                                right = value
                            } else {
                                right = right + ':' + value
                            }
                        });
                        paramJson[left] = right
                    });
                    try {
                        for (key in paramJson) {
                            httpAddHeaders(key, paramJson[key])
                        }
                        $('#confirmAreaModal').modal('hide', 'fit')
                    } catch (e) {
                        msgError('参数解析错误，请检查格式')
                    }
                }
                return;
            }
            msgError('参数解析错误，请检查格式')
        }
    })
});

//判断参数tab点击，设置上传参数
$('#httpOptionBox .nav-tabs li').click(function(){
    $(httpRequestOptions.paramSwitch).each(function(index,item){
        httpRequestOptions.paramSwitch[index] = false
    });
    var index = $(this).attr('data-index');
    httpRequestOptions.paramSwitch[index] = true;
});

//url框获取焦点，显示历史列表
$('#httpHeadUrlBox').hover(function(){
    $('#httpUrlHistory').show();
},function(){
    $('#httpUrlHistory').hide();
});

$('#httpHost').on('focus',function(){
    $('#httpUrlHistory').show();
});


//请求
$('#httpRequest').on('click', function() {
    httpRequestOptions.protocol = $('#httpProtocol').val();
    httpRequestOptions.url = $('#httpHost').val();
    httpRequestOptions.type = $('#httpType').val();
    httpRequestOptions.code = $('#httpCode').val();
    if (!httpRequestOptions.url) {
        msgError('网址不能为空');
        return;
    }
    //获取json参数
    $('#addOptionsBox .http-option-item').each(function(index,item){
        var key = $(item).find('input').eq(0).val();
        if (key) {
            httpRequestOptions.param1[key] = $(item).find('input').eq(1).val();
        }
    });
    //获取header头
    $('#addHeadersBox .http-option-item').each(function(index,item){
        var key = $(item).find('input').eq(0).val();
        if (key) {
            httpRequestOptions.headers[key] = $(item).find('input').eq(1).val();
        }
    });
    //获取其他
    httpRequestOptions.param2 = $('#httpGetOption').val();
    httpRequestOptions.param3 = $('#httpJsonOption').val();
    httpRequestOptions.cookie = $('#httpCookie').val();
    httpRequestOptions.contentType = $('#httpContentType').val();
    if ($('#httpProxy').val()) {
        httpRequestOptions.proxy.proxy = $('#httpProxy').val();
        httpRequestOptions.proxy.port = $('#httpProxyPort').val()
    }
    var compressed = LZString.compressToUTF16(JSON.stringify(httpRequestOptions));
    if (httpRequestStorage && httpRequestStorage.length) {
        var isStore = false;
        $(httpRequestStorage).each(function(index,item){
            var item = JSON.parse(LZString.decompressFromUTF16(item));
            if (item.url === httpRequestOptions.url) {
                httpRequestStorage[index] = compressed;
                isStore = true
            }
        });
        if (!isStore) {
            httpRequestStorage.unshift(compressed)
        }
    } else {
        httpRequestStorage = [];
        httpRequestStorage.unshift(compressed)
    }
    $.zui.store.set('saved_http_options', httpRequestStorage);
    initHttpUrl();
    var $btn = $(this);
    $btn.button('loading');
    doPost(bejsonHost + 'Bejson/Api/HttpRequest/curl_request', httpRequestOptions, function (data) {
        if (data.code === 200 || data.code === '200') {
            var sendHeader = 'Rquest header\n';
            var getHeader = 'Response header\n';
            for (var key in data.data.hearder) {
                if (key !== 'request_header') {
                    if (Object.prototype.toString.call(data.data.hearder[key]) === '[object Object]' || Object.prototype.toString.call(data.data.hearder[key]) === '[object Array]') {
                        sendHeader = sendHeader + key + ': ' + JSON.stringify(data.data.hearder[key]) + '\n'
                    } else {
                        sendHeader = sendHeader + key + ': ' + data.data.hearder[key] + '\n'
                    }
                } else {
                    if (Object.prototype.toString.call(data.data.hearder[key]) === '[object Object]' || Object.prototype.toString.call(data.data.hearder[key]) === '[object Array]') {
                        getHeader = getHeader + key + ': ' + JSON.stringify(data.data.hearder[key]) + '\n'
                    } else {
                        getHeader = getHeader + key + ': ' + data.data.hearder[key] + '\n'
                    }
                }
            }
            $('#sendHeader').val(sendHeader);
            $('#getHeader').val(getHeader);
            if (data.data.result) {
                $('#responseText').val(data.data.result.replace(/\s/g, ''));
                $('#responseText2').val(data.data.result);
            }
        } else {
            alertError({"con": data.msg});
        }
        $btn.button('reset');
    }, function () {
        msgError('提交失败，请稍候重试');
        $btn.button('reset');
    })
});