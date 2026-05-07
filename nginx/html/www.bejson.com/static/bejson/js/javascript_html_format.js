var myModeSpec = {
    name: "htmlmixed",
    tags: {
        style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
            [null, null, "css"]],
        custom: [[null, null, "customMode"]]
    }
}

var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'text/javascript',
    lineNumbers: true, //是否显示左边换行术字
    lineWrapping: true, //是否折叠
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
});

if ($.zui.store.get('evalpackageCon')) {
    editor.setValue($.zui.store.get('evalpackageCon'));
}

