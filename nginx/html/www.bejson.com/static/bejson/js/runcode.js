var aceEditor1 = ace.edit('aceEditor1');
aceEditor1.setTheme('ace/theme/monokai');
aceEditor1.session.setMode('ace/mode/html');
aceEditor1.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    fontSize: 14
});
var aceEditor2 = ace.edit('aceEditor2');
aceEditor2.setTheme('ace/theme/monokai');
aceEditor2.session.setMode('ace/mode/css');
aceEditor2.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    fontSize: 14
});
var aceEditor3 = ace.edit('aceEditor3');
aceEditor3.setTheme('ace/theme/monokai');
aceEditor3.session.setMode('ace/mode/javascript');
aceEditor3.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    fontSize: 14
});

var $iframeDoc = $("#resultPreview")[0].contentWindow.document;
function codeRun () {
    var cssCon = '<style>' + aceEditor2.getValue() + '</style>\n';
    var htmlCon = aceEditor1.getValue() + '\n';
    var jsCon = '<script>' +aceEditor3.getValue() + '<' + '/script>';
    var c = cssCon + htmlCon + jsCon;
    c = escape2Html(c)
    $iframeDoc.write(c);
    $iframeDoc.close();
}
function escape2Html (str) {
    var arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
        return arrEntities[t];
    });
}
$('#runCode').click(function(){
    codeRun()
});

// 拖动增加和缩减编辑器的高度
function resizeCodemirror() {
    var totalHeight = $('.ace-box').innerHeight();
    $('#cssScale').draggable({
        container: '.ace-box',
        move: false,
        before: function () {
        },
        drag: function (e) {
            var jsTop = $('#jsScale').position().top;
            if (jsTop - e.pos.top > 42) {
                if (e.pos.top <=42) {
                    $('#cssScale').css('top', '42px');
                    $('#aceEditor1').height(0);
                    $('#aceEditor2').height(jsTop - 42 - 42);
                } else {
                    $('#cssScale').css('top', e.pos.top + 'px');
                    $('#aceEditor1').height(e.pos.top - 42);
                    $('#aceEditor2').height(jsTop - e.pos.top - 42);
                    $('#aceEditor3').height(totalHeight - jsTop - 42);
                }
            } else {
                $('#aceEditor2').height(0);
                if (e.pos.top >= totalHeight - 84) {
                    $('#jsScale').css('top', totalHeight - 42 + 'px');
                    $('#cssScale').css('top', totalHeight - 84 + 'px');
                    $('#aceEditor1').height(e.pos.top - 42);
                    $('#aceEditor3').height(0);
                } else {
                    $('#cssScale').css('top', e.pos.top + 'px');
                    $('#jsScale').css('top', e.pos.top + 42 + 'px');
                    $('#aceEditor1').height(e.pos.top - 42);
                    $('#aceEditor3').height(totalHeight - e.pos.top - 42);
                }

            }
        },
        finish: function (e) {
            aceEditor1.resize();
            aceEditor2.resize();
            aceEditor3.resize();
        }
    });
    $('#jsScale').draggable({
        container: '.ace-box',
        move: false,
        before: function () {
        },
        drag: function (e) {
            var cssTop = $('#cssScale').position().top;
            if (e.pos.top - cssTop  <= 42) {
                $('#aceEditor2').height(0);
                if (e.pos.top <= 84) {
                    $('#cssScale').css('top', '42px');
                    $('#jsScale').css('top', '84px');
                    $('#aceEditor1').height(0);
                    $('#aceEditor3').height(totalHeight - 84);
                } else {
                    $('#cssScale').css('top', e.pos.top - 42 + 'px');
                    $('#jsScale').css('top',  e.pos.top + 'px');
                    $('#aceEditor1').height(e.pos.top - 84);
                    $('#aceEditor3').height(totalHeight - e.pos.top - 42);
                }
            } else {
                if (e.pos.top >= totalHeight - 42) {
                    $('#jsScale').css('top', totalHeight - 42 + 'px');
                    $('#aceEditor3').height(0);
                    $('#aceEditor2').height(totalHeight - cssTop - 84);
                } else {
                    $('#jsScale').css('top', e.pos.top + 'px');
                    $('#aceEditor3').height(totalHeight - e.pos.top - 42);
                    $('#aceEditor2').height(e.pos.top - cssTop - 42);
                    $('#aceEditor1').height(cssTop - 42);
                }
            }
        },
        finish: function (e) {
            aceEditor1.resize();
            aceEditor2.resize();
            aceEditor3.resize();
        }
    });

    var totalWidth = $('#aceEditorContain').outerWidth();
    $('.aceEditorItem-xscale').draggable({
        container: '#aceEditorContain',
        move: false,
        before: function () {
            $('.code-result-mask').show();
        },
        drag: function (e) {
            if (e.pos.left > totalWidth*0.8 || e.pos.left < totalWidth*0.2) {
                return
            }
            $('.aceEditorItem-xscale').css('left', e.pos.left);
            $('.ace-box').width(e.pos.left);
            $('.code-result').width(totalWidth - e.pos.left - 10);
        },
        finish: function (e) {
            $('.code-result-mask').hide();
        }
    });
}
resizeCodemirror();

//自动运行
$('.ace-box').on('keydown', function(e) {
    var isChecked = $('#autoRun').prop('checked');
    if (isChecked) {
        watchTimer && clearTimeout(watchTimer);
        var watchTimer = setTimeout(function() {
            codeRun()
        }, 600)
    }
});

//全屏
$('#fullScreen').click(function(){
    $('body').addClass('overflow-hidden');
    //销毁draggable
    $('#cssScale').draggable('destroy');
    $('#jsScale').draggable('destroy');
    $('.aceEditorItem-xscale').draggable('destroy');
    //重新初始化基本样式
    $('#aceEditorContain').addClass('full-ace-editor-box');
    $('.aceEditorItem').height($(window).outerHeight()/3 - 42);
    $('.aceEditorItem-scale').css('top', '');
    $('.aceEditorItem-xscale').css('left', '');
    $('.aceEditorItem-xscale').css('height', '100%');
    $('.ace-box').css('width', '');
    $('.code-result').css('width', '');
    $('.code-result').css('height', '100%');
    //初始化关闭按钮
    $('#cancelFullScreen').show();
    $('#runCode').addClass('run-code');
    $('#autoCheck').addClass('auto-checkbox');
    $('#runCode span').text('').removeClass('l-mini-margin');
    resizeCodemirror();
    aceEditor1.resize();
    aceEditor2.resize();
    aceEditor3.resize();
});

//关闭全屏
$('#cancelFullScreen').click(function(){
    $('body').removeClass('overflow-hidden');
    //销毁draggable
    $('#cssScale').draggable('destroy');
    $('#jsScale').draggable('destroy');
    $('.aceEditorItem-xscale').draggable('destroy');
    //重新初始化基本样式
    $('#aceEditorContain').removeClass('full-ace-editor-box');
    $('.aceEditorItem').css('height', '');
    $('.aceEditorItem-scale').css('top', '');
    $('.aceEditorItem-xscale').css('left', '');
    $('.aceEditorItem-xscale').css('height', '');
    $('.ace-box').css('width', '');
    $('.code-result').css('width', '');
    $('.code-result').css('height', '');
    resizeCodemirror();
    aceEditor1.resize();
    aceEditor2.resize();
    aceEditor3.resize();

    //初始化关闭按钮
    $('#runCode').removeClass('run-code');
    $('#runCode span').text('运行').addClass('l-mini-margin');
    $('#autoCheck').removeClass('auto-checkbox');
    $('#cancelFullScreen').hide();

});

//下载
$('#downAceEditor').click(function(){
    var zip = new JSZip();
    var code = zip.folder('project');

    code.file('index.html', aceEditor1.getValue());
    code.file('style.css', aceEditor2.getValue());
    code.file('common.js', aceEditor3.getValue());

    var content = zip.generate({type: "blob"});
    // see FileSaver.js
    saveAs(content, "project.zip");
});