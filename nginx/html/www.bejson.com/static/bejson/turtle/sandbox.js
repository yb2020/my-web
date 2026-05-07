// (function($) {

//

var PythonSandbox = function (options) {

    this.source = $('#' + options.codeSourceId);

    this.display = $('#' + options.codeDisplayId);

    this.turtle = $('#' + options.turtleCanvasId);

    this.errorHandler = options.errorHandler ? options.errorHandler : false;

    this.logToConsole = options.logToConsole ? options.logToConsole : false;

    this.theme = options.theme ? options.theme : 'base16-dark';

    this.lineNumbers = options.lineNumbers ? options.lineNumbers : true;

    this.mirrorId = options.codeMirrorId ? options.codeMirrorId : 'sandboxCodeMirror';

    this.graphicsCanvasId = options.graphicsCanvasId ? options.graphicsCanvasId : 'sandboxCanvas';

    this.animateTurtle = options.animateTurtle ? options.animateTurtle : true;



    this.mirror = '';

    this.fancyEditor = '';

    this.setupMirror();

    this.setupEditor();

    this.setupTurtleCanvas();

    this.setupGraphicsCanvas();

};



PythonSandbox.prototype.toggleWrapping = function(mode) {

    this.fancyEditor.setOption('lineWrapping',mode);

};





PythonSandbox.prototype.killTurtle = function() {

    Sk.TurtleGraphics.reset();

};



PythonSandbox.prototype.getEditor = function() {

    return this.fancyEditor;

};



PythonSandbox.prototype.setupTurtleCanvas = function() {

    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {
        width:this.turtle.width(),
        height:this.turtle.height(),
        animate:this.animateTurtle
    })).target = this.turtle.prop('id');

};



PythonSandbox.prototype.setupGraphicsCanvas = function() {

    if(!Sk.SanboxCanvas)

    {

        Sk.SandboxCanvas = {

            canvasId:this.graphicsCanvasId,

            //width:$('#'+this.graphicsCanvasId).outerWidth(),

            //height:$('#'+this.graphicsCanvasId).outerHeight()

        };

        console.log($('#'+this.graphicsCanvasId).outerWidth() + "|" + $('#'+this.graphicsCanvasId).outerHeight());

    }

};



PythonSandbox.prototype.clearGraphicsCanvas = function() {

    var canvas = $('#' + this.graphicsCanvasId).get(0);

    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);

};



PythonSandbox.prototype.animate = function(bool) {

    this.animateTurtle = bool;

    Sk.TurtleGraphics.animate = this.animateTurtle;

};



PythonSandbox.prototype.speed = function(speed) {

    Sk.TurtleGraphics.speed = speed;

};



PythonSandbox.prototype.setupMirror = function() {

    this.source.clone().prop('id', this.mirrorId).prop('name',this.mirrorId).addClass('hidden').appendTo(this.source.parent());

    this.mirror = $('#' + this.mirrorId);

};



PythonSandbox.prototype.setupEditor = function() {

    this.fancyEditor = CodeMirror.fromTextArea(this.source.get(0), {

        lineNumbers: this.lineNumbers,

        tabSize: 4,

        mode: 'python',

        theme: this.theme,

        lineWrapping: true, //是否强制换行

        foldGutter:true, // 启用行槽中的代码折叠

        matchBrackets:true,// 匹配结束符号，比如"]、}"

        autoCloseBrackets: true , // 自动闭合符号

        styleActiveLine:true, // 显示选中行的样式

        indentUnit: 4, // 缩进单位为4


    });



    var mirrorObj = this.mirror;

    this.fancyEditor.on('change', function(instance, obj) {

        mirrorObj.html(instance.getValue());

    });



};



PythonSandbox.prototype.execute = function() {

    var psObj = this;

    var code = this.mirror.val();

    var out = this.display;

    out.html('');

    Sk.pre = out.prop('id'); // set the ID of the output area for Skulpt

    Sk.configure({

        output:function(txt){psObj.handleOutput(txt)},

        read:function(f){return psObj.readBuiltInFile(f)}

    });



    // (Sk.TurtleGraphics || (Sk.TurtleGraphics = {width:0,height:0})).target = this.turtle.prop('id');



    var myPromise = Sk.misceval.asyncToPromise(function() {

        return Sk.importMainWithBody("<stdin>", false, code, true);

        return skulptObj.importMainWithBody("<stdin>", false, code, true);

    });



    myPromise.then(function(mod) {

        if(psObj.logToConsole)

            console.log('success');

    }, function(err) {

        psObj.handleError(err.toString());

        if(psObj.logToConsole)

            console.log(err.toString());

    });

};



PythonSandbox.prototype.readBuiltInFile = function(f) {

    if(Sk.builtinFiles === undefined || Sk.builtinFiles["files"][f] === undefined)

        throw "File not found: '" + f + "'";

    return Sk.builtinFiles["files"][f];

};



PythonSandbox.prototype.handleOutput = function(txt) {

    this.display.append(txt);


    this.display.scrollTop(this.display[0].scrollHeight);

};



PythonSandbox.prototype.handleError = function(txt) {

    if(this.errorHandler)

        this.errorHandler(txt);

    else

        this.display.append('<p class="bg-danger">' + txt + '</p>');

};





// })(jQuery);