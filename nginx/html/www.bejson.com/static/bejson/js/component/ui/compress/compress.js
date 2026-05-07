$('#uploaderCompress').uploader({

    autoUpload: false,

    url: '' ,

    previewImageSize: {width: 350, height: 350},

    fileTemplate: '<div></div>',

    multi_selection: false,

    filters: {

        mime_types: [{title: '图片', extensions: 'jpg,png,gif,jpeg,bmp'}],

        max_file_size: '300mb'

    },
});





var uploaderCompress = $('#uploaderCompress').data('zui.uploader');

$('#uploaderCompress').uploader().on('onFilesAdded', function (files) {

    if (uploaderCompress.getFiles().length > 1) {

        uploaderCompress.removeFile(uploaderCompress.getFiles()[0]);

        $('#range').prop('value','0')

    }

    var file = uploaderCompress.getFiles()[0].getNative();

    $('#compressBtn').button('loading');

    $("#range").off('change');

    lrzimg(file);

    $("#range").on('change',function(){

        $("#rv").text($(this).val()+"%");

        lrzimg(file);

    })

});



$("#range").on('change',function(){

    $("#rv").text($(this).val()+"%");

});



function toFixed2(num) {

    return parseFloat(+num.toFixed(2));

}



function lrzimg(file) {

    var q = 1 - $('#range').val() / 100;

    lrz(file, {

        quality: q,

    }).then(function (rst) {

        var img = new Image(),

            div = document.createElement('div'),

            p = document.createElement('p'),

            p2 = document.createElement('p'),

            p3 = document.createElement('p'),

            a = document.createElement('a'),

            sourceSize = toFixed2(file.size / 1024),

            resultSize = toFixed2(rst.fileLen / 1024),

            scale = parseInt(100 - (resultSize / sourceSize * 100));

        p.innerHTML = '源文件：<span class="text-danger">' +

            sourceSize + 'KB' +

            '</span>';

        p2.innerHTML = '压缩后传输大小：<span class="text-success">' +

            resultSize + 'KB (省' + scale + '%)' +

            '</span> ';

        p3.innerHTML = '默认压缩率为60%，请自行调整标尺修改图片压缩率';

        p3.style.border = 'none';

        p3.style.marginLeft = '20px';

        a.className = 'btn';

        a.innerHTML = '下载压缩图片';

        $('body').off('click', '#info1 a');

        $('body').on('click', '#info1 a',function(){

            base64ToBolbAndDownload(rst.base64,file.name)

        });

        div.appendChild(img);

        $('#info1').html('');

        $('#info1').append(p).append(p2).append(a).append(p3);

        $('#zigeer').show();

        img.onload = function () {

            $('#content').html('');

            document.querySelector('#content').appendChild(div);

        };



        img.src = rst.base64;

        $('#compressBtn').button('reset');

        $('#content').show();

        return rst;

    });

};



/**

 *

 * @param obj

 * @returns {String}

 * @example

 *

 */

String.prototype.render = function (obj) {

    var str = this, reg;



    Object.keys(obj).forEach(function (v) {

        reg = new RegExp('\\!\\{' + v + '\\}', 'g');

        str = str.replace(reg, obj[v]);

    });



    return str;

};



/**

 *

 * @param element

 * @param event

 * @returns {boolean}

 */

function fireEvent(element, event) {

    var evt;



    if (document.createEventObject) {

        // IE浏览器支持fireEvent方法

        evt = document.createEventObject();

        return element.fireEvent('on' + event, evt);

    } else {

        // 其他标准浏览器使用dispatchEvent方法

        evt = document.createEvent('HTMLEvents');

        // initEvent接受3个参数：

        // 事件类型，是否冒泡，是否阻止浏览器的默认行为

        evt.initEvent(event, true, true);

        return !element.dispatchEvent(evt);

    }

}
