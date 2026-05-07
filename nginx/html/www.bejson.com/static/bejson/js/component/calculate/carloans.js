var _loan = 0;//贷款金额
var _months = 0;//贷款期限
var _rate = 0;//贷款利率
var _fYear = 0;//首次还款年
var _fMonth = 0;//首次还款月
var _payment = 0;//首月还款额

var _default_rate = "6.0";

function restore() {
    _loan = 0;
    _months = 0;
    _rate = 0;
    _fYear = 0;
    _fMonth = 0;
}

function init() {

    $("#txtFYear").val(getNowYear());
    $("#selFMonth").val(getNowMonth());
    $("#txtRate").val(_default_rate);
    $("#txtMonths").removeAttr("disabled");
    SetCssName("trLoan", "show");
    SetCssName("trPayment", "hidden");
    SetCssName("trPrice", "hidden");
    SetCssName("trPercent", "hidden");
    SetCssName("tr_Cash", "hidden");
}

$(document).ready(function () {
    init();
});

function clear_calc_results() {
    SetTextEmpty("txt_Cash");

    SetTextEmpty("txt_XLoan");
    SetTextEmpty("txt_XMonths");
    SetTextEmpty("txt_XPayment");
    SetTextEmpty("txt_XInterest");
    SetTextEmpty("txt_XTotal");

    SetTextEmpty("txt_Diff");

    SetTextEmpty("txt_JLoan");
    SetTextEmpty("txt_JMonths");
    SetTextEmpty("txt_JPayment");
    SetTextEmpty("txt_JDecline");
    SetTextEmpty("txt_JInterest");
    SetTextEmpty("txt_JTotal");
}
function selCalcItem_onchange() {
    clear_calc_results();
    var value = getValueById("selCalcItem");
    if (value == 0) {//按贷款金额计算
        SetCssName("trLoan", "show");
        SetCssName("trPayment", "hidden");
        SetCssName("trPrice", "hidden");
        SetCssName("trPercent", "hidden");
        SetCssName("tr_Cash", "hidden");
    } else if (value == 1) {
        //按首月还款额计算
        SetCssName("trLoan", "hidden");
        SetCssName("trPayment", "show");
        SetCssName("trPrice", "hidden");
        SetCssName("trPercent", "hidden");
        SetCssName("tr_Cash", "hidden");
    }
    else {//按首付比例计算
        SetCssName("trLoan", "hidden");
        SetCssName("trPayment", "hidden");
        SetCssName("trPrice", "show");
        SetCssName("trPercent", "show");
        SetCssName("tr_Cash", "show");
    }
}

function btnReport_onclick(repay) {
    if (_fMonth == 0) {
        alertError({"con": "提示：请先计算后，再查看明细表。"}); return;
    }
    var url = "";
    url += "RepayType=" + repay;
    url += "&Loan=" + _loan;
    url += "&Months=" + _months;
    url += "&Rate=" + _rate;
    url += "&FirstYear=" + _fYear;
    url += "&FirstMonth=" + _fMonth;
    window.open("/detail/t.aspx?" + url);
}

function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    init();
}

function btnCalc_onclick() {
    restore();
    if (!validate()) return;
    var benxi = {},benjin = {};
    benxi.Loan = benjin.Loan = parseFloat(_loan);
    benxi.Months = benjin.Months = _months;
    var benxiPayment = _rate/12*Math.pow(1+_rate/12, _months)/(Math.pow(1+_rate/12, _months) - 1) * _loan;
    var benjinBj = benjin.Loan / _months;
    benjin.Decline = benjinBj * _rate / 12;
    benjin.Payment = [];
    if (getValueById("selCalcItem") === '1') {
        benxiPayment = parseFloat(_payment);
        benxi.Loan = benxiPayment / (_rate/12*Math.pow(1+_rate/12, _months)/(Math.pow(1+_rate/12, _months) - 1));

        benjin.Loan = parseFloat(_payment) / (1 / _months + _rate / 12);
        benjinBj = benjin.Loan / _months;
        benjin.Decline = benjinBj * _rate / 12;
    }
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
    var monthRate = _rate / 12;
    var firstYear = parseInt($('#txtFYear').val());
    var firstMonth = parseInt($('#selFMonth').val());
    for(var i = 0; i < _months; i++) {
        var benxibenjin = benxi.lastBJ[i];
        var interest = benxibenjin * monthRate;
        benxi.lastBJ.push(benxibenjin - benxiPayment + interest);
        benxi.Interest += interest;
        benxi.InterestArr.push(interest);
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
            "monthLast": benxi.lastBJ[i+1]
        };
        benxi.table.push(benxiTable);

        benjin.lastBJ.push(benjin.Loan - (i + 1) * benjinBj);
        benjin.Payment.push(benjinBj + benjin.lastBJ[i] * monthRate);
        var interest2 = benjin.lastBJ[i] * monthRate;
        benjin.Interest += interest2;
        benjin.InterestArr.push(interest2);

        var benjinTable = {
            "sort": i + 1,
            "date": firstYear + '年' + firstMonth + '月',
            "monthPay": benjin.Payment[i],
            "monthInstrest": interest2,
            "monthBJ": benjinBj,
            "monthLast": benjin.lastBJ[i+1]
        };
        benjin.table.push(benjinTable);
    }
    benxi.Total = benxi.Loan + benxi.Interest;
    benjin.Total = benjin.Loan + benjin.Interest;
    submitSuccess(benxi, benjin);
    createTable(benxi,benjin)
}
function submitSuccess(benxi,benjin) {
    if (_cash !== 0)
        SetTextValueFD2("txt_Cash", _cash);

    SetTextValueFD2("txt_XLoan", benxi.Loan);
    SetTextValueInt32("txt_XMonths", benxi.Months);
    SetTextValueFD2("txt_XPayment", benxi.Payment);
    SetTextValueFD2("txt_XInterest", benxi.Interest);
    SetTextValueFD2("txt_XTotal", benxi.Total);

    var diff = benxi.Interest - benjin.Interest;
    SetTextValueFD2("txt_Diff", diff);

    SetTextValueFD2("txt_JLoan", benjin.Loan);
    SetTextValueInt32("txt_JMonths", benjin.Months);
    SetTextValueFD2("txt_JPayment", benjin.Payment[0]);
    SetTextValueFD2("txt_JDecline", benjin.Decline);
    SetTextValueFD2("txt_JInterest", benjin.Interest);

    SetTextValueFD2("txt_JTotal", benjin.Total);
}

function createTable(benxi,benjin) {
    var benxiFragment = document.createDocumentFragment();
    var benjinFragment = document.createDocumentFragment();
    $(benxi.table).each(function(index,item){
        var tr = document.createElement('tr');
        for (key in item) {
            var td = document.createElement('td');
            if (key === 'sort' || key === 'date') {
                td.innerText = item[key];
            } else {
                td.innerText = SetTextValueFD2('', item[key]);
            }

            tr.appendChild(td);
        }

        benxiFragment.appendChild(tr)
    });
    $('#loanExcelBX').html('');
    $('#loanExcelBX').append(benxiFragment);
    $(benjin.table).each(function(index,item){
        var tr = document.createElement('tr');
        for (key in item) {
            var td = document.createElement('td');
            if (key === 'sort' || key === 'date') {
                td.innerText = item[key];
            } else {
                td.innerText = SetTextValueFD2('', item[key]);
            }

            tr.appendChild(td);
        }

        benjinFragment.appendChild(tr)
    });
    $('#loanExcelBJ').html('');
    $('#loanExcelBJ').append(benjinFragment);
}

function validate() {
    _loan = 0;
    _months = 0;
    _rate = 0;
    _fYear = 0;
    _fMonth = 0;
    _payment = 0;
    _cash = 0;

    try {
        var calcItem = getValueById("selCalcItem");
        if (calcItem == 0) {//按贷款金额计算
            _loan = getFloat2("txtLoan", "贷款金额", true);
        }
        else if (calcItem == 1) {//按首月还款额计算
            _payment = getFloat2("txtPayment", "首月还款额", true);
        }
        else {
            //按首付比例计算
            var price = getFloat2("txtPrice", "裸车价格", true);
            var percent = getFloat2("txtPercent", "首付比例", true);
            _cash = Number(price) * Number(percent) / 100;
            _loan = price - _cash;
        }

        _months = getValueById("selYears");
        _rate = getRate("txtRate", "贷款利率", true);

        _fYear = getYear("txtFYear", "首次还款年份");
        _fMonth = getValueById("selFMonth");
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}