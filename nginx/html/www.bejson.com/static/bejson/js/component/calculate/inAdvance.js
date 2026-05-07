var _loan = 0;     //贷款金额
var _rate = 0;     //贷款利率
var _repay = 0;//还款方式
var _months = 0;   //贷款期限

var _fYear = 0; //首次还款时间
var _fMonth = 0;

var _tYear = 0;//提前还款时间
var _tMonth = 0;

var _monthsPaid = 0;  //已经还期次
var _part = 0;        //提前还款金额
var _newRepay = 0;//新还款方式
var _newPayment = 0;  //新贷款月供
var _newMonths = 0;   //新贷款期限
var _newRate = 0;     //新贷款利率

var _kind = 0;  //提前还款方式
var _plan = 0;  //调整方案

var _default_rate = "4.9";
$(document).ready(function () {
    init();

});

function restore() {
    _loan = 0;     //贷款金额
    _rate = 0;     //贷款利率
    _repay = 0;//还款方式
    _months = 0;   //贷款期限

    _fYear = 0;//首次还款时间
    _fMonth = 0;

    _tYear = 0;//提前还款时间
    _tMonth = 0;

    _monthsPaid = 0;//已经还期次
    _part = 0;//提前还款金额
    _newRepay = 0;//新还款方式
    _newPayment = 0;  //新贷款月供
    _newMonths = 0;   //新贷款期限
    _newRate = 0;     //新贷款利率

    _kind = 0;//提前还款方式
    _plan = 0;//调整方案
}
function init() {
    elementDisplay("trPart", "none");
    elementDisplay("trNewRate", "none");
    elementDisplay("trNewRepay", "none");
    elementDisplay("trNewMonths", "none");
    elementDisplay("trNewPayment", "none");
    elementDisplay("trPlan", "none");

    $("#txtFYear").val(getNowYear());
    $("#selFMonth").val(getNowMonth());
    $("#txtTYear").val(getNowYear());
    $("#selTMonth").val(getNowMonth());
    $("#txtRate").val(_default_rate);
    $("#txtNewRate").val(_default_rate);
    $("#txtMonths").removeAttr("disabled");
}

function buildUrlPars() {
    var pars = {};
    pars.Loan = _loan;
    pars.Rate = _rate;
    pars.RepayType = _repay;
    pars.Months = _months;

    pars.FirstYear = _fYear;
    pars.FirstMonth = _fMonth;
    pars.TiQianYear = _tYear;
    pars.TiQianMonth = _tMonth;

    pars .Part = _part;
    pars.NewRepayType = _newRepay;
    pars.NewPayment = _newPayment;
    pars.NewMonths = _newMonths;
    pars.NewRate = _newRate;

    pars.TiQianType = _kind;
    pars.AdjustType =  _plan;
    return pars;
}
function btnDetail_onclick() {
    if ($("#txt_Loan").val() == "") {
        msgError("请先计算后，再查看明细报表!");
        return;
    }
    var pars = "";
    pars += "Loan=" + _loan;
    pars += "&Rate=" + _rate;
    pars += "&RepayType=" + _repay;
    pars += "&Months=" + _months;
    pars += "&FirstYear=" + _fYear;
    pars += "&FirstMonth=" + _fMonth;
    pars += "&MonthsPaid=" + getValueById("txt_MonthsPaid");
    pars += "&Part=" + getValueById("txt_Part");
    pars += "&NewLoan=" + getValueById("txt_NewLoan");
    pars += "&NewRate=" + getValueById("txt_NewRate") / 100;

    if (getValueById("txt_NewRepay") == "等额本息")
        pars += "&NewRepayType=0";
    else
        pars += "&NewRepayType=1";

    pars += "&NewMonths=" + getValueById("txt_NewMonths");

    var nextDate = new Date();
    nextDate.setFullYear(_tYear, _tMonth, 1);
    nextDate.setMonth(nextDate.getMonth() + 1);

    pars += "&NewFirstYear=" + nextDate.getFullYear();
    pars += "&NewFirstMonth=" + nextDate.getMonth();

    window.open("/detail/q.aspx?" + pars);
}
function btnBefore_onclick() {
    if ($("#txt_Repay").val() == "") {
        msgError("请先计算后，再查看明细报表!");
        return;
    }
    var pars = "";
    pars += "Loan=" + _loan;
    pars += "&Rate=" + _rate;
    pars += "&RepayType=" + _repay;
    pars += "&Months=" + _months;
    pars += "&FirstYear=" + _fYear;
    pars += "&FirstMonth=" + _fMonth;

    window.open("detail/t.aspx?" + pars);
}
function btnAfter_onclick() {
    if ($("#txt_NewLoan").val() == "") {
        msgError("请先计算后，再查看明细报表!");
        return;
    }
    if ($("#txt_NewRepay").val() == "") {
        msgError("已经还清，无明细报表。");
        return;
    }

    var pars = "";
    pars += "Loan=" + getValueById("txt_NewLoan");
    pars += "&Rate=" + getValueById("txt_NewRate") / 100;

    if (getValueById("txt_NewRepay") == "等额本息")
        pars += "&RepayType=0";
    else
        pars += "&RepayType=1";
    pars += "&Months=" + getValueById("txt_NewMonths");

    var nextDate = new Date();
    nextDate.setFullYear(_tYear, _tMonth, 1);
    nextDate.setMonth(nextDate.getMonth() + 1);
    pars += "&FirstYear=" + nextDate.getFullYear();
    var nextMonth = nextDate.getMonth();
    pars += "&FirstMonth=" + nextMonth;

    window.open("detail/t.aspx?" + pars);
}
function clean() {

    //提前还款结果
    $("#txt_MonthsPaid").val("");
    $("#txt_InterestPaid").val("");
    $("#txt_InterestLeft").val("");
    $("#txt_CapitalPaid").val("");
    $("#txt_CapitalLeft").val("");
    $("#txt_Part").val("");
    $("#txt_InterestSaved").val("");

    //提前还款前贷款情况
    $("#txt_Loan").val("");//贷款金额
    $("#txt_Rate").val("");//贷款期限
    $("#txt_repay").val("");//还款方式
    $("#txt_Months").val("");//贷款利率
    $("#txt_Payment").val("");//首月还款
    $("#txt_Decline").val("");//每月递减
    $("#txt_Interest").val("");//利息总额

    //提前还款后贷款情况
    $("#txt_NewLoan").val("");
    $("#txt_NewRate").val("");
    $("#txt_newRepay").val("");
    $("#txt_NewMonths").val("");
    $("#txt_NewPayment").val("");
    $("#txt_NewDecline").val("");
    $("#txt_NewInterest").val("");
}
//重置
function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    restore();
    init();
}
//调整方案
function selPlan_onchange() {
    var plans = $("#selPlan").val();
    var trNewMonths = document.getElementById("trNewMonths");
    var trNewPayment = document.getElementById("trNewPayment");
    if (plans == 0) {
        trNewMonths.style.display = "";
        trNewPayment.style.display = "none";
    }
    else if (plans == 1) {
        trNewMonths.style.display = "none";
        trNewPayment.style.display = "";
    }
    else {
        trNewMonths.style.display = "none";
        trNewPayment.style.display = "none";
    }
}
//提前还款方式
function selKind_onchange() {
    var kind = $("#selKind").val();
    clean();
    if (kind == 0) {//一次性还清
        document.getElementById("trPart").style.display = "none";//部分还款金额行
        document.getElementById("trNewRate").style.display = "none";//新贷款利率行
        document.getElementById("trPlan").style.display = "none";//调整方案行
        document.getElementById("trNewMonths").style.display = "none";//新贷款期限行
        document.getElementById("trNewPayment").style.display = "none";//新每月还款额行
        document.getElementById("trNewRepay").style.display = "none";//新还款方式

    }
    else {//部分还款part
        document.getElementById("trPart").style.display = "";//部分还款金额行
        document.getElementById("trPlan").style.display = "";//调整方案行
        document.getElementById("trNewRate").style.display = "";//新贷款利率行
        document.getElementById("trNewMonths").style.display = "none";//新贷款期限行
        document.getElementById("trNewPayment").style.display = "none";//新每月还款额行
        document.getElementById("trNewRepay").style.display = "";//新还款方式
    }
}
function validate() {
    try {
        _loan = getFloat2("txtLoan", "贷款金额", true);
        _months = getMonths("txtMonths", "贷款期限", true);
        _rate = getRate("txtRate", "贷款利率", true);
        _repay = getValueById("selRepay");

        _fYear = getYear("txtFYear", "首次还款时间年份");
        _fMonth = getMonth("selFMonth", "首次还款时间月份");

        _tYear = getYear("txtTYear", "提前还款时间年份");
        _tMonth = getMonth("selTMonth", "提前还款时间月份");

        _monthsPaid = (Number(_tYear) - Number(_fYear)) * 12 + Number(_tMonth) - Number(_fMonth) + 1;
        if (_monthsPaid <= 0) {
            msgError("提前还款日期不能小于首次还款日期");
            return false;
        }
        if (_monthsPaid > _months) {
            msgError("提前还款日期不能大于贷款期限");
            return false;
        }
        //以上为必填参数

        _kind = $("#selKind").val();//提前方式
        _plan = $("#selPlan").val();//调整方案

        //一次性提前还款
        if (_kind == 0) return true;//返回

        //部分提前还款
        _part = getFloat2("txtPart", "提前还款金额", true);
        _newRate = getRate("txtNewRate", "新贷款利率", true);
        _newRepay = getValueById("selNewRepay");

        //调整方案
        if (_plan == 0)//调整还款期限
            _newMonths = getMonths("txtNewMonths", "新贷款期限", true);
        else if (_plan == 1)//调整月供金额
            _newPayment = getFloat2("txtNewPayment", "新每月还款额", true);
        return true;
    }
    catch (err) {
        msgError(err);
        return false;
    }
}
function btnCalc_onclick() {
    restore();
    if (!validate()) return;
    var param = buildUrlPars();
    var tqqPay = {}, tqhPay = {}, mrPay = {}, tqResult = {};
    mrPay.Loan = parseFloat(_loan);
    tqqPay.Loan = parseFloat(_loan);
    tqhPay.Loan = parseFloat(_loan);
    tqResult.Loan = parseFloat(_loan);
    mrPay.Months = _months;
    tqqPay.Months = _tMonth - _fMonth + 1 + (_tYear - _fYear) * 12;
    tqhPay.Months = 0;
    mrPay.Interest = 0;
    tqqPay.Interest = 0;
    tqhPay.Interest = 0;
    mrPay.Rate = _rate;
    tqqPay.Rate = _rate;
    tqhPay.Rate = _newRate;
    mrPay.InterestArr = [];
    tqqPay.InterestArr = [];
    tqhPay.InterestArr = [];
    mrPay.lastBJ = [mrPay.Loan];
    tqqPay.lastBJ = [mrPay.Loan];
    mrPay.table = [];
    tqqPay.table = [];
    tqhPay.table = [];
    var monthRate = _rate / 12;
    var firstYear = _fYear;
    var firstMonth = _fMonth;
    if (_repay === '0') {//提前还款为等额本息
        var benxiPayment = _rate/12*Math.pow(1+_rate/12, _months)/(Math.pow(1+_rate/12, _months) - 1) * _loan;
        mrPay.Payment = benxiPayment;
        tqqPay.Payment = benxiPayment;
        mrPay.Repay = '等额本息';
        tqqPay.Repay = '等额本息';
        mrPay.Decline = 0;
        tqqPay.Decline = 0;
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

            if (firstYear < _tYear || (firstYear === _tYear && firstMonth <= _tMonth)) {
                tqqPay.lastBJ.push(benxibenjin - benxiPayment + interest);
                tqqPay.Interest += interest;
                tqqPay.InterestArr.push(interest);
                var benxiTable2 = {
                    "sort": i + 1,
                    "date": firstYear + '年' + firstMonth + '月',
                    "monthPay": benxiPayment,
                    "monthInstrest": interest,
                    "monthBJ": benxiPayment - interest,
                    "monthLast": tqqPay.lastBJ[i+1]
                };
                tqqPay.table.push(benxiTable2);
            }
        }
        mrPay.Total = mrPay.Loan + mrPay.Interest;
        tqqPay.Total = tqqPay.Loan + tqqPay.Interest;
    } else {//等额本金
        var benjinBj = mrPay.Loan / _months;
        mrPay.Payment = [];
        tqqPay.Payment = [];
        mrPay.Repay = '等额本金';
        tqqPay.Repay = '等额本金';
        mrPay.Decline = benjinBj * _rate / 12;
        tqqPay.Decline = benjinBj * _rate / 12;
        mrPay.PaymentArr = [];
        tqqPay.PaymentArr = [];
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

            if (firstYear < _tYear || (firstYear === _tYear && firstMonth <= _tMonth)) {
                tqqPay.lastBJ.push(tqqPay.Loan - (i + 1) * benjinBj);
                tqqPay.PaymentArr.push(benjinBj + tqqPay.lastBJ[i] * monthRate);
                var interest2 = tqqPay.lastBJ[i] * monthRate;
                tqqPay.Interest += interest2;
                tqqPay.InterestArr.push(interest2);
                tqqPay.Payment = tqqPay.PaymentArr[0];
                var benjinTable2 = {
                    "sort": i + 1,
                    "date": firstYear + '年' + firstMonth + '月',
                    "monthPay": tqqPay.PaymentArr[i],
                    "monthInstrest": interest2,
                    "monthBJ": benjinBj,
                    "monthLast": tqqPay.lastBJ[i+1]
                };
                tqqPay.table.push(benjinTable2);
            }
        }
        mrPay.Total = mrPay.Loan + mrPay.Interest;
    }
    var lastBJ = tqqPay.lastBJ[tqqPay.lastBJ.length-1];
    if (_part > lastBJ) {
        alertError({"con": '提前还款金额 '+SetTextValueFD2('', parseFloat(_part))+' 应小于剩余本金金额 '+SetTextValueFD2('', lastBJ)});
        return;
    }
    if (_kind === '0') {
        tqhPay.NewLoan = 0;
        tqhPay.NewMonths = 0
        tqhPay.NewRate = 0;
        tqhPay.NewRepay = '';
        tqhPay.NewPayment = 0;
        tqhPay.NewDecline = 0;
        tqhPay.NewInterest = 0;

        tqResult.MonthsPaid = tqqPay.Months;
        tqResult.InterestPaid = tqqPay.Interest;
        tqResult.InterestLeft = mrPay.Interest - tqqPay.Interest;
        tqResult.CapitalPaid = tqqPay.Loan - lastBJ;
        tqResult.CapitalLeft = lastBJ;
        tqResult.Part = lastBJ;
        tqResult.InterestSaved = mrPay.Interest - tqqPay.Interest;
    } else {
        var monthRate3 = _newRate/12;
        var firstYear2 = _tYear;
        var firstMonth2 = _tMonth + 1;
        tqhPay.Loan = tqqPay.lastBJ[tqqPay.lastBJ.length - 1] - parseFloat(_part);
        if (_plan === '4') {//还款期限不变
            tqhPay.Months = _months - ((_tYear - _fYear) * 12 + _tMonth - _fMonth) - 1;
        } else if (_plan === '3') {//还款月供基本不变
            var monthPay = tqqPay.Payment;
            var monthss = Math.log(monthPay/(monthPay - tqhPay.Loan * monthRate3))/Math.log(1+monthRate3);
            monthss = Math.ceil(monthss);
            tqhPay.Months = monthss;
        } else if (_plan === '0') {//还款期限改变
            tqhPay.Months = _newMonths;
        } else if (_plan === '1') {//还款月供改变
            var monthPay = _newPayment;
            var monthss = Math.log(monthPay/(monthPay - tqhPay.Loan * monthRate3))/Math.log(1+monthRate3);
            monthss = Math.ceil(monthss);
            tqhPay.Months = monthss;
        }
        if (_newRepay === '0') {//提前还款后的还款方式（等额本息）
            tqhPay.Repay = '等额本息';
            tqhPay.Decline = 0;
            tqhPay.lastBJ = [tqhPay.Loan];
            var benxiPayment3 = monthRate3*Math.pow(1+monthRate3, tqhPay.Months)/(Math.pow(1+monthRate3, tqhPay.Months) - 1) * tqhPay.Loan;
            tqhPay.Payment = benxiPayment3;
            for(var i = 0; i < tqhPay.Months; i++) {
                var benxibenjin3 = tqhPay.lastBJ[i];
                var interest3 = benxibenjin3 * monthRate3;
                tqhPay.lastBJ.push(benxibenjin3 - benxiPayment3 + interest3);
                tqhPay.Interest += interest3;
                tqhPay.InterestArr.push(interest3);
                if (firstMonth2 + 1 > 12) {
                    firstYear2 = firstYear2 + 1;
                    firstMonth2 = 1;
                } else {
                    firstMonth2 = i > 0 ? firstMonth2 + 1 : firstMonth2;
                }
                var benxiTable3 = {
                    "sort": tqqPay.Months + i + 1,
                    "date": firstYear2 + '年' + firstMonth2 + '月',
                    "monthPay": benxiPayment3,
                    "monthInstrest": interest3,
                    "monthBJ": benxiPayment3 - interest3,
                    "monthLast": tqhPay.lastBJ[i+1]
                };
                tqhPay.table.push(benxiTable3);
            }
        } else {
            tqhPay.Repay = '等额本金';
            tqhPay.lastBJ = [tqhPay.Loan];
            var benjinBj3 = tqhPay.Loan / tqhPay.Months;
            tqhPay.PaymentArr = [];
            tqhPay.Decline = benjinBj3 * monthRate3;
            for(var i = 0; i < tqhPay.Months; i++) {
                tqhPay.lastBJ.push(tqhPay.Loan - (i + 1) * benjinBj3);
                tqhPay.PaymentArr.push(benjinBj3 + tqhPay.lastBJ[i] * monthRate3);
                var interest4 = tqhPay.lastBJ[i] * monthRate3;
                tqhPay.Interest += interest4;
                tqhPay.InterestArr.push(interest4);
                tqhPay.Payment = tqhPay.PaymentArr[0];

                if (firstMonth2 + 1 > 12) {
                    firstYear2 = firstYear2 + 1;
                    firstMonth2 = 1;
                } else {
                    firstMonth2 = i > 0 ? firstMonth2 + 1 : firstMonth2;
                }

                var benjinTable = {
                    "sort": tqqPay.Months + i + 1,
                    "date": firstYear2 + '年' + firstMonth2 + '月',
                    "monthPay": tqhPay.PaymentArr[i],
                    "monthInstrest": interest4,
                    "monthBJ": benjinBj3,
                    "monthLast": tqhPay.lastBJ[i+1]
                };
                tqhPay.table.push(benjinTable);
            }
        }
        tqhPay.NewLoan = tqhPay.Loan;
        tqhPay.NewMonths = tqhPay.Months;
        tqhPay.NewRate = _newRate;
        tqhPay.NewRepay = tqhPay.Repay;
        tqhPay.NewPayment = tqhPay.Payment;
        tqhPay.NewDecline = tqhPay.Decline;
        tqhPay.NewInterest = tqhPay.Interest;

        tqResult.MonthsPaid = tqqPay.Months;
        tqResult.InterestPaid = tqqPay.Interest;
        tqResult.InterestLeft = mrPay.Interest - tqqPay.Interest;
        tqResult.CapitalPaid = tqqPay.Loan - lastBJ;
        tqResult.CapitalLeft = lastBJ;
        tqResult.Part = parseFloat(_part);
        tqResult.InterestSaved = mrPay.Interest - tqqPay.Interest - tqhPay.Interest;
    }

    submitSuccess(tqResult, mrPay, tqhPay);
    createTable(tqqPay,tqhPay)
}

function createTable(tqqPay,tqhPay) {
    var tqFragment = document.createDocumentFragment();
    $(tqqPay.table).each(function(index,item){
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
    tr2.innerHTML = '<td colspan="3" style="background-color: transparent"></td><td class="text-right" style="background-color: transparent">提前还款：</td><td style="background-color: transparent">'+$('#txt_Part').val()+'</td><td style="background-color: transparent">'+$('#txt_NewLoan').val()+'</td>';
    tqFragment.appendChild(tr2);
    $(tqhPay.table).each(function(index,item){
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
    $('#loanExcelBX').html('');
    $('#loanExcelBX').append(tqFragment);
}

function submitSuccess(tqResult, mrPay, tqhPay) {

    //提前还款结果
    SetTextValue("txt_MonthsPaid", tqResult.MonthsPaid);
    SetTextValueFD2("txt_InterestPaid", tqResult.InterestPaid);
    SetTextValueFD2("txt_InterestLeft", tqResult.InterestLeft);
    SetTextValueFD2("txt_CapitalPaid", tqResult.CapitalPaid);
    SetTextValueFD2("txt_CapitalLeft", tqResult.CapitalLeft);
    SetTextValueFD2("txt_Part", tqResult.Part);
    SetTextValueFD2("txt_InterestSaved", tqResult.InterestSaved);

    //提前还款前贷款情况
    SetTextValueFD2("txt_Loan", mrPay.Loan);
    SetTextValue("txt_Months", mrPay.Months);

    SetTextValue("txt_Rate", FormatRate(mrPay.Rate));
    SetTextValue("txt_Repay", mrPay.Repay);
    SetTextValueFD2("txt_Payment", mrPay.Payment);
    SetTextValueFD2("txt_Decline", mrPay.Decline);
    SetTextValueFD2("txt_Interest", mrPay.Interest);

    //提前还款后贷款情况
    SetTextValueFD2("txt_NewLoan", tqhPay.NewLoan);
    SetTextValue("txt_NewMonths", tqhPay.NewMonths);

    SetTextValue("txt_NewRate", FormatRate(tqhPay.NewRate));
    SetTextValue("txt_NewRepay", tqhPay.NewRepay);
    SetTextValueFD2("txt_NewPayment", tqhPay.NewPayment);
    SetTextValueFD2("txt_NewDecline", tqhPay.NewDecline);
    SetTextValueFD2("txt_NewInterest", tqhPay.NewInterest);
}