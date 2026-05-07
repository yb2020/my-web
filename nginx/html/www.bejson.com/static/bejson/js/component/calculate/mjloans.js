var _loan = 0;//贷款金额:
var _months = 0;//贷款期限
var _monthRate = 0;//月息
var _fYear = 0;//首次还款年
var _fMonth = 0;//首次还款月

function init() {
    _loan = 0;
    _months = 0;
    _monthRate = 0;
    _fYear = 0;
    _fMonth = 0;
}

$(document).ready(function(){
    $("#txtFYear").val(getNowYear());
    $("#selFMonth").val(getNowMonth());
});

function btnReport_onclick() {
    if (_loan == 0) {
        alertError({"con": "提示：请先计算后，再查看明细表。"}); return;
    }
    var repay = getValueById("selRepay");
    var rate = _monthRate * 12;
    var url = "";
    url += "RepayType=" + repay;
    url += "&Loan=" + _loan;
    url += "&Months=" + _months;
    url += "&Rate=" + rate;
    url += "&FirstYear=" + _fYear;
    url += "&FirstMonth=" + _fMonth;
    window.open("/detail/t.aspx?" + url);
}
function selRepay_onchange() {
    cleanResults();
    var repay = getValueById("selRepay");
    if (repay == 2) {//按月付息，到期还本
        elementDisplay("trFDate", "none");
        elementDisplay("tr_Payment", "none");
        elementDisplay("tr_Decline", "none");
        elementDisplay("tr_MInterest", "");
        elementDisplay("tr_Report", "none");
    }
    else if (repay == 3) {//一次偿还本金和利息
        elementDisplay("trFDate", "none");
        elementDisplay("tr_Payment", "none");
        elementDisplay("tr_Decline", "none");
        elementDisplay("tr_MInterest", "none");
        elementDisplay("tr_Report", "none");
    }
    else if (repay == 0) {//等额本息还款
        elementDisplay("trFDate", "");
        elementDisplay("tr_Payment", "");
        document.getElementById("span_Payment").innerHTML = "每月还款";
        elementDisplay("tr_Decline", "none");
        elementDisplay("tr_MInterest", "none");
        elementDisplay("tr_Report", "");
    }
    else {//等额本金还款
        elementDisplay("trFDate", "");
        elementDisplay("tr_Payment", "");
        document.getElementById("span_Payment").innerHTML = "首月还款";
        elementDisplay("tr_Decline", "");
        elementDisplay("tr_MInterest", "none");
        elementDisplay("tr_Report", "");
    }
}
function cleanResults() {
    $("#txt_Loan").val("");
    $("#txt_Months").val("");
    $("#txt_MonthRate").val("");
    $("#txt_YearRate").val("");
    $("#txt_Repay").val("");
    $("#txt_Payment").val("");
    $("#txt_FMonth").val("");
    $("#txt_Decline").val("");
    $("#txt_MInterest").val("");
    $("#txt_Interest").val("");
    $("#txt_Total").val("");
}
function btnReset_onclick() {
    init();
    $("input[type=reset]").trigger("click");
    elementDisplay("trFDate", "none");
    elementDisplay("tr_Payment", "none");
    elementDisplay("tr_Decline", "none");
    elementDisplay("tr_MInterest", "");
    elementDisplay("tr_Report", "none");
    $("#txtFYear").val(getNowYear());
    $("#selFMonth").val(getNowMonth());
}
function getRepayName() {
    var repay = Number(getValueById("selRepay"));
    if (repay == 2) { return "按月付息，到期还本"; }
    else if (repay == 3) { return "一次偿还本金和利息"; }
    else if (repay == 0) { return "等额本息还款"; }
    else { return "等额本金还款"; }
}
function btnCalc_onclick() {
    init();
    cleanResults();
    if (!validate()) return;
    //贷款总额
    $("#txt_Loan").val(M(_loan));
    //贷款期限
    $("#txt_Months").val(_months);
    //月利率
    $("#txt_MonthRate").val(FormatRate(_monthRate));
    //年利率
    var yearRate = _monthRate * 12;
    $("#txt_YearRate").val(FormatRate(yearRate));
    //还款方式
    $("#txt_Repay").val(getRepayName());

    var repay = Number(getValueById("selRepay"));
    //2:按月付息，到期还本
    //3:一次偿还本金和利息
    if (repay == 2 || repay == 3) {
        var monthInterest = _loan * _monthRate;
        var interest = monthInterest * _months;
        var total = Number(_loan) + Number(interest);

        $("#txt_MInterest").val(M(monthInterest.toFixed(2)));
        $("#txt_Interest").val(M(interest.toFixed(2)));
        $("#txt_Total").val(M(total.toFixed(2)));
        return;
    }
    var _rate = _monthRate * 12;
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
function submitSuccess(benxi, benjin) {
    var repay = Number(getValueById("selRepay"));

    if (repay == 0) {
        //等额本息还款
        $("#txt_Payment").val(M(benxi.Payment.toFixed(2)));
        $("#txt_Interest").val(M(benxi.Interest.toFixed(2)));
        $("#txt_Total").val(M(benxi.Total.toFixed(2)));
    }
    else {
        //等额本金还款
        $("#txt_Payment").val(M(benjin.Payment[0].toFixed(2)));
        $("#txt_Decline").val(M(benjin.Decline.toFixed(2)));
        $("#txt_Interest").val(M(benjin.Interest.toFixed(2)));
        $("#txt_Total").val(M(benjin.Total.toFixed(2)));
    }
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
    try {
        _loan = getFloat2("txtLoan", "贷款金额", true);
        _months = getInt("txtMonths", "贷款期限", true);
        _monthRate = getRate("txtMonthRate", "月息", true);
        var repay = getValueById("selRepay");
        if (repay == 0 || repay == 1) {
            _fYear = getYear("txtFYear", "首次还款时间");
            _fMonth = getValueById("selFMonth");
        }
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}