function calcTypeChanged() {
    if (document.all.selCalcType.value == "") {
        location = location.href; return;
    }
    location = document.all.selCalcType.value;
    document.all.selCalcType.value = "";
}

function selUrls_onchange() {
    //alert("god");
    var selUrls = document.getElementById("selUrls");
    window.location.href = selUrls.value;
    //location = selUrls.value;
    //location = location.href;
}

function getRadioCheckedValue(radioName) {
    var value;
    var temp = document.getElementsByName(radioName);
    for (var i = 0; i < temp.length; i++) {
        if (temp[i].checked) {
            value = temp[i].value;
        }
    }
    return value;
}
function SetCssName(elementId, cssName) {
    document.getElementById(elementId).className = cssName;
}
function elementDisplay(elementById, style) {
    document.getElementById(elementById).style.display = style;
}
//组合贷款专用
function loanYearsChangedBrif(selYearsID, txtMonthsID) {
    var years = getValueById(selYearsID);
    var months = years * 12;
    if (years == 0)
        setValueById(txtMonthsID, "");
    else
        setValueById(txtMonthsID, months);
}
function loanYearsChanged(loanType, selYearsID, txtMonthsID, txtYearRateID) {
    var years = getValueById(selYearsID);
    var months = years * 12;
    setValueById(txtMonthsID, months);
    if (years == 0) {
        setValueById(txtMonthsID, "");
        return;
    }

    if (loanType == "biz") {
        //商业贷款
        if (months <= 12) {
            setValueById(txtYearRateID, "4.35");
        }
        else if (months <= 60) {
            setValueById(txtYearRateID, "4.75");
        }
        else {
            setValueById(txtYearRateID, "4.90");
        }
    } else {
        //公积金贷款
        if (months <= 60) {
            setValueById(txtYearRateID, "2.75");
        }
        else {
            setValueById(txtYearRateID, "3.25");
        }
    }
}

function selYears_onchange(selYearsID, txtMonthsID) {
    var years = getValueById(selYearsID);
    var months = years * 12;
    setValueById(txtMonthsID, months);
    if (years == 0) {
        $('#' + txtMonthsID).removeAttr("disabled");
        setValueById(txtMonthsID, "");
    }
    else {
        $('#' + txtMonthsID).attr("disabled", "disabled");
    }
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


function getValueById(elementId) {
    return document.getElementById(elementId).value;
}

function setValueById(elementId, value) {
    document.getElementById(elementId).value = value;
}

function FormatRate(rate) {
    rate = rate * 100;
    var str = rate.toFixed(4);
    str = (str.substring(str.length - 1) == '0') ? str.substring(0, str.length - 1) : str
    str = (str.substring(str.length - 1) == '0') ? str.substring(0, str.length - 1) : str
    str = (str.substring(str.length - 1) == '0') ? str.substring(0, str.length - 1) : str
    str = (str.substring(str.length - 1) == '0') ? str.substring(0, str.length - 1) : str
    str = (str.substring(str.length - 1) == '.') ? str.substring(0, str.length - 1) : str
    return str;
}
function download() {
    window.open("download.aspx" + window.location.search);
}

function getNowYear() {
    return new Date().getFullYear();
}

function getNowMonth() {
    return new Date().getMonth() + 1;
}

//测试时用，实际应用时要注释掉
function AjaxErrorFun(result) {
    //alert(result.responseText);
}

//房价计算器
function hp_autoCalc() {
    var hp_area = getValueById("txtHP_Area");
    var hp_price = getValueById("txtHP_Price");
    var hp_Total = hp_area * hp_price;
    setValueById("txtHP_Total", M(hp_Total.toFixed(2)));
    var hp_percent = getValueById("selHP_Percent");
    var hp_first = hp_Total * hp_percent;
    setValueById("txtHP_First", M(hp_first.toFixed(2)));
    var hp_loan = hp_Total - hp_first;
    setValueById("txtHP_Loan", M(hp_loan.toFixed(2)));

}