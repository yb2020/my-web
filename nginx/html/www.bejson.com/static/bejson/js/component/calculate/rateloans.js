var _loan = 0;//贷款金额
var _months = 0;//贷款期限
var _rate = 0;//原贷款利率
var _firstYear = 0;//贷款时间年
var _firstMonth = 0;//贷款时间月
var _newRate = 0;//新贷款利率
var _newYear = 0;//变动时间年
var _newMonth = 0;//变动时间月
var _monthsPaid = 0;//已还期次

$(document).ready(function () {
    init();
});

function init() {
    _loan = 0;
    _months = 0;
    _rate = 0;
    _firstYear = 0;
    _firstMonth = 0;
    _newRate = 0;
    _newYear = 0;
    _newMonth = 0;
    _monthsPaid = 0;

    SetTextValue("txtFirstYear", getNowYear());
    SetTextValue("selFirstMonth", getNowMonth());

    SetTextValue("txtNewYear", getNowYear());
    SetTextValue("selNewMonth", getNowMonth());

    $("#txtMonths").removeAttr("disabled");
}
function cleanResults() {
    SetTextEmpty("txt_MonthsPaid");
    SetTextEmpty("txt_CapitalPaid");
    SetTextEmpty("txt_CapitalLeft");
    SetTextEmpty("txt_Diff");

    SetTextEmpty("txt_Payment");
    SetTextEmpty("txt_Decline");
    SetTextEmpty("txt_Interest");
    SetTextEmpty("txt_Total");

    SetTextEmpty("txt_NewPayment");
    SetTextEmpty("txt_NewDecline");
    SetTextEmpty("txt_NewInterest");
    SetTextEmpty("txt_NewTotal");
}
function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    init();
}
function btnCalc_onclick() {
    cleanResults();
    if (!validate()) return;
    var benxi = {},benjin = {};
    benxi.Loan = benjin.Loan = parseFloat(_loan);
    benxi.Months = benjin.Months = _months;
    var benxiPayment = _rate/12*Math.pow(1+_rate/12, _months)/(Math.pow(1+_rate/12, _months) - 1) * _loan;
    var benjinBj = benjin.Loan / _months;
    benjin.Decline = benjinBj * _rate / 12;
    benjin.Decline2 = benjinBj * _newRate / 12;
    benjin.Payment = [];
    benxi.Payment = benxiPayment;
    benxi.Interest = 0;
    benxi.InterestBefore = 0;
    benxi.InterestAfter = 0;
    benxi.InterestArr = [];
    benxi.lastBJ = [benxi.Loan];
    benjin.lastBJ = [benjin.Loan];
    benjin.Interest = 0;
    benjin.InterestBefore = 0;
    benjin.InterestAfter = 0;
    benjin.InterestArr = [];
    benjin.Payment = [];
    benxi.table = [];
    benjin.table = [];
    benxi.loanPay = 0;
    benjin.loanPay = 0;
    benxi.loanPayAfter = 0;
    benjin.loanPayAfter = 0;
    benxi.loanPayBefore = 0;
    benjin.loanPayBefore = 0;
    var monthRate = _rate / 12;
    var monthRate2 = _newRate / 12;
    var firstYear = parseInt(_firstYear);
    var firstMonth = parseInt(_firstMonth);
    var newYear = parseInt(_newYear);
    var newMonth = parseInt(_newMonth);
    for(var i = 0; i < _months; i++) {
        var benxibenjin = benxi.lastBJ[i];

        if (firstMonth + 1 > 12) {
            firstYear = firstYear + 1;
            firstMonth = 1;
        } else {
            firstMonth = i > 0 ? firstMonth + 1 : firstMonth;
        }
        if (firstYear === newYear && firstMonth === newMonth) {
            benxiPayment = _newRate/12*Math.pow(1+_newRate/12, _months - _monthsPaid)/(Math.pow(1+_newRate/12, _months - _monthsPaid) - 1) * benxibenjin;
        }
        if ((firstYear === newYear && firstMonth >= newMonth) || firstYear > newYear) {
            var interest = benxibenjin * monthRate2;
            benxi.lastBJ.push(benxibenjin - benxiPayment + interest);
            benxi.Interest += interest;
            benxi.InterestAfter += interest;
            benxi.InterestArr.push(interest);
            benxi.loanPay += benxiPayment;
            benxi.loanPayAfter += benxiPayment;
            var benxiTable2 = {
                "sort": i + 1,
                "date": firstYear + '年' + firstMonth + '月',
                "monthPay": benxiPayment,
                "monthInstrest": interest,
                "monthBJ": benxiPayment - interest,
                "monthLast": benxi.lastBJ[i+1],
                "hasPayInstrest": benxi.Interest,
                "hasPayLoan": benxi.loanPay
            };
            benxi.table.push(benxiTable2);

            benjin.lastBJ.push(benjin.Loan - (i + 1) * benjinBj);
            benjin.Payment.push(benjinBj + benjin.lastBJ[i] * monthRate2);
            var interest2 = benjin.lastBJ[i] * monthRate2;
            benjin.Interest += interest2;
            benjin.InterestAfter += interest2;
            benjin.InterestArr.push(interest2);
            benjin.loanPay += benjin.Payment[i];
            benjin.loanPayAfter += benjin.Payment[i];
            var benjinTable2 = {
                "sort": i + 1,
                "date": firstYear + '年' + firstMonth + '月',
                "monthPay": benjin.Payment[i],
                "monthInstrest": interest2,
                "monthBJ": benjinBj,
                "monthLast": benjin.lastBJ[i+1],
                "hasPayInstrest": benjin.Interest,
                "hasPayLoan": benjin.loanPay
            };
            benjin.table.push(benjinTable2);
        } else {
            var interest = benxibenjin * monthRate;
            benxi.lastBJ.push(benxibenjin - benxiPayment + interest);
            benxi.Interest += interest;
            benxi.InterestBefore += interest;
            benxi.InterestArr.push(interest);
            benxi.loanPay += benxiPayment;
            benxi.loanPayBefore += benxiPayment;
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
            benjin.InterestBefore += interest2;
            benjin.InterestArr.push(interest2);
            benjin.loanPay += benjin.Payment[i];
            benjin.loanPayBefore += benjin.Payment[i];
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
    }
    benxi.Total = benxi.Loan + benxi.Interest;
    benjin.Total = benjin.Loan + benjin.Interest;
    submitSuccess(benxi, benjin);
    createTable(benxi,benjin)
}
function submitSuccess(benxi,benjin) {
    SetTextValue("txt_MonthsPaid", _monthsPaid);

    SetTextValueFD2("txt_CapitalPaid", benxi.Loan - benxi.table[_monthsPaid - 1].monthLast);
    SetTextValueFD2("txt_CapitalLeft", benxi.table[_monthsPaid - 1].monthLast);
    SetTextValueFD2("txt_TotalInterest", benxi.InterestBefore + benxi.InterestAfter);
    SetTextValueFD2("txt_TotalPay", benxi.loanPayBefore + benxi.loanPayAfter);
    SetTextValueFD2("txt_Diff", benxi.InterestBefore - benxi.InterestAfter);

    SetTextValueFD2("txt_Payment", benxi.table[0].monthPay);
    SetTextValueFD2("txt_Decline", 0);
    SetTextValueFD2("txt_Interest", benxi.InterestBefore);
    SetTextValueFD2("txt_Total", benxi.loanPayBefore);


    SetTextValueFD2("txt_NewPayment", benxi.table[_monthsPaid].monthPay);
    SetTextValueFD2("txt_NewDecline", 0);
    SetTextValueFD2("txt_NewInterest", benxi.InterestAfter);
    SetTextValueFD2("txt_NewTotal", benxi.loanPayAfter);


    SetTextValue("txt_MonthsPaid2", _monthsPaid);

    SetTextValueFD2("txt_CapitalPaid2", benjin.Loan - benjin.table[_monthsPaid - 1].monthLast);
    SetTextValueFD2("txt_CapitalLeft2", benjin.table[_monthsPaid - 1].monthLast);
    SetTextValueFD2("txt_TotalInterest2", benjin.InterestBefore + benjin.InterestAfter);
    SetTextValueFD2("txt_TotalPay2", benjin.loanPayBefore + benjin.loanPayAfter);
    SetTextValueFD2("txt_Diff2", benjin.InterestBefore - benjin.InterestAfter);

    SetTextValueFD2("txt_Payment2", benjin.table[0].monthPay);
    SetTextValueFD2("txt_Decline2", benjin.Decline);
    SetTextValueFD2("txt_Interest2", benjin.InterestBefore);
    SetTextValueFD2("txt_Total2", benjin.loanPayBefore);


    SetTextValueFD2("txt_NewPayment2", benjin.table[_monthsPaid].monthPay);
    SetTextValueFD2("txt_NewDecline2", benjin.Decline2);
    SetTextValueFD2("txt_NewInterest2", benjin.InterestAfter);
    SetTextValueFD2("txt_NewTotal2", benjin.loanPayAfter);

}

function createTable(benxi,benjin) {
    var benxiFragment = document.createDocumentFragment();
    var benjinFragment = document.createDocumentFragment();
    $(benxi.table).each(function(index,item){
        if (index === _monthsPaid) {
            var tr2 = document.createElement('tr');
            tr2.className = 'alertError alertError-danger';
            tr2.innerHTML = '<td colspan="12" style="background-color: transparent;text-align: center">利率变动</td>';
            benxiFragment.appendChild(tr2)
        }
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
        if (index === _monthsPaid) {
            var tr2 = document.createElement('tr');
            tr2.className = 'alertError alertError-danger';
            tr2.innerHTML = '<td colspan="12" style="background-color: transparent;text-align: center">利率变动</td>';
            benjinFragment.appendChild(tr2)
        }
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
        _months = getMonths("txtMonths", "贷款期限", true);
        _rate = getRate("txtRate", "贷款利率", true);

        _firstYear = getYear("txtFirstYear", "首次还款年份");
        _firstMonth = getValueById("selFirstMonth");

        _newRate = getRate("#txtNewRate", "贷款利率", true);

        _newYear = getYear("#txtNewYear", "变动时间年份");
        _newMonth = getValueById("selNewMonth");

        _monthsPaid = (Number(_newYear) - Number(_firstYear)) * 12 + Number(_newMonth) - Number(_firstMonth);
        if (_monthsPaid < 0) {
            alertError({"con": "变动时间不能小于首次还款时间"});
            return false;
        }
        var months = Number($("#selLoanYears").val()) * 12;
        if (_monthsPaid > months) {
            alertError({"con": "变动时间不能大于贷款期限"});
            return false;
        }
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}