var _loan = 0;//贷款金额
var _rate = 0;//贷款利率
var _months = 0;//贷款期限
var _repayType = 0;//还款类型

var _firstYear = 0;//首次还款年
var _firstMonth = 0;//首次还款月
var _findYear = 0;//查询时间年
var _findMonth = 0;//查询时间月

var _monthsPaid = 0;//已还期次

$(document).ready(function () {
    init_values();
    init_default();
});

function init_default() {
    SetTextValue("txtFirstYear", getNowYear());
    SetTextValue("selFirstMonth", getNowMonth());

    SetTextValue("txtFindYear", getNowYear());
    SetTextValue("selFindMonth", getNowMonth());

    $("#txtMonths").removeAttr("disabled");
}

function init_values() {
    _loan = 0;//贷款金额
    _rate = 0;//贷款利率
    _months = 0;//贷款期限
    _repayType = 0;//还款类型

    _firstYear = 0;//首次还款年
    _firstMonth = 0;//首次还款月
    _findYear = 0;//查询时间年
    _findMonth = 0;//查询时间月
    _monthsPaid = 0;//已还期次
}

function btnReport_onclick() {
    if (_loan == 0) {
        alertError({"con": "提示：请先计算后，再查看明细表。"}); return;
    }
    var url = "";
    url += "RepayType=" + _repayType;
    url += "&Loan=" + _loan;
    url += "&Months=" + _months;
    url += "&Rate=" + _rate;
    url += "&FirstYear=" + _firstYear;
    url += "&FirstMonth=" + _firstMonth;
    window.open("/detail/t.aspx?" + url);
}

function clean_results() {
    SetTextEmpty("txt_CapitalPaid");
    SetTextEmpty("txt_InterestPaid");
    SetTextEmpty("txt_TotalPaid");

    SetTextEmpty("txt_EveryMonth");
    SetTextEmpty("txt_FirstMonth");
    SetTextEmpty("txt_Decline");

    SetTextEmpty("txt_InterestLeft");
    SetTextEmpty("txt_CapitalLeft");
    SetTextEmpty("txt_TotalLeft");
}

function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    init_values();
    init_default();
}

function btnCalc_onclick() {
    init_values();
    clean_results();
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
    createTable(benxi,benjin)
}

function submitSuccess(benxi, benjin) {
    //等额本金
    SetTextValue("txt_MonthsPaid2", _monthsPaid);

    SetTextValueFD2("txt_CapitalPaid2", benjin.table[_monthsPaid - 1].monthBJ * parseInt(_monthsPaid));
    SetTextValueFD2("txt_InterestPaid2", benjin.table[_monthsPaid - 1].hasPayInstrest);
    SetTextValueFD2("txt_TotalPaid2", benjin.table[_monthsPaid - 1].hasPayLoan);

    SetTextValueFD2("txt_InterestLeft2", benjin.Interest - benjin.table[_monthsPaid - 1].hasPayInstrest);
    SetTextValueFD2("txt_CapitalLeft2", benjin.table[_monthsPaid - 1].monthLast);
    SetTextValueFD2("txt_TotalLeft2", benjin.table[_monthsPaid - 1].monthLast + benjin.Interest - benjin.table[_monthsPaid - 1].hasPayInstrest);

    //等额本息
    SetTextValue("txt_MonthsPaid", _monthsPaid);

    SetTextValueFD2("txt_CapitalPaid", benxi.Loan - benxi.table[_monthsPaid - 1].monthLast);
    SetTextValueFD2("txt_InterestPaid", benxi.table[_monthsPaid - 1].hasPayInstrest);
    SetTextValueFD2("txt_TotalPaid", benxi.table[_monthsPaid - 1].hasPayLoan);

    SetTextValueFD2("txt_InterestLeft", benxi.Interest - benxi.table[_monthsPaid - 1].hasPayInstrest);
    SetTextValueFD2("txt_CapitalLeft", benxi.table[_monthsPaid - 1].monthLast);
    SetTextValueFD2("txt_TotalLeft", benxi.table[_monthsPaid - 1].monthLast + benxi.Interest - benxi.table[_monthsPaid - 1].hasPayInstrest);
}

function createTable(benxi,benjin) {
    var benxiFragment = document.createDocumentFragment();
    var benjinFragment = document.createDocumentFragment();
    $(benxi.table).each(function(index,item){
        var tr = document.createElement('tr');
        for (key in item) {
            if (key === 'hasPayInstrest' || key === 'hasPayLoan') {
                continue
            }
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
            if (key === 'hasPayInstrest' || key === 'hasPayLoan') {
                continue
            }
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
    try {
        _loan = getFloat2("txtLoan", "贷款金额", true);
        _rate = getRate("txtRate", "贷款利率", true);
        _months = getMonths("txtMonths", "贷款期限", true);
        _repayType = getValueById("selRepayType");

        _firstYear = getYear("txtFirstYear", "首次还款年份");
        _firstMonth = getValueById("selFirstMonth");

        _findYear = getYear("txtFindYear", "查询时间年份");
        _findMonth = getValueById("selFindMonth");

        _monthsPaid = (Number(_findYear) - Number(_firstYear)) * 12 + Number(_findMonth) - Number(_firstMonth) + 1;
        if (_monthsPaid <= 0) {
            alertError({"con": "查询时间不能小于首次还款时间"});
            return false;
        }
        if (_monthsPaid > _months) {
            alertError({"con": "查询时间不能大于贷款期限"});
            return false;
        }
        return true;
    }
    catch (err) {
        alertError({"con":err});
        return false;
    }
}