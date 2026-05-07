function demo(){
    editor1.setValue("aaaaaa\nbbbb1bbbb\ncccc");
    editor2.setValue("aaaaaa\nbbbbbbbb\ncccc");

}

function getDif(src,target){
    var difIndex = 0;
    var dif = [];
    for(var i = 0;i < src.length;i++){
        var lc = src[i];
        var isSame = false;
        for(var j = 0;j < target.length;j++){
            var rc = target[j];
            if(lc == rc){
                isSame= true;
                break;
            }
        }

        if(!isSame){
            dif[difIndex++] = lc;
        }
    }
    return dif;
}

$(".txta").change(function(){
    compare();
})

function compare() {
    var txtLeft = editor1.getValue();
    var txtRight = editor2.getValue();
    if(txtLeft == "" || txtRight == ""){

        $("#res").html("左右栏内容不可以为空");
        return;
    }

    var leftcs = txtLeft.split('\n');
    var rightcs = txtRight.split('\n');
    var sameIndex = 0;
    var same = [];

    for(var i = 0;i < leftcs.length;i++){
        var lc = leftcs[i];
        var isSame = false;
        for(var j = 0;j < rightcs.length;j++){
            var rc = rightcs[j];
            if(lc == rc){
                same[sameIndex++]=rc;
                isSame = true;
                break;
            }
        }
    }

    var leftDif = getDif(leftcs,rightcs);
    var rightDif = getDif(rightcs,leftcs);

    var html = "相同的数据:"+same;
    html += "<br/> 左不同:"+leftDif+" <br/>右不同:"+rightDif;
    $("#res").html(html);

}

if (window.top.location.host!="www.bejson.com")
{
  //  window.top.location="http://www.bejson.com/";
}

function Empty() {
    editor1.setValue("");
    editor2.setValue("");
}

function GetFocus() {

}