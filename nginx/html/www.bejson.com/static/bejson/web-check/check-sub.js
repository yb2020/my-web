var RUN_DOMAIN='https://www.ip89.com';
var GGTIME = 90000;



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



function isValidDomain(url) {
    var pattern = /^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
    return pattern.test(url);
}

function isValidHost(url) {
    var pattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
    return pattern.test(url);
}

function sub_location() {
        //console.log($("#siteRequest"))
        $(function () {
            $("#siteRequest").click(function () {

                if(isValidHost($("#siteHost").val()))
                {
                    $("#siteHost").val("https://"+$("#siteHost").val());
                }
                var CHECK_DOMAIN=$("#siteHost").val();
                if(!isValidDomain(CHECK_DOMAIN))
                {
                    msgError('链接或者id不正确，请以http或https开头或完整的域名，结尾不包含路径，例如：https://www.baidu.com或www.baidu.com');
                    return false;
                }

                $(".ck_content").html('查询中...')

                var tag='rbox';

                $.ajax({
                    url: RUN_DOMAIN+'/api2.php?r=1&ac=find-url-ip&url='+CHECK_DOMAIN,
                    dataType: 'json',
                    success: function (r) {

                        $(".ck_content").html('')

                        if (r.code == "1") {
                            $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                '<span class="lbl">IP地址</span>' +
                                '<span class="val">' + r.data.ip + '</span>\n' +
                                '</div>');

                            $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                '<span class="lbl">IP版本</span>' +
                                '<span class="val">V' + r.data.family + '</span>\n' +
                                '</div>');

                            (function (tag) {

                                //return;

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

                                    },
                                    error:function (r) {
                                        msgError('服务器位置查询失败');
                                        $(".ck_content").html('服务器位置查询失败');

                                    },
                                    timeout:GGTIME
                                });
                            })('rbox');


                        } else {
                            msgError('查询失败');
                            $(".ck_content").html('查询失败');
                        }
                    },
                    error: function (r) {
                        msgError('查询失败');
                        $(".ck_content").html('查询失败');
                    },
                    timeout: GGTIME
                });





            });
        })


    load_keydown();
}

function sub_cookies() {
    //console.log($("#siteRequest"))
    $(function () {
        $("#siteRequest").click(function () {

            if(isValidHost($("#siteHost").val()))
            {
                $("#siteHost").val("https://"+$("#siteHost").val());
            }
            var CHECK_DOMAIN=$("#siteHost").val();
            if(!isValidDomain(CHECK_DOMAIN))
            {
                msgError('链接或者id不正确，请以http或https开头或完整的域名，结尾不包含路径，例如：https://www.baidu.com或www.baidu.com');
                return false;
            }

            $(".ck_content").html('查询中...')

            var tag='rbox';

            $.ajax({
                url: RUN_DOMAIN+'/api2.php?r=1&ac=get-cookies&url='+CHECK_DOMAIN,
                dataType: 'json',
                success: function (r) {

                    $(".ck_content").html('')


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
                        msgError('查询失败');
                        $(".ck_content").html('查询失败');$("#" + tag).find(".test_re").html('<span class="label label-danger">检测失败</span>')
                    }

                },
                error: function (r) {
                    msgError('查询失败');
                    $(".ck_content").html('查询失败');
                },
                timeout: GGTIME
            });





        });
    })

    load_keydown();
}



function sub_dns() {
    //console.log($("#siteRequest"))
    $(function () {
        $("#siteRequest").click(function () {

            if(isValidHost($("#siteHost").val()))
            {
                $("#siteHost").val("https://"+$("#siteHost").val());
            }
            var CHECK_DOMAIN=$("#siteHost").val();
            if(!isValidDomain(CHECK_DOMAIN))
            {
                msgError('链接或者id不正确，请以http或https开头或完整的域名，结尾不包含路径，例如：https://www.baidu.com或www.baidu.com');
                return false;
            }

            $(".ck_content").html('查询中...')

            var tag='rbox';

            $.ajax({
                url: RUN_DOMAIN+'/api2.php?r=1&ac=get-dns&url='+CHECK_DOMAIN,
                dataType: 'json',
                success: function (r) {

                    $(".ck_content").html('')

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

                    } else {
                        msgError('查询失败');
                        $(".ck_content").html('查询失败');
                    }






                },
                error: function (r) {
                    msgError('查询失败');
                    $(".ck_content").html('查询失败');
                },
                timeout: GGTIME
            });





        });
    })

    load_keydown();
}


function sub_header() {
    //console.log($("#siteRequest"))
    $(function () {
        $("#siteRequest").click(function () {

            if(isValidHost($("#siteHost").val()))
            {
                $("#siteHost").val("https://"+$("#siteHost").val());
            }
            var CHECK_DOMAIN=$("#siteHost").val();
            if(!isValidDomain(CHECK_DOMAIN))
            {
                msgError('链接或者id不正确，请以http或https开头或完整的域名，结尾不包含路径，例如：https://www.baidu.com或www.baidu.com');
                return false;
            }

            $(".ck_content").html('查询中...')

            var tag='rbox';

            $.ajax({
                url: RUN_DOMAIN+'/api2.php?r=1&ac=get-headers&url='+CHECK_DOMAIN,
                dataType: 'json',
                success: function (r) {

                    $(".ck_content").html('')
                    if (r.code == "1") {
                        $.each(r.data,function (i,v) {
                            $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                '<span class="lbl">'+i+'</span>' +
                                '<span class="val" title="'+Date_to_Zh_date(v)+'">' + Date_to_Zh_date(v) + '</span>\n' +
                                '</div>');
                        })
                    } else {
                        msgError('查询失败');
                        $(".ck_content").html('查询失败');
                    }
                },
                error: function (r) {
                    msgError('查询失败');
                    $(".ck_content").html('查询失败');
                },
                timeout: GGTIME
            });





        });
    })

    load_keydown();
}


function sub_link() {
    //console.log($("#siteRequest"))
    $(function () {
        $("#siteRequest").click(function () {

            if(isValidHost($("#siteHost").val()))
            {
                $("#siteHost").val("https://"+$("#siteHost").val());
            }
            var CHECK_DOMAIN=$("#siteHost").val();
            if(!isValidDomain(CHECK_DOMAIN))
            {
                msgError('链接或者id不正确，请以http或https开头或完整的域名，结尾不包含路径，例如：https://www.baidu.com或www.baidu.com');
                return false;
            }

            $(".ck_content").html('查询中...')

            var tag='rbox';

            $.ajax({
                url: RUN_DOMAIN+'/api2.php?r=1&ac=content-links&url='+CHECK_DOMAIN,
                dataType: 'json',
                success: function (r) {

                    $(".ck_content").html('')

                    if (r.code == "1") {


                        $.each(r.data, function (index, value) {
                            var index_v=index;
                            if(index_v=='internal')index_v='内链';
                            if(index_v=='external')index_v='外链';

                            $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                '<span class="lbl">' + index_v + '</span>' +
                                '<span class="val">' + value.join("<br />") + '</span>\n' +
                                '</div>');

                        });

                    } else {
                        msgError('查询失败');
                        $(".ck_content").html('查询失败');
                    }






                },
                error: function (r) {
                    msgError('查询失败');
                    $(".ck_content").html('查询失败');
                },
                timeout: GGTIME
            });





        });
    })

    load_keydown();
}



function sub_route() {
    //console.log($("#siteRequest"))
    $(function () {
        $("#siteRequest").click(function () {

            if(isValidHost($("#siteHost").val()))
            {
                $("#siteHost").val("https://"+$("#siteHost").val());
            }
            var CHECK_DOMAIN=$("#siteHost").val();
            if(!isValidDomain(CHECK_DOMAIN))
            {
                msgError('链接或者id不正确，请以http或https开头或完整的域名，结尾不包含路径，例如：https://www.baidu.com或www.baidu.com');
                return false;
            }

            $(".ck_content").html('查询中...')

            var tag='rbox';

            $.ajax({
                url: RUN_DOMAIN+'/api2.php?r=1&ac=trace-route&url='+CHECK_DOMAIN,
                dataType: 'json',
                success: function (r) {

                    $(".ck_content").html('')

                    if(r.data.result)
                    {
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
                },
                error: function (r) {
                    msgError('查询失败');
                    $(".ck_content").html('查询失败');
                },
                timeout: GGTIME
            });





        });
    })

    load_keydown();
}




function sub_seo() {
    //console.log($("#siteRequest"))
    $(function () {
        $("#siteRequest").click(function () {

            if(isValidHost($("#siteHost").val()))
            {
                $("#siteHost").val("https://"+$("#siteHost").val());
            }
            var CHECK_DOMAIN=$("#siteHost").val();
            if(!isValidDomain(CHECK_DOMAIN))
            {
                msgError('链接或者id不正确，请以http或https开头或完整的域名，结尾不包含路径，例如：https://www.baidu.com或www.baidu.com');
                return false;
            }

            $(".ck_content").html('查询中...')

            var tag='rbox';

            $.ajax({
                url: RUN_DOMAIN+'/api2.php?r=1&ac=social-tags&url='+CHECK_DOMAIN,
                dataType: 'json',
                success: function (r) {

                    $(".ck_content").html('')

                    if (r.code == "1") {


                        $.each(r.data, function (index, value) {

                            $("#" + tag).find(".ck_content").append('<div class="sc-ikZqro fPfKZc">' +
                                '<span class="lbl">' + index + '</span>' +
                                '<span class="val">' + value + '</span>\n' +
                                '</div>');

                        });

                    } else {
                        msgError('查询失败');
                        $(".ck_content").html('查询失败');
                    }






                },
                error: function (r) {
                    msgError('查询失败');
                    $(".ck_content").html('查询失败');
                },
                timeout: GGTIME
            });





        });
    })

    load_keydown();
}


function sub_ssl() {
    ////console.log($("#siteRequest"))
    $(function () {
        $("#siteRequest").click(function () {

            if(isValidHost($("#siteHost").val()))
            {
                $("#siteHost").val("https://"+$("#siteHost").val());
            }
            var CHECK_DOMAIN=$("#siteHost").val();
            if(!isValidDomain(CHECK_DOMAIN))
            {
                msgError('链接或者id不正确，请以http或https开头或完整的域名，结尾不包含路径，例如：https://www.baidu.com或www.baidu.com');
                return false;
            }

            $(".ck_content").html('查询中...')

            var tag='rbox';

            $.ajax({
                url: RUN_DOMAIN+'/api2.php?r=1&ac=ssl-check&url='+CHECK_DOMAIN,
                dataType: 'json',
                success: function (r) {

                    $(".ck_content").html('')

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

                    } else {
                        msgError('查询失败');
                        $(".ck_content").html('查询失败');
                    }






                },
                error: function (r) {
                    msgError('查询失败');
                    $(".ck_content").html('查询失败');
                },
                timeout: GGTIME
            });





        });
    })

    load_keydown();
}



function IsURL(str_url){
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re=new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)){
        return (true);
    }else{
        return (false);
    }
}




function sub_shot() {
    ////console.log($("#siteRequest"))
    $(function () {
        $("#siteRequest").click(function () {

            var CHECK_DOMAIN=$("#siteHost").val();
            if(!IsURL(CHECK_DOMAIN))
            {
                msgError('链接不正确');
                return false;
            }

            $(".ck_content").html('查询中...')
            $(".ck_content").html('抱歉，该功能已下架.')

            var tag='rbox';

            /*
            $.ajax({
                //url: 'https://web-check.bejson.com/api.php?r=1&ac=screenshot&url='+CHECK_DOMAIN,
                url: 'https://web-check.bejson.com/shoturl.php?r=1&ac=screenshot&url='+CHECK_DOMAIN,
                dataType: 'json',
                success: function (r) {
                    $(".ck_content").html('')

                    if (r.code == "1") {

                        $("#" + tag).find(".ck_content").append('' +
                            '<div class="sc-ikZqro fPfKZc"' +
                            'style="justify-content:center;"' +
                            '><img src="data:image;base64,' + r.data.img +'"' +
                            '' +
                            'onclick="pop_st_img(this)" style="cursor: pointer;"' +
                            '' +
                            ' /></div>');


                        $("#" + tag).find(".test_re").html('<span class="label label-success">检测成功</span>')
                    } else {
                        msgError('查询失败');
                        $(".ck_content").html('查询失败');
                    }
                },
                error: function (r) {
                    msgError('查询失败');
                    $(".ck_content").html('查询失败');
                },
                timeout: GGTIME
            });
*/




        });
    });


    $("#shotDown").click(function () {
        // 替换这里的 Base64 数据
        const base64ImageData = $(".ck_content").find('img').attr('src');

        // 创建一个Blob对象
        const blob = dataURItoBlob(base64ImageData);

        // 创建一个下载链接
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);

        // 设置下载链接的文件名
        downloadLink.download = $("#siteHost").val().replace("/:\/\//g","_").replace("/\//g","_")+".png";

        // 模拟用户点击下载链接
        downloadLink.click();

        // 将Data URI转换为Blob对象
        function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }

    })


    load_keydown();
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












function load_keydown() {
    $(function () {
        setTimeout(function () {
            //敲回车也可以提交
            $("#siteHost").keydown(function(event){
                console.log(event);
                if (event.which === 13) { // 13 表示回车键
                    $("#siteRequest").click(); // 当按下回车键时执行 post_check() 函数
                }
            });
        },300)
    });
}