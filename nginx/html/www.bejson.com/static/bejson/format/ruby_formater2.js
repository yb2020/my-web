


var editor = CodeMirror.fromTextArea(document.getElementById('source_textarea'), {
    mode: 'text/x-ruby',
    lineNumbers: true, //鏄惁鏄剧ず宸﹁竟鎹㈣鏈瓧
    lineWrapping: true, //鏄惁鎶樺彔
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
});





// var editor2 = CodeMirror.fromTextArea(document.getElementById('target_textarea'), {
//     mode: 'text/x-ruby',
//     lineNumbers: true, //鏄惁鏄剧ず宸﹁竟鎹㈣鏈瓧
//     lineWrapping: true, //鏄惁鎶樺彔
//     foldGutter: true,
//     gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
// });






function doformat() {
    var code=editor.getValue();
    if(code==''){
        layer.msg('代码不能为空!');
        return;
    }
    var lr=layer.load(1,{shade:0.2});


    $.post("https://web-check.bejson.com/format-ruby.php", {
        'code':code
    }, function (data) {
        layer.close(lr);
        if(data.err!="")
        {
            layer.alert(data.err,{title:'代码存在错误，请检查'});
        }
        else
            editor.setValue(data.data);
    },'json');



}

