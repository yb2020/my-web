function dou2a( ) {

    var source=document.getElementById("source_textarea").value;

    var data=UnicodeToAscii(source);
    document.getElementById("target_textarea").value = data ;

}

function UnicodeToAscii(content) {
    var code = content.match(/&#(\d+);/g);
    var result= '';
    for (var i=0; i<code.length; i++)
        result += String.fromCharCode(code[i].replace(/[&#;]/g, ''));
    return result;
}
function doa2u( ) {

    var source=document.getElementById("source_textarea").value;

    var data=AsciiToUnicode(source);
    document.getElementById("target_textarea").value = data ;

}
function AsciiToUnicode(content) {
    var result = '';
    for (var i=0; i<content.length; i++)
        result+='&#' + content.charCodeAt(i) + ';';

    return result;
}
