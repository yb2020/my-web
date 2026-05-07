var dogen  = function() {
    var elementsPerBranch = parseInt($('#random-xml-elements').val(), 10);
    var maxDepth = parseInt($('#random-xml-depth').val(), 10);

    var generator = new RandomJsonGenerator({
        maxDepth: maxDepth,
        satisfyDepth: true,
        elementsPerBranch: elementsPerBranch,
        stringType: "random",
        possibleElements: ["strings", "numbers", "objects"],
        randomKeyAlphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_-abcdefghijklmnopqrstuvwxyz",
        randomKeyRestrictions: ["alpha-or-underscore-first", "length-one-plus"],
        maxStringLength: 10
    });

    var json = generator.generate();
    var xml = json2xml(json);
    xml = "<root>" + xml + "</root>";
    $('#target_textarea').val(vkbeautify.xml(xml, "  "));
}

var RandomJsonGenerator = function (opts) {
    if (!(this instanceof RandomJsonGenerator)) return new RandomJsonGenerator(opts);

    var self = this;

    self.possibleElements = opts.possibleElements
    self.maxDepth = opts.maxDepth;
    self.elementsPerBranch = opts.elementsPerBranch;
    self.stringType = opts.stringType;
    self.maxStringLength = opts.maxStringLength;
    self.satisfyDepth = opts.satisfyDepth;
    self.randomStringAlphabet = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    self.randomKeyAlphabet = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    self.randomKeyRestrictions = [];

    if (opts.randomStringAlphabet) {
        self.randomStringAlphabet = opts.randomStringAlphabet;
    }
    if (opts.randomKeyAlphabet) {
        self.randomKeyAlphabet = opts.randomKeyAlphabet;
    }
    if (opts.randomKeyRestrictions) {
        self.randomKeyRestrictions = opts.randomKeyRestrictions;
    }

    self.generate = function () {
        startingChoices = [];
        if (self.possibleElements.indexOf("objects") >= 0) {
            startingChoices.push({});
        }
        if (self.possibleElements.indexOf("arrays") >= 0) {
            startingChoices.push([]);
        }
        var startingElement = chooseOne(startingChoices);
        var generated = generateRandomJson(startingElement, self.elementsPerBranch, self.maxDepth, self.satisfyDepth);
        return generated;
    }

    function generateRandomString (alphabet) {
        if (self.stringType == "random") {
            var length = parseInt(Math.random()*(self.maxStringLength+1));
            var string = "";
            for (var i = 0; i < length; i++) {
                string += chooseOne(alphabet);
            }

            return string;
        }
        else {
            return WordDictionary.random();
        }
    }

    function generateRandomKey (alphabet, restrictions) {
        if (self.stringType == "random") {
            var length = parseInt(Math.random()*(self.maxStringLength+1));
            if (length == 0) {
                if (restrictions.indexOf("length-one-plus")>=0) {
                    length = 1;
                }
            }

            var string = "";
            for (var i = 0; i < length; i++) {
                var char = chooseOne(alphabet);
                if (i == 0) {
                    if (restrictions.indexOf("alpha-or-underscore-first")>=0) {
                        while (1) {
                            if (/^[a-zA-Z_]$/.test(char)) {
                                break;
                            }
                            var char = chooseOne(alphabet);
                        }
                    }
                }
                string += char;
            }

            return string;
        }
        else {
            return WordDictionary.random();
        }
    }

    function chooseOne (choices) {
        return choices[parseInt(Math.random()*choices.length)];
    }

    function generateRandomJson (startingElement, elementsPerBranch, depthLeft, satisfyDepth) {
        if (satisfyDepth) {
            // this guarantees that there are exactly elementsPerBranch elements in every branch
            //
            var elemsLeft = elementsPerBranch;
        }
        else {
            // this will generate up to elementsPerBranch elements in every branch
            //
            var elemsLeft = parseInt(Math.random()*elementsPerBranch);
        }

        if (depthLeft == 0) {
            // if depthLeft is 0, then arrays and objects can't be selected (as they increase depth by 1)
            //
            var possibleElementsAtDepthZero = self.possibleElements;
            ["arrays", "objects"].forEach(function (remove) {
                var removeIndex = possibleElementsAtDepthZero.indexOf(remove);
                if (removeIndex >= 0) {
                    possibleElementsAtDepthZero.splice(removeIndex,1);
                }
            });
            return generateRandomVal(possibleElementsAtDepthZero).val;
        }

        while (elemsLeft) {
            var randVal = generateRandomVal(self.possibleElements);
            if (randVal.type == "array" || randVal.type == "object") {
                var newVal = generateRandomJson(randVal.val, elementsPerBranch, depthLeft-1, satisfyDepth);
            }
            else {
                var newVal = randVal.val;
            }

            if (startingElement instanceof Array) {
                startingElement.push(newVal);
            }
            else if (typeof startingElement == "object") {
                var newKey = generateRandomKey(self.randomKeyAlphabet, self.randomKeyRestrictions);
                startingElement[newKey] = newVal;
            }

            elemsLeft--;
        }

        return startingElement;
    }

    function generateRandomVal (possibleElements) {
        var what = chooseOne(possibleElements);

        if (what == "booleans") {
            return {
                type : "boolean",
                val : chooseOne([true,false])
            };
        }

        if (what == "numbers") {
            var isInteger = chooseOne([true,false]);
            var isNegative = chooseOne([true,false]);

            var maxNum = 2147483648; // 2^32
            var x = Math.random()*maxNum;

            if (isInteger) {
                x = parseInt(x);
            }
            if (isNegative) {
                x = -x;
            }

            return {
                type : "number",
                val : x
            };
        }

        if (what == "strings") {
            return {
                type : "string",
                val : generateRandomString(self.randomStringAlphabet)
            }
        }

        if (what == "arrays") {
            return {
                type : "array",
                val : []
            }
        }

        if (what == "objects") {
            return {
                type: "object",
                val : {}
            }
        }
    }

    return self;
};

function json2xml(o, tab) {
    var toXml = function(v, name, ind) {
        var xml = "";
        if (v instanceof Array) {
            for (var i=0, n=v.length; i<n; i++)
                xml += ind + toXml(v[i], name, ind+"\t") + "\n";
        }
        else if (typeof(v) == "object") {
            var hasChild = false;
            xml += ind + "<" + name;
            for (var m in v) {
                if (m.charAt(0) == "@")
                    xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                else
                    hasChild = true;
            }
            xml += hasChild ? ">" : "/>";
            if (hasChild) {
                for (var m in v) {
                    if (m == "#text")
                        xml += v[m];
                    else if (m == "#cdata")
                        xml += "<![CDATA[" + v[m] + "]]>";
                    else if (m.charAt(0) != "@")
                        xml += toXml(v[m], m, ind+"\t");
                }
                xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
            }
        }
        else {
            xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
        }
        return xml;
    }, xml="";
    for (var m in o)
        xml += toXml(o[m], m, "");
    return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}

(function() {

    function createShiftArr(step) {

        var space = '    ';

        if ( isNaN(parseInt(step)) ) {  // argument is string
            space = step;
        } else { // argument is integer
            switch(step) {
                case 1: space = ' '; break;
                case 2: space = '  '; break;
                case 3: space = '   '; break;
                case 4: space = '    '; break;
                case 5: space = '     '; break;
                case 6: space = '      '; break;
                case 7: space = '       '; break;
                case 8: space = '        '; break;
                case 9: space = '         '; break;
                case 10: space = '          '; break;
                case 11: space = '           '; break;
                case 12: space = '            '; break;
            }
        }

        var shift = ['\n']; // array of shifts
        for(ix=0;ix<100;ix++){
            shift.push(shift[ix]+space);
        }
        return shift;
    }

    function vkbeautify(){
        this.step = '    '; // 4 spaces
        this.shift = createShiftArr(this.step);
    };

    vkbeautify.prototype.xml = function(text,step) {

        var ar = text.replace(/>\s{0,}</g,"><")
                .replace(/</g,"~::~<")
                .replace(/\s*xmlns\:/g,"~::~xmlns:")
                .replace(/\s*xmlns\=/g,"~::~xmlns=")
                .split('~::~'),
            len = ar.length,
            inComment = false,
            deep = 0,
            str = '',
            ix = 0,
            shift = step ? createShiftArr(step) : this.shift;

        for(ix=0;ix<len;ix++) {
            // start comment or <![CDATA[...]]> or <!DOCTYPE //
            if(ar[ix].search(/<!/) > -1) {
                str += shift[deep]+ar[ix];
                inComment = true;
                // end comment  or <![CDATA[...]]> //
                if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) {
                    inComment = false;
                }
            } else
                // end comment  or <![CDATA[...]]> //
            if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
                str += ar[ix];
                inComment = false;
            } else
                // <elm></elm> //
            if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
                /^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) {
                str += ar[ix];
                if(!inComment) deep--;
            } else
                // <elm> //
            if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
                str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
            } else
                // <elm>...</elm> //
            if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
                str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
            } else
                // </elm> //
            if(ar[ix].search(/<\//) > -1) {
                str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
            } else
                // <elm/> //
            if(ar[ix].search(/\/>/) > -1 ) {
                str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
            } else
                // <? xml ... ?> //
            if(ar[ix].search(/<\?/) > -1) {
                str += shift[deep]+ar[ix];
            } else
                // xmlns //
            if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1) {
                str += shift[deep]+ar[ix];
            }

            else {
                str += ar[ix];
            }
        }

        return  (str[0] == '\n') ? str.slice(1) : str;
    }

    vkbeautify.prototype.json = function(text,step) {

        var step = step ? step : this.step;

        if (typeof JSON === 'undefined' ) return text;

        if ( typeof text === "string" ) return JSON.stringify(JSON.parse(text), null, step);
        if ( typeof text === "object" ) return JSON.stringify(text, null, step);

        return text; // text is not string nor object
    }

    vkbeautify.prototype.css = function(text, step) {

        var ar = text.replace(/\s{1,}/g,' ')
                .replace(/\{/g,"{~::~")
                .replace(/\}/g,"~::~}~::~")
                .replace(/\;/g,";~::~")
                .replace(/\/\*/g,"~::~/*")
                .replace(/\*\//g,"*/~::~")
                .replace(/~::~\s{0,}~::~/g,"~::~")
                .split('~::~'),
            len = ar.length,
            deep = 0,
            str = '',
            ix = 0,
            shift = step ? createShiftArr(step) : this.shift;

        for(ix=0;ix<len;ix++) {

            if( /\{/.exec(ar[ix]))  {
                str += shift[deep++]+ar[ix];
            } else
            if( /\}/.exec(ar[ix]))  {
                str += shift[--deep]+ar[ix];
            } else
            if( /\*\\/.exec(ar[ix]))  {
                str += shift[deep]+ar[ix];
            }
            else {
                str += shift[deep]+ar[ix];
            }
        }
        return str.replace(/^\n{1,}/,'');
    }

//----------------------------------------------------------------------------

    function isSubquery(str, parenthesisLevel) {
        return  parenthesisLevel - (str.replace(/\(/g,'').length - str.replace(/\)/g,'').length )
    }

    function split_sql(str, tab) {

        return str.replace(/\s{1,}/g," ")

            .replace(/ AND /ig,"~::~"+tab+tab+"AND ")
            .replace(/ BETWEEN /ig,"~::~"+tab+"BETWEEN ")
            .replace(/ CASE /ig,"~::~"+tab+"CASE ")
            .replace(/ ELSE /ig,"~::~"+tab+"ELSE ")
            .replace(/ END /ig,"~::~"+tab+"END ")
            .replace(/ FROM /ig,"~::~FROM ")
            .replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ")
            .replace(/ HAVING /ig,"~::~HAVING ")
            //.replace(/ SET /ig," SET~::~")
            .replace(/ IN /ig," IN ")

            .replace(/ JOIN /ig,"~::~JOIN ")
            .replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ")
            .replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ")
            .replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ")
            .replace(/ RIGHT~::~{1,}JOIN /ig,"~::~RIGHT JOIN ")

            .replace(/ ON /ig,"~::~"+tab+"ON ")
            .replace(/ OR /ig,"~::~"+tab+tab+"OR ")
            .replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ")
            .replace(/ OVER /ig,"~::~"+tab+"OVER ")

            .replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ")
            .replace(/\)\s{0,}SELECT /ig,")~::~SELECT ")

            .replace(/ THEN /ig," THEN~::~"+tab+"")
            .replace(/ UNION /ig,"~::~UNION~::~")
            .replace(/ USING /ig,"~::~USING ")
            .replace(/ WHEN /ig,"~::~"+tab+"WHEN ")
            .replace(/ WHERE /ig,"~::~WHERE ")
            .replace(/ WITH /ig,"~::~WITH ")

            //.replace(/\,\s{0,}\(/ig,",~::~( ")
            //.replace(/\,/ig,",~::~"+tab+tab+"")

            .replace(/ ALL /ig," ALL ")
            .replace(/ AS /ig," AS ")
            .replace(/ ASC /ig," ASC ")
            .replace(/ DESC /ig," DESC ")
            .replace(/ DISTINCT /ig," DISTINCT ")
            .replace(/ EXISTS /ig," EXISTS ")
            .replace(/ NOT /ig," NOT ")
            .replace(/ NULL /ig," NULL ")
            .replace(/ LIKE /ig," LIKE ")
            .replace(/\s{0,}SELECT /ig,"SELECT ")
            .replace(/\s{0,}UPDATE /ig,"UPDATE ")
            .replace(/ SET /ig," SET ")

            .replace(/~::~{1,}/g,"~::~")
            .split('~::~');
    }

    vkbeautify.prototype.sql = function(text,step) {

        var ar_by_quote = text.replace(/\s{1,}/g," ")
                .replace(/\'/ig,"~::~\'")
                .split('~::~'),
            len = ar_by_quote.length,
            ar = [],
            deep = 0,
            tab = this.step,//+this.step,
            inComment = true,
            inQuote = false,
            parenthesisLevel = 0,
            str = '',
            ix = 0,
            shift = step ? createShiftArr(step) : this.shift;;

        for(ix=0;ix<len;ix++) {
            if(ix%2) {
                ar = ar.concat(ar_by_quote[ix]);
            } else {
                ar = ar.concat(split_sql(ar_by_quote[ix], tab) );
            }
        }

        len = ar.length;
        for(ix=0;ix<len;ix++) {

            parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);

            if( /\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
                ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
            }

            if( /\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix]))  {
                ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
            }

            if( /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
                deep++;
                str += shift[deep]+ar[ix];
            } else
            if( /\'/.exec(ar[ix]) )  {
                if(parenthesisLevel<1 && deep) {
                    deep--;
                }
                str += ar[ix];
            }
            else  {
                str += shift[deep]+ar[ix];
                if(parenthesisLevel<1 && deep) {
                    deep--;
                }
            }
            var junk = 0;
        }

        str = str.replace(/^\n{1,}/,'').replace(/\n{1,}/g,"\n");
        return str;
    }


    vkbeautify.prototype.xmlmin = function(text, preserveComments) {

        var str = preserveComments ? text
            : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"")
                .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns');
        return  str.replace(/>\s{0,}</g,"><");
    }

    vkbeautify.prototype.jsonmin = function(text) {

        if (typeof JSON === 'undefined' ) return text;

        return JSON.stringify(JSON.parse(text), null, 0);

    }

    vkbeautify.prototype.cssmin = function(text, preserveComments) {

        var str = preserveComments ? text
            : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"") ;

        return str.replace(/\s{1,}/g,' ')
            .replace(/\{\s{1,}/g,"{")
            .replace(/\}\s{1,}/g,"}")
            .replace(/\;\s{1,}/g,";")
            .replace(/\/\*\s{1,}/g,"/*")
            .replace(/\*\/\s{1,}/g,"*/");
    }

    vkbeautify.prototype.sqlmin = function(text) {
        return text.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")");
    }

    window.vkbeautify = new vkbeautify();

})();