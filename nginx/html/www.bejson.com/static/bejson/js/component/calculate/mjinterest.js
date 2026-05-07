var _rate = 0;

function btnResetA_onclick() {
    setValueById("txtRate", "12");
    setValueById("selRateType", "360");
    setValueById("txt_Rate", "");
}
function btnResetB_onclick() {
    setValueById("selMao", "0");
    setValueById("selFen", "0");
    setValueById("selLi", "0");
    setValueById("selHao", "0");

    setValueById("txt_DailyRate", "");
    setValueById("txt_MonthlyRate", "");
    setValueById("txt_AnnualRate", "");
}

function btnCalcA_onclick() {
    if (!validate()) return;
    var rate_type = parseInt(getValueById("selRateType"));
    var rate = parseFloat(getValueById("txtRate"));
    var monthInterest = rate * 30 / rate_type
    var mjArr = monthInterest.toString().split('.');
    var mjInterest = (parseInt(mjArr[0])?((parseInt(parseFloat(mjArr[0]) / 100)?parseInt(parseFloat(mjArr[0]) / 100) + '元':'') + (parseInt(parseFloat(mjArr[0]) % 100 / 10)?parseInt(parseFloat(mjArr[0]) % 100 / 10) + '毛':'') +
        (parseInt(parseFloat(mjArr[0]) % 100 % 10 / 1)?parseInt(parseFloat(mjArr[0]) % 100 % 10 / 1)+ '分':'')):'') + (parseInt(mjArr[1])?((parseInt(parseFloat(mjArr[1]) / 10)?parseInt(parseFloat(mjArr[1]) / 10) + '厘':'') +
        (parseInt(parseFloat(mjArr[1]) % 10 / 1)?parseInt(parseFloat(mjArr[1]) % 10 / 1) + '毫':'')):'');
    setValueById("txt_Rate", mjInterest);
}

function btnCalcB_onclick() {
    var mao = getValueById("selMao");
    var fen = getValueById("selFen");
    var li = getValueById("selLi");
    var hao = getValueById("selHao");
    var monthInterest = parseInt(mao)*10 + parseInt(fen) + parseInt(li)*0.1 + parseInt(hao)*0.01;
    setValueById("txt_DailyRate", (monthInterest / 30).toFixed(2));
    setValueById("txt_MonthlyRate", monthInterest);
    setValueById("txt_AnnualRate", monthInterest * 12);
}

function validate() {
    try {
        _rate = getRate("txtRate", "百分比利率", true);
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}