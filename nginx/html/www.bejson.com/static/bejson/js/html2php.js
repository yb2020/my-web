
function html2php() {
    var val = document.getElementById('source_textarea').value;
    var res = "\<?php\necho \"" + val.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n').join("\\n\";\necho \"") + "\\n\";\n?>";

    document.getElementById("target_textarea").value=res;
}

function php2html() {
    var val = document.getElementById('source_textarea').value;
    var res = val.replace(/echo \"/g, "").replace(/\\n\";/g, "").replace('\<?php\n', '').replace('\n?>', '').replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\");

    document.getElementById("target_textarea").value=res;
}

function html2asp(){

    var val = document.getElementById('source_textarea').value;
    var  res= "<%\nResponse.Write \"" + val.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n').join("\";\nResponse.Write \"") + "\";\n%>";

    document.getElementById("target_textarea").value=res;
}

function html2perl(){

    var val = document.getElementById('source_textarea').value;
    var res = "print \"" + val.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n').join("\\n\";\nprint \"") + "\\n\";";

    document.getElementById("target_textarea").value=res;
}
function html2vbnet(){

    var val = document.getElementById('source_textarea').value;
    var res = "<%\nResponse.Write(\"" + val.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n').join("\");\nResponse.Write(\"") + "\");\n%>";

    document.getElementById("target_textarea").value=res;
}
function html2jsp(){

    var val = document.getElementById('source_textarea').value;
    var res = "<%\nout.println(\"" + val.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n').join("\");\nout.println(\"") + "\");\n%>";

    document.getElementById("target_textarea").value=res;
}

function asp2html(){

    var val = document.getElementById('source_textarea').value;
    var res = val.replace(/Response.Write \"/g, "").replace(/\";/g, "").replace('<%\n', '').replace('\n%>', '').replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\");
    document.getElementById("target_textarea").value=res;
} function jsp2html(){

    var val = document.getElementById('source_textarea').value;
    var res = val.replace(/out.println\("/g, "").replace(/"\);/g, "").replace('<%\n', '').replace('\n%>', '').replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\");
    document.getElementById("target_textarea").value=res;
}

function perl2html(){

    var val = document.getElementById('source_textarea').value;
    var res = val.replace(/print "/g, "").replace(/\\n";/g, "").replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\");
    document.getElementById("target_textarea").value=res;
}
function vbnet2html(){

    var val = document.getElementById('source_textarea').value;
    var res = val.replace(/Response.Write\("/g, "").replace(/"\);/g, "").replace('<%\n', '').replace('\n%>', '').replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\");
    document.getElementById("target_textarea").value=res;
}
