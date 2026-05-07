function timestampToYMDHIS(timestamp) {
    const date = new Date(timestamp ); // 将时间戳转换为毫秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

function timestampToYMD() {
    const date = new Date( ); // 将时间戳转换为毫秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function get_vfiles()
{
    var html='';

    html+='<table class="vfile_table">';
    html+='<thead>\n' +
        '                <tr>\n' +
        '                    <th>文件名</th>\n' +
        '                    <th width="160">保存时间</th>\n' +
        '                    <th width="90"><a href="#" onclick="vf_del(-1)" style="color: #af0000">全部清空</a></th>\n' +
        '                </tr>\n' +
        '            </thead>';
    html+='';

    var files_data=localStorage.getItem(vITEM_KEY);
    try{
        var files=JSON.parse(files_data);
        //判断files是否为数组
        if(!Array.isArray(files)){
            files=[];
        }
    }
    catch (e) {
        files=[];
    }


    $.each(files,function (i,item) {
        html+='<tr>' +
            '<td width="500">'+item.name+'</td>' +
            '<td>'+timestampToYMDHIS(item.time)+'</td>' +
            '<td><a href="#" onclick="vf_del('+i+')" style="color: #af0000">删除</a> &nbsp;&nbsp;&nbsp; ' +
            '<a href="#" onclick="vf_edit('+i+')">编辑</a></td>' +
            '</tr>';

    });

    html+='</table>';

    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['800px', '500px'], //宽高
        title:'文章列表（文章保存在浏览器缓存里，如有重要内容请及时编辑导出）',
        content: html
    });
}

function vf_del(id)
{
    if(id==-1)
    {
        layer.confirm('您确定要全部清空吗?', {
            btn: ['确定','取消'] //按钮
        }, function(index) {
            layer.close(index);
            layer.closeAll()
            localStorage.removeItem(vITEM_KEY);
            get_vfiles();
        })
        return;
    }
    //弹出确认并删除
    layer.confirm('您确定要删除这个文件吗?', {
        btn: ['确定','取消'] //按钮
    }, function(index) {
        layer.close(index);
        layer.closeAll()
        var files = JSON.parse(localStorage.getItem(vITEM_KEY));
        files.splice(id,1);
        localStorage.setItem(vITEM_KEY,JSON.stringify(files));
        get_vfiles();
    })
}

function vf_edit(id)
{
    var files = JSON.parse(localStorage.getItem(vITEM_KEY));
    var item=files[id];
    console.log(item['value']);
    VVVDT.setValue(item['value']);
    layer.closeAll();
    layer.msg('文件已恢复');
}


const vITEM_KEY="VDITOR_FILES";

VVVDT=null;

const setMode = (it, options) => {
    document.getElementById('vditor').innerHTML = ''
    const vdt = new Vditor('vditor',
        {
            height: 560,
            cache: {enable: true,id:'vditorTemp'},
            value: document.getElementById('vcode').value,"mode": "sv",
            "preview": {
                "mode": "both"
            },
            after () {
                $(".vditor-toolbar").append('<div class="vditor-toolbar__item vditor-toolbar__addon">' +
                    '<div class="btn-group">' +
                    '<button id="vt_init" type="button" class="btn btn-sm">初始化</button>' +
                    '<button id="vt_save" type="button" class="btn btn-sm">保存</button>' +
                    '<button id="vt_list" type="button" class="btn btn-sm">文章列表</button>' +
                    '</div>' +
                    '</div>');

                $("#vt_save").click(function(){
                    var filename=vdt.getValue().replace(/\s/g, '').substring(0,16);
                    layer.prompt({title: '输入文件名', formType: 0,value:filename}, function(text, index){
                        layer.close(index);

                        var files_data=localStorage.getItem(vITEM_KEY);
                        try{
                            var files=JSON.parse(files_data);
                            //判断files是否为数组
                            if(!Array.isArray(files)){
                                files=[];
                            }
                        }
                        catch (e) {
                            files=[];
                        }

                        files.unshift({
                            "name":text,
                            "time":new Date().getTime(),
                            "value":vdt.getValue(),
                        });

                        localStorage.setItem(vITEM_KEY,JSON.stringify(files));


                    });
                });

                $("#vt_list").click(function(){
                    get_vfiles();
                });

                $("#vt_init").click(function(){
                    //弹出确认并删除
                    layer.confirm('初始化将清空所有已保存的内容和文件，并显示默认内容', {
                        btn: ['确定','取消'] //按钮
                    }, function(index) {
                        layer.close(index);

                        localStorage.removeItem(vITEM_KEY);

                        vdt.setValue( document.getElementById('vcode').value);


                    })
                });

            },
            fullscreen:{
                index:999
            },
            toolbar: [
                "emoji",
                "headings",
                "bold",
                "italic",
                "strike",
                "link",
                "|",
                "list",
                "ordered-list",
                "check",
                "outdent",
                "indent",
                "|",
                "quote",
                "line",
                "code",
                "inline-code",
                "insert-before",
                "insert-after",
                "|",
                //"upload",
                //"record",
                "table",
                "|",
                "undo",
                "redo",
                "|",
                "fullscreen",
                "edit-mode",
                "both",
                "code-theme",
                "content-theme",
                "export",
                "outline",
                "preview",
                "devtools",
                //"info",
                //"help",
            ],
            hint: {
                emoji:{
                    "grinning": "😀",
                    "grin": "😁",
                    "joy": "😂",
                    "rofl": "🤣",
                    "smiley": "😃",
                    "smile": "😄",
                    "sweat_smile": "😅",
                    "laughing": "😆",
                    "wink": "😉",
                    "blush": "😊",
                    "innocent": "😇",
                    "kissing": "😘",
                    "heart_eyes": "😍",
                    "kissing_heart": "😘",
                    "kissing_closed_eyes": "😚",
                    "yum": "😋",
                    "stuck_out_tongue": "😛",
                    "stuck_out_tongue_winking_eye": "😜",
                    "zany_face": "🤪",
                    "raised_eyebrow": "🤨",
                    "monocle": "🧐",
                    "stuck_out_tongue_closed_eyes": "😝",
                    "money_mouth_face": "🤑",
                    "hugging": "🤗",
                    "hand_over_mouth": "🤭",
                    "shushing_face": "🤫",
                    "thinking": "🤔",
                    "zipper_mouth_face": "🤐",
                    "raised_hand": "✋",
                    "v": "✌️",
                    "ok_hand": "👌",
                    "crossed_fingers": "🤞",
                    "love_you_gesture": "🤟",
                    "metal": "🤘",
                    "call_me_hand": "🤙",
                    "point_left": "👈",
                    "point_right": "👉",
                    "point_up_2": "👆",
                    "middle_finger": "🖕",
                    "point_down": "👇",
                    "vulcan_salute": "🖖",
                    "wave": "👋",
                    "call_me": "🤙",
                    "muscle": "💪",
                    "clap": "👏",
                    "pray": "🙏",
                    "handshake": "🤝",
                    "nail_care": "💅",
                    "ear": "👂",
                    "nose": "👃",
                    "eye": "👁️",
                    "lips": "👄",
                    "tongue": "👅",
                    "thumbs_up": "👍",
                    "thumbs_down": "👎",
                    "point_up": "☝️",
                    "punch": "👊",
                    "fist": "✊",
                    "open_hands": "👐",
                    "writing_hand": "✍️",
                    "selfie": "🤳",
                    "musical_note": "🎵",
                    "notes": "🎶",
                    "guitar": "🎸",
                    "musical_keyboard": "🎹",
                    "trumpet": "🎺",
                    "violin": "🎻",
                    "clapper": "🎬",
                    "headphones": "🎧",
                    "musical_score": "🎼",
                    "microphone": "🎤",
                    "radio": "📻",
                    "accordion": "🪗",
                    "drum": "🥁",
                    "banjo": "🪕",
                    "electric_guitar": "🎸",
                    "part_alternation_mark": "〽️",
                    "beginner": "🔰",
                    "trident": "🔱",
                    "a": "🅰️",
                    "b": "🅱️",
                    "ab": "🆎",
                    "o2": "🅾️",
                    "stop_sign": "🛑",
                    "no_entry": "⛔",
                    "name_badge": "📛",
                    "exclamation": "❗",
                    "white_exclamation": "❕",
                    "question": "❓",
                    "white_question": "❔",
                    "bangbang": "‼️",
                    "interrobang": "⁉️",
                    "x": "❌",
                    "o": "⭕",
                    "100": "💯",
                    "heavy_plus_sign": "➕",
                    "heavy_minus_sign": "➖",
                    "heavy_division_sign": "➗",
                    "heavy_multiplication_x": "✖️",
                    "infinity": "♾️",
                    "heavy_dollar_sign": "💲",
                    "currency_exchange": "💱",
                    "tm": "™️",
                    "hash": "#️⃣",
                    "keycap_star": "*️⃣",
                    "keycap_0": "0️⃣",
                    "keycap_1": "1️⃣",
                    "keycap_2": "2️⃣",
                    "keycap_3": "3️⃣",
                    "keycap_4": "4️⃣",
                    "keycap_5": "5️⃣",
                    "keycap_6": "6️⃣",
                    "keycap_7": "7️⃣",
                    "keycap_8": "8️⃣",
                    "keycap_9": "9️⃣",
                    "arrow_forward": "▶️",
                    "pause_button": "⏸️",
                    "stop_button": "⏹️",
                    "record_button": "⏺️",
                    "play_or_pause_button": "⏯️",
                    "next_track_button": "⏭️",
                    "previous_track_button": "⏮️",
                    "fast_forward": "⏩",
                    "rewind": "⏪",
                    "arrow_double_up": "⏫",
                    "arrow_double_down": "⏬",
                    "arrow_backward": "◀️",
                    "arrow_up_small": "🔼",
                    "arrow_down_small": "🔽",
                    "arrow_right": "➡️",
                    "arrow_left": "⬅️",
                    "arrow_up": "⬆️",
                    "arrow_down": "⬇️",
                    "arrow_upper_right": "↗️",
                    "arrow_upper_left": "↖️",
                    "arrow_lower_right": "↘️",
                    "arrow_lower_left": "↙️",
                    "left_right_arrow": "↔️",
                    "arrow_right_hook": "↪️",
                    "leftwards_arrow_with_hook": "↩️",
                    "arrow_heading_up": "⤴️",
                    "arrow_heading_down": "⤵️",
                    "clock1": "🕐",
                    "clock2": "🕑",
                    "clock3": "🕒",
                    "clock4": "🕓",
                    "clock5": "🕔",
                    "clock6": "🕕",
                    "clock7": "🕖",
                    "clock8": "🕗",
                    "clock9": "🕘",
                    "clock10": "🕙",
                    "clock11": "🕚",
                    "clock12": "🕛",
                    "clock130": "🕜",
                    "clock230": "🕝",
                    "clock330": "🕞",
                    "clock430": "🕟",
                    "clock530": "🕠",
                    "clock630": "🕡",
                    "clock730": "🕢",
                    "clock830": "🕣",
                    "clock930": "🕤",
                    "clock1030": "🕥",
                    "clock1130": "🕦",
                    "clock1230": "🕧",
                    "one": "1️⃣",
                    "two": "2️⃣",
                    "three": "3️⃣",
                    "four": "4️⃣",
                    "five": "5️⃣",
                    "six": "6️⃣",
                    "seven": "7️⃣",
                    "eight": "8️⃣",
                    "nine": "9️⃣",
                    "zero": "0️⃣",
                    "heavy_check_mark": "✔️",
                    "ballot_box_with_check": "☑️",
                    "link": "🔗",
                    "curly_loop": "➰",
                    "wavy_dash": "〰️",
                    "black_small_square": "▪️",
                    "white_small_square": "▫️",
                    "white_medium_square": "◻️",
                    "black_medium_square": "◼️",
                    "white_medium_small_square": "◽",
                    "black_medium_small_square": "◾",
                    "white_large_square": "⬜",
                    "black_large_square": "⬛",
                    "small_red_triangle": "🔺",
                    "small_red_triangle_down": "🔻",
                    "diamond_shape_with_a_dot_inside": "💠",
                    "white_square_button": "🔳",
                    "black_square_button": "🔲"
                }


                }
        });

    VVVDT=vdt;
}
vditorScript = setMode