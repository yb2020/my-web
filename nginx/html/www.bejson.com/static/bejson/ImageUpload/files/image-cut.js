//图片切图功能说明：
//1. 第一种用法, 在加载图片后，点击图片通过拖拽生成裁剪框的方式，右键点击取消裁剪框
//   限制条件：
//      不支持比例缩放，所以绝对不要设置比例
//      拖拽过程中不检查最小宽高
//      建议切片最小宽高为20x20
//      
//2. 第二种用法, 在加载图片后，同时生成一个裁剪框， 这个裁剪框以最小切片宽高为尺寸， 支持比例缩放
//
//3. 当选择好的图片最后需要被引用时， 首先调用cutOffImage，把裁剪下的图片放入到canvas中供后续引用
//
//以下是示例参数调用：
//var param = new Object();
//param.showId = "selectId";// 必须
//param.fileId = "imagesrc";// 必须
//param.cutMinW = 150; // 切片最小宽度
//param.cutMinH = 100; // 切片最小高度
//param.showHeight = 400;// 显示的高
//param.showWidth = 400;// 显示的宽
//param.show = true;
//param.aspectRatio = 1.5;// 宽高比例
//
//imageSelect(param);

var _cutMinW; // 切片最小宽度
var _cutMinH; // 切片最小高度
var _imgW, _imgH, _nowW, _nowH, _nowL, _nowT, _imgMinW, _imgMinH;

var cutMaxWidth;
var cutMaxHeight;

var showHeight;
var showWidth;

var param;

var isSelected = false;
var selection = null;

// 此功能根据selection中记录的裁剪尺寸进行实际的图片切割缩放，放入canvas中待用
function cutOffImage() {
    // 此处是规避不正常的调用
    if (selection == null) return false;
    
    var _imgO = document.getElementById('sourceimg');
    var canvas = document.getElementById('imgcanvas');
    var context = canvas.getContext('2d');
    canvas.width = selection.selectedWidth;
    canvas.height = selection.selectedHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    var ratio = selection.ratio;
    if (selection.isSelected) {
        context.drawImage(_imgO, 
                          selection.imageX * ratio, 
                          selection.imageY * ratio, 
                          selection.selectedWidth * ratio,
                          selection.selectedHeight * ratio,
                           0, 0, 
                          selection.selectedWidth, 
                          selection.selectedHeight);
    } else {
        context.drawImage(_imgO, 
                          0, 
                          0, 
                          selection.imageW,
                          selection.imageH,
                           0, 0, 
                          selection.selectedWidth, 
                          selection.selectedHeight);
    }
    return true;
}

// 记录切割图片的位置、宽高， 此时还不切割
function onSelectEnd(isSelected) {
    var _pO = document.getElementById('pO');
    var _imgO = document.getElementById('sourceimg');
    
    if (selection == null) {
        selection = new Object();
    }
    
    if (isSelected) {
        selection.imageX = _pO.offsetLeft - _imgO.offsetLeft;// 选择区域左上角的X坐标
        selection.imageY = _pO.offsetTop - _imgO.offsetTop;// 选择区域左上角的Y坐标
        selection.selectedWidth = _pO.offsetWidth;// 选择区域的宽
        selection.selectedHeight = _pO.offsetHeight;// 选择区域的高
    }
    else {
        selection.imageX = 0;
        selection.imageY = 0;
        selection.selectedWidth = _nowW;
        selection.selectedHeight = _nowH;
        selection.imageW = _imgW;
        selection.imageH = _imgH;
    }
    selection.isSelected = isSelected;
    selection.ratio = _imgW / _nowW;
    
//    if ("onSelectEnd" in param) {
//        param.onSelectEnd(selection, _imgO);
//    }
}

// 拖拽整个裁剪框
function dragMask(e) {
    var e = window.event || e;
    if (e.button != 0) return;

    e.cancelBubble = true;
    var _piccutX = e.clientX;
    var _piccutY = e.clientY;
    // 初始化_pP和_pO
    var _pP = document.getElementById('pP');
    var _pO = document.getElementById('pO');
    var old_pX = _pP.offsetWidth;
    var old_pY = _pP.offsetHeight;

//    此处取消了页面上选中内容， 注意需要在完成任务后清楚这个设置！！！
    document.onselectstart = function() {
        return false;
    };

    document.onmousemove = function(e) {
        var e = window.event || e;
        var _posX = e.clientX - _piccutX;
        var _posY = e.clientY - _piccutY;

        // 以下移动裁剪框的位置 
        var _pX = old_pX + _posX;
        var _pY = old_pY + _posY;
        var _pW = _pO.offsetWidth;
        var _pH = _pO.offsetHeight;
        // 这里需要注意， 由于td有最小宽度4px， 因此， 在整个视图左右两边各有4px的空隙不能占用
        if (_pX + _pW >= showWidth - 4) _pX = showWidth - _pW - 4;
        if (_pX < 4) _pX = 4;
        // 如果图片的宽度比视图的宽度要小时， 需要限制裁剪框不能超出图片
        if (_nowW < showWidth) {
            if (_pX < _nowL) {
                _pX = _nowL;
            } else if (_pX + _pW > _nowL + _nowW) {
                _pX = _nowL +_nowW - _pW;
            }
        }
        _pP.style.width = _pX + 'px';
        
        // 这里需要注意， 由于tr有最小高度1px， 因此， 在整个视图上下两边各有1px的空隙不能占用
        if (_pY + _pH > showHeight - 1) _pY = showHeight - _pH - 1;
        if (_pY < 1) _pY = 1;
        // 如果图片的高度比视图的高度要小时， 需要限制裁剪框不能超出图片
        if (_nowH < showHeight) {
            if (_pY < _nowT) {
                _pY = _nowT;
            } else if (_pY + _pH > _nowT + _nowH) {
                _pY = _nowT +_nowH - _pH;
            }
        }
        _pP.style.height = _pY + 'px';

        // 以下移动图片的位置
        var _imgO = document.getElementById('sourceimg');
        // 把原来的图片位置先取出来
        var newL = _nowL;  // 把原来的图片位置先取出来
        var newT = _nowT;
        if (_nowW > showWidth) {
            var delta = _posX / showWidth * _nowW;
            newL = _nowL - delta;
            
            if (newL + _nowW < showWidth) {
                newL = showWidth - _nowW;
            } else if (newL > 0) {
                newL = 0;
            }
            _imgO.style.left = newL + 'px';  // 图片左右移动
        }
        if (_nowH > showHeight) {
            var delta = _posY / showHeight * _nowH;
            newT = _nowT - delta;
            
            if (newT + _nowH < showHeight) {
                newT = showHeight - _nowH;
            } else if (newT > 0) { 
                newT = 0;
            }
            _imgO.style.top = newT + 'px';  // 图片上下移动
        }
        
        document.onmouseup = function() {
        //    此处取消了页面上选中内容， 注意需要在完成任务后清楚这个设置！！！
            document.onselectstart = null;
            // 由于在上面已经移动图片的位置， 需要把新的位置保存下来
            _nowL = newL;
            _nowT = newT;
            onSelectEnd(true);
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}
// 对右下角点的拖拽事件
function dragsChange(e) {
    var e = window.event || e;
    if (e.button != 0) return;

    e.cancelBubble = true;
    var _piccutX = e.clientX;
    var _piccutY = e.clientY;
    // 初始化_pP和_pO
    var _pP = document.getElementById('pP');
    var _pO = document.getElementById('pO');
    // 保留一开始的pO的宽高
    var old_pW = _pO.offsetWidth;
    var old_pH = _pO.offsetHeight;
    //    此处取消了页面上选中内容， 注意需要在完成任务后清楚这个设置！！！
        document.onselectstart = function() {
            return false;
        };
    
    document.onmousemove = function(e) {
        var e = window.event || e;
        var _posX = e.clientX - _piccutX;
        var _posY = e.clientY - _piccutY;

        var _pX = _pP.offsetWidth;
        var _pY = _pP.offsetHeight;
        var _pW = old_pW + _posX;
        var _pH = old_pH + _posY;
        // 计算宽度符合在视图内， 同时， 介于最大、最小裁剪宽度内
        if (_pX + _pW > showWidth - 4) {
            _pW = showWidth - _pX - 4;
        }
        _pW = ((_pW > cutMaxWidth) ? cutMaxWidth : (_pW < _cutMinW ? _cutMinW : _pW));
        
        // 如果图片的宽度比视图的宽度要小时， 需要限制裁剪框不能超出图片
        if (_nowW < showWidth) {
            if (_pX + _pW > _nowL + _nowW) {
                _pW = _nowL + _nowW - _pX;
            }
        }
        
        // 计算高度符合在视图内， 同时， 介于最大、最小裁剪高度内
        if (_pY + _pH > showHeight - 1) {
            _pH = showHeight - _pY - 1;
        }
        _pH = ((_pH >= cutMaxHeight) ? cutMaxHeight : (_pH <= _cutMinH ? _cutMinH : _pH));
        
        // 如果图片的高度比视图的高度要小时， 需要限制裁剪框不能超出图片
        if (_nowH < showHeight) {
            if (_pY + _pH > _nowT + _nowH) {
                _pH = _nowT + _nowH - _pY;
            }
        }
        
        if ('aspectRatio' in param) {
            _pH = _pW / param.aspectRatio;
            if (_nowH >= showHeight && _pY + _pH > showHeight - 1) {
                _pH = showHeight - _pY - 1;
                _pW = _pH * param.aspectRatio;
            } else if (_nowH < showHeight && _pY + _pH > _nowT + _nowH) {
                _pH = _nowT + _nowH - _pY;
                _pW = _pH * param.aspectRatio;
            }

        }
        _pO.style.width = _pW + 'px';
        _pO.style.height = _pH + 'px';

        document.onmouseup = function() {
        //    此处取消了页面上选中内容， 注意需要在完成任务后清楚这个设置！！！
            document.onselectstart = null;
            onSelectEnd(true);
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

// 放大缩小的公共fucntion
function zoomImage(ratio) {
    var sliderBlock = document.getElementById('sliderBlock');
    var sliderHandleRatio = document.getElementById("sliderHandlerRatio")
    var _imgO = document.getElementById('sourceimg');
    var _pP = document.getElementById('pP');
    var _pO = document.getElementById('pO');

    // 计算放缩的尺寸比例
    sliderBlock.style.left = ratio * 100 + "%";
    sliderHandleRatio.innerHTML = Math.round(ratio * 200) + '%';
    // 计算缩放后的宽高
    _nowW = _imgW * (ratio * 2);
    _nowH = _imgH * (ratio * 2);
    // 确保缩放后图片的尺寸不小于最小尺寸
    if (_nowW <= _imgMinW || _nowH <= _imgMinH) {
        _nowW = _imgMinW;
        _nowH = _imgMinH;
    }
    // 把缩放后图片的位置居中
    _nowL = Math.ceil((showWidth - _nowW) / 2);
    _nowT = Math.ceil((showHeight - _nowH) / 2);
    _imgO.width = _nowW;
    _imgO.height = _nowH;
    _imgO.style.left = _nowL + 'px';
    _imgO.style.top = _nowT + 'px';

    var _pX = _pP.offsetWidth;
    var _pY = _pP.offsetHeight;
    var _pW = _pO.offsetWidth;
    var _pH = _pO.offsetHeight;
    // 如果缩放后， 图片宽度小于裁剪框宽度， 则， 缩小裁剪框宽度到图片宽度，同时按照比例计算新的裁剪框高度
    if (_nowW < _pW) {
        _pW = _nowW;
        if ('aspectRatio' in param) {
            _pH = _pW / param.aspectRatio; 
        }
    }
    // 把裁剪框的位置确保移动到图片的内部（水平方向X轴）
    if (_nowL > _pX) {
        _pX = _nowL;
    } else if (_nowL + _nowW < _pX + _pW) {
        _pX = _nowL + _nowW - _pW;
    }
    // 如果缩放后， 图片高度小于裁剪框高度， 则， 缩小裁剪框高度到图片高度，同时按照比例计算新的裁剪框宽度
    if (_nowH < _pH) {
        _pH = _nowH;
        if ('aspectRatio' in param) {
            _pW = _pH * param.aspectRatio; 
        }
    }
    // 把裁剪框的位置确保移动到图片的内部（垂直方向Y轴）
    if (_nowT > _pY) {
        _pY = _nowT;
    } else if (_nowT + _nowH < _pY + _pH) {
        _pY = _nowT + _nowH - _pH;
    }
    // 设置裁剪框的位置、宽高
    _pP.style.width = _pX + 'px';
    _pP.style.height = _pY + 'px';
    _pO.style.width = _pW + 'px';
    _pO.style.height = _pH + 'px';
}

// 点击放大按钮的处理
function sliderStepUp () {
    sliderBlockButton(1);
}
// 点击缩小按钮的处理
function sliderStepDown () {
    sliderBlockButton(-1);
}

// 放大缩小的按钮事件
function sliderBlockButton(step) {
    var sliderBlock = document.getElementById('sliderBlock');

    // 计算放缩的尺寸比例
    var ratio = parseInt(sliderBlock.style.left) + 2.5 * step;
    ratio = ratio < 0 ? 0 : ratio;
    ratio = ratio > 100 ? 100 : ratio;
    ratio = ratio / 100;

    zoomImage(ratio);

    onSelectEnd(isSelected);
}

// 放大缩小，鼠标按下事件
function sliderBlockMove(e) {

    var e = window.event || e;
    if (e.button != 0) return;

    var _scrO = this;
    var _imgX = e.clientX - _scrO.offsetLeft;

    //    此处取消了页面上选中内容， 注意需要在完成任务后清楚这个设置！！！
        document.onselectstart = function() {
            return false;
        };
    
    document.onmousemove = function(e) {
        var sliderBar = document.getElementById('sliderBar');
        var e = window.event || e;
        
        // 计算放缩的尺寸比例
        var _posX = e.clientX - _imgX;
        _posX = _posX < 0 ? 0 : _posX;
        _posX = _posX > sliderBar.offsetWidth ? sliderBar.offsetWidth : _posX;
        var ratio = _posX / sliderBar.offsetWidth;
        
        zoomImage(ratio);
        
        document.onmouseup = function() {
        //    此处取消了页面上选中内容， 注意需要在完成任务后清楚这个设置！！！
            document.onselectstart = null;
            onSelectEnd(isSelected);
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

// 初始化选择截取区域框的事件
function initDrawMaskEvent(e) {
    // 得到在图片上点击的位置
    var e = window.event || e;
    e.cancelBubble = true;
    
    if (e.button != 0) return;

    var _piccutX = e.offsetX+e.target.offsetLeft;
    var _piccutY = e.clientY+e.target.offsetTop;
    console.log(_piccutX);
    console.log(_piccutY);
	var picViewOuter = document.getElementById("picViewOuter");
	var picMask = document.getElementById("picMask");
    var showLeft = picViewOuter.offsetLeft;
    var showTop = picViewOuter.offsetTop;
    // 以下计算起始点落在视图的有效区域内
    if (_piccutX < showLeft + 4) {
        _piccutX = showLeft + 4;
    } else if (_piccutX > showLeft + showWidth - 4) {
        _piccutX = showLeft + showWidth - 4;
    }
    if (_piccutY < showTop + 1) {
        _piccutY = showTop + 1;
    } else if (_piccutY > showTop + showHeight - 1) {
        _piccutY = showTop + showHeight - 1;
    }
    // 此处取消了页面上选中内容， 注意需要在完成任务后清除这个设置！！！
    document.onselectstart = function() {
        return false;
    };
    // 点击拖拽生成裁剪框
    document.onmousemove = function(e) {
        var e = window.event || e;
        var _pX, _pY, _pW, _pH;

        // 以下计算结束点落在视图的有效区域内，同时， 计算出位置、宽度
        if (e.clientX < showLeft + 4) {
            _pX = 4;
            _pW = _piccutX - showLeft - 4;
        } else if (e.clientX > showLeft + showWidth - 4){
            _pX = _piccutX - showLeft;
            _pW = showLeft + showWidth - 4 - _piccutX;
        } else if (e.clientX < _piccutX) {
            _pX = e.clientX - showLeft;
            _pW = _piccutX - e.clientX;
        } else {
            _pX = _piccutX - showLeft;
            _pW = e.clientX - _piccutX;
        }
        // 计算宽度符合在视图内， 同时， 介于最大、最小裁剪宽度内
        _pW = (_pW > cutMaxWidth) ? cutMaxWidth : _pW;
        // 如果图片的宽度比视图的宽度要小时， 需要限制裁剪框不能超出图片
        if (_nowW < showWidth) {
            if (_pX + _pW > _nowL + _nowW) {
                _pW = _nowL + _nowW - _pX;
            } else if (_pX < _nowL) {
                _pW = _pW + _pX - _nowL;
                _pX = _nowL;
            }
        }

        // 以下计算结束点落在视图的有效区域内，同时， 计算出位置、高度
        if (e.clientY < showTop + 1) {
            _pY = 1;
            _pH = _piccutY - showTop - 1;
        } else if (e.clientY > showTop + showHeight - 1){
            _pY = _piccutY - showTop;
            _pH = showTop + showHeight - 1 - _piccutY;
        } else if (e.clientY < _piccutY) {
            _pY = e.clientY - showTop;
            _pH = _piccutY - e.clientY;
        } else {
            _pY = _piccutY - showTop;
            _pH = e.clientY - _piccutY;
        }


        // 计算高度符合在视图内， 同时， 介于最大、最小裁剪高度内
        _pH = (_pH >= cutMaxHeight) ? cutMaxHeight : _pH;

        // 如果图片的高度比视图的高度要小时， 需要限制裁剪框不能超出图片
        if (_nowH < showHeight) {
            if (_pY + _pH > _nowT + _nowH) {
                _pH = _nowT + _nowH - _pY;
            } else if (_pY < _nowT) {
                _pH = _pH + _pY - _nowT;
                _pY = _nowT;
            }
        }

//        if ('aspectRatio' in param) {
//            _pH = _pW / param.aspectRatio;
//            if (_nowH >= showHeight && _pY + _pH > showHeight - 1) {
//                _pH = showHeight - _pY - 1;
//                _pW = _pH * param.aspectRatio;
//            } else if (_nowH < showHeight && _pY + _pH > _nowT + _nowH) {
//                _pH = _nowT + _nowH - _pY;
//                _pW = _pH * param.aspectRatio;
//            }
//        }
        // 初始化_pP和_pO
        var _pP = document.getElementById('pP');
        var _pO = document.getElementById('pO');

        _pP.style.width = _pX + 'px';
        _pP.style.height = _pY + 'px';
        _pO.style.width = _pW + 'px';
        _pO.style.height = _pH + 'px';

        //这里滞后把裁剪框显示出来是为了更好的显示效果
        picMask.className = "";
        isSelected = true;
        // 鼠标释放取消拖拽事件
        document.onmouseup = function() {

            // 此处取消了页面上选中内容， 注意需要在完成任务后清除这个设置！！！
            document.onselectstart = null;
            onSelectEnd(true);
            document.onmousemove = null;
            document.onmouseup = null;
            // 右键取消
            document.oncontextmenu = function(e) {
                if (e.button == 2) {
                    picMask.className = "hidden";
                    isSelected = false;
                    onSelectEnd(false);
                }
                document.oncontextmenu = null;
                return false;
            };
        };
    };

    document.getElementById('dm_br').onmousedown = function(e) {// 拖拽裁剪框尺寸事件
        dragsChange(e);
    };

    document.getElementById('pO').onmousedown = function(e) {// 拖拽事件
        dragMask(e);
    };
    return false;
}
// 初始化选择截取区域框的事件
function initEvent() {

    document.getElementById('dm_br').onmousedown = function(e) {// 拖拽裁剪框尺寸事件
        dragsChange(e);
    };
    
    document.getElementById('pO').onmousedown = function(e) {// 拖拽事件
        dragMask(e);
    };
    
    var pPW = (showWidth - _cutMinW) / 2;
    var pPH = (showHeight - _cutMinH) / 2;

    // 初始化_pP和_pO
    var _pP = document.getElementById('pP');
    var _pO = document.getElementById('pO');
    // 初始化裁剪框的位置
    _pP.style.width = pPW + 'px';
	_pP.style.height = pPH + 'px';
    // 因为有边框， 所以， 实际pO的宽高度应该少2个像素
    _pO.style.width = (_cutMinW) + "px";
    _pO.style.height = (_cutMinH) + "px";
    
    return false;
}

// 加载图片时， 进行适当的缩放
function loadImg() {
    var _imgO = document.getElementById('sourceimg');  
    // 规避内存泄漏
    _imgO.onload = null;
    // 初始化图片高度、宽度, 注意这里必须拿到图片的原始宽高
    if (typeof _imgO.naturalWidth == "undefined") { 
        // IE 6/7/8 
        var i = new Image(); 
        i.src = _imgO.src; 
        _imgW = i.width; 
        _imgH = i.height; 
    } 
    else { 
        // HTML5 browsers 
        _imgW = _imgO.naturalWidth; 
        _imgH = _imgO.naturalHeight; 
    } 
    _nowW = _imgW;
    _nowH = _imgH;
    // 计算首次需要放缩的比例
    var imgScale = (_imgW / showWidth) > (_imgH / showHeight) ? _imgW / showWidth : _imgH / showHeight;
    var imgScaleTmp = (_imgW / _cutMinW) < (_imgH / _cutMinH) ? _imgW / _cutMinW : _imgH / _cutMinH;
    if (_imgW > showWidth || _imgH > showHeight) {  // 这里是缩小图片
        imgScale = imgScale < imgScaleTmp ? imgScale : imgScaleTmp;
    } else {
        imgScale = imgScaleTmp < 1 ? imgScaleTmp : 1;   //这种情况下是放大图片, 否则说明图片原尺寸就符合条件了
    }
    // 计算放缩后的比例，并放入图片的样式中
    _imgO.width = _nowW = _imgW / imgScale;
    _imgO.height = _nowH = _imgH / imgScale;
    // 计算图片居中显示的位置
    _nowL = Math.ceil((showWidth - _nowW) / 2);
    _nowT = Math.ceil((showHeight - _nowH) / 2);
    _imgO.style.left = _nowL + 'px';
    _imgO.style.top = _nowT + 'px';
    // 计算最小图片宽高值
    if (_nowW < _cutMinW || _nowH < _cutMinH) {  // 这种情况正常不可能出现
        _imgMinW = _nowW;
        _imgMinH = _nowH;
    } else {
        if (_cutMinW / _cutMinH > _nowW / _nowH) {
            _imgMinW = _cutMinW;
            _imgMinH = _nowH * _cutMinW / _nowW;
        } else {
            _imgMinW = _nowW * _cutMinH / _nowH;
            _imgMinH = _cutMinH;
        }
    }
    // 计算图片下方缩放比例尺的位置
    var ratio = Math.round(1 / imgScale * 50);
    if (ratio > 100) {
        ratio = 100;
    }
    var sliderBlock = document.getElementById("sliderBlock");
    var sliderHandleRatio = document.getElementById("sliderHandlerRatio")

    sliderBlock.style.left = ratio + '%';
    sliderHandleRatio.innerHTML = ratio * 2 + '%';

    if ('show' in param) {
        onSelectEnd(param.show);
    }
}


// 初始化展示的图片
function initShowImage(imgData) {
    var picMask = document.getElementById('picMask');
    var _imgO = document.getElementById('sourceimg');

    document.getElementById('sliderBlock').onmousedown = sliderBlockMove;
    document.getElementById('stepUp').onclick = sliderStepUp;
    document.getElementById('stepDown').onclick = sliderStepDown;
    // 添加图片
    _imgO.onload = loadImg;
    _imgO.src = imgData;
    document.getElementById('back').className = "hidden";
    if ('show' in param && param.show) {
        picMask.className = "";
        isSelected = true;
        initEvent();
    } else {
        picMask.className = "hidden";
        isSelected = false;

        _imgO.onmousedown = initDrawMaskEvent;
    }
}

// 把当前选择的图片加载上来
function changeFile(evt) {
    var file = evt.target.files[0];
    if (file != null) {
        var s_error=  document.getElementById("s_error");
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
             s_error.innerHTML="请选择图片";
             s_error.style.display="block";
            return;
        }else {
             s_error.innerHTML="";
             s_error.style.display="none";
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var imgData = e.target.result;
            initShowImage(imgData);
        };
        reader.readAsDataURL(file);
    }
}
// 选择一张图片
function imageSelect(options) {
    param = options;
	// 关于图片处理
	_cutMinW = param.cutMinW || 20; // 切片最小宽度
	_cutMinH = param.cutMinH || 20; // 切片最小高度

	var picViewOuter = document.getElementById("picViewOuter");
    
    cutMaxWidth = picViewOuter.offsetWidth - 8;
	cutMaxHeight = picViewOuter.offsetHeight - 2;

    showHeight = picViewOuter.offsetHeight;
    showWidth = picViewOuter.offsetWidth;
	
	var select = document.getElementById("back");
    var filesrc = document.getElementById(param.fileId);
    select.onclick = function() {
		filesrc.click();
	};

	// 图片文件切换时，执行图片重新加载
	filesrc.onchange = changeFile;
        
}

//用于处理选择的cavans
var rotateCanvas=document.createElement("canvas");    
var ctx=rotateCanvas.getContext("2d");