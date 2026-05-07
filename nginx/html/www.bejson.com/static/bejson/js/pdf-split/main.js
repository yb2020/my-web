
import "https://cdn.jsdelivr.net/npm/pdfjs-lib@0.0.149/build/pdf.min.js"
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-lib@0.0.149/build/pdf.worker.min.js"
var img_list = [];

var type=$('#changetype option:selected').val();
var qualityInput = document.getElementById("quality-input");
var quality = parseFloat(qualityInput.value);
$("#quality-input").on('input propertychange',()=>{
    qualityInput = document.getElementById("quality-input");
    quality = parseFloat(qualityInput.value);
    var quality_percent=quality*100;
    $("#yasuolv").html("压缩率"+quality_percent+"%")

})
$('#changetype').change(function(){
    type=$('#changetype option:selected').val();
    if(type=="jpg"){
        $("#show_range").show();
        $("#show_yasuolv").show();
    }else{
        $("#show_range").hide();
        $("#show_yasuolv").hide();
    }

})

$('#uploaderImage').uploader({
    autoUpload: false,
    url: '',
    previewImageSize: {width: 3500, height: 3500},
    multi_selection: false,
    fileTemplate: '<div class="file"><div class="file-progress-bar"></div><div class="file-wrapper"><div class="file-icon"><i class="icon icon-file-o"></i></div><div class="content"><div class="file-name"></div><div class="file-size small text-muted">0KB</div><div class="file-page small text-muted" style="float:right;margin-top: 2px;margin-right: 5px"></div> </div><div class="actions" style="width:50px"></button><button type="button" data-toggle="tooltip" title="移除" class="btn btn-link btn-delete-file"><i class="icon icon-trash text-danger"></i></button></div></div></div>',
    filters: {
        mime_types: [{title: 'pdf', extensions: 'pdf'}]
    },
    lang:"zh_cn",
    autoResetFails: true,
    rename: false,
    renameByClick: false,
    devareActionOnDone: true,

    onFilesAdded: function(files) {
        // $('#img2base54Area').html('');
        $("#showWaitMessage").show();
        var uploader = $('#uploaderImage').data('zui.uploader');
        if (!uploader.getFiles()[0]) {
            msgError('请上传文件');
            return;
        }
        const fileObj=uploader.getFiles()[uploader.getFiles().length-1];
        const file = fileObj.getNative();


        const fileName=file.name.replace(/.[^.]+$/, "");
        var reader = new FileReader();
        let counter = 0;
        reader.onload = function(event) {
            var pdfData = new Uint8Array(event.target.result);

            // 加载PDF文件
            pdfjsLib.getDocument(pdfData).promise.then(function (pdf) {
                // var zip = new JSZip();
                const totalPage = pdf.numPages;
                var container = document.getElementById('pdfPages');
                const isHDImage = $('#isHDImage').prop('checked');
                $("#file-"+fileObj.id+" .file-page").html('共'+totalPage+'页');

                if(totalPage>=30){
                    $("#showWaitMessage").hide();
                    msgError(fileName+'.pdf 总页数超过30，暂不支持处理');
                    return false;
                }
                for (var i = 1; i <= totalPage; i++) {
                    pdf.getPage(i).then(function (page) {

                        var scale = 4;
                        // var outputScale = window.devicePixelRatio || 1;
                        var outputScale = 1;
                        var viewport = page.getViewport({ scale: scale });
                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height * outputScale;
                        canvas.width = viewport.width * outputScale;
                        canvas.style.width = Math.floor(viewport.width) + "px";
                        canvas.style.height = Math.floor(viewport.height) + "px";

                        var transform = outputScale !== 1
                            ? [outputScale, 0, 0, outputScale, 0, 0]
                            : null;

                        var renderContext = {
                            canvasContext: context,
                            transform: transform,
                            viewport: viewport
                        };

                        page.render(renderContext).promise.then(function () {

                            var imageDataUrl = canvas.toDataURL('image/png');
                            // 获取要缩放的图片
                            var img = new Image();
                            img.src = imageDataUrl;
                            // 等待图片加载完成
                            img.onload = function() {

                                var canvas = document.createElement('canvas');
                                var pica = window.pica();
                                if(isHDImage){
                                    var targetWidth = Math.floor(img.width / (scale/2));
                                    var targetHeight = Math.floor(img.height / (scale/2));
                                }else{
                                    var targetWidth = Math.floor(img.width / scale);
                                    var targetHeight = Math.floor(img.height / scale);
                                }

                                canvas.width = targetWidth;
                                canvas.height = targetHeight;
                                pica.resize(img, canvas, {
                                    unsharpAmount: 80,
                                    unsharpRadius: 0.6,
                                    unsharpThreshold: 2
                                }).then(function() {
                                    // 将canvas转换成DataURL格式
                                    if(type=="jpg"){
                                        var dataURL = canvas.toDataURL('image/jpeg',quality);
                                        counter++;
                                        if(totalPage==1){
                                            var newFileName=fileName+'.jpg';
                                        }else{
                                            var newFileName=fileName+'-'+counter+'.jpg';
                                        }

                                    }else{
                                        var dataURL = canvas.toDataURL('image/png');
                                        counter++;
                                        if(totalPage==1){
                                            var newFileName=fileName+'.png';
                                        }else{
                                            var newFileName=fileName+'-'+counter+'.png';
                                        }
                                    }

                                    var li = document.createElement('li');
                                    li.setAttribute('style', 'position: relative;top:0;left:0;display:inline-block;vertical-align: top;')
                                    var imgurl = document.createElement('img');
                                    var div = document.createElement('div');

                                    img_list.push({
                                        file_name: newFileName,
                                        url: dataURL
                                    });

                                    var html = ' <div style="display: flex; justify-content: space-between;width:100%;margin-top:10px;"><p style="width:80%;margin-left:5px;word-wrap: break-word">'+newFileName+'</p> <div style="width:15%;margin-right:5px"><a class="btn btn-primary btn-sm" href="'+dataURL+'" download="'+newFileName+'" title="'+newFileName+'"  type="button" >下载</a></div></div>          \n';

                                    div.innerHTML = html;
                                    // var div1 = document.createElement('div');
                                    // var html1 = ' <div style="border-bottom:1px solid #ddd; text-align: center;vertical-align: middle;width:100%;height:150px;line-height:150px"><p>暂不支持预览</p></div>         ';
                                    // div1.innerHTML = html1;
                                    // li.appendChild(div1);
                                    imgurl.src = dataURL;
                                    // imgurl.title="宽："+img.width+",高："+img.height;
                                    li.appendChild(imgurl);
                                    li.appendChild(div);

                                    $('#img2base54Area').append(li);
                                    if(counter==totalPage){
                                        $("#showWaitMessage").hide();
                                        $('#downloadGifZip').removeClass('disabled')
                                    }
                                });




                            }



                        });
                    });
                }


            });
        }
        reader.readAsArrayBuffer(file);



    }
});
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
var FunLib = {
    // 图片打包下载
    download: function (images, canvas) {
        FunLib.packageImages(images, canvas);
    },
    // 打包压缩图片
    packageImages: function (imgs, canvas) {
        var imgBase64 = [];
        var zip = new JSZip();
        var myDate = new Date();
        var year = myDate.getFullYear().toString();
        var month = (myDate.getMonth() + 1).toString().padStart(2, '0');
        var day = myDate.getDate().toString().padStart(2, '0');

        var hours = myDate.getHours().toString().padStart(2, '0');
        var minutes = myDate.getMinutes().toString().padStart(2, '0');
        var seconds = myDate.getSeconds().toString().padStart(2, '0');

        var packagename='Images_'+year+month+day+'_'+hours+minutes+'_'+seconds+'.zip';
        var img_directory = zip.folder('Images_'+year+month+day+'_'+hours+minutes+'_'+seconds);
        for (var i = 0; i < imgs.length; i++) {
            var src = imgs[i].url;
            imgBase64.push(src);
            if (imgs.length === imgBase64.length) {
                for (var y = 0; y < imgBase64.length; y++) {

                    img_directory.file(imgs[y].file_name, imgBase64[y].replace(/^data:image\/(webp|png|jpg|jpeg);base64,/,""), { base64: true });
                }

                zip.generateAsync({type: 'blob'}).then(function (content) {
                    saveAs(content, packagename);
                });
            }
            $('#downloadGifZip').button('reset');
        }

    },

};

function getDownloadFilename(filename, mimeType) {

    var ext = ""
    switch (mimeType) {
        case "image/png": ext = ".png"; break;
        case "image/jpeg": ext = ".jpg"; break;
        case "image/tiff": ext = ".tif"; break;
        case "image/webp": ext = ".webp"; break;
        case "image/gif": ext = ".png"; break;
        case "image/bmp": ext = ".png"; break;
        case "image/svg+xml": ext = ".png"; break;
        case "image/avif": ext = ".png";break;
        case "image/vnd.microsoft.icon": ext = ".ico"; break;
        default: return filename;
    }
    if (ext) {
        return filename.replace(/.[^.]+$/, "") + ext;
    } else {
        return filename;
    }
}