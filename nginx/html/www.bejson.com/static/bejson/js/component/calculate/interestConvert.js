var _numA = 0;

function selCalcType_onchange() {
    var calcType = getValueById("selCalcType");
    if (calcType == 0) {
        document.getElementById("spanA").innerHTML = "年利率";
        document.getElementById("spanB").innerHTML = "日利率";
        document.getElementById("spanC").innerHTML = "月利率";
    }
    else if (calcType == 1) {
        document.getElementById("spanA").innerHTML = "月利率";
        document.getElementById("spanB").innerHTML = "日利率";
        document.getElementById("spanC").innerHTML = "年利率";
    }
    else {
        document.getElementById("spanA").innerHTML = "日利率";
        document.getElementById("spanB").innerHTML = "月利率";
        document.getElementById("spanC").innerHTML = "年利率";
    }
    setValueById("txtA", "");
    setValueById("txtB", "");
    setValueById("txtC", "");
}

function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    selCalcType_onchange();
}

function btnCalc_onclick() {
    if (!validate()) return;
    var calcType = getValueById("selCalcType");
    var numB = 0;
    var numC = 0;
    if (calcType == 0) {
        numB = _numA / 360;
        numC = _numA / 12;
    }
    else if (calcType == 1) {
        numB = _numA / 30;
        numC = _numA * 12;
    }
    else {
        numB = _numA * 30;
        numC = _numA * 360;
    }
    setValueById("txtB", FormatRate(numB));
    setValueById("txtC", FormatRate(numC));
}

function validate() {
    try {
        var caption = "";
        var calcType = getValueById("selCalcType");
        if (calcType == 0) {
            caption = "年利率";
        }
        else if (calcType == 1) {
            caption = "月利率";
        }
        else {
            caption = "日利率";
        }
        _numA = getRate("txtA", caption, true);
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}