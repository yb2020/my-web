var _loan = 0;
var _months = 0;
var _rate = 0;
var _firstYear = 0;
var _firstMonth = 0;
var _repayType = 0;
var _index = 0;

$(document).ready(function () {
    init();
});

function init() {
    _loan = 0;
    _months = 0;
    _rate = 0;
    _firstYear = 0;
    _firstMonth = 0;
    _repayType = 0;
    _index = 0;
    $("#txtFirstYear").val(getNowYear());
    $("#txtFirstMonth").val(getNowMonth());
    $("#txtMonths").removeAttr("disabled");
}

function btnCalc_onclick() {
    if (!validate()) return;

    var benxi = {},benjin = {};
    benxi.Loan = benjin.Loan = parseFloat(_loan);
    benxi.Months = benjin.Months = _months;
    var benxiPayment = _rate/12*Math.pow(1+_rate/12, _months)/(Math.pow(1+_rate/12, _months) - 1) * _loan;
    var benjinBj = benjin.Loan / _months;
    benjin.Decline = benjinBj * _rate / 12;
    benjin.Payment = [];
    benxi.Payment = benxiPayment;
    benxi.Interest = 0;
    benxi.InterestArr = [];
    benxi.lastBJ = [benxi.Loan];
    benjin.lastBJ = [benjin.Loan];
    benjin.Interest = 0;
    benjin.InterestArr = [];
    benjin.Payment = [];
    benxi.table = [];
    benjin.table = [];
    benxi.loanPay = 0;
    benjin.loanPay = 0;
    var monthRate = _rate / 12;
    var firstYear = parseInt(_firstYear);
    var firstMonth = parseInt(_firstMonth);
    for(var i = 0; i < _months; i++) {
        var benxibenjin = benxi.lastBJ[i];
        var interest = benxibenjin * monthRate;
        benxi.lastBJ.push(benxibenjin - benxiPayment + interest);
        benxi.Interest += interest;
        benxi.InterestArr.push(interest);
        benxi.loanPay += benxiPayment;
        if (firstMonth + 1 > 12) {
            firstYear = firstYear + 1;
            firstMonth = 1;
        } else {
            firstMonth = i > 0 ? firstMonth + 1 : firstMonth;
        }
        var benxiTable = {
            "sort": i + 1,
            "date": firstYear + '年' + firstMonth + '月',
            "monthPay": benxiPayment,
            "monthInstrest": interest,
            "monthBJ": benxiPayment - interest,
            "monthLast": benxi.lastBJ[i+1],
            "hasPayInstrest": benxi.Interest,
            "hasPayLoan": benxi.loanPay
        };
        benxi.table.push(benxiTable);

        benjin.lastBJ.push(benjin.Loan - (i + 1) * benjinBj);
        benjin.Payment.push(benjinBj + benjin.lastBJ[i] * monthRate);
        var interest2 = benjin.lastBJ[i] * monthRate;
        benjin.Interest += interest2;
        benjin.InterestArr.push(interest2);
        benjin.loanPay += benjin.Payment[i];
        var benjinTable = {
            "sort": i + 1,
            "date": firstYear + '年' + firstMonth + '月',
            "monthPay": benjin.Payment[i],
            "monthInstrest": interest2,
            "monthBJ": benjinBj,
            "monthLast": benjin.lastBJ[i+1],
            "hasPayInstrest": benjin.Interest,
            "hasPayLoan": benjin.loanPay
        };
        benjin.table.push(benjinTable);
    }
    benxi.Total = benxi.Loan + benxi.Interest;
    benjin.Total = benjin.Loan + benjin.Interest;
    submitSuccess(benxi, benjin);
}
function submitSuccess(info, info2) {
    var index = parseInt(_index) - 1;
    setValueById("txt_Index", '第'+_index+'期');
    setValueById("txt_All", '总共'+_months+'期');
    setValueById("txt_DateTime", info.table[index].date);
    setValueById("txt_MonthPayment", SetTextValueFD2('', info.table[index].monthPay));
    setValueById("txt_MonthInterest", SetTextValueFD2('', info.table[index].monthInstrest));
    setValueById("txt_InterestPaid", SetTextValueFD2('', info.table[index].hasPayInstrest));
    setValueById("txt_InterestPaidPercent", (info.table[index].hasPayInstrest / info.Interest * 100).toFixed(2));
    setValueById("txt_InterestLeft", SetTextValueFD2('', info.Interest - info.table[index].hasPayInstrest));
    setValueById("txt_InterestTotal", SetTextValueFD2('', info.Interest));
    setValueById("txt_MonthCapital", SetTextValueFD2('', info.table[index].monthBJ));
    setValueById("txt_CapitalPaid", SetTextValueFD2('',info.Loan - info.table[index].monthLast));
    setValueById("txt_CapitalPaidPercent", ((info.Loan - info.table[index].monthLast) / info.Loan * 100).toFixed(2));
    setValueById("txt_CapitalLeft", SetTextValueFD2('', info.table[index].monthLast));
    setValueById("txt_TotalPaid", SetTextValueFD2('', info.table[index].hasPayLoan));
    setValueById("txt_TotalPaidPercent", (info.table[index].hasPayLoan / info.loanPay * 100).toFixed(2));
    setValueById("txt_TotalLeft", SetTextValueFD2('', info.loanPay - info.table[index].hasPayLoan));

    setValueById("txt_Index2", '第'+_index+'期');
    setValueById("txt_All2", '总共'+_months+'期');
    setValueById("txt_DateTime2", info2.table[index].date);
    setValueById("txt_MonthPayment2", SetTextValueFD2('', info2.table[index].monthPay));
    setValueById("txt_MonthInterest2", SetTextValueFD2('', info2.table[index].monthInstrest));
    setValueById("txt_InterestPaid2", SetTextValueFD2('', info2.table[index].hasPayInstrest));
    setValueById("txt_InterestPaidPercent2", (info2.table[index].hasPayInstrest / info2.Interest * 100).toFixed(2));
    setValueById("txt_InterestLeft2", SetTextValueFD2('', info2.Interest - info2.table[index].hasPayInstrest));
    setValueById("txt_InterestTotal2", SetTextValueFD2('', info2.Interest));
    setValueById("txt_MonthCapital2", SetTextValueFD2('', info2.table[index].monthBJ));
    setValueById("txt_CapitalPaid2", SetTextValueFD2('',info2.Loan - info2.table[index].monthLast));
    setValueById("txt_CapitalPaidPercent2", ((info2.Loan - info2.table[index].monthLast) / info2.Loan * 100).toFixed(2));
    setValueById("txt_CapitalLeft2", SetTextValueFD2('', info2.table[index].monthLast));
    setValueById("txt_TotalPaid2", SetTextValueFD2('', info2.table[index].hasPayLoan));
    setValueById("txt_TotalPaidPercent2", (info2.table[index].hasPayLoan / info2.loanPay * 100).toFixed(2));
    setValueById("txt_TotalLeft2", SetTextValueFD2('', info2.loanPay - info2.table[index].hasPayLoan));
}
function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    init();
}

function validate() {
    try {
        _loan = getFloat2("txtLoan", "贷款金额", true);
        _months = getMonths("txtMonths", "贷款期限", true);
        _rate = getRate("txtRate", "贷款利率", true);
        _firstYear = getYear("txtFirstYear", "首次还款时间");
        _firstMonth = getValueById("selFirstMonth");
        _repayType = getValueById("selCalcType");
        _index = getInt("txtIndex", "查询期次", true);
        if (_index > _months)
            throw "查询期次不能超过总期次";
        else if (_index <= 0)
            throw "查询期次应大于零";
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}