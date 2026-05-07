var _repayType = 0;//还款方式
var _payment = 0;//每月还款
var _months = 0;//贷款期限
var _rate = 0;//贷款利率
var _firstYear = 0;//首次还款年
var _firstMonth = 0;//首次还款月
var _loan = 0;//贷款总额

$(document).ready(function () {
    init();
});

function init() {
    _repayType = 0;//还款方式
    _payment = 0;//每月还款
    _months = 0;//贷款期限
    _rate = 0;//贷款利率
    _firstYear = 0;//首次还款年
    _firstMonth = 0;//首次还款月
    _loan = 0;//贷款总额
    SetTextValue("txtFirstYear", getNowYear());
    SetTextValue("selFirstMonth", getNowMonth());
    $("#txtMonths").removeAttr("disabled");
}

function repayTypeChanged() {
    var repayType = $("#selRepayType").val();
    cleanResults();
    if (repayType == 0) {//本息
        $("#spanPayment")[0].innerHTML = "每月还款";
        $("#span_Payment")[0].innerHTML = "每月还款";
        document.getElementById("tr_Decline").style.display = "none";

    } else {//本金
        $("#spanPayment")[0].innerHTML = "首月还款";
        $("#span_Payment")[0].innerHTML = "首月还款";
        document.getElementById("tr_Decline").style.display = "";
    }
}

function btnReport_onclick() {
    if (_loan == 0) {
        alertError({"con": "提示：请先计算后，再查看明细表。"}); return;
    }
}

function cleanResults() {
    $("#txt_Loan").val("");
    $("#txt_Months").val("");
    $("#txt_Rate").val("");
    $("#txt_Payment").val("");
    $("#txt_Decline").val("");
    $("#txt_Interest").val("");
    $("#txt_Total").val("");
}
function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    init();
}

function btnCalc_onclick() {
    init();
    cleanResults();

    if (!validate()) return;

    var benxi = {},benjin = {};
    var monthRate = _rate / 12;
    var firstYear = _firstYear;
    var firstMonth = _firstMonth;
    _payment = parseFloat(_payment);
    benxi.Loan = _payment / (_rate/12*Math.pow(1+_rate/12, _months)/(Math.pow(1+_rate/12, _months) - 1));
    benxi.Months = _months;
    var benxiPayment = _payment;
    benxi.Payment = benxiPayment;
    benxi.Interest = 0;
    benxi.InterestArr = [];
    benxi.lastBJ = [benxi.Loan];
    benxi.table = [];

    benjin.Loan = parseFloat(_payment) / (1 / _months + _rate / 12);
    benjin.Months = _months;
    var benjinBj = benjin.Loan / _months;
    benjin.Decline = benjinBj * _rate / 12;
    benjin.Payment = [];
    benjin.lastBJ = [benjin.Loan];
    benjin.Interest = 0;
    benjin.InterestArr = [];
    benjin.table = [];

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
    console.log(benxi)
    submitSuccess(benxi, benjin);
    createTable(benxi,benjin)
}
function submitSuccess(benxi,benjin) {
    $("#txt_Loan").val(M(benxi.Loan.toFixed(2)));
    $("#txt_Months").val(benxi.Months);
    $("#txt_Rate").val(FormatRate(_rate));
    $("#txt_Payment").val(M(benxi.Payment));
    // $("#txt_Decline").val(M(loanInfo.Decline.toFixed(2)));
    $("#txt_Interest").val(M(benxi.Interest.toFixed(2)));
    $("#txt_Total").val(M(benxi.Total.toFixed(2)));

    $("#txt_Loan2").val(M(benjin.Loan.toFixed(2)));
    $("#txt_Months2").val(benjin.Months);
    $("#txt_Rate2").val(FormatRate(_rate));
    $("#txt_Payment2").val(M(benjin.Payment[0]));
    $("#txt_Decline2").val(M(benjin.Decline.toFixed(2)));
    $("#txt_Interest2").val(M(benjin.Interest.toFixed(2)));
    $("#txt_Total2").val(M(benjin.Total.toFixed(2)));
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
    init();
    try {
        _repayType = getValueById("selRepayType");

        if (_repayType == 0)
            _payment = getFloat2("txtPayment", "每月还款", true);
        else
            _payment = getFloat2("txtPayment", "首月还款", true);

        _months = getMonths("txtMonths", "贷款期限", true);
        _rate = getRate("txtRate", "贷款利率", true);
        _firstYear = getYear("txtFirstYear", "首次还款时间", true);
        _firstMonth = getValueById("selFirstMonth");
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}