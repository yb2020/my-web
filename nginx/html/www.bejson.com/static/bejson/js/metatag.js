function dogen() {
    var html = '';

    if ($("#titles").val() != "") {
        html += "<META NAME=\"Title\" CONTENT=\"" + $("#titles").val() + "\">\n";
    }
    if ($("#author").val() != "") {
        html += "<META NAME=\"Author\" CONTENT=\"" + $("#author").val() + "\">\n";
    }
    if ($("#subject").val() != "") {
        html += "<META NAME=\"Subject\" CONTENT=\"" + $("#subject").val() + "\">\n";
    }
    if ($("#descript").val() != "") {
        html += "<META NAME=\"Description\" CONTENT=\"" + $("#descript").val() + "\">\n";
    }
    if ($("#keyword").val() != "") {
        html += "<META NAME=\"Keywords\" CONTENT=\"" + $("#keyword").val() + "\">\n";
    }
    if ($("#gen").val() != "") {
        html += "<META NAME=\"Generator\" CONTENT=\"" + $("#gen").val() + "\">\n";
    }
    if ($("#input7").val() != "") {
        html += "<META NAME=\"Language\" CONTENT=\"" + $("#input7").val() + "\">\n";
    }
    if ($("#input8").val() != "") {
        html += "<META NAME=\"Expires\" CONTENT=\"" + $("#input8").val() + "\">\n";
    }
    if ($("#input9").val() != "") {
        html += "<META NAME=\"Abstract\" CONTENT=\"" + $("#input9").val() + "\">\n";
    }
    if ($("#input10").val() != "") {
        html += "<META NAME=\"Copyright\" CONTENT=\"?" + $("#input10").val() + "\">\n";
    }
    if ($("#input11").val() != "") {
        html += "<META NAME=\"Designer\" CONTENT=\"" + $("#input11").val() + "\">\n";
    }
    if ($("#input12").val() != "") {
        html += "<META NAME=\"Publisher\" CONTENT=\"" + $("#input12").val() + "\">\n";
    }
    if ($("#input13").val() != "") {
        html += "<META NAME=\"Revisit-After\" CONTENT=\"" + $("#input13").val() + " \Days\">\n";
    }
    if ($("#input14").val() != "") {
        html += "<META NAME=\"Distribution\" CONTENT=\"" + $("#input14").val() + "\">\n";
    }
    if ($("#input15").val() != "") {
        html += "<META NAME=\"Robots\" CONTENT=\"" + $("#input15").val() + "\">\n";
    }
    $('#target_textarea').val(html);
}
function HTMLEnCode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/    /g, "&nbsp;");
    s = s.replace(/\'/g, "'");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}