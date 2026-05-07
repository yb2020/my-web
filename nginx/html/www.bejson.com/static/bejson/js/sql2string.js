function sql2postman() {
    var sqls = document.getElementById("source_textarea").value ;

    if(sqls==''){
        return;
    }
    var sql = sqls.replace(/\n/ig, "");
    sql = sql.replace(/create table ([^\\(]+)+\((.*)\)/ig, '$1##$2');
    sql = sql.split("##");
    var tn = sql[0].trim();
    sql = sql[1];
    var strs = sql.split(",");
    var a = new Array(strs.length);
    var html = "";
    $(strs).each(function (i) {
        if (this.toString().trim() != "") {
            var aa = this.toString().trim().split(/\s+/g)
            var field = aa[0];
            var type = aa[1];
            var reg = new RegExp(/`/, "g");
            field = field.replace(reg, '');
            if(field.toUpperCase()=='UNIQUE'){
                return;
            }
            if(field.toUpperCase()=='PRIMARY'){
                return;
            }
            html += field + ": \r\n";
        }
    });


    document.getElementById("target_textarea").value = html;
}
function sql2form() {
    var sqls = document.getElementById("source_textarea").value ;
    if(sqls==''){
        return;
    }
    var sql = sqls.replace(/\n/ig, "");
    sql = sql.replace(/create table ([^\\(]+)+\((.*)\)/ig, '$1##$2');
    sql = sql.split("##");
    var tn = sql[0].trim();
    //console.log(sql);
    sql = sql[1];
    var strs = sql.split(",");
    var a = new Array(strs.length);
    var html = "<form method='post' action='/' enctype='multipart/form-data'>\r\n";
    $(strs).each(function (i) {
        if (this.toString().trim() != "") {
            var aa = this.toString().trim().split(/\s+/g);
            var  field = aa[0];
            var type = aa[1];
            var reg = new RegExp(/`/, "g");
            field = field.replace(reg, '');
            if(field.toUpperCase()=='UNIQUE'){
                return;
            }
            if(field.toUpperCase()=='PRIMARY'){
                return;
            }
            var json = '{"' + field + '":""}';
            html += "<input type='text' name='" + field + "'>\r\n";
        }
    });
    html += "</form>";


    document.getElementById("target_textarea").value = html;
}

function sql2json() {
    var sqls = document.getElementById("source_textarea").value ;

    if(sqls==''){
        return;
    }
    var sql = sqls.replace(/\n/ig, "");
    sql = sql.replace(/create table ([^\\(]+)+\((.*)\)/ig, '$1##$2');
    sql = sql.split("##");
    var tn = sql[0].trim();
    //console.log(sql);
    sql = sql[1];
    var strs = sql.split(",");
    var a = new Array(strs.length);
    var array = [];
    $(strs).each(function (i) {
        if (this.toString().trim() != "") {
            var aa = this.toString().trim().split(/\s+/g);
            var  field = aa[0];

            var type = aa[1];
            var reg = new RegExp(/`/, "g");
            field = field.replace(reg, '');
            if(field.toUpperCase()=='UNIQUE'){
                return;
            }
            if(field.toUpperCase()=='PRIMARY'){
                return;
            }
            var json = '{"' + field + '":""}';
            array.push(eval("(" + json + ")"));
        }
    });

    document.getElementById("target_textarea").value = formatJson(array);
}