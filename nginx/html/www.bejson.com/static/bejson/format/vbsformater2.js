

var editor = CodeMirror.fromTextArea(document.getElementById('source_textarea'), {
    mode: 'text/vbscript',
    lineNumbers: true, //鏄惁鏄剧ず宸﹁竟鎹㈣鏈瓧
    lineWrapping: true, //鏄惁鎶樺彔
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
});





// var editor2 = CodeMirror.fromTextArea(document.getElementById('target_textarea'), {
//     mode: 'text/vbscript',
//     lineNumbers: true, //鏄惁鏄剧ず宸﹁竟鎹㈣鏈瓧
//     lineWrapping: true, //鏄惁鎶樺彔
//     foldGutter: true,
//     gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
// });










var _0x18a0 = ['replace', 'length', 'select', 'End\x20$1', 'for', 'function', '\x20$1\x20', '$1\x20$2', '^[\x20\x5ct]*\x5cb', 'On\x20Error\x20Resume\x20Next', 'class', 'match', 'split', 'Select\x20Case\x20', 'end'];
var _0x44b2 = function(_0x18a0ba, _0x44b23e) {
    _0x18a0ba = _0x18a0ba - 0x0;
    var _0x59c894 = _0x18a0[_0x18a0ba];
    return _0x59c894;
};
function VbsBeautifier() {
    var _0x4b13a6, _0x5c622d, _0x2e9706, _0x446b43 = {}, _0x53ae80, _0x42d013, _0x43789c, _0x7b1013;
    _0x53ae80 = 'And\x20As\x20Boolean\x20ByRef\x20Byte\x20ByVal\x20Call\x20Case\x20Class\x20Const\x20Currency\x20Debug\x20Dim\x20Do\x20Double\x20Each\x20Else\x20ElseIf\x20Empty\x20End\x20EndIf\x20Enum\x20Eqv\x20Event\x20Exit\x20Explicit\x20False\x20For\x20Function\x20Get\x20Goto\x20If\x20Imp\x20Implements\x20In\x20Integer\x20Is\x20Let\x20Like\x20Long\x20Loop\x20LSet\x20Me\x20Mod\x20New\x20Next\x20Not\x20Nothing\x20Null\x20On\x20Option\x20Optional\x20Or\x20ParamArray\x20Preserve\x20Private\x20Property\x20Public\x20RaiseEvent\x20ReDim\x20Rem\x20Resume\x20RSet\x20Select\x20Set\x20Shared\x20Single\x20Static\x20Stop\x20Sub\x20Then\x20To\x20True\x20Type\x20TypeOf\x20Until\x20Variant\x20WEnd\x20While\x20With\x20Xor';
    _0x42d013 = 'Abs\x20Array\x20Asc\x20Atn\x20CBool\x20CByte\x20CCur\x20CDate\x20CDbl\x20CInt\x20CLng\x20CSng\x20CStr\x20Chr\x20Cos\x20CreateObject\x20Date\x20DateAdd\x20DateDiff\x20DatePart\x20DateSerial\x20DateValue\x20Day\x20Escape\x20Eval\x20Exp\x20Filter\x20Fix\x20FormatCurrency\x20FormatDateTime\x20FormatNumber\x20FormatPercent\x20GetLocale\x20GetObject\x20GetRef\x20Hex\x20Hour\x20InStr\x20InStrRev\x20InputBox\x20Int\x20IsArray\x20IsDate\x20IsEmpty\x20IsNull\x20IsNumeric\x20IsObject\x20Join\x20LBound\x20LCase\x20LTrim\x20Left\x20Len\x20LoadPicture\x20Log\x20Mid\x20Minute\x20Month\x20MonthName\x20MsgBox\x20Now\x20Oct\x20Randomize\x20RGB\x20RTrim\x20Replace\x20Right\x20Rnd\x20Round\x20ScriptEngine\x20ScriptEngineBuildVersion\x20ScriptEngineMajorVersion\x20ScriptEngineMinorVersion\x20Second\x20SetLocale\x20Sgn\x20Sin\x20Space\x20Split\x20Sqr\x20StrComp\x20StrReverse\x20String\x20Tan\x20Time\x20TimeSerial\x20TimeValue\x20Timer\x20Trim\x20TypeName\x20UBound\x20UCase\x20Unescape\x20VarType\x20Weekday\x20WeekdayName\x20Year';
    _0x43789c = 'vbBlack\x20vbRed\x20vbGreen\x20vbYellow\x20vbBlue\x20vbMagenta\x20vbCyan\x20vbWhite\x20vbBinaryCompare\x20vbTextCompare\x20vbSunday\x20vbMonday\x20vbTuesday\x20vbWednesday\x20vbThursday\x20vbFriday\x20vbSaturday\x20vbUseSystemDayOfWeek\x20vbFirstJan1\x20vbFirstFourDays\x20vbFirstFullWeek\x20vbGeneralDate\x20vbLongDate\x20vbShortDate\x20vbLongTime\x20vbShortTime\x20vbObjectError\x20vbOKOnly\x20vbOKCancel\x20vbAbortRetryIgnore\x20vbYesNoCancel\x20vbYesNo\x20vbRetryCancel\x20vbCritical\x20vbQuestion\x20vbExclamation\x20vbInformation\x20vbDefaultButton1\x20vbDefaultButton2\x20vbDefaultButton3\x20vbDefaultButton4\x20vbApplicationModal\x20vbSystemModal\x20vbOK\x20vbCancel\x20vbAbort\x20vbRetry\x20vbIgnore\x20vbYes\x20vbNo\x20vbCr\x20vbCrLf\x20vbFormFeed\x20vbLf\x20vbNewLine\x20vbNullChar\x20vbNullString\x20vbTab\x20vbVerticalTab\x20vbUseDefault\x20vbTrue\x20vbFalse\x20vbEmpty\x20vbNull\x20vbInteger\x20vbLong\x20vbSingle\x20vbDouble\x20vbCurrency\x20vbDate\x20vbString\x20vbObject\x20vbError\x20vbBoolean\x20vbVariant\x20vbDataObject\x20vbDecimal\x20vbByte\x20vbArray\x20WScript';
    _0x446b43['if'] = 0x1;
    _0x446b43['sub'] = 0x1;
    _0x446b43[_0x44b2('0x5')] = 0x1;
    _0x446b43['property'] = 0x1;
    _0x446b43['for'] = 0x1;
    _0x446b43['while'] = 0x1;
    _0x446b43['do'] = 0x1;
    _0x446b43[_0x44b2('0x4')] = 0x1;
    _0x446b43[_0x44b2('0x2')] = 0x1;
    _0x446b43['with'] = 0x1;
    _0x446b43[_0x44b2('0xa')] = 0x1;
    _0x446b43[_0x44b2('0xe')] = -0x1;
    _0x446b43['next'] = -0x1;
    _0x446b43['loop'] = -0x1;
    _0x446b43['wend'] = -0x1;
    this['beautify'] = function(_0x2827e8) {
        _0x2e9706 = _0x2827e8;
        _0x2e9706 = _0x2e9706[_0x44b2('0x0')](/\r\n/g, '\x0a');
        _0x4cf5a8();
        _0x4563ca();
        _0x4b3a41();
        _0x9de059();
        _0x4764d7();
        _0x927bfe();
        _0x5ed64d();
        _0x186818();
        _0x4148ca();
        _0x42746e();
        _0x5832a6();
        _0x2e9706 = _0x2e9706['replace'](/\n/g, '\x0d\x0a')[_0x44b2('0x0')](/\t/g, '\x20\x20\x20\x20');
        return _0x2e9706;
    }
    ;
    function _0x4cf5a8() {
        _0x4b13a6 = _0x2e9706['match'](/".*?"/g);
        _0x2e9706 = _0x2e9706[_0x44b2('0x0')](/".*?"/g, '%[quoted]%');
    }
    function _0x5832a6() {
        if (!_0x4b13a6)
            return;
        for (var _0x23211c = 0x0, _0x16af88 = _0x4b13a6[_0x44b2('0x1')]; _0x23211c < _0x16af88; _0x23211c++) {
            _0x2e9706 = _0x2e9706[_0x44b2('0x0')]('%[quoted]%', _0x4b13a6[_0x23211c]);
        }
    }
    function _0x4563ca() {
        _0x5c622d = _0x2e9706['match'](/'.*/g);
        _0x2e9706 = _0x2e9706[_0x44b2('0x0')](/'.*/g, '%[comment]%');
    }
    function _0x42746e() {
        if (!_0x5c622d)
            return;
        for (var _0x6ee8d3 = 0x0, _0x3b9abe = _0x5c622d[_0x44b2('0x1')]; _0x6ee8d3 < _0x3b9abe; _0x6ee8d3++) {
            _0x2e9706 = _0x2e9706[_0x44b2('0x0')]('%[comment]%', _0x5c622d[_0x6ee8d3]);
        }
    }
    function _0x4b3a41() {
        _0x2e9706 = _0x2e9706[_0x44b2('0x0')](/on\s+error\s+resume\s+next/gi, '%[resumenext]%');
        _0x2e9706 = _0x2e9706['replace'](/on\s+error\s+goto\s+0/gi, '%[gotozero]%');
    }
    function _0x4148ca() {
        _0x2e9706 = _0x2e9706['replace'](/%\[resumenext\]%/gi, _0x44b2('0x9'));
        _0x2e9706 = _0x2e9706[_0x44b2('0x0')](/%\[gotozero\]%/gi, 'On\x20Error\x20GoTo\x200');
    }
    function _0x9de059() {
        _0x2e9706 = _0x2e9706[_0x44b2('0x0')](/:/g, '\x0a');
    }
    function _0x4764d7() {
        _0x2e9706 = _0x2e9706[_0x44b2('0x0')](/^[ \t]*(.*?)[ \t]*$/gim, '$1')[_0x44b2('0x0')](/[ \t]*(=|<|>|-|\+|&|\*|\/|\^|\\)[ \t]*/gim, _0x44b2('0x6'))[_0x44b2('0x0')](/[ \t]*<\s*>[ \t]*/gim, '\x20<>\x20')['replace'](/[ \t]*<\s*=[ \t]*/gim, '\x20<=\x20')[_0x44b2('0x0')](/[ \t]*>\s*=[ \t]*/gim, '\x20>=\x20')[_0x44b2('0x0')](/[ \t]*_[ \t]*$/gim, '\x20_')[_0x44b2('0x0')](/[ \t]*(Do|Loop)\s*(While|Until)[ \t]*/gim, _0x44b2('0x7'))[_0x44b2('0x0')](/[ \t]*End\s*(Sub|Function|Property|If|With|Select|Class)[ \t]*/gim, _0x44b2('0x3'))['replace'](/[ \t]*Select\s*Case[ \t]*/gim, _0x44b2('0xd'));
    }
    function _0x927bfe() {
        var _0x5a9a16, _0x48b92a, _0x52df1c, _0x8f898e;
        _0x5a9a16 = _0x53ae80 + '\x20' + _0x42d013 + '\x20' + _0x43789c;
        _0x5a9a16 = _0x5a9a16[_0x44b2('0xc')]('\x20');
        for (_0x48b92a = 0x0,
                 _0x52df1c = _0x5a9a16[_0x44b2('0x1')]; _0x48b92a < _0x52df1c; _0x48b92a++) {
            _0x8f898e = new RegExp('\x5cb' + _0x5a9a16[_0x48b92a] + '\x5cb','gi');
            _0x2e9706 = _0x2e9706['replace'](_0x8f898e, _0x5a9a16[_0x48b92a]);
        }
    }
    function _0x5ed64d() {
        var _0x1b14cc, _0x104263, _0x33885a, _0x301e6e, _0x17bf47 = 0x0, _0x28960d = 0x0;
        _0x1b14cc = _0x2e9706[_0x44b2('0xc')]('\x0a');
        for (_0x104263 = 0x0,
                 _0x33885a = _0x1b14cc['length']; _0x104263 < _0x33885a; _0x104263++) {
            _0x301e6e = _0x1b14cc[_0x104263];
            _0x301e6e = _0x19b90a(_0x301e6e);
            _0x17bf47 = _0x28960d;
            _0x28960d += _0x28816a(_0x301e6e);
            if (_0x17bf47 <= _0x28960d) {
                _0x1b14cc[_0x104263] = _0x46c0e9('\x09', _0x17bf47) + _0x1b14cc[_0x104263];
            } else {
                _0x1b14cc[_0x104263] = _0x46c0e9('\x09', _0x28960d) + _0x1b14cc[_0x104263];
            }
        }
        _0x2e9706 = _0x1b14cc['join']('\x0a');
    }
    function _0x19b90a(_0x198d46) {
        return _0x198d46['replace'](/if.*?then.+/i, '')[_0x44b2('0x0')](/(private|public).+?(sub|function|property)/i, '$2');
    }
    function _0x28816a(_0x3ba330) {
        var _0x449b1b, _0x4208f4;
        for (_0x449b1b in _0x446b43) {
            _0x4208f4 = new RegExp(_0x44b2('0x8') + _0x449b1b + '\x5cb','i');
            if (_0x3ba330[_0x44b2('0xb')](_0x4208f4)) {
                return _0x446b43[_0x449b1b];
            }
        }
        return 0x0;
    }
    function _0x186818() {
        var _0xbd2178, _0x41ad7b, _0x386213;
        _0xbd2178 = _0x2e9706['split']('\x0a');
        for (_0x41ad7b = 0x0,
                 _0x386213 = _0xbd2178['length']; _0x41ad7b < _0x386213; _0x41ad7b++) {
            if (_0xbd2178[_0x41ad7b][_0x44b2('0xb')](/^\t*else/i)) {
                _0xbd2178[_0x41ad7b] = _0xbd2178[_0x41ad7b]['replace']('\x09', '');
            }
        }
        _0x2e9706 = _0xbd2178['join']('\x0a');
    }
    function _0x46c0e9(_0x218e9f, _0x13e0ed) {
        if (_0x13e0ed < 0x0)
            _0x13e0ed = 0x0;
        return new Array(_0x13e0ed + 0x1)['join'](_0x218e9f);
    }
}
var _0x4280 = ['value', 'getElementById'];
var _0x4b19 = function(_0x42809e, _0x4b199e) {
    _0x42809e = _0x42809e - 0x0;
    var _0x5d122c = _0x4280[_0x42809e];
    return _0x5d122c;
};
beautifier = new VbsBeautifier();
function doformat() {
    //var _0x52b457 = document['getElementById']('source_textarea')[_0x4b19('0x0')];
    var _0x52b457 = editor.getValue();
    var _0x3f2cb4 = beautifier['beautify'](_0x52b457);
    //document[_0x4b19('0x1')]('target_textarea')['value'] = _0x3f2cb4;

    editor.setValue(_0x3f2cb4);

}
