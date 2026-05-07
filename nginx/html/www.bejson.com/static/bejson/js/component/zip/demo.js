(function (obj) {
    zip.workerScriptsPath = "/static/bejson/js/component/zip/";
    var requestFileSystem = obj.webkitRequestFileSystem || obj.mozRequestFileSystem || obj.requestFileSystem;
    var fileInput = document.getElementById("fileSpan");
    var unzipProgress = document.createElement("progress");
    var fileList = document.getElementById("file-list");
    var creationMethodInput = document.getElementById("creation-method-input");

    function onerror(message) {
        alert(message);
    }

    function createTempFile(callback) {
        var tmpFilename = "tmp.dat";
        requestFileSystem(TEMPORARY, 4 * 1024 * 1024 * 1024, function (filesystem) {
            function create() {
                filesystem.root.getFile(tmpFilename, {
                    create: true
                }, function (zipFile) {
                    callback(zipFile);
                });
            }

            filesystem.root.getFile(tmpFilename, null, function (entry) {
                entry.remove(create, create);
            }, create);
        });
    }

    var model = (function () {


        return {
            getEntries: function (file, onend) {
                zip.createReader(new zip.BlobReader(file), function (zipReader) {
                    zipReader.getEntries(onend);
                }, onerror);
            },
            getEntryFile: function (entry, creationMethod, onend, onprogress) {
                var writer, zipFileEntry;

                function getData() {
                    entry.getData(writer, function (blob) {
                        var blobURL = creationMethod == "Blob" ? URL.createObjectURL(blob) : zipFileEntry.toURL();
                        onend(blobURL);
                    }, onprogress);
                }

                if (creationMethod == "Blob") {
                    writer = new zip.BlobWriter();
                    getData();
                } else {
                    createTempFile(function (fileEntry) {
                        zipFileEntry = fileEntry;
                        writer = new zip.FileWriter(zipFileEntry);
                        getData();
                    });
                }
            }
        };
    })();

    function ozip(fs) {
        model.getEntries(fs[0], function (entries) {
            $("#contentt").val('');
            fileList.innerHTML = "";
            fileName = fs[0].name + ".txt";
            var textareaValue = '';
            entries.forEach(function (entry) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.textContent = entry.filename;
                a.href = "#";
                a.addEventListener("click", function (event) {
                    if (!a.download) {
                        download(entry, li, a);
                        event.preventDefault();
                        return false;
                    }
                }, false);
                li.appendChild(a);
                textareaValue = textareaValue + entry.filename + "\n";
                fileList.appendChild(li);
            });
            $("#contentt").val(textareaValue);
        });

    }

    function download(entry, li, a) {
        model.getEntryFile(entry, creationMethodInput.value, function (blobURL) {
            var clickEvent = document.createEvent("MouseEvent");
            if (unzipProgress.parentNode)
                unzipProgress.parentNode.removeChild(unzipProgress);
            unzipProgress.value = 0;
            unzipProgress.max = 0;
            clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.href = blobURL;
            a.download = entry.filename;
            a.dispatchEvent(clickEvent);
        }, function (current, total) {
            unzipProgress.value = current;
            unzipProgress.max = total;
            li.appendChild(unzipProgress);
        });
    }

    $(function () {
        $('#uploaderZip').uploader({
            autoUpload: false,
            url: '',
            filters: {
                mime_types: [{title: '图片', extensions: 'rar,zip,7z'}],
                max_file_size: '10gb',
                prevent_duplicates: true
            },
            limitFilesCount: 1,
            multi_selection: false,
            fileTemplate: '<div class="file">' +
                '<div class="file-progress-bar"></div>' +
                '<div class="file-wrapper">' +
                '<div class="file-icon"><i class="icon icon-file-o"></i></div>' +
                '<div class="content"><div class="file-name"></div><div class="file-size small text-muted">0KB</div></div>' +
                '<div class="actions">' +
                '<button type="button" data-toggle="tooltip" title="Remove" class="btn btn-link btn-delete-file"><i class="icon icon-trash text-danger"></i>' +
                '</button></div></div></div>',
            rename: false
        });
        var uploaderZip = $('#uploaderZip').data('zui.uploader');
        $('#uploaderZip').uploader().on('onFilesAdded', function () {
            ozip([uploaderZip.getFiles()[0].getNative()])
        });
        $('#uploaderZip').uploader().on('onFilesRemoved', function () {
            $('.uploader-btn-browse').removeClass('disabled')
        });
        $('#removeZipFile').click(function () {
            if (uploaderZip.getFiles()[0]) {
                uploaderZip.removeFile(uploaderZip.getFiles()[0])
            }
        });
        $('#removeZipFile').click(function(){
            $('#file-list').html('');
            if (uploaderZip.getFiles()[0]) {
                uploaderZip.removeFile(uploaderZip.getFiles()[0])
            }
        });
    });

})(this);
var fileName = 'bejson_zip.txt';

function saveTxt() {
    var ua = navigator.userAgent.toLowerCase();
    $fieName = $("#contentt").val();
    if (ua.match(/msie/)) {
        var newwin = window.open('', '_blank', 'top=10000');
        newwin.document.open('text/html', 'replace');
        newwin.document.write($fieName);
        newwin.document.execCommand('saveas', '', fileName);
        newwin.close();
    } else {
        var a = document.createElement("a");
        var code = $fieName;
        a.href = "data:text/html;charset=utf8," + code;
        a.download = fileName;
        a.click();
    }
}
$('#zipSaveFile').click(function(){
    if (!$("#contentt").val()) {
        msgError('暂无要保存的数据');
        return
    }
    saveTxt()
});
