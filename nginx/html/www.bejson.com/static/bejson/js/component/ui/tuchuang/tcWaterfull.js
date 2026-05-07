var url = 'https://api.uomg.com/api/image.jd';
$('#uploaderTC').uploader({
    autoUpload: false,
    url: 'https://api.uomg.com/api/image.jd',
    previewImageSize: {width: 300, height: 300},
    filters: {
        mime_types: [{title: '图片', extensions: 'jpg,png,gif,webp'}],
        max_file_size: '10mb',
        prevent_duplicates: true
    },
    multi_selection: true,
    rename: false,
    fileTemplate: '<div class="file"><div class="file-progress-bar"></div><div class="file-wrapper"><div class="file-icon"><i class="icon icon-file-o"></i></div><div class="content"><div class="file-name"></div><div class="file-size small text-muted">0KB</div></div><div class="actions"><div class="file-status" data-toggle="tooltip"><i class="icon"></i> <span class="text"></span></div><a data-toggle="tooltip" class="btn btn-link btn-download-file" target="_blank"><i class="icon icon-download-alt"></i></a><button type="button" data-toggle="tooltip" class="btn btn-link btn-reset-file" title="Repeat"><i class="icon icon-repeat"></i></button><button type="button" data-toggle="tooltip" title="Remove" class="btn btn-link btn-delete-file"><i class="icon icon-trash text-danger"></i></button></div></div></div>'
});
var uploaderTC = $('#uploaderTC').data('zui.uploader');
$('#uploaderTC').uploader().on('onFilesAdded', function (filess) {
    $('.uploader-btn-browse').button('loading');
    var files = uploaderTC.getFiles();
    var filesNative = [];
    $(files).each(function (index, item) {
        filesNative.push(item.getNative());
    });
    fileUploads(filesNative, files);
});
$('#uploaderTC').uploader().on('onFilesRemoved', function (filess) {
    sum = sum -1
});
var sum = 0;

function fileUploads(file, file2) {
    if (!file[sum]) {
        $('.uploader-btn-browse').button('reset');
        $('#TCbox').removeClass('loading');
        return;
    }
    var id = '#file-' + file2[sum].id;
    var imageData = new FormData();
    imageData.append('file', 'multipart');
    imageData.append('Filedata', file[sum]);
    $('#TCbox').addClass('loading');
    $.ajax({
        url: url,
        type: 'POST',
        data: imageData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        // 图片上传成功
        success: function (result) {
            sum = sum + 1;
            if (result.code === 1 || result.code === '1') {
                $(id).attr('data-status', 'sucess');
                $(id + ' .actions .file-status').attr('data-original-title', '成功');
                $(id + ' .actions .file-status .text').html('成功');
                var img = new Image();
                img.src = result.imgurl;
                img.onload = function () {
                    var html = '<li>\n' +
                        '            <img src="' + result.imgurl + '"  referrerPolicy="no-referrer" >\n' +
                        '            <div class="textarea">\n' +
                        '                <textarea>' + result.imgurl + '</textarea>\n' +
                        '            </div>\n' +
                        '            <button class="btn btn-primary btn-sm" type="button">复制图片链接</button>\n' +
                        '        </li>';
                    $('#tuchuangArea').append(html);
                    tuchuangReset();
                    fileUploads(file, file2);
                };
                img.onerror = function () {
                    var html = '<li>\n' +
                        '            <img src="' + result.imgurl + '"  referrerPolicy="no-referrer" >\n' +
                        '            <div class="textarea">\n' +
                        '                <textarea>' + result.imgurl + '</textarea>\n' +
                        '            </div>\n' +
                        '            <button class="btn btn-primary btn-sm" type="button">复制图片链接</button>\n' +
                        '        </li>';
                    $('#tuchuangArea').append(html);
                    tuchuangReset();
                    fileUploads(file, file2);
                }
            } else {
                $(id).attr('data-status', 'failed');
                $(id + ' .actions .file-status').attr('data-original-title', '失败');
                $(id + ' .actions .file-status .text').html('失败');
                fileUploads(file, file2);
            }
        },
        // 图片上传失败
        error: function () {
            sum = sum + 1;
            $(id).attr('data-status', 'failed');
            $(id + ' .actions .file-status').attr('data-original-title', '失败');
            $(id + ' .actions .file-status .text').html('失败');
            fileUploads(file, file2);
        }
    });
}

function fileUpload(file, id) {
    var imageData = new FormData();
    imageData.append('file', 'multipart');
    imageData.append('Filedata', file);
    $('#TCbox').addClass('loading');
    $.ajax({
        url: url,
        type: 'POST',
        data: imageData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        // 图片上传成功
        success: function (result) {
            if (result.code === 1 || result.code === '1') {
                $(id).attr('data-status', 'sucess');
                $(id + ' .actions .file-status').attr('data-original-title', '成功');
                $(id + ' .actions .file-status .text').html('成功');
                var img = new Image();
                img.src = result.imgurl;
                img.onload = function () {
                    var html = '<li>\n' +
                        '            <img src="' + result.imgurl + '" referrerPolicy="no-referrer">\n' +
                        '            <div class="textarea">\n' +
                        '                <textarea>' + result.imgurl + '</textarea>\n' +
                        '            </div>\n' +
                        '            <button class="btn btn-primary btn-sm" type="button">复制图片链接</button>\n' +
                        '        </li>';
                    $('#tuchuangArea').append(html);
                    tuchuangReset();
                };
            } else {
                $(id).attr('data-status', 'failed');
                $(id + ' .actions .file-status').attr('data-original-title', '失败');
                $(id + ' .actions .file-status .text').html('失败');
            }
            $('.uploader-btn-browse').button('reset');
            $('#TCbox').removeClass('loading');
        },
        // 图片上传失败
        error: function () {
            $(id).attr('data-status', 'failed');
            $(id + ' .actions .file-status').attr('data-original-title', '失败');
            $(id + ' .actions .file-status .text').html('失败');
            $('.uploader-btn-browse').button('reset');
            $('#TCbox').removeClass('loading');
        }
    });
}

//重新上传
$('#uploaderTC').on('click', '.btn-reset-file', function () {
    var id = $(this).parents('.file').attr('id');
    var $btn = $('.uploader-btn-browse');
    $btn.button('loading');
    $(uploaderTC.getFiles()).each(function (index, item) {
        if ('file-' + item.id === id) {
            fileUpload(item.getNative(), '#' + id);
        }
    });
});

//瀑布流
function tuchuangReset() {
    var colHeightArry = [];
    var imgWidth = $('.waterfall li').outerWidth(true);   //单张图片的宽度
    colCount = parseInt($('.waterfall').width() / imgWidth);
    for (var i = 0; i < colCount; i++) {
        colHeightArry[i] = 0;
    }
    $('.waterfall li').each(function () {
        var minValue = colHeightArry[0];
        var minIndex = 0;
        for (var i = 0; i < colCount; i++) {
            if (colHeightArry[i] < minValue) {
                minValue = colHeightArry[i];
                minIndex = i;
            }
        }

        $(this).css({
            left: minIndex * imgWidth,
            top: minValue
        });
        colHeightArry[minIndex] += $(this).outerHeight(true);
    });
    var boxHeight = colHeightArry[0];
    $(colHeightArry).each(function (index, item) {
        if (item > boxHeight) {
            boxHeight = item;
        }
    });
    $('#tuchuangArea').height(boxHeight);
}

//复制
new ClipboardJS('#tuchuangArea button', {
    text: function (trigger) {
        var value = $(trigger).parent().find('textarea').eq(0).val();
        if (value) {
            msgSuccess('复制成功');
            return value;
        } else {
            return false;
        }
    }
});


var urlIndex = 0;

function urlUpload(urls) {
    if (!urls[urlIndex]) {
        urlIndex = 0;
        $('body').removeClass('loading');
        return;
    }
    $('body').addClass('loading');
    $.getJSON(url, {
        imgurl:urls[urlIndex]
    }, function (result) {
        if (result.code == 1) {
            var img = new Image();
            img.src = result.imgurl;
            img.onload = function () {
                var html = '<li>\n' +
                    '            <img src="' + result.imgurl + '" referrerPolicy="no-referrer">\n' +
                    '            <div class="textarea">\n' +
                    '                <textarea>' + result.imgurl+ '</textarea>\n' +
                    '            </div>\n' +
                    '            <button class="btn btn-primary btn-sm" type="button">复制图片链接</button>\n' +
                    '        </li>';
                $('#tuchuangArea').append(html);
                tuchuangReset();
                urlIndex = urlIndex + 1;
                urlUpload(urls);
            };
        } else {
            msgError(urls[urlIndex] + '上传失败');
            urlIndex = urlIndex + 1;
            urlUpload(urls);
        }
    }, function(){
        msgError(urls[urlIndex] + '上传失败');
        urlIndex = urlIndex + 1;
        urlUpload(urls);
    });
}

$('#TCselectWebUrl').click(function () {
    confirmArea({
        title: '请在下方输入远程图片地址~每行一个~',
        placeholder: '请在下方输入远程图片地址~每行一个~',
        success: function (val) {
            urlUpload(val.split('\n'));
            $('#confirmAreaModal').modal('hide', 'fit');
        }
    });
});