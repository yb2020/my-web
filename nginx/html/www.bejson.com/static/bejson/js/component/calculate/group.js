var _months = 0;//贷款期限

var _bRepay = 0;//还款方式
var _bizLoan = 0;//贷款金额
var _bizRate = 0;//贷款利率

var _gRepay = 0;//还款方式
var _gjjLoan = 0;//贷款金额
var _gjjRate = 0;//贷款利率

var _fYear = 0;//首次还款年
var _fMonth = 0;//首次还款月

var _default_rate = "4.9";

$(document).ready(function () {

    init();
});

function restore() {
    _months = 0;//贷款期限

    _bRepay = 0;//还款方式
    _bizLoan = 0;//贷款金额
    _bizRate = 0;//贷款利率

    _gRepay = 0;//还款方式
    _gjjLoan = 0;//贷款金额
    _gjjRate = 0;//贷款利率

    _fYear = 0;//首次还款年
    _fMonth = 0;//首次还款月
}

function init() {
    $("#txtFYear").val(getNowYear());
    $("#txtFMonth").val(getNowMonth());
    $("#txtBRate").val(_default_rate);
    $("#txtGRate").val(_default_rate);
    $("#txtMonths").removeAttr("disabled");
}

function btnReportBiz_onclick() {
    if (_bizLoan == 0) {
        msgError("提示：请先计算后，再查看明细表。"); return;
    }

    var url = "";
    url += "RepayType=" + _bRepay;
    url += "&Loan=" + _bizLoan;
    url += "&Months=" + _months;
    url += "&Rate=" + _bizRate;
    url += "&FirstYear=" + _fYear;
    url += "&FirstMonth=" + _fMonth;
    window.open("/detail/t.aspx?" + url);
}

function btnReportGjj_onclick() {
    if (_gjjLoan == 0) {
        msgError("提示：请先计算后，再查看明细表。"); return;
    }
    var url = "";
    url += "RepayType=" + _gRepay;
    url += "&Loan=" + _gjjLoan;
    url += "&Months=" + _months;
    url += "&Rate=" + _gjjRate;
    url += "&FirstYear=" + _fYear;
    url += "&FirstMonth=" + _fMonth;
    window.open("/detail/t.aspx?" + url);
}

function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    init();
    restore();
}


function btnCalc_onclick() {
    restore();
    if (validate() == false) return;
    var bizParam = _bRepay === '0' ? benxiCalc(_bizRate, _months, _bizLoan) : benjinCalc(_bizRate, _months, _bizLoan);
    var gjjParam = _gRepay === '0' ? benxiCalc(_gjjRate, _months, _gjjLoan) : benjinCalc(_gjjRate, _months, _gjjLoan);
    submitSuccess(bizParam, gjjParam);
    createTable(bizParam,gjjParam)
}

function benxiCalc(_rate,_months,_loan) {
    var benxi = {};
    benxi.Loan = parseFloat(_loan);
    var benxiPayment = _rate/12*Math.pow(1+_rate/12, _months)/(Math.pow(1+_rate/12, _months) - 1) * benxi.Loan;
    benxi.Payment = benxiPayment;
    benxi.Interest = 0;
    benxi.InterestArr = [];
    benxi.lastBJ = [benxi.Loan];
    benxi.table = [];
    benxi.Months = _months;
    benxi.Rate = _rate;
    benxi.Decline = 0;
    var monthRate = _rate / 12;
    var firstYear = _fYear;
    var firstMonth = _fMonth;
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
    }
    benxi.Total = benxi.Loan + benxi.Interest;
    return benxi
}

function benjinCalc(_rate,_months,_loan){
    var benjin = {};
    benjin.Loan = parseFloat(_loan);
    var benjinBj = benjin.Loan / _months;
    benjin.Decline = benjinBj * _rate / 12;
    benjin.Payment = 0;
    benjin.lastBJ = [benjin.Loan];
    benjin.Interest = 0;
    benjin.InterestArr = [];
    benjin.PaymentArr = [];
    benjin.table = [];
    benjin.Months = _months;
    benjin.Rate = _rate;
    var monthRate = _rate / 12;
    var firstYear = _fYear;
    var firstMonth = _fMonth;
    for(var i = 0; i < _months; i++) {
        benjin.lastBJ.push(benjin.Loan - (i + 1) * benjinBj);
        benjin.PaymentArr.push(benjinBj + benjin.lastBJ[i] * monthRate);
        var interest2 = benjin.lastBJ[i] * monthRate;
        benjin.Interest += interest2;
        benjin.InterestArr.push(interest2);

        var benjinTable = {
            "sort": i + 1,
            "date": firstYear + '年' + firstMonth + '月',
            "monthPay": benjin.PaymentArr[i],
            "monthInstrest": interest2,
            "monthBJ": benjinBj,
            "monthLast": benjin.lastBJ[i+1]
        };
        benjin.table.push(benjinTable);
    }
    benjin.Payment = benjin.PaymentArr[0];
    benjin.Total = benjin.Loan + benjin.Interest;
    return benjin
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

function submitSuccess(bizParam, gjjParam) {
    var biz = bizParam;
    var gjj = gjjParam;

    SetTextValueFD2("txt_BLoan", biz.Loan);
    SetTextValueFD2("txt_GLoan", gjj.Loan);
    var bRepay = _bRepay == 0 ? "等额本息" : "等额本金";
    var gRepay = _gRepay == 0 ? "等额本息" : "等额本金";
    SetTextValue("txt_BRepay", bRepay);
    SetTextValue("txt_GRepay", gRepay);

    SetTextValueFD2("txt_BMonths", biz.Months);
    SetTextValueFD2("txt_GMonths", gjj.Months);

    SetTextValue("txt_BRate", FormatRate(biz.Rate));
    SetTextValue("txt_GRate", FormatRate(gjj.Rate));

    SetTextValueFD2("txt_BPayment", biz.Payment);
    SetTextValueFD2("txt_GPayment", gjj.Payment);

    SetTextValueFD2("txt_BDecline", biz.Decline);
    SetTextValueFD2("txt_GDecline", gjj.Decline);

    SetTextValueFD2("txt_BInterest", biz.Interest);
    SetTextValueFD2("txt_GInterest", gjj.Interest);

    SetTextValueFD2("txt_BTotal", biz.Total);
    SetTextValueFD2("txt_GTotal", gjj.Total);
}

function validate() {
    try {
        _bRepay = getValueById("selBRepay");
        _gRepay = getValueById("selGRepay");

        _bizLoan = getFloat2("txtBLoan", "贷款金额1", true);
        _gjjLoan = getFloat2("txtGLoan", "贷款金额2", true);

        _months = getMonths("txtMonths", "贷款期限", true);

        _bizRate = getRate("txtBRate", "贷款利率1", true);
        _gjjRate = getRate("txtGRate", "贷款利率2", true);

        _fYear = getYear("txtFYear", "首次还款年份");
        _fMonth = getMonth("txtFMonth", "首次还款月份");

        return true;
    }
    catch (err) {
        msgError(err);
        return false;
    }
}