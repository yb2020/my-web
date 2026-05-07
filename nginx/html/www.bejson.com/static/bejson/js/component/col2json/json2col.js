var fgf = ",";

function ctyperow() {
    fgf = $("#fgfstr").val() || ',';
    var instr = $("#in").val();
    var jsons = JSON.parse(editor.getValue());
    if (jsons.length < 1) {
        alert("数组小于一行数据");
        return;
    }
    var titles = new Array();
    for (var key in jsons[0]) {
        titles.push(key);
    }

    var values = new Array();
    for (var i = 0, l = jsons.length; i < l; i++) {
        var value = new Array();
        for (var key in jsons[i]) {

            value.push(jsons[i][key]);
        }
        values.push(value);
    }

    var html = '';
    html += titles.join(fgf) + "\n"
    for (var i = 0; i < values.length; i++) {
        html += values[i].join(fgf) + "\n";
    }
    editor2.setValue(html)
}
