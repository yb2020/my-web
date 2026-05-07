var fhtml=true;
var fjs=false;
var fcss=false;
var fself=false;

function docheck(obj){
    var thisv=obj.value;
    var set=obj.checked;
    if(thisv==3){
        if (set == 'checked'||set=='true'||set==true) {
            fhtml = false;
            fjs = false;
            fcss = false;
            fself = true;
            document.getElementById('type0').checked=false;
            document.getElementById('type1').checked=false;
            document.getElementById('type2').checked=false;
            $("#place").show();
        }
        else {
            fhtml = true;
            fself = false;
            $("#place").hide();
            document.getElementById('type0').checked=true;

        }
    }else if(thisv==0){
        if (set == 'checked'||set=='true'||set==true) {
            fhtml = true;
            fself = false;
        } else {
            fhtml = false;
        }
    }else if(thisv==1){
        if (set == 'checked'||set=='true'||set==true) {
            fjs = true; fself = false;
        } else {
            fjs = false;
        }
    }else if(thisv==2){
        if (set == 'checked'||set=='true'||set==true) {
            fcss = true; fself = false;
        } else {
            fcss = false;
        }
    }
}

function dofilter() {
    var s = $("#source_textarea").val();
    if (!fhtml && !fjs && !fcss && !fself){
        msgError("请选择过滤类型");
        return;
    }

    if (fjs)
        s = s.replace(/<\s*script[^>]*>(.|[\r\n])*?<\s*\/script[^>]*>/gi, '');
    if (fcss)
        s = s.replace(/<\s*style[^>]*>(.|[\r\n])*?<\s*\/style[^>]*>/gi, '');
    if (fhtml) {
        s = s.replace(/<\/?[^>]+>/g, '');
        s = s.replace(/\&[a-z]+;/gi, '');
    }
    if(fself)
        s = s.replace(new RegExp($("#preplace").val(), 'g'), $("#nextplace").val());
    $("#target_textarea").val(s);
}