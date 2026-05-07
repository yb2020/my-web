// if (window.top.location.host!="www.bejson.com")
// {
// window.top.location="http://www.bejson.com/";
// }
(function (n) {
    'use strict';
    var t, i;
    if (n.URL = n.URL || n.webkitURL, n.Blob && n.URL) try {
        new Blob;
        return;
    } catch (r) {
    }
    t = n.BlobBuilder || n.WebKitBlobBuilder || n.MozBlobBuilder || function (n) {
        var s = function (n) {
                return Object.prototype.toString.call(n).match(/^\[object\s(.*)\]$/)[1];
            }, h = function () {
                this.data = [];
            }, t = function (n, t, i) {
                this.data = n;
                this.size = n.length;
                this.type = t;
                this.encoding = i;
            }, u = h.prototype, r = t.prototype, c = n.FileReaderSync, l = function (n) {
                this.code = this[this.name = n];
            },
            a = 'NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR'.split(' '),
            f = a.length, i = n.URL || n.webkitURL || n, v = i.createObjectURL, y = i.revokeObjectURL, e = i,
            p = n.btoa, w = n.atob, b = n.ArrayBuffer, o = n.Uint8Array, k = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
        for (t.fake = r.fake = !0; f--;) l.prototype[a[f]] = f + 1;
        return i.createObjectURL || (e = n.URL = function (n) {
            var t = document.createElementNS('http://www.w3.org/1999/xhtml', 'a'), i;
            return t.href = n, 'origin' in t || (t.protocol.toLowerCase() === 'data:' ? t.origin = null : (i = n.match(k), t.origin = i && i[1])), t;
        }), e.createObjectURL = function (n) {
            var u = n.type, r;
            return (u === null && (u = 'application/octet-stream'), n instanceof t) ? (r = 'data:' + u, n.encoding === 'base64') ? r + ';base64,' + n.data : n.encoding === 'URI' ? r + ',' + decodeURIComponent(n.data) : p ? r + ';base64,' + p(n.data) : r + ',' + encodeURIComponent(n.data) : v ? v.call(i, n) : void 0;
        }, e.revokeObjectURL = function (n) {
            n.substring(0, 5) !== 'data:' && y && y.call(i, n);
        }, u.append = function (n) {
            var i = this.data, e;
            if (o && (n instanceof b || n instanceof o)) {
                for (var u = '', f = new o(n), r = 0, h = f.length; r < h; r++) u += String.fromCharCode(f[r]);
                i.push(u);
            } else if (s(n) === 'Blob' || s(n) === 'File') if (c) e = new c, i.push(e.readAsBinaryString(n)); else throw new l('NOT_READABLE_ERR'); else n instanceof t ? n.encoding === 'base64' && w ? i.push(w(n.data)) : n.encoding === 'URI' ? i.push(decodeURIComponent(n.data)) : n.encoding === 'raw' && i.push(n.data) : (typeof n != 'string' && (n += ''), i.push(unescape(encodeURIComponent(n))));
        }, u.getBlob = function (n) {
            return arguments.length || (n = null), new t(this.data.join(''), n, 'raw');
        }, u.toString = function () {
            return '[object BlobBuilder]';
        }, r.slice = function (n, i, r) {
            var u = arguments.length;
            return u < 3 && (r = null), new t(this.data.slice(n, u > 1 ? i : this.data.length), r, this.encoding);
        }, r.toString = function () {
            return '[object Blob]';
        }, r.close = function () {
            this.size = 0;
            delete this.data;
        }, h;
    }(n);
    n.Blob = function (n, i) {
        var o = i ? i.type || '' : '', f = new t, r, e, u;
        if (n) for (r = 0, e = n.length; r < e; r++) Uint8Array && n[r] instanceof Uint8Array ? f.append(n[r].buffer) : f.append(n[r]);
        return u = f.getBlob(o), !u.slice && u.webkitSlice && (u.slice = u.webkitSlice), u;
    };
    i = Object.getPrototypeOf || function (n) {
        return n.__proto__;
    };
    n.Blob.prototype = i(new n.Blob);
})(typeof self != 'undefined' && self || typeof window != 'undefined' && window || this.content || this);
var saveAs = saveAs ||
    function (n) {
        'use strict';
        if (typeof n != 'undefined' && (typeof navigator == 'undefined' || !/MSIE [1-9]\./.test(navigator.userAgent))) {
            var s = n.document,
                r = function () {
                    return n.URL || n.webkitURL || n;
                },
                i = s.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
                h = 'download' in i,
                c = function (n) {
                    var t = new MouseEvent('click');
                    n.dispatchEvent(t);
                },
                l = /constructor/i.test(n.HTMLElement) || n.safari,
                u = /CriOS\/[\d]+/.test(navigator.userAgent),
                a = function (t) {
                    (n.setImmediate || n.setTimeout)(function () {
                            throw t;
                        },
                        0);
                },
                v = 'application/octet-stream',
                y = 4e4,
                f = function (n) {
                    var t = function () {
                        typeof n == 'string' ? r().revokeObjectURL(n) : n.remove();
                    };
                    setTimeout(t, y);
                },
                p = function (n, t, i) {
                    var r, u;
                    for (t = [].concat(t), r = t.length; r--;) if (u = n['on' + t[r]], typeof u == 'function') try {
                        u.call(n, i || n);
                    } catch (f) {
                        a(f);
                    }
                },
                e = function (n) {
                    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type) ? new Blob([String.fromCharCode(65279), n], {
                        type: n.type
                    }) : n;
                },
                o = function (t, o, s) {
                    s || (t = e(t));
                    var a = this,
                        k = t.type,
                        b = k === v,
                        y, w = function () {
                            p(a, 'writestart progress write writeend'.split(' '));
                        },
                        d = function () {
                            var i, e;
                            if ((u || b && l) && n.FileReader) {
                                i = new FileReader;
                                i.onloadend = function () {
                                    var t = u ? i.result : i.result.replace(/^data:[^;]*;/, 'data:attachment/file;'),
                                        r = n.open(t, '_blank');
                                    r || (n.location.href = t);
                                    t = undefined;
                                    a.readyState = a.DONE;
                                    w();
                                };
                                i.readAsDataURL(t);
                                a.readyState = a.INIT;
                                return;
                            }
                            y || (y = r().createObjectURL(t));
                            b ? n.location.href = y : (e = n.open(y, '_blank'), e || (n.location.href = y));
                            a.readyState = a.DONE;
                            w();
                            f(y);
                        };
                    if (a.readyState = a.INIT, h) {
                        y = r().createObjectURL(t);
                        setTimeout(function () {
                            i.href = y;
                            var type = $('input[name=audioType]:checked').val();
                            o = o.replace('.m4a', '.' + type);
                            i.download = o;
                            c(i);

                            w();
                            f(y);
                            a.readyState = a.DONE;
                        });
                        return;
                    }
                    d();
                },
                t = o.prototype,
                w = function (n, t, i) {
                    return new o(n, t || n.name || 'download', i);
                };
            return typeof navigator != 'undefined' && navigator.msSaveOrOpenBlob ?
                function (n, t, i) {
                    return t = t || n.name || 'download',
                    i || (n = e(n)),
                        navigator.msSaveOrOpenBlob(n, t);
                } : (t.abort = function () {
                },
                    t.readyState = t.INIT = 0, t.WRITING = 1, t.DONE = 2, t.error = t.onwritestart = t.onprogress = t.onwrite = t.onabort = t.onerror = t.onwriteend = null, w);
        }
    }(typeof self != 'undefined' && self || typeof window != 'undefined' && window || this.content);
typeof module != 'undefined' && module.exports ? module.exports.saveAs = saveAs : typeof define != 'undefined' && define !== null && define.amd !== null && define('FileSaver.js',
    function () {
        return saveAs;
    });
$(function () {
    var mp3Array = [];
    if (window.Worker) {
		$('#uploaderVideo2audio').uploader({
			autoUpload: false,
			url: 'http://www.bejson.com',
			filters: {
				mime_types: [{title: '文件', extensions: 'flv,mp4,swf,fla'}],
				max_file_size: '20mb',
				prevent_duplicates: true
			},
            fileTemplate: '<div class="file">\n' +
                '        <div class="file-progress-bar"></div>\n' +
                '        <div class="file-wrapper">\n' +
                '            <div class="file-icon"><i class="icon icon-file-o"></i></div>\n' +
                '            <div class="content">\n' +
                '                <div class="file-name"></div>\n' +
                '                <div class="file-size small text-muted">0KB</div>\n' +
                '            </div>\n' +
                '            <div class="actions">\n' +
                '                <button type="button" data-toggle="tooltip" title="Remove" class="btn btn-link btn-delete-file"><i\n' +
                '                        class="icon icon-trash text-danger"></i></button>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>',
            multi_selection: false
		});

		var uploaderFile2Pdf = $('#uploaderVideo2audio').data('zui.uploader');
		$('#uploaderVideo2audio').uploader().on('onFilesAdded', function () {
			var $btn = $('.uploader-btn-browse');
			$btn.button('loading');
			var file = uploaderFile2Pdf.getFiles()[uploaderFile2Pdf.getFiles().length - 1].getNative();
			t('',file, $btn, uploaderFile2Pdf.getFiles().length - 1)
		});
        var n = new Worker('/static/bejson/js/component/convert/work.js '),
            t = function (t, i, btn, index) {
                var r = new FileReader;
                r.onload = function (t) {
                    n.onmessage = function (n) {
                        if (n.data) {
                            var t = new Blob([n.data.file.buffer], {
                                type: 'application/octet-stream'
                            });
                            mp3Array.push(t);
                            var audioType = $('input[name=audioType]:checked').val();
                            var html = '<li><span>'+n.data.name.split('.')[0]+'.'+audioType+'</span><button type="button" class="btn btn-success" data-index="'+(mp3Array.length-1)+'">下载</button></li>';
                            $('#video2audioList').append(html);
                            $('#uploaderVideo2audio .file').eq(index).css('background-color', '#ddf4df');
                            btn.button('reset');
							// saveAs(t, n.data.name);
                        } else {
                            var html = '<div class="actions"><button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-delete-file" data-original-title="移除"><i class="icon icon-trash text-danger"></i></button></div>';
                            $('#uploaderVideo2audio .file-wrapper').eq(index).append(html);
                            msgError('转换失败，请检查视频格式是否正确');
                            btn.button('reset');
                        }
                    };
                    n.postMessage({
                        buffer: t.target.result,
                        file: i
                    });
                };
                r.readAsArrayBuffer(i);
            };
    }
    $('body').on('click', '#video2audioList li button', function() {
        var index = $(this).attr('data-index');
        var name = $(this).parent().find('span').eq(0).text();
        saveAs(mp3Array[index], name);
    })
});