var _loan = 0;//贷款金额
var _months = 0;//贷款期限
var _rate = 0;//贷款利率
var _fYear = 0;//首次还款年
var _fMonth = 0;//首次还款月
var _payment = 0;//首月还款额
var _housePrice = 0;//房屋价格
var _cash = 0;

var _default_rate = 4.9;
var _default_lpr = 4.65;
try{
    if (gjj) {
        _default_lpr = 3.25;
    }
} catch (e) {
    
}

var _default_points = 0;

function selRate_onchange() {
    var val = getValueById("selRate");
    if (val == "0") {//按最新LPR利率
        SetCssName("trLpr", "show");
        SetCssName("trPoints", "show");
        $("#txtRate").attr("disabled", "disabled");

        $("#txtRate").val(_default_lpr);
        $("#txtLpr").val(_default_lpr);
        $("#txtPoints").val(0);

    } else {//按旧版基准利率
        SetCssName("trLpr", "hidden");
        SetCssName("trPoints", "hidden");
        $("#txtRate").removeAttr("disabled");

        $("#txtRate").val(_default_rate);
        $("#txtLpr").val(_default_lpr);
        $("#txtPoints").val(0);
    }
}

function clean_results() {

    SetTextEmpty("txt_Total");
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
    clean_results();
    var value = getValueById("selCalcItem");
    if (value == 0) {//按贷款金额计算
        SetCssName("trLoan", "show");
        SetCssName("trArea", "hidden");
        SetCssName("trPrice", "hidden");
        SetCssName("trHPrice", "hidden");
        SetCssName("trPercent", "hidden");
        SetCssName("trPayment", "hidden");
        SetCssName("tr_Total", "hidden");
        SetCssName("tr_Cash", "hidden");
    } else if (value == 1) {
        //按首月还款额计算
        SetCssName("trLoan", "hidden");
        SetCssName("trArea", "hidden");
        SetCssName("trPrice", "hidden");
        SetCssName("trHPrice", "hidden");
        SetCssName("trPercent", "hidden");
        SetCssName("trPayment", "show");
        SetCssName("tr_Total", "hidden");
        SetCssName("tr_Cash", "hidden");
    }
    else if (value == 2) {//按面积、单价计算
        SetCssName("trLoan", "hidden");
        SetCssName("trArea", "show");
        SetCssName("trPrice", "show");
        SetCssName("trHPrice", "hidden");
        SetCssName("trPercent", "show");
        SetCssName("trPayment", "hidden");
        SetCssName("tr_Total", "show");
        SetCssName("tr_Cash", "show");
    } else {//按首付比例计算
        SetCssName("trLoan", "hidden");
        SetCssName("trArea", "hidden");
        SetCssName("trPrice", "hidden");
        SetCssName("trHPrice", "show");
        SetCssName("trPercent", "show");
        SetCssName("trPayment", "hidden");
        SetCssName("tr_Total", "hidden");
        SetCssName("tr_Cash", "hidden");
    }
}
function init_default() {
    $("#txtFYear").val(getNowYear());
    $("#selFMonth").val(getNowMonth());

    $("#txtRate").val(_default_lpr);
    $("#txtLpr").val(_default_lpr);
    $("#txtPoints").val(0);
    $("#txtMonths").removeAttr("disabled");
    $("#txtRate").attr("disabled", "disabled");
    SetCssName("trLpr", "show");
    SetCssName("trPoints", "show");

    SetCssName("trLoan", "show");
    SetCssName("trArea", "hidden");
    SetCssName("trPrice", "hidden");
    SetCssName("trHPrice", "hidden");
    SetCssName("trPercent", "hidden");
    SetCssName("trPayment", "hidden");
    SetCssName("tr_Total", "hidden");
    SetCssName("tr_Cash", "hidden");
}
function init_values() {
    _loan = 0;//贷款金额
    _months = 0;//贷款期限
    _rate = 0;//贷款利率
    _fYear = 0;//首次还款年
    _fMonth = 0;//首次还款月
    _payment = 0;//首月还款额
    _housePrice = 0;//房屋价格
    _cash = 0;
}
$(document).ready(function () {
    $("input[type=reset]").trigger("click");
    init_values();
    init_default();
});

function btnReport_onclick(repay) {
    if (_fMonth == 0) {
        msgError("提示：请先计算后，再查看明细表。"); return;
    }

}

function btnReset_onclick(_this) {
    $("input[type=reset]").trigger("click");
    init_values();
    init_default();
}

function btnCalc_onclick(_this) {
    init_values();
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
function submitSuccess(benxi, benjin) {

    if (_cash !== 0)
        SetTextValueFD2("txt_Cash", _cash);

    if (_housePrice !== 0)
        SetTextValueFD2("txt_Total", _housePrice);
    _loan = benxi.Loan;
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

function validate() {
    try {
        var calcItem = getValueById("selCalcItem");
        if (calcItem == 0) {//按贷款金额计算
            _loan = getFloat2("txtLoan", "贷款金额", true);
        }
        else if (calcItem == 1) {//按首月还款额计算
            _payment = getFloat2("txtPayment", "首月还款额", true);
        }
        else if (calcItem == 2) {//按面积、单价计算
            var area = getFloat2("txtArea", "房屋面积", true);
            var price = getFloat2("txtPrice", "房屋单价", true);
            _housePrice = Number(area) * Number(price);
            var pc = getFloat2("txtPercent", "首付比例", true);
            _cash = Number(_housePrice) * Number(pc) / 100;
            _loan = _housePrice - _cash;
        }
        else {
            //按首付比例计算
            var hPrice = getFloat2("txtHPrice", "房屋价格", true);
            var percent = getFloat2("txtPercent", "首付比例", true);
            _cash = Number(hPrice) * Number(percent) / 100;
            _loan = hPrice - _cash;
        }

        _months = getMonths("txtMonths", "贷款月数", true);
        _rate = getRate("txtRate", "贷款利率", true);

        _fYear = getYear("txtFYear", "首次还款年份");
        _fMonth = getValueById("selFMonth");
        return true;
    }
    catch (err) {
        msgError(err);
        return false;
    }
}

function auto_calc_lpr() {
    var lpr = getValueById("txtLpr");
    var points = getValueById("txtPoints");
    var rate = Number(lpr) + Number(points) * 0.01;
    SetTextValueFD2("txtRate", rate);
}