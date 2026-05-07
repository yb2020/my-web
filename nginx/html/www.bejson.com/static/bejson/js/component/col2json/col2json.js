function c(t,o){
    $("#ctype").val(t);
}
var fgf = /\t/;
function ctyperow(){
    var nob1 = $("#nob").is(':checked');
    fgf = $("#fgfstr").val()||/\t/;
    var ctype = $("#ctype").val();
    var txt = editor.getValue();
    var datas = txt.split("\n");
    var html = "[\n";
    var keys = [];
    for(var i=0;i< datas.length;i++){
        var ds = datas[i].split(fgf);
        if(i==0){

            if(ctype=="0"){
                keys = ds;
            }else{
                html+="[";
                for(var j=0;j<ds.length;j++){
                    html+= '"'+ds[j]+'"';
                    if(j<ds.length-1){
                        html+=",";
                    }
                }
                html+="],\n";
            }
        }else{
            if(ds.length==0)continue;
            if(ds.length==1){
                ds[0]=="";
                continue;
            }
            html+=ctype=="0"?"{":"[";
            for(var j=0;j<ds.length;j++){
                var d = ds[j];
                //if(d=="")continue;
                if(ctype=="0"){
                    html+='"'+keys[j]+'":';
                    if(!nob1 && isNumberOrBoolean(d)){
                        html+=''+d
                    }else{
                        html+='"'+d+'"';
                    }
                }else{
                    if(!nob1 && isNumberOrBoolean(d)){
                        html+=''+d
                    }else{
                        html+='"'+d+'"';
                    }
                }
                if(j<ds.length-1){
                    html+=',';
                }
            }
            html+=ctype=="0"?"}":"]";
            if(i< datas.length-1)
                html+=",\n";
        }


    }
    html += "\n]";
    editor2.setValue(html)
}
