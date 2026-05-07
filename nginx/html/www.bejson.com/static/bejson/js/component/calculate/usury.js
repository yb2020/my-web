var _loan = 0;
var _interest = 0;
var _days = 0;


function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
}

function btnCalc_onclick() {
    if (!validate()) return;
    var usuryParam = {};
    usuryParam.dateInterest = (_interest / _loan / _days * 100).toFixed(2);
    usuryParam.monthInterest = (_interest / _loan / _days * 30 * 100).toFixed(2);
    usuryParam.yearInterest = (_interest / _loan / _days * 360 * 100).toFixed(2);
    submitSuccess(usuryParam)
}

function submitSuccess(result) {
    setValueById("txt_IsGaoLiDai", result.yearInterest > 36 ? '是':'否');
    setValueById("txt_AnnualRate", result.yearInterest);
    setValueById("txt_MonthlyRate", result.monthInterest);
    var mjArr = result.monthInterest.toString().split('.');
    var mjInterest = (parseInt(mjArr[0])?((parseInt(parseFloat(mjArr[0]) / 100)?parseInt(parseFloat(mjArr[0]) / 100) + '元':'') + (parseInt(parseFloat(mjArr[0]) % 100 / 10)?parseInt(parseFloat(mjArr[0]) % 100 / 10) + '毛':'') +
        (parseInt(parseFloat(mjArr[0]) % 100 % 10 / 1)?parseInt(parseFloat(mjArr[0]) % 100 % 10 / 1)+ '分':'')):'') + (parseInt(mjArr[1])?((parseInt(parseFloat(mjArr[1]) / 10)?parseInt(parseFloat(mjArr[1]) / 10) + '厘':'') +
        (parseInt(parseFloat(mjArr[1]) % 10 / 1)?parseInt(parseFloat(mjArr[1]) % 10 / 1) + '毫':'')):'');
    setValueById("txt_MingJian_MonthlyRate", mjInterest);
}

function validate() {
    try {
        _loan = getFloat2("txtLoan", "贷款金额", true);
        _interest = getFloat2("txtInterest", "利息总额", true);
        var time = getInt("txtTime", "存入期限", true);
        _days = time * getValueById("selTimeUnit");
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}