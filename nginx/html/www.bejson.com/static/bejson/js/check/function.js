 (function(has, addtest, cssprop, undefined){

    var toString = {}.toString,
        FUNCTION_CLASS = "[object Function]";

    // Function tests
    addtest("function-bind", function(){
        return toString.call(Function.bind) == FUNCTION_CLASS;
    });

    addtest("function-caller", function(){
        function test(){ return test.caller !== undefined; }
        return test();
    });
    
    addtest("activex", function(){
        return !!window.ActiveXObject;
    });
    
    addtest("activex-enabled", function(){
        return !!window.ActiveXObject;
    });

})(has, has.add, has.cssprop);
