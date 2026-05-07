$('#uploaderGif2Frame').uploader({
    autoUpload: false,
    url: '//'+document.domain,
    previewImageSize: {width: 3500, height: 3500},
    multi_selection: false,
    fivaremplate: '<div class="file"><div class="file-progress-bar"></div><div class="file-wrapper"><div class="file-icon"><i class="icon icon-file-o"></i></div><div class="content"><div class="file-name"></div><div class="file-size small text-muted">0KB</div></div><div class="actions"><div class="file-status" data-toggle="tooltip"><i class="icon"></i> <span class="text"></span></div><button type="button" data-toggle="tooltip" title="Remove" class="btn btn-link btn-devare-file"><i class="icon icon-trash text-danger"></i></button></div></div></div>',
    filters: {
        mime_types: [{title: '图片', extensions: 'gif'}],
        max_file_size: '10mb',
        prevent_duplicates: true
    },
    autoResetFails: true,
    rename: false,
    renameByClick: false,
    limitFilesCount: 1,
    devareActionOnDone: true,
    onFilesAdded: function(files) {
        var uploader = $('#uploaderGif2Frame').data('zui.uploader');
        if (!uploader.getFiles()[0]) {
            msgError('请上传gif文件');
            return;
        }
        $('#gif2FrameBtn').button('loading');
        $('#gif2frameStart').button('loading');
        var file = uploader.getFiles()[0].getNative();
        var id = '#file-' + uploader.getFiles()[0].id;
        $(id).attr('data-status', 'uploading');
        $(id + ' .actions .file-status').attr('data-original-title', '正在上传');
        // 判断是gif格式则交给this.pre_load_gif函数处理
        if (/(image\/gif)/.test(file.type)) {
            pre_load_gif(file, id);
            return;
        }
    }

});

function pre_upload() {
    $('#gif2frameStart').click(function () {
        var uploader = $('#uploaderGif2Frame').data('zui.uploader');
        if (!uploader.getFiles()[0]) {
            msgError('请上传gif文件');
            return;
        }
        $('#gif2FrameBtn').button('loading');
        $('#gif2frameStart').button('loading');
        var file = uploader.getFiles()[0].getNative();
        var id = '#file-' + uploader.getFiles()[0].id;
        $(id).attr('data-status', 'uploading');
        $(id + ' .actions .file-status').attr('data-original-title', '正在上传');
        // 判断是gif格式则交给this.pre_load_gif函数处理
        if (/(image\/gif)/.test(file.type)) {
            pre_load_gif(file, id);
            return;
        }
    });
}

function dataURLtoFile(dataurl, filename) {
    if (myBrowser() === 'IE' || myBrowser() === 'Edge') {
        return  {url:dataurl,name:filename}
    }
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

// 将canvas转换成file对象
function convertCanvasToImage(canvas, filename) {
    return dataURLtoFile(canvas.toDataURL('image/png'), filename);
}

var img_list = [];

var rub;
function pre_load_gif(gif_source, id) {
    var gifImg = document.getElementById('imgStaticPares');
    if (!gifImg) {
        $('.jsgif').remove();
        gifImg = document.createElement('img');
        gifImg.id = 'imgStaticPares';
        $('.gif-frame-list').append(gifImg);
    }
    // gif库需要img标签配置下面两个属性
    gifImg.setAttribute('rel:animated_src', URL.createObjectURL(gif_source));
    gifImg.setAttribute('rel:auto_play', '0');

    // 新建gif实例
    rub = new SuperGif({gif: gifImg, id: id});
    rub.load(function () {
        img_list = [];
        for (var i = 1; i <= rub.get_length(); i++) {
            // 遍历gif实例的每一帧
            rub.move_to(i);
            // 将每一帧的canvas转换成file对象
            var cur_file = convertCanvasToImage(rub.get_canvas(), gif_source.name.replace('.gif', '') + '-' + i);
            if (myBrowser() === 'IE' || myBrowser() === 'Edge') {
                img_list.push({
                    file_name: cur_file.name,
                    url: cur_file.url
                });
            } else {
                img_list.push({
                    file_name: cur_file.name,
                    url: URL.createObjectURL(cur_file),
                    file: cur_file
                });
            }
        }
        var img = '';
        for (var i = 0; i < img_list.length; i++) {
            img += '<div class="gif-img-box"><img src=\'' + img_list[i].url + '\'></div>';
        }
        $('.staticImg').html('');
        $('.staticImg').append(img);
        $(id).attr('data-status', 'sucess');
        $(id + ' .actions .file-status').attr('data-original-title', '成功');
        $(id + ' .actions .file-status .text').html('成功');
        $('#gif2FrameBtn').button('reset');
        $('#gif2frameStart').button('reset');
        $('#downloadGifZip').removeClass('disabled')
    });
}

var FunLib = {
    // 图片打包下载
    download: function (images, canvas) {
        FunLib.packageImages(images, canvas);
    },
    // 打包压缩图片
    packageImages: function (imgs, canvas) {
        var imgBase64 = [];
        var imageSuffix = []; // 图片后缀
        var zip = new JSZip();
        var myDate = new Date();

        var year = myDate.getFullYear().toString();
        var month = (myDate.getMonth() + 1).toString().padStart(2, '0');
        var day = myDate.getDate().toString().padStart(2, '0');

        var hours = myDate.getHours().toString().padStart(2, '0');
        var minutes = myDate.getMinutes().toString().padStart(2, '0');
        var seconds = myDate.getSeconds().toString().padStart(2, '0');

        var packagename='Images_'+year+month+day+'_'+hours+minutes+'_'+seconds+'.zip';
        var img = zip.folder('Images_'+year+month+day+'_'+hours+minutes+'_'+seconds);


        if (canvas) {
            for (var i = 0; i < imgs.length; i++) {
                rub.move_to(i);
                var suffix = '.' + imgs[i].file.type.slice(imgs[i].file.type.indexOf('/') + 1);
                imageSuffix.push(suffix);
                imgBase64.push(rub.get_canvas().toDataURL().substring(22));
                if (imgs.length === imgBase64.length) {
                    for (var i = 0; i < imgs.length; i++) {
                        img.file(imgs[i].file_name + imageSuffix[i], imgBase64[i], {base64: true});
                    }
                    zip.generateAsync({type: 'blob'}).then(function (content) {
                        saveAs(content, packagename);
                    });
                }
            }
            $('#downloadGifZip').button('reset');
        } else {
            for (var i = 0; i < imgs.length; i++) {
                var src = imgs[i].url;
                var suffix = src.substring(src.lastIndexOf('.'));
                imageSuffix.push(suffix);
                FunLib.getBase64(imgs[i].url).then(function (base64) {
                    imgBase64.push(base64.substring(22));
                    if (imgs.length === imgBase64.length) {
                        for (var i = 0; i < imgs.length; i++) {
                            img.file(imgs[i].name + imageSuffix[i], imgBase64[i], {base64: true});
                        }
                        zip.generateAsync({type: 'blob'}).then(function (content) {
                            saveAs(content, packagename);
                        });
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        }
    },
    // 传入图片路径，返回base64
    getBase64: function (img) {
        var image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = img;
        var deferred = $.Deferred();
        if (img) {
            image.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                var dataURL = canvas.toDataURL();
                deferred.resolve(dataURL);
            };
            return deferred.promise();
        }
    },
    blobToBase64: function (blob_data, callback) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(e.target.result)
        };
        reader.readAsDataURL(blob_data);
    }
};
pre_upload();
$('#downloadGifZip').click(function () {
    $(this).button('loading');
    if (myBrowser() === 'IE' || myBrowser() === 'Edge') {
        msgError('IE和Edge浏览器不支持打包下载，请更换浏览器')
    } else {
        setTimeout(function(){
            FunLib.download(img_list, true);
        }, 50)
    }
});
    