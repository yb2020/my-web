//千分符
function M(s) {
    var n = 2;
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
function getFloat2(txtID, caption, required) {
    return getFloat(txtID, caption, required, 2);
}
function getFloat(txtID, caption, required, digits) {
    if (txtID.indexOf("#") != 0)
        txtID = "#" + txtID;
    var num = $(txtID).val();
    num = $.trim(num)
    if (num == "" && required == false) return 0;
    if (num == "") {
        $(txtID).select();
        throw "请输入正确的" + caption + "。";
    }
    num = num.replace(",", "");
    var f;
    f = parseFloat(num);
    if (isNaN(f)) {
        $(txtID).select();
        throw "请输入正确的" + caption + "。";
    }
    f = f.toFixed(digits);//四舍五入为指定小数位数的数字
    if (f < 0) {
        $(txtID).select();
        throw caption + "不能小于零。";
    }
    return f;
}

function getInt(txtID, caption, required) {
    if (txtID.indexOf("#") != 0)
        txtID = "#" + txtID;
    var num = $(txtID).val();
    num = $.trim(num);
    if (num == "" && required == false) return 0;
    if (num == "") {
        $(txtID).select();
        throw "请输入正确的" + caption + "。";
    }
    f = parseInt(num);
    if (isNaN(f)) {
        $(txtID).select();
        throw "请输入正确的" + caption + "。";
    }
    if (f < 0) {
        $(txtID).select();
        throw caption + "不能小于零。";
    }
    return f;
}

function getMonths(txtID, caption, required) {
    var months = getInt(txtID, caption, required);
    if (months == 0 && required == true) {
        $(txtID).select();
        throw caption + "不能为零。";
    }
    if (months > 360) {
        $(txtID).select();
        throw caption + "不能超过360。";
    }
    return months;
}

function getRate(txtID, caption, required) {
    var rate = getFloat(txtID, caption, required, 4);
    rate = rate / 100;
    if (rate == 0 && required == true) {
        $(txtID).select();
        throw caption + "不能为零。";
    }
    if (rate >= 100) {
        $(txtID).select();
        throw caption + "不能超过100%。";
    }
    return rate;
}

function getYear(txtID, caption) {
    var year = getInt(txtID, caption, true);
    if (year <= 1900 || year >= 2100) {
        $(txtID).select();
        throw "请输入正确的" + caption + "。";
    }
    return year;
}

function getMonth(txtID, caption) {
    var months = getInt(txtID, caption, true);
    if (months <= 0 || months > 12) {
        $(txtID).select();
        throw caption + "无效。";
    }
    return months;
}

function SetTextValueFD2(txtID, value) {
    if (txtID) {
        if (txtID.indexOf("#") !== 0)
            txtID = "#" + txtID;
        $(txtID).val(M(value.toFixed(2)));
    } else {
        return M(value.toFixed(2))
    }

}
function SetTextValue(txtID, value) {
    if (txtID.indexOf("#") !== 0)
        txtID = "#" + txtID;
    $(txtID).val(value);
}
function SetTextValueInt32(txtID, value) {
    if (txtID.indexOf("#") !== 0)
        txtID = "#" + txtID;
    $(txtID).val(value);
}
function SetTextEmpty(txtID) {
    if (txtID.indexOf("#") !== 0)
        txtID = "#" + txtID;
    $(txtID).val("");
}