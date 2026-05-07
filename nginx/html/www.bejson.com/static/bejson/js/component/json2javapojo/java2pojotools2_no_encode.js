// if (window.top.location.host!="www.bejson.com")
// {
// window.top.location="http://www.bejson.com/";
// }
function trimStr(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function camelCase(input) {
	return input;
   /* return input.toLowerCase().replace(/_(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });*/
}

function camelCaseWithFirstCharUpper(input){
    if(!input){return ""};
    input = camelCase(input);
    return input[0].toUpperCase()+input.substr(1);
}

function isShortTime(str) 
{ 
    var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/); 
   return a!=null;
} 

function strDateTime(str) { 
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
    return r!=null;
} 

function strDateTime(str) 
{ 
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
    var r = str.match(reg); 
  return r!=null;
} 


function isDate(date) {
    var isDate =  ((new Date(date) !== "Invalid Date" && !isNaN(new Date(date))) && isNaN((+date)));
  // var isDate =  isShortTime(date) || strDateTime(date) || strDateTime(date);
	return isDate;
}

function isInt(n) {
    return n % 1 === 0;
}

function currentYear() {
    return new Date().getFullYear()
}

function currentTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

////////////////////////////////

var importMap = {
    'Date': 'java.util.Date',
    'List': 'java.util.List'
}

/**
 * 把本程序定义的数据格式，转换为java bean文本
 * @param bean
 * @returns {string}
 */
function toBeanText(bean, packageName) {

    var beanFields = bean.val;
    var className = bean.name;

    var importText = "";
    var fieldText = "";
    var setterText = "";
    var typeSet = {};
    var shoudImportJackson = false;
    var tpl = "    public void setA(T a) {\n \
        this.a = a;\n \
    }\n \
    public T getA() {\n \
        return a;\n \
    }\n\n";

    //依次遍历每个属性
    for (key in beanFields) {

        //如果存在下划线小写格式的属性名，要改成驼峰命名
        var camelKey = camelCase(key);
        if (camelKey != key) {
            //标准要用Jackson工具包做转换
            fieldText += '    @JsonProperty("' + key + '")\n';
            shoudImportJackson = true;
        }

        //生成属性定义
        fieldText += "    private " + beanFields[key] + " " + camelKey + ";\n";
        //记录属性类型,beanFields[key]可能有一些值，是List<Date>之类，要替换成Date
        var type = beanFields[key];
        if(type.indexOf("List<") > -1){
            type = beanFields[key].replace('List<',"");
            type = type.replace('>',"");
            typeSet["List"] = 'true';
        }
        typeSet[type] = 'true';

        //生成setter，getter语句
        var tplMap = {
            a: camelKey,
            A: firstToUpperCase(camelKey),
            T: beanFields[key]
        };
        setterText += tpl.replace(/a|A|T/g, function(matched) {
            return tplMap[matched];
        });

    }

    //生成import语句
    for (t in typeSet) {
        if (importMap[t]) {
            importText += "import " + importMap[t] + ";\n";
        }
    }
    if (shoudImportJackson) {
        importText += "import org.codehaus.jackson.annotate.JsonIgnoreProperties;\nimport org.codehaus.jackson.annotate.JsonProperty;"
    }
    if(packageName){
        importText = "/**\n \
 * Copyright " + currentYear() + " bejson.com \n \
 */\n" + "package "+ packageName + ";\n" + importText;
    }

    //把import,属性定义，setter，getter拼到一起，就是一个完整的java bean了
    return importText + "\n"+ "/**\n \
* Auto-generated: "+ currentTime() +"\n \
*\n \
* @author bejson.com (i@bejson.com)\n \
* @website http://www.bejson.com/java2pojo/\n \
*/\n" +"public class "+className+" {\n\n" + fieldText + setterText + "}";
}

/**
 * 解析Json，返回json中包含的属性、属性类型
 * @param text
 * @returns {{}}
 */
function getBeanFieldFromJson(text, className, type, typeCase) {
    //1.先将文本转换成json实体
    var jsonObject = null;

    //一些容错配置
    //把首尾空格去掉，那么如果第一和最后一个字符为[]，说明是json数组，而非对象
    text = trimStr(text);
    try {
        jsonlint.parse(text);
    } catch (e) {

    }

    if (text[0] === "[" && text[text.length - 1] === "]") {
        text = '{ "list": ' + text + '}';
        //如果是数组，则默认去数组第一个元素
        jsonObject = JSON.parse(text).list[0];
    } else {
        jsonObject = JSON.parse(text);
    }

    //2.将json对象转换成bean类
    var bean = {};
    var attrClassAry = [];
    for (key in jsonObject) {
        var val = jsonObject[key];
        var newKey = key;
        switch (type) {
            case '1' :
                newKey = lineToHump(key)
                break;
            case '2' :
                newKey = humpToLine(key);
                if (typeCase) {
                    if (typeCase === '2') {
                        newKey = newKey.toUpperCase()
                    } else if (typeCase === '1') {
                        newKey = newKey.toLowerCase()
                    }
                }
                break;
            default:
                break;
        }
        bean[newKey] = getTypeFromJsonVal(val,newKey,attrClassAry,type,typeCase);
    }
    if(!className){
        className = "AtoolBean";
    }
    else{
        // className = camelCaseWithFirstCharUpper(className);
    }
    bean = {name:className,val:bean};

    return $.merge( [bean], attrClassAry );
}

// 下划线转换驼峰
function lineToHump(name) {
    var html = name.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
    return html
}

// 驼峰转换下划线
function humpToLine(name) {
    return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}

/**
 * 从json 属性值中判断该值的数据类型
 * @param val
 * @returns {string}
 */
function getTypeFromJsonVal(val,key,attrClassAry,type,typeCase) {
    //去掉空格，以避免一些无谓的转换错误
    if(val && val.replace) {
        //val =  val.replace(/ /g, "");
		val = trimStr(val);
    }
    var typeofStr = typeof(val);
    if (typeofStr === 'number') {
        if (isInt(val)) {
			return val < 65536?"int":"long";
            
        } else {
            return "double";
        }
    } else if (typeofStr === 'boolean') {
        return typeofStr;
    } else if (isDate(val)) {
        return "Date";
    } else if(!val){
        return "String";
    }
    else if (typeofStr === 'string') {
        return "String";
    } else {
        if (isArray(val)) {
            var type  = getTypeFromJsonVal(val[0],key,attrClassAry);
            if(type=="int"){
            	type = "Integer";
            }else if(type=="long"){
            	type = "Long";
            }else if(type=="float"){
            	type = "Float";
            } else if(type=="double"){
            	type = "Double";
            } 
            return "List<"+type +">";
        } else {
                //会走到这里，说明属性值是个json，说明属性类型是个自定义类
            var typeName = camelCaseWithFirstCharUpper(key);
            var bean = {};
            for (key in val) {
                var fieldValue = val[key];
                var newKey = key;
                switch (type) {
                    case '1' :
                        newKey = lineToHump(key)
                        break;
                    case '2' :
                        newKey = humpToLine(key);
                        if (typeCase) {
                            if (typeCase === '2') {
                                newKey = newKey.toUpperCase()
                            } else if (typeCase === '1') {
                                newKey = newKey.toLowerCase()
                            }
                        }
                        break;
                    default:
                        break;
                }
                bean[newKey] = getTypeFromJsonVal(fieldValue,newKey,attrClassAry,type,typeCase);
            }
            attrClassAry.push({name:typeName,val:bean});
            return typeName;

        }
    }
}
