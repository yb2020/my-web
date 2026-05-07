function timestamp(){
    $("input[name='rdtimeUnix']").on("click", function(){
        if($(this).val() == 10)
        {
            var tmp_now_time = Math.round(new Date().getTime()/1000)+"";
            $('#unixtime').val(tmp_now_time);
            set_now_time(tmp_now_time);
            $('#msecond').hide();
            $('#spmsecond').hide();
        } else {
            var tmp_now_time = Math.round(new Date().getTime())+"";
            $('#unixtime').val(tmp_now_time);
            set_now_time(tmp_now_time);
            $('#msecond').show();
            $('#spmsecond').show();
        }
    });

    setInterval(function(){
        if($("input[name='rdtimeUnix']:checked").val() == 10)
        {
            $('#now_timestamp').val(Math.round(new Date().getTime()/1000));
        } else {
            $('#now_timestamp').val(Math.round(new Date().getTime()));
        }
    },1000);
    function timestamptostr(timestampStr) {
        var  timestamp = parseInt(timestampStr);

        if(timestampStr.length<11){
            timestamp = timestampStr * 1000;
        }
        d = new Date(timestamp);
        var _month = d.getMonth()+1;
        if(_month<10){
            _month = "0"+_month;
        }

        var _date = d.getDate();
        if(_date<10){
            _date = "0"+_date;
        }

        var _hour = d.getHours();
        if(_hour<10){
            _hour = "0"+_hour;
        }

        var _minite = d.getMinutes();
        if(_minite<10){
            _minite = "0"+_minite;
        }

        var _sec = d.getSeconds();
        if(_sec<10){
            _sec = "0"+_sec;
        }

        var _msec = d.getMilliseconds();
        if(_msec<10){
            _msec = "00"+_msec;
        } else if(_msec < 100) {
            _msec = "0"+_msec;
        }

        //var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+(d.getDate())+" "+(d.getHours())+":"+(d.getMinutes())+":"+(d.getSeconds())+":"+(d.getMilliseconds());
        var jstimestamp = (d.getFullYear())+"-"+_month+"-"+_date+" "+_hour+":"+_minite+":"+_sec;
        if($("input[name='rdtimeUnix']:checked").val() == 13)
        {
            jstimestamp += " "+_msec;
        }
        return jstimestamp;
    }
    $('#unixtime').val(Math.round(new Date().getTime()/1000));

    $('#toGMT').click(function(){
        if ($('#unixtime').val() === null || $('#unixtime').val() === undefined || $('#unixtime').val() === '') {
            msgError('请输入时间戳');
            $('#result_GMT').val('');
            return
        }
        $('#result_GMT').val(timestamptostr($('#unixtime').val()));
    });


    function set_now_time(t_now_strTime) {
        var now_strTime = timestamptostr(t_now_strTime);
        var arr = new Array();
        arr = now_strTime.split(' ');
        YMD = arr[0].split('-');
        HIS = arr[1].split(':');
        $('#year').val(YMD[0]);
        $('#month').val(YMD[1]);
        $('#day').val(YMD[2]);
        $('#hour').val(HIS[0]);
        $('#minute').val(HIS[1]);
        $('#second').val(HIS[2]);
        if(arr[2]){
            $('#msecond').val(arr[2]);
        }
    }

    set_now_time(Math.round(new Date().getTime()/1000)+"");
    $('#toUNIX').click(function(){
        if ($('#year').val()===null||$('#year').val()===undefined||$('#year').val()===''){
            msgError('请输入年');
            $('#result_unix').val('');
            return;
        }
        if ($('#month').val()===null||$('#month').val()===undefined||$('#month').val()===''){
            msgError('请输入月');
            $('#result_unix').val('');
            return;
        }
        if ($('#day').val()===null||$('#day').val()===undefined||$('#day').val()===''){
            msgError('请输入日');
            $('#result_unix').val('');
            return;
        }
        if ($('#hour').val()===null||$('#hour').val()===undefined||$('#hour').val()===''){
            msgError('请输入时');
            $('#result_unix').val('');
            return;
        }
        if ($('#minute').val()===null||$('#minute').val()===undefined||$('#minute').val()===''){
            msgError('请输入分');
            $('#result_unix').val('');
            return;
        }
        if ($('#second').val()===null||$('#second').val()===undefined||$('#second').val()===''){
            msgError('请输入秒');
            $('#result_unix').val('');
            return;
        }


        if($("input[name='rdtimeUnix']:checked").val() == 10)
        {
            var utime = new Date(Date.UTC($('#year').val(), $('#month').val() - 1, $('#day').val(), $('#hour').val()-8, $('#minute').val(), $('#second').val()));
            $('#result_unix').val(utime.getTime()/1000);
        } else {
            if ($('#msecond').val()===null||$('#msecond').val()===undefined||$('#msecond').val()===''){
                msgError('请输入毫秒');
                $('#result_unix').val('');
                return;
            }
            var utime = new Date(Date.UTC($('#year').val(), $('#month').val() - 1, $('#day').val(), $('#hour').val()-8, $('#minute').val(), $('#second').val(), $('#msecond').val()));
            $('#result_unix').val(utime.getTime());
        }
    })
}

$(function(){
    timestamp();
});
// 复制
new ClipboardJS('#copyTimestamp', {
    text: function (trigger) {
        if ($('#now_timestamp').val()) {
            msgSuccess('复制成功');
            return $('#now_timestamp').val();
        } else {
            return false;
        }
    }
});
new ClipboardJS('#copyResultGmt', {
    text: function (trigger) {
        if ($('#result_GMT').val()) {
            msgSuccess('复制成功');
            return $('#result_GMT').val();
        } else {
            return false;
        }
    }
});
new ClipboardJS('#copyResultUnix', {
    text: function (trigger) {
        if ($('#result_unix').val()) {
            msgSuccess('复制成功');
            return $('#result_unix').val();
        } else {
            return false;
        }
    }
});