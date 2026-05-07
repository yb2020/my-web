//根据DOM元素的id构造出一个编辑器================================================================================================================================================================================================
var editor = CodeMirror.fromTextArea(document.getElementById("code4"), {
    mode: "application/xml", //设置json模式
    lineNumbers: true, //是否显示左边换行术字
    lineWrapping: true, //是否折叠
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});
var editor2 = CodeMirror.fromTextArea(document.getElementById("code6"), {
    mode: "application/xml", //设置json模式
    lineNumbers: true, //是否显示左边换行术字
    lineWrapping: true, //是否折叠
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});
var editor3 = CodeMirror.fromTextArea(document.getElementById("code5"), {
    mode: "application/json", //设置json模式
    lineNumbers: true, //是否显示左边换行术字
    lineWrapping: true, //是否折叠
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});

//初始化colorpicker
$('#cmp_bgcolor').colorPicker({
    animationSpeed: 0,
    opacity: false,
    renderCallback: function($elm, toggled) {
        if (!toggled) {
            update()
        }
    }
});
//复制
new ClipboardJS('.player-copy-btn', {
    text: function (trigger) {
        var value = $(trigger).parents('.input-group').find('input').eq(0).val();
        if (value) {
            msgSuccess('复制成功');
            return value;
        } else {
            return false
        }
    }
});
//Mini皮肤列表=================================================================
var skins = [{
    name: '【Mini横条皮肤】宽度可自适应',
    src: 'skins/mini/mini.zip',
    width: 200,
    height: 16
},
    {
        name: '【SC MP3 Player】按钮滑动效果皮肤',
        src: 'skins/mini/scplayer.zip',
        width: 290,
        height: 24
    },
    {
        name: '【MOKO】美空女性风格皮肤',
        src: 'skins/mini/moko.zip',
        width: 550,
        height: 40
    },
    {
        name: '【MOKO】带卡拉OK歌词显示皮肤',
        src: 'skins/mini/moko.zip',
        width: 550,
        height: 150
    },
    {
        name: '【Ocean Blue海蓝】宽度可自适应',
        src: 'skins/mini/ocean.zip',
        width: 73,
        height: 24
    },
    {
        name: '【Ocean Blue海蓝】带时间和进度条，宽度可自适应',
        src: 'skins/mini/ocean.zip',
        width: 280,
        height: 24
    },

    {
        name: '【XDJ】XDJ皮肤',
        src: 'skins/xdj.zip',
        width: 600,
        height: 240
    },

    {
        name: '【XDJ】XDJ完全版皮肤',
        src: 'skins/xdjfull.zip',
        width: 620,
        height: 430
    },


    {
        name: '【163musicbox】Mini 163音乐盒子皮肤',
        src: 'skins/163musicbox.zip',
        width: 246,
        height: 250
    },

    {
        name: '【mp3player】MP3播放器皮肤',
        src: 'skins/mp3player.zip',
        width: 320,
        height: 400
    },

    {
        name: '【qqmusic】QQ音乐圣诞节皮肤',
        src: 'skins/qqmusic.zip',
        width: 300,
        height: 400
    },

    {
        name: '【beveled】beveled播放器皮肤',
        src: 'skins/beveled.zip',
        width: 350,
        height: 200
    },

    {
        name: '【cchat】cchat直播皮肤，支持名称排序',
        src: 'skins/cchat.zip',
        width: 516,
        height: 330
    },


    {
        name: '【1ting】1ting皮肤，支持列表歌曲搜索过滤',
        src: 'skins/1ting.zip',
        width: 370,
        height: 438
    },


    {
        name: '【WMP11】Windows Media Player 11皮肤',
        src: 'skins/wmp11.zip',
        width: 586,
        height: 385
    },

    {
        name: '【winter】winter冬季恋歌皮肤',
        src: 'skins/winter.zip',
        width: 350,
        height: 520
    },


    {
        name: '【psp】PSP外观皮肤',
        src: 'skins/psp.zip',
        width: 820,
        height: 342
    },


    {
        name: '【exobud_plastic】框架横条皮肤，高度可自适应显示列表歌词视频',
        src: 'skins/exobud_plastic.zip',
        width: 800,
        height: 24
    },

    {
        name: '【TV Live】电视直播专用皮肤，宽高可自适应',
        src: 'skins/mini/tvlive.zip',
        width: 400,
        height: 300
    },
    {
        name: '【视频播放专用皮肤】[4:3]宽度和高度都可以自定义',
        src: 'skins/mini/vplayer.zip',
        width: 400,
        height: 300
    },
    {
        name: '【视频播放专用皮肤】[16:9]宽度和高度都可以自定义',
        src: 'skins/mini/vplayer.zip',
        width: 500,
        height: 282
    },
    {
        name: '【JW音乐播放皮肤】宽度和高度都可以自定义',
        src: 'skins/mini/jwplayer.zip',
        width: 320,
        height: 20
    },
    {
        name: '【JW视频播放皮肤】[4:3]宽度和高度都可以自定义',
        src: 'skins/mini/jwplayer.zip',
        width: 320,
        height: 260
    },
    {
        name: '【JW视频播放皮肤】[16:9]宽度和高度都可以自定义',
        src: 'skins/mini/jwplayer.zip',
        width: 400,
        height: 245
    },
    {
        name: '【简蓝视频皮肤】[4:3]宽度和高度都可以自定义',
        src: 'skins/mini/blueplayer.zip',
        width: 320,
        height: 290
    },
    {
        name: '【简蓝视频皮肤】[16:9]宽度和高度都可以自定义',
        src: 'skins/mini/blueplayer.zip',
        width: 400,
        height: 275
    }
];

editor.on('change', function(){
    updateList()
});

function addSkinList() {
    var ss = document.getElementById('skinSelect');
    for (var i = 0; i < skins.length; i++) {
        ss.options.add(new Option(skins[i].name, i));
    }
}

addSkinList();

function updateSkin(o) {
    if (o.value) {
        var skin = skins[o.value];
        document.getElementById('cmp_width').value = skin.width;
        document.getElementById('cmp_height').value = skin.height;
    } else {
        document.getElementById('cmp_width').value = '';
        document.getElementById('cmp_height').value = '';
    }
    update();
}

//============================================================================

function addM(m) {
    var tr = document.createElement('tr');

    var indexTd = document.createElement('td');
    tr.appendChild(indexTd);

    indexTd.innerHTML = m.index + 1;

    //label
    var labelTd = document.createElement('td');
    tr.appendChild(labelTd);

    var labelInput = document.createElement('input');
    labelInput.style.width = '100%';
    labelInput.onfocus = function () {
        this.select();
    };
    labelInput.onchange = function () {
        updateXml();
    };
    labelInput.className = 'm_label form-control';
    labelInput.value = m.label;
    labelTd.appendChild(labelInput);

    //src
    var srcTd = document.createElement('td');
    srcTd.style.width = '48%';
    tr.appendChild(srcTd);

    var srcInput = document.createElement('input');
    srcInput.style.width = '100%';
    srcInput.onfocus = function () {
        this.select();
    };
    srcInput.onchange = function () {
        updateXml();
    };
    srcInput.className = 'm_src form-control';
    srcInput.value = m.src;
    srcTd.appendChild(srcInput);

    //type

    var typeTd = document.createElement('td');
    tr.appendChild(typeTd);

    var typeSelect = document.createElement('select');
    typeTd.appendChild(typeSelect);

    typeSelect.className = 'm_type form-control';
    typeSelect.onchange = function () {
        updateXml();
    };

    var cmp_types = '';
    cmp_types += '<option value="">根据后缀自动识别</option>';
    cmp_types += '<option value="sound">MP3音频</option>';
    cmp_types += '<option value="video">FLV视频</option>';
    cmp_types += '<option value="wmp">WMP类型</option>';
    cmp_types += '<option value="flash">动画图片</option>';
    typeSelect.innerHTML = cmp_types;

    var exts = {
        //声音
        '1': 'sound',
        'mp3': 'sound',
        'rbs': 'sound',
        'sound': 'sound',
        //普通视频
        '2': 'video',
        'flv': 'video',
        'mp4': 'video',
        'm4a': 'video',
        '3g2': 'video',
        '3gp': 'video',
        'aac': 'video',
        'f4b': 'video',
        'f4p': 'video',
        'f4v': 'video',
        'm4v': 'video',
        'mov': 'video',
        'sdp': 'video',
        'vp6': 'video',
        'video': 'video',
        //wmp格式
        '3': 'wmp',
        'wma': 'wmp',
        'wmv': 'wmp',
        'asf': 'wmp',
        'asx': 'wmp',
        'mid': 'wmp',
        'wav': 'wmp',
        'mpg': 'wmp',
        'avi': 'wmp',
        'dat': 'wmp',
        'wmp': 'wmp',
        //动画
        '4': 'flash',
        'swf': 'flash',
        'jpg': 'flash',
        'gif': 'flash',
        'png': 'flash',
        'image': 'flash',
        'flash': 'flash',
        //其他
        'other': 'other'
    };

    var ext = m.type ? exts[m.type] : '';
    typeSelect.value = ext;

    //lrc
    var lrcTd = document.createElement('td');
    tr.appendChild(lrcTd);

    var lrcInput = document.createElement('input');
    lrcInput.style.width = '100%';
    lrcInput.onfocus = function () {
        this.select();
    };
    lrcInput.onchange = function () {
        updateXml();
    };
    lrcInput.className = 'm_lrc form-control';
    lrcInput.value = m.lrc;
    lrcTd.appendChild(lrcInput);

    document.getElementById('cmp_list_tbody').appendChild(tr);
}

function updateList() {

    var list = editor.getValue();
    if (list) {

        var div = document.createElement('div');
        div.innerHTML = list;

        var ms = div.querySelectorAll('m');
        if (ms && ms.length) {

            document.getElementById('cmp_list_tbody').innerHTML = '';

            for (var i = 0, l = ms.length; i < l; i++) {
                var m = ms[i];
                addM({
                    index: i,
                    label: m.getAttribute('label') || '',
                    src: m.getAttribute('src') || '',
                    type: m.getAttribute('type') || '',
                    lrc: m.getAttribute('lrc') || ''
                });

            }
        }

    }

    var trs = document.getElementById('cmp_list_tbody').querySelectorAll('tr');
    if (trs && trs.length < 5) {
        for (var i = trs.length; i < 5; i++) {
            addNew();
        }
    }

    update();
}


function updateXml() {

    var ms = [];

    var trs = document.getElementById('cmp_list_tbody').querySelectorAll('tr');
    if (trs && trs.length) {
        for (var i = 0, l = trs.length; i < l; i++) {
            var tr = trs[i];
            var src = tr.querySelector('.m_src');
            if (src && src.value) {
                ms.push({
                    label: tr.querySelector('.m_label').value,
                    src: src.value,
                    type: tr.querySelector('.m_type').value,
                    lrc: tr.querySelector('.m_lrc').value
                });
            }
        }

    }

    var xml = '<list>\n';
    ms.forEach(function (m) {
        var a = [];
        for (var k in m) {
            a.push(k + '="' + m[k] + '"');
        }
        xml += '  <m ' + a.join(' ') + ' />\n';
    });
    xml += '</list>';
    if(xml !== editor.getValue()) {
        editor.setValue(xml);
    }

    update();

}

function addNew() {
    addM({
        index: document.getElementById('cmp_list_tbody').querySelectorAll('tr').length,
        label: '',
        src: '',
        type: '',
        lrc: ''
    });
}


document.getElementById('cmp_bt_add').addEventListener('click', function () {
    addNew();
    updateXml();
});


//============================================================================
var cmpId = 'cmp' + Math.random().toString().substring(2, 10);

function update() {
    var vars = ['url=', 'lists=', 'context_menu=2'];
    //取得设置
    if (document.getElementById('cmp_auto_play').checked) {
        vars.push('auto_play=1');
    }
    if (document.getElementById('cmp_play_mode').checked) {
        vars.push('play_mode=1');
    }
    var bgcolor = document.getElementById('cmp_bgcolor').value;
    if (bgcolor) {
        vars.push('bgcolor=' + encodeURIComponent(bgcolor));
    }

    //取得音乐地址
    var list = editor.getValue();
    if (list) {
        document.getElementById('listErr').innerHTML = '';
        vars.push('list=' + encodeURIComponent(list));
    } else {
        document.getElementById('listErr').innerHTML = '音乐列表不能为空';
        errorHandler();
        return;
    }

    //取得皮肤
    var index = document.getElementById('skinSelect').value;
    var skin = skins[index];
    if (skin) {
        document.getElementById('skinErr').innerHTML = '';
        vars.push('skin=' + encodeURIComponent(skin.src));
    } else {
        document.getElementById('skinErr').innerHTML = '请选择一个皮肤';
        errorHandler();
        return;
    }
    //生成代码
    //宽高
    var cmpw = parseInt(document.getElementById('cmp_width').value || skin.width);
    var cmph = parseInt(document.getElementById('cmp_height').value || skin.height);
    //参数
    var flashvars = vars.join('&');
    //生成html地址
    //取得MP主程序地址，也可以自定义为绝对路径，默认使用同级目录下的cmp.swf
    var cmpUrl = getUrl('/player/cmp.swf');

    var paramsStr = '{}';
    var paramsObj = {};
    if (document.getElementById('cmp_wmode').checked) {
        paramsStr = '{wmode:"transparent"}';
        paramsObj = {
            wmode: 'transparent'
        };
    }
    var htm = getcmp(cmpId, cmpw, cmph, cmpUrl, flashvars, paramsObj);

    var js = '<script type="text/javascript" src="' + getUrl('cmp.js') + '"><' +
        '/script>\n';
    js += '<script type="text/javascript">\n';
    js += 'CMP.write("' + cmpId + '", "' + cmpw + '", "' + cmph + '", "' + cmpUrl + '", "' + flashvars + '", ' +
        paramsStr + ');\n';
    js += '<' + '/script>';

    var url = cmpUrl + '?' + flashvars;

    editor2.setValue(htm);
    editor3.setValue(js);
    document.getElementById('ubbcode').value = '[flash=' + cmpw + ',' + cmph + ']' + url + '[/flash]';
    document.getElementById('flashcode').value = url + '&.swf';
    showPreview();
}

function errorHandler() {
    document.getElementById('flashcode').value = '';
    document.getElementById('ubbcode').value = '';
    editor2.setValue('');
    showPreview();
}

var last_preview_code = '';

function showPreview() {
    if ($('#checkPreview').prop('checked')) {
        var preview_code = editor2.getValue();
        if (preview_code === last_preview_code) {
            return;
        }
        last_preview_code = preview_code;
        document.getElementById('preview').innerHTML = preview_code;
    } else {
        last_preview_code = '';
        document.getElementById('preview').innerHTML = '';
    }
}

function getcmp(id, w, h, url, flashvars, params) {
    var _params = {
        allowfullscreen: 'true',
        allowscriptaccess: 'always',
        flashvars: flashvars
    };
    if (params && typeof params === 'object') {
        for (var k in params) {
            _params[k] = params[k];
        }
    }
    var htm = '<object type="application/x-shockwave-flash" data="' + url + '" width="' + w + '" height="' + h +
        '" id="' + id + '">\n';
    htm += '<param name="movie" value="' + url + '" />\n';
    for (var p in _params) {
        htm += '<param name="' + p + '" value="' + _params[p] + '" />\n';
    }
    htm += '</object>';
    return htm;
}


function getUrl(url) {
    return window.location.protocol + '//' + window.location.host + url;
}

window.addEventListener('load', function () {
    updateList();
    $('#checkPreview').change(function(){
        showPreview()
    });
});