var _myIncome = 0;
var _yourIncome = 0;
var _myRate = 0;
var _yourRate = 0;
var _housePrice = 0;

function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
}

function btnCalc_onclick() {
    calc();
}

function validate() {

    try {
        _myIncome = getFloat("#txtMyIncome", "您的月缴存额", true);
        _myRate = getFloat("#txtMyRate", "您的缴存比例", true);

        _yourIncome = getFloat("#txtYourIncome", "配偶月缴存额", false);
        _yourRate = getFloat("#txtYourRate", "配偶缴存比例", false);

        _housePrice = getFloat("#txtHousePrice", "房屋总价", true) * 10000;
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}

function calc() {
    if (!validate()) return;
    _myRate = _myRate / 100;
    _yourRate = _yourRate / 100;

    var monthIncome;
    if (_yourIncome == 0) {
        monthIncome = _myIncome / _myRate;
    }
    else {
        monthIncome = _myIncome / _myRate + _yourIncome / _yourRate;
    }

    if (monthIncome < 400) {
        alertError({"con": "家庭月收入低于400元，不符合贷款条件！"});
        return;
    }

    //政策性住房  其他
    var houseType = $("#selHouseType").val();
    //个人信用等级：	AAA级  AA级  其他
    var level = $("#selLevel").val();

    var monthRate = 0;    // 月利率
    var year = $("#selYears").val();
    if (year > 5) { monthRate = 0.0490 / 12; }//五年以上
    else { monthRate = 0.0475 / 12; }//五年以下

    //每月还款 等额本息
    var pay_monthly = (monthRate * Math.pow(1 + monthRate, 12 * year)) / (Math.pow(1 + monthRate, 12 * year) - 1);
    var max_loan_a = Math.min(Math.round((monthIncome - 400) / pay_monthly), 800000);
    var max_loan_b = Math.round(max_loan_a * level * 10) / 10;
    var max_loan_c = Math.round(_housePrice * houseType * 10) / 10;
    var max_loan = Math.floor(Math.min(max_loan_b, max_loan_c) / 10000 * 10) / 10; //最高贷款额度(万元)

    $("#txt_MaxLoan").val(max_loan);
}
function init() {

}

$(document).ready(function () {
    init();
});