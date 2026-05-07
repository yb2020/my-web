var RUN_DOMAIN='https://web-check.bejson.com';



function Date_to_Zh_date(dateString)
{
    // 尝试将字符串转换为Date对象
    var date = new Date(dateString);
    // 检查是否成功转换
    if (!isNaN(date)) {
        // 判断是否符合特定的日期格式
        if (date.toGMTString() === dateString) {
            // 转换为中文格式
            var chineseDate = date.toLocaleString("zh-CN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
            // 输出中文格式日期
            return chineseDate;
        } else {
        }
    } else {
    }
    return dateString;
}


function Date_to_Zh_date2(dateString)
{

    var monthMap = {
        "Jan": "January",
        "Feb": "February",
        "Mar": "March",
        "Apr": "April",
        "May": "May",
        "Jun": "June",
        "Jul": "July",
        "Aug": "August",
        "Sep": "September",
        "Oct": "October",
        "Nov": "November",
        "Dec": "December"
    };

    //Jun 19 00:00:00 2023 GMT
    //19  Ju 0:00:00 2023 GMT
// 将字符串格式转换为 'MMM DD HH:mm:ss YYYY Z' 格式
    var formattedDateString = monthMap[dateString.slice(0, 3)] + " " + dateString.slice(4, 6) + ","  + dateString.slice(16,20) + " "+ dateString.slice(7,15);
    var date = new Date(formattedDateString);

// 检查是否成功转换
    if (!isNaN(date)) {
        // 判断是否符合特定的日期格式
        var chineseDate = date.toLocaleString("zh-CN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
        return chineseDate;
    } else {
    }
    return dateString;
}

function city2city(city) {
    // 城市英文名称到中文的映射关系（包括香港、澳门、台湾）
    const cityTranslations = {
        "Beijing": "北京",
        "Shanghai": "上海",
        "Guangzhou": "广州",
        "Shenzhen": "深圳",
        "Hong Kong": "中国香港",
        "Macao": "中国澳门",
        "Taipei": "中国台北",
        "Kaohsiung": "中国高雄",
        'Tianjin': '天津',
        'Chongqing': '重庆',
        'Harbin': '哈尔滨',
        'Shenyang': '沈阳',
        'Dalian': '大连',
        'Changchun': '长春',
        'Shijiazhuang': '石家庄',
        'Taiyuan': '太原',
        'Hohhot': '呼和浩特',
        'Jinan': '济南',
        'Nanjing': '南京',
        'Hangzhou': '杭州',
        'Hefei': '合肥',
        'Fuzhou': '福州',
        'Nanchang': '南昌',
        'Wuhan': '武汉',
        'Changsha': '长沙',
        'Nanning': '南宁',
        'Haikou': '海口',
        'Guiyang': '贵阳',
        'Kunming': '昆明',
        'Lhasa': '拉萨',
        'Xian': '西安',
        'Lanzhou': '兰州',
        'Xining': '西宁',
        'Yinchuan': '银川',
        'China': '中国',
    };
    const inputCity = city; // 这里可以替换成其他城市的英文名称
    if (cityTranslations.hasOwnProperty(inputCity)) {
        const chineseName = cityTranslations[inputCity];
        city=chineseName
    }
    return city;
}



var CHECK_TIME=0;
var CHK_T=window.setInterval(function (){

    CHECK_TIME+=0.2

    if(typeof $=="undefined")
        return;

    var CK_SUC_NUM=0;
    var CK_ERR_NUM=0;
    var CK_TAT_NUM=$(".test_re").length;

    $.each($(".test_re"),function (i,n){
        var text=$(n).text();
        if(text.indexOf('检测成功')>-1)
            CK_SUC_NUM++;
        if(text.indexOf('检测失败')>-1 || text.indexOf('请求出错')>-1)
            CK_ERR_NUM++;
    });

    var zw=$("#ck_progress").width();

    $("#ck_progress").find('.progress-bar-success').css('width',(CK_SUC_NUM/CK_TAT_NUM)*100+'%');
    $("#ck_progress").find('.progress-bar-striped').css('width',((CK_TAT_NUM-CK_SUC_NUM-CK_ERR_NUM)/CK_TAT_NUM)*100+'%');
    $("#ck_progress").find('.progress-bar-danger').css('width',(CK_ERR_NUM/CK_TAT_NUM)*100+'%');


    $(".check_view").html('成功 <span class="label label-success">'+CK_SUC_NUM+'</span> 条，失败 <span class="label label-danger">'+CK_ERR_NUM+'</span> 条，等待检测 <span class="label label-info">'+(CK_TAT_NUM-CK_SUC_NUM-CK_ERR_NUM)+'</span> 条，用时'+(CHECK_TIME).toFixed(1)+' 秒')

    if(CHECK_TIME>300)
        clearInterval(CHK_T);
    if((CK_TAT_NUM-CK_SUC_NUM-CK_ERR_NUM)==0)
        clearInterval(CHK_T);

},200);

function isValidDomain(url) {
    var pattern = /^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
    return pattern.test(url);
}

function isValidHost(url) {
    var pattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
    return pattern.test(url);
}



function post_check()
{

    if(isValidHost($("#user-input").val()))
    {
        $("#user-input").val("https://"+$("#user-input").val())
    }


    if(!isValidDomain($("#user-input").val()))
    {
        msgError('链接或者id不正确，请以http或https开头或完整的域名，结尾不包含路径，例如：https://www.baidu.com或www.baidu.com');
        return false;
    }
    $("#web-form").submit();

    return true;
}

function pop_st_img(obj)
{
    alertSuccess2({con:"<img src='"+obj.src+"' width='600px;' />"})
}

function alertSuccess2(param) {
    $('#successModal').modal('hide');
    var con = param.con ? param.con : '成功';
    var title = param.title ? param.title : '温馨提示';
    var btnTitle = param.btnTitle ? param.btnTitle : '关闭';
    var successHtml = '<div class="modal fade" id="successModal">\n' +
        '<div class="modal-dialog modal-sm" style="width: 600px;">\n' +
        '<div class="modal-content">\n' +
        '<div class="modal-header bg-green">\n' +
        '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">关闭</span></button>\n' +
        '<h4 class="modal-title" style="font-weight:normal">' + title + '</h4>\n' +
        '</div>\n' +
        '<div class="modal-body">\n' +
        '<p class="success-title font-16">' + con + '</p>\n' +
        '</div>\n' +
        '<div class="modal-footer" style="border-top:0">\n' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">' + btnTitle + '</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>';
    $('body').append(successHtml);
    $('#successModal').modal('toggle', 'center');
}



var GGTIME = 90000;
var CHECK_DOMAIN="";
if(location.href.indexOf("?url=")>-1){
    CHECK_DOMAIN=location.href.split("?url=")[1].toLowerCase();
    CHECK_DOMAIN=decodeURIComponent(CHECK_DOMAIN);
}


window.onload = function () {


    $("#user-input").keydown(function(event){
        if (event.which === 13) { // 13 表示回车键
            return post_check(); // 当按下回车键时执行 post_check() 函数
        }
    });



    if(CHECK_DOMAIN=="")
    {
        return ;
    }

    if(!isValidDomain(CHECK_DOMAIN))
    {
        return ;
    }

    $('.check_bbox').css('display','block');
    $('.memobox').css('display','none');

    $("#user-input").val(CHECK_DOMAIN);


    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {
                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">IP地址</span>' +
                        '<span class="val">' + r.data.ip + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">IP版本</span>' +
                        '<span class="val">V' + r.data.family + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>');


                    (function (tag) {

                        //return;

                        $("#"+tag).find(".test_re").html('<span class="label label-info">正在检测</span>');
                        $("#domain").find(".test_re").html('<span class="label label-info">正在检测</span>');
                        $("#hosts").find(".test_re").html('<span class="label label-info">正在检测</span>');
                        $.ajax({
                            //url:'https://api.shodan.io/shodan/host/183.232.231.172?key=WB6B7tRAskjlmpVUrYfnU1CVGCIpUs1t',
                            url:'https://api.shodan.io/shodan/host/'+r.data.ip+'?key=WB6B7tRAskjlmpVUrYfnU1CVGCIpUs1t',
                            dataType:'json',
                            success:function (r2){

                                $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                    '<span class="lbl">城市</span>' +
                                    '<span class="val">' + city2city(r2.city) + '</span>\n' +
                                    '</div>');
                                $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                    '<span class="lbl">位置</span>' +
                                    '<span class="val">' + city2city(r2.country_name) + '</span>\n' +
                                    '</div>');
                                $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                    '<span class="lbl">经度</span>' +
                                    '<span class="val">' + r2.longitude + '</span>\n' +
                                    '</div>');
                                $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                    '<span class="lbl">纬度</span>' +
                                    '<span class="val">' + r2.latitude + '</span>\n' +
                                    '</div>');

                                $.each(r2.domains,function (ka1,va1) {
                                    $("#domain").find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                        '<span class="lbl">'+va1+'</span>' +
                                        '<span class="val"></span>\n' +
                                        '</div>');
                                });

                                $.each(r2.hostnames,function (ka1,va1) {
                                    $("#hosts").find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                        '<span class="lbl">'+va1+'</span>' +
                                        '<span class="val"></span>\n' +
                                        '</div>');
                                });



                                $("#"+tag).find(".test_re").html('<span class="label label-success">检测成功</span>');
                                $("#domain").find(".test_re").html('<span class="label label-success">检测成功</span>');
                                $("#hosts").find(".test_re").html('<span class="label label-success">检测成功</span>');

                            },
                            error:function (r) {
                                //console.log(tag);
                                //console.log(r);
                                $("#"+tag).find(".test_re").html('<span class="label label-danger">请求出错</span>');
                                $("#domain").find(".test_re").html('<span class="label label-danger">请求出错</span>');
                                $("#hosts").find(".test_re").html('<span class="label label-danger">请求出错</span>');
                            },
                            timeout:GGTIME
                        });
                    })('location');


                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>');
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('find-url-ip');



    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {
                    $.each(r.data,function (i,v) {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">'+i+'</span>' +
                            '<span class="val" title="'+Date_to_Zh_date(v)+'">' + Date_to_Zh_date(v) + '</span>\n' +
                            '</div>');
                    })
                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('get-headers');

    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {
                    $.each(r.data,function (k1,v1) {
                        $("#" + tag).find(".ck_content").append('' +
                            '<details open="" class="sc-himrge fiZqiW">\n' +
                            '<summary class="sc-ikZqro sc-jIYZa-D fPfKZc kpUOzp">\n' +
                            '<span class="lbl">'+k1+'</span>\n' +
                            '<span class="val" ></span>\n' +
                            '</summary>\n' +
                            '<ul class="sc-gXmRPE dApgZv">\n' +
                            '</ul>\n' +
                            '</details>' +
                            '' +
                            '');

                        if(v1.length===0)
                        {
                            $("#" + tag).find(".ck_content").find('ul:last').append('' +
                                '<li class="sc-ikZqro sc-cCsQgl fPfKZc klJOea">空</li>' +
                                '');
                        }

                        $.each(v1,function (k2,v2) {
                            if(Array.isArray(v1))
                            {

                                if(typeof v2==="object")
                                {
                                    $("#" + tag).find(".ck_content").find('ul:last').append('' +
                                        '<li class="sc-ikZqro sc-cCsQgl fPfKZc klJOea">\n' +
                                        '<span class="lbl">记录</span>\n' +
                                        '<span class="val">'+v2.exchange+'</span>\n' +
                                        '</li>' +
                                        '');
                                }
                                else
                                {
                                    $("#" + tag).find(".ck_content").find('ul:last').append('' +
                                        '<li class="sc-ikZqro sc-cCsQgl fPfKZc klJOea">\n' +
                                        '<span class="lbl">记录</span>\n' +
                                        '<span class="val">'+v2+'</span>\n' +
                                        '</li>' +
                                        '');
                                }
                            }
                            else
                            {
                                $("#" + tag).find(".ck_content").find('ul:last').append('' +
                                    '<li class="sc-ikZqro sc-cCsQgl fPfKZc klJOea">\n' +
                                    '<span class="lbl">'+k2+'</span>\n' +
                                    '<span class="val">'+v2+'</span>\n' +
                                    '</li>' +
                                    '');
                            }
                        })
                    })
                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('get-dns');




    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    if(r.data.hasOwnProperty('error'))
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '' + r.data.error  +
                            '</div>');
                    }
                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('tech-stack');


    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1" || r.code == "0") {

                    if(r.data.hasOwnProperty('cookies'))
                    {
                        $.each(r.data.cookies,function (i,n) {
                            $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                '' + (n)  +
                                '</div>');
                        })
                    }
                    else
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">空</div>');
                    }
                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('get-cookies');


    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {


                    $("#" + tag).find(".ck_content").append('' +
                        '<details open="" class="sc-himrge fiZqiW">\n' +
                        '<summary class="sc-ikZqro sc-jIYZa-D fPfKZc kpUOzp">\n' +
                        '<span class="lbl">公用名</span>\n' +
                        '<span class="val" ></span>\n' +
                        '</summary>\n' +
                        '<ul class="sc-gXmRPE dApgZv">\n' +
                        '</ul>\n' +
                        '</details>' +
                        '' +
                        '');
                    $.each(r.data.subject,function (k2,v2) {
                        $("#" + tag).find(".ck_content").find('ul:last').append('' +
                            '<li class="sc-ikZqro sc-cCsQgl fPfKZc klJOea">\n' +
                            '<span class="lbl">'+k2+'</span>\n' +
                            '<span class="val">'+v2+'</span>\n' +
                            '</li>' +
                            '');
                    });

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">公用名背景</span>' +
                        '<span class="val">' + r.data.subjectaltname + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">有效期开始</span>' +
                        '<span class="val">' + Date_to_Zh_date2(r.data.valid_from) + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">有效期结束</span>' +
                        '<span class="val">' + Date_to_Zh_date2(r.data.valid_to) + '</span>\n' +
                        '</div>');

                    //alert(r.data.valid_to);


                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">指纹</span>' +
                        '<span class="val">' + r.data.fingerprint + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">asn1Curve</span>' +
                        '<span class="val">' + r.data.asn1Curve + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">nistCurve</span>' +
                        '<span class="val">' + r.data.nistCurve + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">签发机构</span>' +
                        '<span class="val">' + r.data.issuer.O + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('ssl-check');


    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    $.each(r.data.redirects,function (k2,v2) {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '' + v2  +
                            '</div>');
                    });

                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('follow-redirects');


    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1" || r.data.hasOwnProperty('error')) {

                    if(r.data.error)
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            r.data.error  +
                            '</div>');

                    }
                    else
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<code style="width: 100%;max-height: 300px;overflow-y: auto;">' + r.data.txt.replaceAll("\n","<br />")  + '</code>'+
                            '</div>');

                    }




                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')

                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('read-robots-txt');



    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1" && r.data.error) {

                    if(r.data.error)
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            r.data.error  +'</div>');
                    }
                    else
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<code>' + JSON.stringify(r.data)  + '</code>'+
                            '</div>');
                    }




                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('dns-sec');


    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">运行状态</span>' +
                        '<span class="val">' + r.data.isUp + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">响应码</span>' +
                        '<span class="val">' + r.data.responseCode + '</span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">响应时间</span>' +
                        '<span class="val">' + (r.data.responseTime+"").split('.')[0] + '毫秒</span>\n' +
                        '</div>');


                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('server-status');




    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">开放端口</span>' +
                        '<span class="val"></span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc"><code>' +
                        r.data.openPorts.join("; ") +
                        '</code></div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                        '<span class="lbl">未开放端口</span>' +
                        '<span class="val"></span>\n' +
                        '</div>');

                    $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc"><code>' +
                        r.data.failedPorts.join("; ") +
                        '</code></div>');



                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('check-ports');

    /*
    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    $("#" + tag).find(".ck_content").append('' +
                        '<div class="sc-ikZqro fPfKZc"' +
                        '' +
                        '><img src="data:image;base64,' + r.data.img +'"' +
                        '' +
                        'onclick="pop_st_img(this)" style="cursor: pointer;"' +
                        '' +
                        ' /></div>');


                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME 
        });
    })('screenshot');*/

    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1"||r.statusCode=="200") {
                    if(r.data.hasOwnProperty('v'))
                    {
                        $.each(r.data, function (index, value) {
                            if(index == 'v'){
                                $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                    '<span class="lbl">其它</span>' +
                                    '<span class="val">' + value + '</span>\n' +
                                    '</div>');
                            }
                            else
                            {
                                $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                    '<span class="lbl">' + index + '</span>' +
                                    '<span class="val">' + value + '</span>\n' +
                                    '</div>');
                            }
                        });
                    }
                    else
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">无记录</div>');
                    }


                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('get-txt');

    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    $.each(r.data, function (index, value) {

                        if(index=="message")
                            index="信息";
                        if(index=="compatible")
                            index="兼容性";

                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">' + index + '</span>' +
                            '<span class="val">' + value + '</span>\n' +
                            '</div>');

                    });

                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('check-hsts');

    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    if(!r.data.isPresent) {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">安全文档</span>' +
                            '<span class="val">无</span>\n' +
                            '</div>');
                    }
                    else{
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">安全文档</span>' +
                            '<span class="val">有</span>\n' +
                            '</div>');

                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">路径</span>' +
                            '<span class="val">'+r.data.foundIn+'</span>\n' +
                            '</div>');

                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            r.data.content +
                            '</div>');
                    }

                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('security-txt');



    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    $.each(r.data, function (index, value) {

                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">' + index + '</span>' +
                            '<span class="val">' + value + '</span>\n' +
                            '</div>');

                    });

                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('social-tags');




    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    $.each(r.data, function (index, value) {

                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">' + index + '</span>' +
                            '<span class="val">' + value + '</span>\n' +
                            '</div>');

                    });

                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('content-links');


    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    if(r.data.skipped)
                    {
                        $.each(r.data, function (index, value) {

                            $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                '<span class="lbl">' + index + '</span>' +
                                '<span class="val">' + value + '</span>\n' +
                                '</div>');
                        });
                    }
                    else
                    {
                        if(r.data.mailServices)
                        {
                            $("#" + tag).find(".ck_content").append('' +
                                '<details open="" class="sc-himrge fiZqiW">\n' +
                                '<summary class="sc-ikZqro sc-jIYZa-D fPfKZc kpUOzp">\n' +
                                '<span class="lbl">邮箱服务器</span>\n' +
                                '<span class="val" ></span>\n' +
                                '</summary>\n' +
                                '<ul class="sc-gXmRPE dApgZv">\n' +
                                '</ul>\n' +
                                '</details>' +
                                '' +
                                '');
                            $.each(r.data.mailServices,function (k2,v2) {
                                $("#" + tag).find(".ck_content").find('ul:last').append('' +
                                    '<li class="sc-ikZqro sc-cCsQgl fPfKZc klJOea">\n' +
                                    '<span class="lbl">'+v2.provider+'</span>\n' +
                                    '<span class="val">'+v2.value+'</span>\n' +
                                    '</li>' +
                                    '');
                            });
                        }
                        if(r.data.mxRecords)
                        {
                            $("#" + tag).find(".ck_content").append('' +
                                '<details open="" class="sc-himrge fiZqiW">\n' +
                                '<summary class="sc-ikZqro sc-jIYZa-D fPfKZc kpUOzp">\n' +
                                '<span class="lbl">mx记录</span>\n' +
                                '<span class="val" ></span>\n' +
                                '</summary>\n' +
                                '<ul class="sc-gXmRPE dApgZv">\n' +
                                '</ul>\n' +
                                '</details>' +
                                '' +
                                '');
                            $.each(r.data.mxRecords,function (k2,v2) {
                                $("#" + tag).find(".ck_content").find('ul:last').append('' +
                                    '<li class="sc-ikZqro sc-cCsQgl fPfKZc klJOea">\n' +
                                    '<span class="lbl">'+v2.exchange+'</span>\n' +
                                    '<span class="val">'+v2.priority+'</span>\n' +
                                    '</li>' +
                                    '');
                            });
                        }

                    }


                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('mail-config');



    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {
                    if(r.data.Results)
                    {
                        $("#" + tag).find(".ck_content").append('' +JSON.stringify(r.data.Results)+ '');
                    }
                    else
                    {
                        $("#" + tag).find(".ck_content").append('无');
                    }
                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('site-features');




    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {
                    if(r.data.error)
                    {
                        $("#" + tag).find(".ck_content").append('' +r.data.error+ '');
                    }
                    else
                    {
                        $.each(r.data, function (index, value) {
                            if(index=="statistics")
                                return;
                            $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                '<span class="lbl">' + index + '</span>' +
                                '<span class="val">' + value + '</span>\n' +
                                '</div>');
                        });

                        $("#" + tag).find(".ck_content").append('<pre>' +JSON.stringify(r.data.statistics, null, 4)+ '</pre>');


                    }
                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('get-carbon');





    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    if(r.data.result)
                    {
                        //console.log(r.data.result);
                        $.each(r.data.result, function (index, value) {
                            if(typeof (value)=="object")
                            {
                                $.each(value, function (k2, v2) {
                                    if(Array.isArray(v2))
                                    {
                                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                            '<span class="lbl">' + k2 + '</span>' +
                                            '<span class="val">' + v2[0] + '秒</span>\n' +
                                            '</div>');
                                    }

                                });
                            }

                        });



                    }


                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('trace-route');






    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {



                    if(r.data.skipped)
                    {
                        $("#" + tag).find(".ck_content").append(r.data.skipped);

                    }


                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('sitemap');




    (function (tag) {
        $("#" + tag).find(".test_re").html('<span class="label label-info">正在检测</span>')
        $.ajax({
            url: RUN_DOMAIN+'/api.php?r=1&ac=' + tag + '&url='+CHECK_DOMAIN,
            dataType: 'json',
            success: function (r) {
                if (r.code == "1") {

                    if(r.data.Domain_Status)
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">域名状态</span>' +
                            '<span class="val">' + r.data.Domain_Status + '</span>\n' +
                            '</div>');
                    }

                    if(r.data.Registrar)
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">注册商</span>' +
                            '<span class="val">' + r.data.Registrar + '</span>\n' +
                            '</div>');
                    }

                    if(r.data.Registry_Expiry_Date)
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">过期时间</span>' +
                            '<span class="val">' + r.data.Registry_Expiry_Date + '</span>\n' +
                            '</div>');
                    }

                    if(r.data.Registry_Expiry_Date)
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">更新时间</span>' +
                            '<span class="val">' + r.data.Updated_Date + '</span>\n' +
                            '</div>');
                    }

                    if(r.data.Creation_Date)
                    {
                        $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                            '<span class="lbl">注册时间</span>' +
                            '<span class="val">' + r.data.Creation_Date + '</span>\n' +
                            '</div>');
                    }



                    $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                } else {
                    $("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                }
            },
            error: function (r) {
                //console.log(tag);
                //console.log(r);
                $("#" + tag).find(".test_re").html('<span class="label label-danger">请求出错</span>')
            },
            timeout: GGTIME
        });
    })('whois-lookup');








}






















