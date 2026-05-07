var _loan;
var _months;
var _rate;
var _repay;

var _fYear;
var _fMonth;

var _tYear1;
var _tMonth1;

var _tYear2;
var _tMonth2;

var _tYear3;
var _tMonth3;

var _part1;
var _part2;
var _part3;

var _default_rate = "4.9";

function chb3_onchange() {
    if (document.getElementById("chb3").checked) {
        document.getElementById("trDate3").style.display = "";
        document.getElementById("trPart3").style.display = "";
    }
    else {
        document.getElementById("trDate3").style.display = "none";
        document.getElementById("trPart3").style.display = "none";
    }
}
function setDefault() {
    _loan = 0;
    _months = 0;
    _rate = 0;
    _repay = 0;

    _fYear = 0;
    _fMonth = 0;

    _tYear1 = 0;
    _tMonth1 = 0;

    _tYear2 = 0;
    _tMonth2 = 0;

    _tYear3 = 0;
    _tMonth3 = 0;

    _part1 = 0;
    _part2 = 0;
    _part3 = 0;
}

$(document).ready(function () {
    init();
});

function init() {
    $("#txtFYear").val(getNowYear());
    $("#selFMonth").val(getNowMonth());

    $("#txtTYear1").val(getNowYear());
    $("#selTMonth1").val(getNowMonth());

    $("#txtTYear2").val(getNowYear());
    $("#selTMonth2").val(getNowMonth());

    $("#txtTYear3").val(getNowYear());
    $("#selTMonth3").val(getNowMonth());

    $("#txtRate").val(_default_rate);
    $("#txtMonths").removeAttr("disabled");

    document.getElementById("trDate3").style.display = "none";
    document.getElementById("trPart3").style.display = "none";
}

function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    init();
    setDefault();
}


function btnCalc_onclick() {
    setDefault();
    if (!validate()) return;
    var tqPay = {}, thPay1 = {},thPay2 = {}, thPay3 = {}, mrPay = {}, tqResult = {};
    mrPay.Loan = parseFloat(_loan);
    tqPay.Loan = parseFloat(_loan);
    thPay1.Loan = parseFloat(_loan);
    thPay2.Loan = parseFloat(_loan);
    thPay3.Loan = parseFloat(_loan);
    tqResult.Loan = parseFloat(_loan);
    mrPay.Months = _months;
    tqPay.Months = _tMonth1 - _fMonth + 1 + (_tYear1 - _fYear) * 12;
    thPay1.Months = _months - ((_tYear1 - _fYear) * 12 + _tMonth1 - _fMonth) - 1;
    thPay2.Months = _months - ((_tYear2 - _fYear) * 12 + _tMonth2 - _fMonth) - 1;
    thPay3.Months =_months - ((_tYear3 - _fYear) * 12 + _tMonth3 - _fMonth) - 1;
    mrPay.Interest = 0;
    tqPay.Interest = 0;
    thPay1.Interest = 0;
    thPay2.Interest = 0;
    thPay3.Interest = 0;
    mrPay.Rate = _rate;
    tqPay.Rate = _rate;
    thPay1.Rate = _rate;
    thPay2.Rate = _rate;
    thPay3.Rate = _rate;
    mrPay.InterestArr = [];
    tqPay.InterestArr = [];
    thPay1.InterestArr = [];
    thPay2.InterestArr = [];
    thPay3.InterestArr = [];
    mrPay.lastBJ = [mrPay.Loan];
    tqPay.lastBJ = [mrPay.Loan];
    mrPay.table = [];
    tqPay.table = [];
    thPay1.table = [];
    thPay2.table = [];
    thPay3.table = [];
    var monthRate = _rate / 12;
    var firstYear = _fYear;
    var firstMonth = _fMonth;
    if (_repay === '0') {//提前还款为等额本息
        mrPay.Repay = '等额本息';
        tqPay.Repay = '等额本息';
        thPay1.Repay = '等额本息';
        thPay2.Repay = '等额本息';
        thPay3.Repay = '等额本息';
        mrPay.Decline = 0;
        tqPay.Decline = 0;
        thPay1.Decline = 0;
        thPay2.Decline = 0;
        thPay3.Decline = 0;

        var benxiPayment = _rate/12*Math.pow(1+_rate/12, _months)/(Math.pow(1+_rate/12, _months) - 1) * _loan;
        mrPay.Payment = benxiPayment;
        tqPay.Payment = benxiPayment;

        for(var i = 0; i < _months; i++) {
            var benxibenjin = mrPay.lastBJ[i];
            var interest = benxibenjin * monthRate;
            mrPay.lastBJ.push(benxibenjin - benxiPayment + interest);
            mrPay.Interest += interest;
            mrPay.InterestArr.push(interest);
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
                "monthLast": mrPay.lastBJ[i+1]
            };
            mrPay.table.push(benxiTable);

            if (firstYear < _tYear1 || (firstYear === _tYear1 && firstMonth <= _tMonth1)) {
                tqPay.lastBJ.push(benxibenjin - benxiPayment + interest);
                tqPay.Interest += interest;
                tqPay.InterestArr.push(interest);
                var benxiTable2 = {
                    "sort": i + 1,
                    "date": firstYear + '年' + firstMonth + '月',
                    "monthPay": benxiPayment,
                    "monthInstrest": interest,
                    "monthBJ": benxiPayment - interest,
                    "monthLast": tqPay.lastBJ[i+1]
                };
                tqPay.table.push(benxiTable2);
            }
        }
        mrPay.Total = mrPay.Loan + mrPay.Interest;
        tqPay.Total = tqPay.Loan + tqPay.Interest;

        //第一次提前还款
        var lastBJ = tqPay.lastBJ[tqPay.lastBJ.length-1];
        if (_part1 > lastBJ) {
            alertError({"con": '第一次提前还款金额 '+SetTextValueFD2('', parseFloat(_part1))+' 应小于剩余本金金额 '+SetTextValueFD2('', lastBJ)});
            return;
        }
        var firstYear2 = _tYear1;
        var firstMonth2 = _tMonth1 + 1;
        thPay1.Loan = tqPay.lastBJ[tqPay.lastBJ.length - 1] - parseFloat(_part1);
        thPay1.lastBJ = [thPay1.Loan];
        var benxiPayment2 = _rate/12*Math.pow(1+_rate/12, thPay1.Months)/(Math.pow(1+_rate/12, thPay1.Months) - 1) * thPay1.Loan;
        thPay1.Payment = benxiPayment2;
        for(var i = 0; i < thPay1.Months; i++) {
            var benxibenjin = thPay1.lastBJ[i];
            var interest = benxibenjin * monthRate;
            if (firstMonth2 + 1 > 12) {
                firstYear2 = firstYear2 + 1;
                firstMonth2 = 1;
            } else {
                firstMonth2 = i > 0 ? firstMonth2 + 1 : firstMonth2;
            }
            if (firstYear2 < _tYear2 || (firstYear2 === _tYear2 && firstMonth2 <= _tMonth2)) {
                thPay1.lastBJ.push(benxibenjin - benxiPayment2 + interest);
                thPay1.Interest += interest;
                thPay1.InterestArr.push(interest);
                var benxiTable = {
                    "sort": _months - thPay1.Months + i + 1,
                    "date": firstYear2 + '年' + firstMonth2 + '月',
                    "monthPay": benxiPayment2,
                    "monthInstrest": interest,
                    "monthBJ": benxiPayment2 - interest,
                    "monthLast": thPay1.lastBJ[i+1]
                };
                thPay1.table.push(benxiTable);
            }
        }
        thPay1.Total = thPay1.Loan + thPay1.Interest;

        //第二次提前还款
        var lastBJ2 = thPay1.lastBJ[thPay1.lastBJ.length-1];
        if (_part2 > lastBJ2) {
            alertError({"con": '第二次提前还款金额 '+SetTextValueFD2('', parseFloat(_part2))+' 应小于剩余本金金额 '+SetTextValueFD2('', lastBJ2)});
            return;
        }
        var firstYear3 = _tYear2;
        var firstMonth3 = _tMonth2 + 1;
        thPay2.Loan = thPay1.lastBJ[thPay1.lastBJ.length - 1] - parseFloat(_part2);
        thPay2.lastBJ = [thPay2.Loan];
        var benxiPayment3 = _rate/12*Math.pow(1+_rate/12, thPay2.Months)/(Math.pow(1+_rate/12, thPay2.Months) - 1) * thPay2.Loan;
        thPay2.Payment = benxiPayment3;
        for(var i = 0; i < thPay2.Months; i++) {
            var benxibenjin = thPay2.lastBJ[i];
            var interest = benxibenjin * monthRate;
            if (firstMonth3 + 1 > 12) {
                firstYear3 = firstYear3 + 1;
                firstMonth3 = 1;
            } else {
                firstMonth3 = i > 0 ? firstMonth3 + 1 : firstMonth3;
            }
            if (document.getElementById("chb3").checked) {
                if (firstYear3 < _tYear3 || (firstYear3 === _tYear3 && firstMonth3 <= _tMonth3)) {
                    thPay2.lastBJ.push(benxibenjin - benxiPayment3 + interest);
                    thPay2.Interest += interest;
                    thPay2.InterestArr.push(interest);
                    var benxiTable = {
                        "sort": _months - thPay2.Months + i + 1,
                        "date": firstYear3 + '年' + firstMonth3 + '月',
                        "monthPay": benxiPayment3,
                        "monthInstrest": interest,
                        "monthBJ": benxiPayment3 - interest,
                        "monthLast": thPay2.lastBJ[i+1]
                    };
                    thPay2.table.push(benxiTable);
                }
            } else {
                thPay2.lastBJ.push(benxibenjin - benxiPayment3 + interest);
                thPay2.Interest += interest;
                thPay2.InterestArr.push(interest);
                var benxiTable = {
                    "sort": _months - thPay2.Months + i + 1,
                    "date": firstYear3 + '年' + firstMonth3 + '月',
                    "monthPay": benxiPayment3,
                    "monthInstrest": interest,
                    "monthBJ": benxiPayment3 - interest,
                    "monthLast": thPay2.lastBJ[i+1]
                };
                thPay2.table.push(benxiTable);
            }

        }
        thPay2.Total = thPay2.Loan + thPay2.Interest;

        //第三次提前还款
        if (document.getElementById("chb3").checked) {
            var lastBJ3 = thPay2.lastBJ[thPay2.lastBJ.length-1];
            if (_part3 > lastBJ3) {
                alertError({"con": '第三次提前还款金额 '+SetTextValueFD2('', parseFloat(_part3))+' 应小于剩余本金金额 '+SetTextValueFD2('', lastBJ3)});
                return;
            }
            var firstYear4 = _tYear3;
            var firstMonth4 = _tMonth3 + 1;
            thPay3.Loan = thPay2.lastBJ[thPay2.lastBJ.length - 1] - parseFloat(_part3);
            thPay3.lastBJ = [thPay3.Loan];
            var benxiPayment4 = _rate/12*Math.pow(1+_rate/12, thPay3.Months)/(Math.pow(1+_rate/12, thPay3.Months) - 1) * thPay3.Loan;
            thPay3.Payment = benxiPayment4;
            for(var i = 0; i < thPay3.Months; i++) {
                var benxibenjin = thPay3.lastBJ[i];
                var interest = benxibenjin * monthRate;
                thPay3.lastBJ.push(benxibenjin - benxiPayment4+ interest);
                thPay3.Interest += interest;
                thPay3.InterestArr.push(interest);
                if (firstMonth4 + 1 > 12) {
                    firstYear4 = firstYear4 + 1;
                    firstMonth4 = 1;
                } else {
                    firstMonth4 = i > 0 ? firstMonth4 + 1 : firstMonth4;
                }
                var benxiTable = {
                    "sort":  _months - thPay3.Months + i + 1,
                    "date": firstYear4 + '年' + firstMonth4 + '月',
                    "monthPay": benxiPayment4,
                    "monthInstrest": interest,
                    "monthBJ": benxiPayment4 - interest,
                    "monthLast": thPay3.lastBJ[i+1]
                };
                thPay3.table.push(benxiTable);
            }
            thPay3.Total = thPay3.Loan + thPay3.Interest;
        }

    } else {//等额本金
        var benjinBj = mrPay.Loan / _months;
        mrPay.Payment = [];
        tqPay.Payment = [];
        thPay1.Payment = [];
        thPay2.Payment = [];
        thPay3.Payment = [];
        mrPay.Repay = '等额本金';
        tqPay.Repay = '等额本金';
        thPay1.Repay = '等额本金';
        thPay2.Repay = '等额本金';
        thPay3.Repay = '等额本金';
        mrPay.Decline = benjinBj * _rate / 12;
        tqPay.Decline = benjinBj * _rate / 12;
        thPay1.Decline = benjinBj * _rate / 12;
        thPay2.Decline = benjinBj * _rate / 12;
        thPay3.Decline = benjinBj * _rate / 12;
        mrPay.PaymentArr = [];
        tqPay.PaymentArr = [];
        thPay1.PaymentArr = [];
        thPay2.PaymentArr = [];
        thPay3.PaymentArr = [];

        for(var i = 0; i < _months; i++) {
            mrPay.lastBJ.push(mrPay.Loan - (i + 1) * benjinBj);
            mrPay.PaymentArr.push(benjinBj + mrPay.lastBJ[i] * monthRate);
            var interest2 = mrPay.lastBJ[i] * monthRate;
            mrPay.Interest += interest2;
            mrPay.InterestArr.push(interest2);
            mrPay.Payment = mrPay.PaymentArr[0];

            if (firstMonth + 1 > 12) {
                firstYear = firstYear + 1;
                firstMonth = 1;
            } else {
                firstMonth = i > 0 ? firstMonth + 1 : firstMonth;
            }

            var benjinTable = {
                "sort": i + 1,
                "date": firstYear + '年' + firstMonth + '月',
                "monthPay": mrPay.PaymentArr[i],
                "monthInstrest": interest2,
                "monthBJ": benjinBj,
                "monthLast": mrPay.lastBJ[i+1]
            };
            mrPay.table.push(benjinTable);

            if (firstYear < _tYear1 || (firstYear === _tYear1 && firstMonth <= _tMonth1)) {
                tqPay.lastBJ.push(tqPay.Loan - (i + 1) * benjinBj);
                tqPay.PaymentArr.push(benjinBj + tqPay.lastBJ[i] * monthRate);
                var interest2 = tqPay.lastBJ[i] * monthRate;
                tqPay.Interest += interest2;
                tqPay.InterestArr.push(interest2);
                tqPay.Payment = tqPay.PaymentArr[0];
                var benjinTable2 = {
                    "sort": i + 1,
                    "date": firstYear + '年' + firstMonth + '月',
                    "monthPay": tqPay.PaymentArr[i],
                    "monthInstrest": interest2,
                    "monthBJ": benjinBj,
                    "monthLast": tqPay.lastBJ[i+1]
                };
                tqPay.table.push(benjinTable2);
            }
        }
        mrPay.Total = mrPay.Loan + mrPay.Interest;

        //第一次提前还款
        var lastBJ = tqPay.lastBJ[tqPay.lastBJ.length-1];
        if (_part1 > lastBJ) {
            alertError({"con": '第一次提前还款金额 '+SetTextValueFD2('', parseFloat(_part1))+' 应小于剩余本金金额 '+SetTextValueFD2('', lastBJ)});
            return;
        }
        var firstYear2 = _tYear1;
        var firstMonth2 = _tMonth1 + 1;
        thPay1.Loan = tqPay.lastBJ[tqPay.lastBJ.length - 1] - parseFloat(_part1);
        thPay1.lastBJ = [thPay1.Loan];
        var benjinBj2 = thPay1.Loan / thPay1.Months;
        thPay1.PaymentArr = [];
        thPay1.Decline = benjinBj2 * monthRate;
        for(var i = 0; i < thPay1.Months; i++) {
            if (firstMonth2 + 1 > 12) {
                firstYear2 = firstYear2 + 1;
                firstMonth2 = 1;
            } else {
                firstMonth2 = i > 0 ? firstMonth2 + 1 : firstMonth2;
            }
            if (firstYear2 < _tYear2 || (firstYear2 === _tYear2 && firstMonth2 <= _tMonth2)) {
                thPay1.lastBJ.push(thPay1.Loan - (i + 1) * benjinBj2);
                thPay1.PaymentArr.push(benjinBj2 + thPay1.lastBJ[i] * monthRate);
                var interest2 = thPay1.lastBJ[i] * monthRate;
                thPay1.Interest += interest2;
                thPay1.InterestArr.push(interest2);
                thPay1.Payment = thPay1.PaymentArr[0];
                var benjinTable2 = {
                    "sort": i + 1,
                    "date": firstYear2 + '年' + firstMonth2 + '月',
                    "monthPay": thPay1.PaymentArr[i],
                    "monthInstrest": interest2,
                    "monthBJ": benjinBj2,
                    "monthLast": thPay1.lastBJ[i+1]
                };
                thPay1.table.push(benjinTable2);
            }
        }
        thPay1.Total = thPay1.Loan + thPay1.Interest;

        //第二次提前还款
        var lastBJ2 = thPay1.lastBJ[thPay1.lastBJ.length-1];
        if (_part2 > lastBJ2) {
            alertError({"con": '第二次提前还款金额 '+SetTextValueFD2('', parseFloat(_part2))+' 应小于剩余本金金额 '+SetTextValueFD2('', lastBJ2)});
            return;
        }
        var firstYear3 = _tYear2;
        var firstMonth3 = _tMonth2 + 1;
        thPay2.Loan = thPay1.lastBJ[thPay1.lastBJ.length - 1] - parseFloat(_part2);
        thPay2.lastBJ = [thPay2.Loan];
        var benjinBj3 = thPay2.Loan / thPay2.Months;
        thPay2.PaymentArr = [];
        thPay2.Decline = benjinBj3 * monthRate;
        for(var i = 0; i < thPay2.Months; i++) {
            if (firstMonth3 + 1 > 12) {
                firstYear3 = firstYear3 + 1;
                firstMonth3 = 1;
            } else {
                firstMonth3 = i > 0 ? firstMonth3 + 1 : firstMonth3;
            }
            if (document.getElementById("chb3").checked) {
                if (firstYear3 < _tYear3 || (firstYear3 === _tYear3 && firstMonth3 <= _tMonth3)) {
                    thPay2.lastBJ.push(thPay2.Loan - (i + 1) * benjinBj3);
                    thPay2.PaymentArr.push(benjinBj3 + thPay2.lastBJ[i] * monthRate);
                    var interest2 = thPay2.lastBJ[i] * monthRate;
                    thPay2.Interest += interest2;
                    thPay2.InterestArr.push(interest2);
                    thPay2.Payment = thPay2.PaymentArr[0];
                    var benjinTable2 = {
                        "sort": i + 1,
                        "date": firstYear3 + '年' + firstMonth3 + '月',
                        "monthPay": thPay2.PaymentArr[i],
                        "monthInstrest": interest2,
                        "monthBJ": benjinBj3,
                        "monthLast": thPay2.lastBJ[i+1]
                    };
                    thPay2.table.push(benjinTable2);
                }
            } else {
                thPay2.lastBJ.push(thPay2.Loan - (i + 1) * benjinBj3);
                thPay2.PaymentArr.push(benjinBj3 + thPay2.lastBJ[i] * monthRate);
                var interest2 = thPay2.lastBJ[i] * monthRate;
                thPay2.Interest += interest2;
                thPay2.InterestArr.push(interest2);
                thPay2.Payment = thPay2.PaymentArr[0];
                var benjinTable2 = {
                    "sort": i + 1,
                    "date": firstYear3 + '年' + firstMonth3 + '月',
                    "monthPay": thPay2.PaymentArr[i],
                    "monthInstrest": interest2,
                    "monthBJ": benjinBj3,
                    "monthLast": thPay2.lastBJ[i+1]
                };
                thPay2.table.push(benjinTable2);
            }

        }
        thPay2.Total = thPay2.Loan + thPay2.Interest;

        //第三次提前还款
        if (document.getElementById("chb3").checked) {
            var lastBJ3 = thPay2.lastBJ[thPay2.lastBJ.length-1];
            if (_part3 > lastBJ3) {
                alertError({"con": '第三次提前还款金额 '+SetTextValueFD2('', parseFloat(_part3))+' 应小于剩余本金金额 '+SetTextValueFD2('', lastBJ3)});
                return;
            }
            var firstYear4 = _tYear3;
            var firstMonth4 = _tMonth3 + 1;
            thPay3.Loan = thPay2.lastBJ[thPay2.lastBJ.length - 1] - parseFloat(_part3);
            thPay3.lastBJ = [thPay3.Loan];
            var benjinBj4 = thPay3.Loan / thPay3.Months;
            thPay3.PaymentArr = [];
            thPay3.Decline = benjinBj4 * monthRate;
            for(var i = 0; i < thPay3.Months; i++) {
                if (firstMonth4 + 1 > 12) {
                    firstYear4 = firstYear4 + 1;
                    firstMonth4 = 1;
                } else {
                    firstMonth4 = i > 0 ? firstMonth4 + 1 : firstMonth4;
                }
                thPay3.lastBJ.push(thPay3.Loan - (i + 1) * benjinBj4);
                thPay3.PaymentArr.push(benjinBj4 + thPay3.lastBJ[i] * monthRate);
                var interest2 = thPay3.lastBJ[i] * monthRate;
                thPay3.Interest += interest2;
                thPay3.InterestArr.push(interest2);
                thPay3.Payment = thPay3.PaymentArr[0];
                var benjinTable2 = {
                    "sort": i + 1,
                    "date": firstYear4 + '年' + firstMonth4 + '月',
                    "monthPay": thPay3.PaymentArr[i],
                    "monthInstrest": interest2,
                    "monthBJ": benjinBj4,
                    "monthLast": thPay3.lastBJ[i+1]
                };
                thPay3.table.push(benjinTable2);
            }
            thPay3.Total = thPay3.Loan + thPay3.Interest;
        }
    }
    if (document.getElementById("chb3").checked) {
        createTable(tqPay,thPay1,thPay2,thPay3);
        $('#thriftMoney').val(SetTextValueFD2('',mrPay.Interest - tqPay.Interest - thPay1.Interest - thPay2.Interest - thPay3.Interest));
    } else {
        createTable(tqPay,thPay1,thPay2);
        $('#thriftMoney').val(SetTextValueFD2('',mrPay.Interest - tqPay.Interest - thPay1.Interest - thPay2.Interest));
    }

}

function createTable(tqPay,thPay1,thPay2,thPay3) {
    var tqFragment = document.createDocumentFragment();
    $(tqPay.table).each(function(index,item){
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

        tqFragment.appendChild(tr)
    });
    var tr2 = document.createElement('tr');
    tr2.className = 'alert alert-danger';
    tr2.innerHTML = '<td colspan="3" style="background-color: transparent"></td><td class="text-right" style="background-color: transparent">第一次提前还款：</td><td style="background-color: transparent">'+$('#txtPart1').val()+'</td><td style="background-color: transparent">'+SetTextValueFD2('',tqPay.lastBJ[tqPay.lastBJ.length - 1] - parseFloat(_part1))+'</td>';
    tqFragment.appendChild(tr2);
    $(thPay1.table).each(function(index,item){
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

        tqFragment.appendChild(tr)
    });
    var tr3 = document.createElement('tr');
    tr3.className = 'alert alert-danger';
    tr3.innerHTML = '<td colspan="3" style="background-color: transparent"></td><td class="text-right" style="background-color: transparent">第二次提前还款：</td><td style="background-color: transparent">'+$('#txtPart2').val()+'</td><td style="background-color: transparent">'+SetTextValueFD2('',thPay1.lastBJ[thPay1.lastBJ.length - 1] - parseFloat(_part2))+'</td>';
    tqFragment.appendChild(tr3);
    $(thPay2.table).each(function(index,item){
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

        tqFragment.appendChild(tr)
    });
    if (document.getElementById("chb3").checked) {
        var tr4 = document.createElement('tr');
        tr4.className = 'alert alert-danger';
        tr4.innerHTML = '<td colspan="3" style="background-color: transparent"></td><td class="text-right" style="background-color: transparent">第三次提前还款：</td><td style="background-color: transparent">'+$('#txtPart3').val()+'</td><td style="background-color: transparent">'+SetTextValueFD2('',thPay2.lastBJ[thPay2.lastBJ.length - 1] - parseFloat(_part3))+'</td>';
        tqFragment.appendChild(tr4);
        $(thPay3.table).each(function(index,item){
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

            tqFragment.appendChild(tr)
        });
    }

    $('#loanExcelBX').html('');
    $('#loanExcelBX').append(tqFragment);
}


function submitSuccess(result) {
    var obj = result.d;
    if (obj.Message != "") {
        alertError(obj.Message);
        return;
    }
    document.getElementById("divResult").innerHTML = obj.Detail;
}

function validate() {
    try {
        _loan = getFloat2("txtLoan", "贷款金额", true);
        _months = getMonths("txtMonths", "贷款期限", true);
        _rate = getRate("txtRate", "贷款利率", true);
        _repay = getValueById("selRepay");

        _fYear = getYear("txtFYear", "首次还款还款年份");
        _fMonth = getMonth("selFMonth", "首次还款还款月份");

        //第一次必填
        _tYear1 = getYear("txtTYear1", "第一次提前还款年份");
        _tMonth1 = getMonth("selTMonth1", "第一次提前还款月份");
        _part1 = getFloat2("txtPart1", "第一次提前还款金额", true);

        if (((_tYear1 - _fYear)*12+_tMonth1-_fMonth+1)>=_months) {
            throw '第一次提前还款日期超出贷款期限'
        }
        if (_tYear1<_fYear || (_tYear1 === _fYear && _tMonth1<_fMonth)) {
            throw '第一次提前还款日期必须大于或等于首月还款日期'
        }

        //第二次必填
        _tYear2 = getYear("txtTYear2", "第二次提前还款年份");
        _tMonth2 = getMonth("selTMonth2", "第二次提前还款月份");
        _part2 = getFloat2("txtPart2", "第二次提前还款金额", true);

        if (((_tYear2 - _fYear)*12+_tMonth2-_fMonth+1)>=_months) {
            throw '第二次提前还款日期超出贷款期限'
        }
        if (_tYear2<_tYear1 || (_tYear2 === _tYear1 && _tMonth2<=_tMonth1)) {
            throw '第二次提前还款日期必须大于第一次提前还款日期'
        }

        //第三次选填
        if (document.getElementById("chb3").checked) {
            _tYear3 = getYear("txtTYear3", "第三次提前还款年份");
            _tMonth3 = getMonth("selTMonth3", "第三次提前还款月份");
            _part3 = getFloat2("txtPart3", "第三次提前还款金额", true);

            if (((_tYear3 - _fYear)*12+_tMonth3-_fMonth+1)>=_months) {
                throw '第三次提前还款日期超出贷款期限'
            }
            if (_tYear3<_tYear2 || (_tYear3 === _tYear2 && _tMonth3<=_tMonth2)) {
                throw '第三次提前还款日期必须大于第二次提前还款日期'
            }
        }
        return true;
    }
    catch (err) {
        alertError({con:err});
        return false;
    }
}
