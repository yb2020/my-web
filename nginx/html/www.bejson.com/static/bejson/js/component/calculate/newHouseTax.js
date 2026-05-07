var _area = 0, _price = 0;
function selKind_onchange() {
    var kind = parseInt($("#selKind").val());
    if (kind == 1) {
        document.getElementById("trFirst").style.display = "";
        document.getElementById("trOnly").style.display = "";
    }
    else if (kind == 2) {
        document.getElementById("trFirst").style.display = "none";
        document.getElementById("trOnly").style.display = "none";
    }
    else if (kind == 3) {
        document.getElementById("trFirst").style.display = "none";
        document.getElementById("trOnly").style.display = "";
    }
    else if (kind == 4) {
        document.getElementById("trFirst").style.display = "none";
        document.getElementById("trOnly").style.display = "none";
    }
}
function btnReset_onclick() {
    $("input[type=reset]").trigger("click");
    document.getElementById("trFirst").style.display = "";
    document.getElementById("trOnly").style.display = "";
}

function btnCalc_onclick() {

    if (!validate()) return;
    var taxs = {};
    var lift = $("#selLift").val();
    var first = $("#selFirst").val();
    var only = $("#selOnly").val();
    var kind = $("#selKind").val();
    var area = parseFloat($("#txtArea").val());
    var price = parseFloat($('#txtPrice').val());
    if (kind === '1') {//普通住宅
        if (first === '1' && only === '1') {
            if (area <= 90) {
                taxs.Deed = price * 0.01
            } else if (area >90 && area <= 140) {
                taxs.Deed = price * 0.015
            } else {
                taxs.Deed = price * 0.03
            }
        } else {
            taxs.Deed = price * 0.03
        }
    } else if (kind === '2') {
        taxs.Deed = price * 0.03
    } else if (kind === '3') {
        taxs.Deed = price * 0.015
    } else if (kind === '4') {
        taxs.Deed = price * 0.03
    }
    taxs.Stamp = price * 0.05 / 100;
    if (lift === '1') {
        taxs.Fund = price * 0.03
    } else {
        taxs.Fund = price * 0.02
    }
    taxs.Check = 100;
    if (kind === '1' || kind === '3') {
        taxs.Trade = area * 6
    } else {
        taxs.Trade = area * 10
    }
    taxs.Total = taxs.Deed + taxs.Stamp + taxs.Fund + taxs.Check + taxs.Trade;
    submitSuccess(taxs)
}

function submitSuccess(taxs) {
    SetTextValueFD2("txtDeed", taxs.Deed);
    SetTextValueFD2("txtStamp", taxs.Stamp);
    SetTextValueFD2("txtFund", taxs.Fund);
    SetTextValueFD2("txtCheck", taxs.Check);
    SetTextValueFD2("txtTrade", taxs.Trade);
    SetTextValueFD2("txtTotal", taxs.Total);
}

function validate() {
    try {
        _area = getFloat2("txtArea", "房屋面积", true);
        _price = getFloat2("txtPrice", "房屋价格", true);
        return true;
    }
    catch (err) {
        alertError({"con": err});
        return false;
    }
}
function init() {

}

$(document).ready(function () {
    init();
});