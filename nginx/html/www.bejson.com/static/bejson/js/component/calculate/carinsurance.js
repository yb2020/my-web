function init() {
    SetTextEmpty("txtPrice");

    document.getElementById("chbTraffic").checked = true;
    document.getElementById("chbThird").checked = true;
    document.getElementById("chbLoss").checked = true;
    document.getElementById("chbRob").checked = true;
    document.getElementById("chbBurn").checked = true;
    document.getElementById("chbWater").checked = true;
    document.getElementById("chbGlass").checked = true;
    document.getElementById("chbScratch").checked = true;
    document.getElementById("chbAvoid").checked = true;
    document.getElementById("chbRight").checked = true;
    document.getElementById("chbStaff").checked = true;

    SetTextEmpty("txtTraffic");
    SetTextEmpty("txtThird");
    SetTextEmpty("txtLoss");
    SetTextEmpty("txtRob");
    SetTextEmpty("txtBurn");
    SetTextEmpty("txtWater");
    SetTextEmpty("txtGlass");
    SetTextEmpty("txtScratch");
    SetTextEmpty("txtAvoid");
    SetTextEmpty("txtRight");
    SetTextEmpty("txtStaff");

    setValueById("selTraffic", "950");
    setValueById("selThird", "1226");
    setValueById("selScratch", "400");
    setValueById("selGlass", "0");

    setValueById("selDriver", "2");
    setValueById("selPeople", "2");
    setValueById("selCount", "3");
}

$(document).ready(function () {
    init();
});

function getCarPrice() {
    return getFloat2("txtPrice", "", false);
}
function validated() {
    var num = $("#txtPrice").val();
    num = $.trim(num);
    if (num == "") return false;
    num = num.replace(",", "");
    var f;
    f = parseFloat(num);
    if (isNaN(f)) return false;
    f = f.toFixed(2);//四舍五入为指定小数位数的数字
    if (f < 0) return false;
    return true;
}
function txtPrice_onkeyup() {
    calc_traffic();
    calc_third();
    calc_loss();
    calc_rob();
    calc_scratch();
    calc_avoid();
    calc_right();
    calc_burn();
    calc_water();
    calc_glass();
    calc_staff();
    auto_calc();
}
function getCalcValue(name) {
    var value = "0";
    if (document.getElementById("chb" + name).checked) {
        value = getValueById("txt" + name);
        value = value.replace(",", "");
        if (value == "") value = 0;
    }
    return Number(value);
}

function auto_calc() {
    if (!validated()) {
        SetTextEmpty("txtTotal");
        SetTextEmpty("txtAll");
        return;
    }
    var total = 0;
    var traffic = getValueById("txtTraffic");
    traffic = traffic.replace(",", "");
    total += Number(traffic);

    total += Number(getCalcValue("Third"));
    total += Number(getCalcValue("Loss"));
    total += Number(getCalcValue("Rob"));
    total += Number(getCalcValue("Scratch"));
    total += Number(getCalcValue("Avoid"));
    total += Number(getCalcValue("Right"));
    total += Number(getCalcValue("Burn"));
    total += Number(getCalcValue("Water"));
    total += Number(getCalcValue("Glass"));
    total += Number(getCalcValue("Staff"));

    SetTextValueFD2("txtTotal", total);
    SetTextValueFD2("txtAll", total);
}
function calc_traffic() {
    if (validated()) {
        var value = getValueById("selTraffic");
        value = value.replace(",", "");
        SetTextValueFD2("txtTraffic", Number(value));
    } else
        SetTextEmpty("txtTraffic");
}
function calc_third() {
    if (validated()) {
        var value = getValueById("selThird");
        value = value.replace(",", "");
        SetTextValueFD2("txtThird", Number(value));
    } else
        SetTextEmpty("txtThird");
}
function calc_loss() {
    if (validated()) {
        //基础保费+裸车价格×1.0880%
        var base = 460;
        var price = getValueById("txtPrice");
        price = price.replace(",", "");
        var value = Number(base) + Number(price) * 1.088 / 100;
        SetTextValueFD2("txtLoss", Number(value));
    } else
        SetTextEmpty("txtLoss");
}
function calc_rob() {
    if (validated()) {
        //原始车价×(1-折旧率)×盗抢险费率=10万×(1-20%)×0.7%=560元。
        var price = getValueById("txtPrice");
        price = price.replace(",", "");
        var value = Number(price) * 0.7 / 100;
        SetTextValueFD2("txtRob", Number(value));
    } else
        SetTextEmpty("txtRob");
}
function calc_scratch() {
    if (validated()) {
        var value = getValueById("selScratch");
        value = value.replace(",", "");
        SetTextValueFD2("txtScratch", Number(value));
    } else
        SetTextEmpty("txtScratch");
}
function calc_avoid() {
    //(车辆损失险+第三者责任险)×20%
    if (validated()) {
        var loss = getCalcValue("Loss") * 0.2;
        var third = getCalcValue("Third") * 0.2;
        var value = Number(loss) + Number(third);
        SetTextValueFD2("txtAvoid", Number(value));
    } else
        SetTextEmpty("txtAvoid");
}
function calc_right() {
    //第三者责任险保险费×20%
    if (validated()) {
        var value = getCalcValue("Third") * 0.2;
        SetTextValueFD2("txtRight", Number(value));
    } else
        SetTextEmpty("txtRight");
}
function calc_burn() {
    if (validated()) {
        //新车购置价×0.15%
        var price = getValueById("txtPrice");
        price = price.replace(",", "");
        var value = Number(price) * 0.15 / 100;
        SetTextValueFD2("txtBurn", Number(value));
    } else
        SetTextEmpty("txtBurn");
}
function calc_water() {
    if (validated()) {
        //涉水险=车价X0.075%
        var price = getValueById("txtPrice");
        price = price.replace(",", "");
        var value = Number(price) * 0.075 / 100;
        SetTextValueFD2("txtWater", Number(value));
    } else
        SetTextEmpty("txtWater");
}
function calc_glass() {
    if (validated()) {
        var price = getValueById("txtPrice");
        price = price.replace(",", "");
        var value = getValueById("selGlass");
        value = value.replace(",", "");
        if (value == 0)
            value = price * 0.15 / 100;
        else
            value = price * 0.25 / 100;
        SetTextValueFD2("txtGlass", Number(value));
    } else
        SetTextEmpty("txtGlass");
}
function calc_staff() {
    if (validated()) {
        var driver = getValueById("selDriver");
        var people = getValueById("selPeople");
        var count = getValueById("selCount");
        var value = Number(driver) * 40;
        value += Number(people) * Number(count) * 25;
        SetTextValueFD2("txtStaff", Number(value));
    } else
        SetTextEmpty("txtStaff");
}

function selStaff_onchange() {
    if (validated()) {
        calc_staff();
        auto_calc();
    }
}
function selTraffic_onchange() {
    if (validated()) {
        calc_traffic();
        auto_calc();
    }
}
function selThird_onchange() {
    if (validated()) {
        calc_third();
        auto_calc();
    }
}
function selScratch_onchange() {
    if (validated()) {
        calc_scratch();
        auto_calc();
    }
}
function selGlass_onchange() {
    if (validated()) {
        calc_glass();
        auto_calc();
    }
}

function chbThird_onchange() {//第三者责任险
    var status = document.getElementById("chbThird").checked;
    if (status) {
        elementDisplay("trThirdA", "");
        elementDisplay("trThirdB", "");
        //不计免赔特约险
        document.getElementById("chbAvoid").disabled = false;
        document.getElementById("lblAvoid").style.color = "#495057";

        //无过责任险
        document.getElementById("chbRight").disabled = false;
        document.getElementById("lblRight").style.color = "#495057";
    }
    else {
        elementDisplay("trThirdA", "none");
        elementDisplay("trThirdB", "none");
        //不计免赔特约险
        document.getElementById("lblAvoid").style.color = "#C0C0C0";
        elementDisplay("trAvoidA", "none");
        document.getElementById("chbAvoid").disabled = true;
        document.getElementById("chbAvoid").checked = false;

        //无过责任险
        document.getElementById("lblRight").style.color = "#C0C0C0";
        elementDisplay("trRightA", "none");
        document.getElementById("chbRight").disabled = true;
        document.getElementById("chbRight").checked = false;
    }
    auto_calc();
}
function chbLoss_onchange() {//车辆损失险
    var status = document.getElementById("chbLoss").checked;
    if (status) {
        elementDisplay("trLossA", "");
        document.getElementById("chbScratch").disabled = false;
        document.getElementById("lblRob").style.color = "#495057";
        document.getElementById("chbRob").disabled = false;
        document.getElementById("lblScratch").style.color = "#495057";
        document.getElementById("chbAvoid").disabled = false;
        document.getElementById("lblAvoid").style.color = "#495057";
    }
    else {
        elementDisplay("trLossA", "none");
        //机动车盗抢险
        document.getElementById("lblRob").style.color = "#C0C0C0";
        elementDisplay("trRobA", "none");
        document.getElementById("chbRob").disabled = true;
        document.getElementById("chbRob").checked = false;
        //车身划痕损失险
        document.getElementById("lblScratch").style.color = "#C0C0C0";
        elementDisplay("trScratchA", "none");
        elementDisplay("trScratchB", "none");
        document.getElementById("chbScratch").disabled = true;
        document.getElementById("chbScratch").checked = false;
        //不计免赔特约险
        document.getElementById("lblAvoid").style.color = "#C0C0C0";
        elementDisplay("trAvoidA", "none");
        document.getElementById("chbAvoid").disabled = true;
        document.getElementById("chbAvoid").checked = false;
    }
    auto_calc();
}
function chbRob_onchange() {//机动车盗抢险
    var status = document.getElementById("chbRob").checked;
    if (status) {
        elementDisplay("trRobA", "");
    }
    else {
        elementDisplay("trRobA", "none");
    }
    auto_calc();
}
function chbBurn_onchange() {//自燃险
    var status = document.getElementById("chbBurn").checked;
    if (status) {
        elementDisplay("trBurnA", "");
    }
    else {
        elementDisplay("trBurnA", "none");
    }
    auto_calc();
}
function chbWater_onchange() {//涉水险
    var status = document.getElementById("chbWater").checked;
    if (status) {
        elementDisplay("trWaterA", "");
    }
    else {
        elementDisplay("trWaterA", "none");
    }
    auto_calc();
}
function chbGlass_onchange() {//玻璃单独破碎险
    var status = document.getElementById("chbGlass").checked;
    if (status) {
        elementDisplay("trGlassA", "");
        elementDisplay("trGlassB", "");
    }
    else {
        elementDisplay("trGlassA", "none");
        elementDisplay("trGlassB", "none");
    }
    auto_calc();
}
function chbScratch_onchange() {//车身划痕损失险
    var status = document.getElementById("chbScratch").checked;
    if (status) {
        elementDisplay("trScratchA", "");
        elementDisplay("trScratchB", "");
    }
    else {
        elementDisplay("trScratchA", "none");
        elementDisplay("trScratchB", "none");
    }
    auto_calc();
}
function chbAvoid_onchange() {//不计免赔特约险
    var status = document.getElementById("chbAvoid").checked;
    if (status) {
        elementDisplay("trAvoidA", "");
    }
    else {
        elementDisplay("trAvoidA", "none");
    }
    auto_calc();
}
function chbRight_onchange() {//无过责任险
    var status = document.getElementById("chbRight").checked;
    if (status) {
        elementDisplay("trRightA", "");
    }
    else {
        elementDisplay("trRightA", "none");
    }
    auto_calc();
}
function chbStaff_onchange() {//车上人员责任险
    var status = document.getElementById("chbStaff").checked;
    if (status) {
        elementDisplay("trStaffA", "");
        elementDisplay("trStaffB", "");
        elementDisplay("trStaffC", "");
    }
    else {
        elementDisplay("trStaffA", "none");
        elementDisplay("trStaffB", "none");
        elementDisplay("trStaffC", "none");
    }
    auto_calc();
}

//onchange要设置默认值，然后计算