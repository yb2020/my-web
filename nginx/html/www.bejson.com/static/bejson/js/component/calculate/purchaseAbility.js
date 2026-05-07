var _cash = 0;//首付现金
var _payment = 0;//预计月供
var _months = 0;//贷款期限
var _rate = 0;//贷款利率
var _area = 0;//房屋面积
var _fYear = 0;//首次还款年
var _fMonth = 0;//首次还款月
var _repay = 0;//还款类型
var _loan = 0;//贷款金额

var _default_rate = "4.9";

$(document).ready(function () {

    init();
});

function restore() {
    _cash = 0;//首付现金
    _payment = 0;//预计月供
    _months = 0;//贷款期限
    _rate = 0;//贷款利率
    _area = 0;//房屋面积
    _fYear = 0;//首次还款年
    _fMonth = 0;//首次还款月
    _repay = 0;//还款类型
    _loan = 0;//贷款金额
}
function init() {
    $("#txtFYear").val(getNowYear());
    $("#txtFMonth").val(getNowMonth());
    $('#txtMonths').removeAttr("disabled");
    $("#txtRate").val(_default_rate);
}

function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    init();
}

function btnReport_onclick() {
    if (_payment == 0) {
        alertError({con: "请先计算后，再查看明细表。"}); return;
    }
    var url = "";
    url += "RepayType=" + _repay;
    url += "&Loan=" + _loan;
    url += "&Months=" + _months;
    url += "&Rate=" + _rate;
    url += "&FirstYear=" + _fYear;
    url += "&FirstMonth=" + _fMonth;
    window.open("/detail/t.aspx?" + url);
}
function btnCalc_onclick() {
    restore();
    if (!validate()) return;
    var benxi = {},benjin = {};
    var monthRate = _rate / 12;
    var firstYear = _fYear;
    var firstMonth = _fMonth;
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
    submitSuccess(benxi.Loan, benjin.Loan);
    createTable(benxi,benjin)
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
function submitSuccess(benxi,benjin) {
    _loan = benxi.toFixed(2);
    _loan2 = benjin.toFixed(2);
    var total = Number(_loan) + Number(_cash);
    $("#txtLoan").val(M(_loan));
    $("#txtTotal").val(M(total));
    $("#txtPrice").val(M(total / _area));

    var total2 = Number(_loan2) + Number(_cash);
    $("#txtLoan2").val(M(_loan2));
    $("#txtTotal2").val(M(total2));
    $("#txtPrice2").val(M(total2 / _area));
}
function validate() {
    try {
        _repay = getValueById("selRepay");

        _cash = getFloat2("txtCash", "首付现金", true);
        _payment = getFloat2("txtPayment", "预计月供", true);
        _area = getFloat2("txtArea", "房屋面积", true);

        _months = getMonths("txtMonths", "贷款期限", true);
        _rate = getRate("txtRate", "贷款利率", true);
        _fYear = getYear("txtFYear", "首次还款年份");
        _fMonth = getMonth("txtFMonth", "首次还款月份");
        return true;
    }
    catch (err) {
        alertError({con: err});
        return false;
    }
}