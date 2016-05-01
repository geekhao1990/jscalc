/**
 * Created by hao on 2016/1/21.
 */
window.onload=function(){
    var func;
    var oResult=document.getElementById('disabledInput');
    var	oArticle=document.getElementsByTagName('article')[0];
    var	oNumBtn=getByClass(oArticle,'btn-success');
    var oFuncBtn=getByClass(oArticle,'btn-warning');
    var oCountBtn=getByClass(oArticle,'btn-danger')[2];	//有待斟酌
    var changeNumBtn=getByClass(oArticle,'btn-primary');
    var oClearBtn=document.getElementById('clearZero');
    var oDelBtn=document.getElementById('del');
    var oHiddenInput=document.getElementById('hiddenInput');//隐藏域
    var key=false;
    var lock=false;
    var sum= 0, num;
    var change;
    var o={
        'onelevel':0,
        'twolevel':0
    };
    //绑定事件
    bind(oNumBtn,'getNumber');
    bind(oFuncBtn,'getFunc');

    bind(changeNumBtn,'getChange');

    oCountBtn.onclick=function(){
        getCalc();
    };

    oClearBtn.onclick=function(){
        clearZero();
    };

    oDelBtn.onclick= function () {
        del();
    };
    /**
     * bind绑定函数
     * @param dom ---dom array
     * @param type ---确保dom array绑定到相对应的事件的key
     */
    function bind(dom,type){
        var length=dom.length;
        for(var i=0;i<length;i++){
            (function(){
                var p=i;
                dom[i].onclick=function(){
                    switch(type){
                        case 'getNumber':
                            getNumber(p);
                            break;

                        case 'getFunc':
                            getFunc(p);
                            break;

                        case 'getChange':
                            getChange(p);
                            break;

                    }
                }
            })();
        }
    }

    /**
     * 函数getNumber
     * 点击数字时获取数字并调用getInput
     ** @param p button上索引
     */
    function getNumber(p){
        var value=oNumBtn[p].value;
        getInput(value);
    }

    /**
     * 函数 getInput
     * 获取输入 确保正确的输入显示隐藏域和计算框中,数字和func运算符+-* /,输入func之后或者计算完成后才可以输入数字
     * 如果输入的是+-* / AND 最后一个字符是+-* /就去掉最后一位再加
     * 输入小数点时不能输入第二个小数点
     * @param value 是输入的字符
     */
    function getInput(value){
        var last=(oHiddenInput.value).substring(oHiddenInput.value.length,oHiddenInput.value.length-1);

        if(arguments.callee.caller==getNumber){
            if(value =='.' && oResult.value.indexOf('.')!=-1){
                return false;
            }//sin90 1
            else{//lock锁着的情况oResult.value = value;          //
                //oHiddenInput.value = value;                   //
                //sum=eval(value);                              //

                if((oResult.value== '0' || key )&& value !='.'){
                    //key是输入乘号等，可以重新输入数字的控制器
                    oResult.value = value;
                    oHiddenInput.value += value;
                    key=false;
                }
                else if(lock){
                    oResult.value = value;
                    oHiddenInput.value = value;
                    sum=eval(value);
                }
                else{
                    oResult.value += value;
                    oHiddenInput.value += value;
                }
            }
        }
        if(arguments.callee.caller==getFunc){
                if(last=='+' || last=='-' || last=='*' || last=='/'){
                    //防止重复输入，如1++ 1+*
                    oHiddenInput.value =  (oHiddenInput.value).substring(0,oHiddenInput.value.length-1) + value;
                }
                else{
                    oHiddenInput.value +=value;
                    //从后面找索引最大的加减号，如果没有就从后面找索引最大的乘除号，截取从开始位置到索引位置的字符串并计算赋值给sum
                    if( Math.max((oHiddenInput.value).lastIndexOf('+'),(oHiddenInput.value).lastIndexOf('-'))==-1 ){
                        if( Math.max((oHiddenInput.value).lastIndexOf('*'),(oHiddenInput.value).lastIndexOf('/')) != -1 ){
                            sum = eval((oHiddenInput.value).substring(0,(Math.max((oHiddenInput.value).lastIndexOf('*'),(oHiddenInput.value).lastIndexOf('/')))));
                        }
                    }
                    else{
                        //从后面找索引最大的加减号，如果有，就计算此索引之前的值，并赋值给sum
                        sum = eval((oHiddenInput.value).substring(0,(Math.max((oHiddenInput.value).lastIndexOf('+'),(oHiddenInput.value).lastIndexOf('-')))));
                    }
                    console.log('加号之后的sum'+sum);
                }
        }
        if(arguments.callee.caller==getChange){
            switch (value) {
                case '%':
                    oResult.value=oResult.value/100;
                    if(sum == 0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                     }
                     else{
                     oHiddenInput.value = sum+func+oResult.value;
                     }
                    break;

                case 'sin':
                    oResult.value = Math.sin(oResult.value*Math.PI/180);
                    if(sum == 0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                    }
                    else{
                        oHiddenInput.value = sum+func+oResult.value;
                    }
                    break;

                case 'cos':
                    oResult.value=Math.cos(oResult.value*Math.PI/180);
                    if(sum==0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                    }
                    else{
                        oHiddenInput.value = sum+func+oResult.value;
                    }
                    break;

                case 'tan':
                    oResult.value=Math.tan(oResult.value*Math.PI/180);
                    if(sum==0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                    }
                    else{
                        oHiddenInput.value = sum+func+oResult.value;
                    }
                    break;

                case 'arcsina':
                    oResult.value=Math.asin(oResult.value*Math.PI/180);
                    if(sum==0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                    }
                    else{
                        oHiddenInput.value = sum+func+oResult.value;
                    }
                    break;

                case 'arccos':
                    oResult.value=Math.acos(oResult.value*Math.PI/180);
                    if(sum==0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                    }
                    else{
                        oHiddenInput.value = sum+func+oResult.value;
                    }
                    break;

                case 'arctan':
                    oResult.value=Math.atan(oResult.value*Math.PI/180);
                    if(sum==0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                    }
                    else{
                        oHiddenInput.value = sum+func+oResult.value;
                    }
                    break;

                case '+/-':
                    oResult.value=eval(oResult.value)*(-1);
                    if(sum==0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                    }
                    else{
                        oHiddenInput.value = sum+func+oResult.value;
                    }
                    break;

                case 'sqrt':
                    oResult.value=Math.sqrt(oResult.value);
                    if(sum==0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                    }
                    else{
                        oHiddenInput.value = sum+func+oResult.value;
                    }
                    break;

                case '1/x':
                    oResult.value= 1/oResult.value;
                    if(sum==0 || lock){
                        oHiddenInput.value = oResult.value;
                        lock=true;
                    }
                    else{
                        oHiddenInput.value = sum+func+oResult.value;
                    }
                    break;
            }
        }
    }
    /**
     * 函数 getfunc
     * 重置可输入数字的key，重置num。保持o={'onelevel':1，'twolevel':0}一二级运算符正常运转，等于2就自动计算
     * @param p button上索引
     */
    function getFunc(p){
        num = undefined;//重置num
        lock=false;

        func = oFuncBtn[p].value;
        var value;

        switch (func) {
            case '+':
                o['onelevel']++;
                value = '+';
                getInput(value);
                isCalc();
                break;

            case '-':
                o['onelevel']++;
                value = '-';
                getInput(value);
                isCalc();
                break;

            case '*':
                o['twolevel']++;
                value = '*';
                getInput(value);
                break;

            case '/':
                o['twolevel']++;
                value = '/';
                getInput(value);
                break;
        }
        key=true;
    }

    /**
     *自动计算机制
     * 当输入符号为加减号时判断，有乘除号就进入计算函数
     * 没有乘除号，但有两个一级符号（加号或减号）也进入计算函数
    */
    function isCalc(){
        if(o['onelevel']>=2){
            getCalc();
        }
        else if(o['twolevel']>=1){
            getCalc();
        }
    }
    /**
     * getCalc
     *
     *lock是将计算结果锁定不能进行backspace操作
     */
    function getCalc(){
        var k=(oHiddenInput.value).substring(0,oHiddenInput.value.length-1);
        var last=(oHiddenInput.value).substring(oHiddenInput.value.length-1,oHiddenInput.value.length);
        var t;

        if(arguments.callee.caller == isCalc) {
            oHiddenInput.value = eval(k) + last;
            switch (last) {
                case '+':
                case '-':
                    o = {
                        'onelevel': 1,
                        'twolevel': 0
                    };
                    oResult.value = sum = 10000*eval(k)/10000;
                    break;
                case '*':
                case '/':
                    o = {
                        'onelevel': 0,
                        'twolevel': 1
                    };
                    oResult.value = sum = 10000*eval(k)/10000;
                    break;
                default:
                    oResult.value = sum = 10000*eval(oHiddenInput.value)/10000;
                    break;
            }
            lock=true;
        }
        if(arguments.callee.caller == oCountBtn.onclick) {
            //如果计算式中的值是算式，就找出
            if(isNaN(oHiddenInput.value)){
                t=Math.max((oHiddenInput.value).indexOf('+'),(oHiddenInput.value).indexOf('-'));
                if( t == -1 ){
                    //t是计算式中从前向后找第一个+-号的索引，如果没有加减号就是从后向前找最后一个乘除号的索引
                    if( Math.max((oHiddenInput.value).lastIndexOf('*'),(oHiddenInput.value).lastIndexOf('/')) != -1 )
                    {
                        num = eval(oResult.value);
                        t=Math.max((oHiddenInput.value).lastIndexOf('*'),(oHiddenInput.value).lastIndexOf('/'));
                    }
                }
                else{
                    //t是计算式中从前向后找第一个+-号的索引,从一个加减号开始截后面是num
                    if(last =='+' || last == '-' || last == '*' || last == '/'){
                        num=eval(oResult.value);//如果num未定义 如2*3+ 此时点等于号
                    }
                    else {
                        num =eval( (oHiddenInput.value).substring( t ) );
                    }
                }
                func=oHiddenInput.value[t];
            }
            if(num==undefined || isNaN(num)) {
                //如果num未定义 1+ 此时点等于号,容错一般用不上
                num=eval(oResult.value);
            }
            console.log('num:'+num);
            if(isFinite(num)==false){
                alert("计算不合法:被除数不能为0");
                return false;
            }
            switch (func) {
                case '+':
                    sum = sum + num;
                    break;

                case '-':
                    sum = sum - num;
                    break;

                case '*':
                    sum = 10000 * sum * num / 10000;
                    break;

                case '/':
                    if(num==0){
                        alert("计算不合法:被除数不能为0");
                        return false;
                    }
                    else{
                        sum = sum / num;
                    }
                    break;
            }
            console.log('sumnew:'+ sum);
            oResult.value=oHiddenInput.value=sum;
            o={
                'onelevel':0,
                'twolevel':0
            };
            key=false;
            lock=true;
        }
    }

    function clearZero(){
        window.location.reload();
    }

    function del(){
        //计算之后不能用,用lock控制
        //只能删除lock
        if(lock){
            return false;
        }
        else{
            if(oResult.value != '0'){
                oHiddenInput.value = oHiddenInput.value.substring(0,oHiddenInput.value.length-1);
                oResult.value = (oResult.value).substring(0,oResult.value.length-1);
            }
            if(oResult.value=='' || oResult.value =='0'){
                oResult.value = 0;
            }
        }
    }

    /**
     * 功能键入口程序
     * @param p
     */
    function getChange(p){
        change = changeNumBtn[p].value;
        getInput(change)
    }
    /**
     * 函数 getbyclass
     * @param oParent 目标的父极dom
     * @param sClass 目标classname
     * @returns {Array} 找到的class符合的dom array
     */
    function getByClass(oParent,sClass){
        var aEle=oParent.getElementsByTagName('*');
        var aResult=[];
        var re=new RegExp('\\b'+sClass+'\\b', 'i');

        for(var i=0;i<aEle.length;i++){
            if(re.test(aEle[i].className)){
                aResult.push(aEle[i])
            }
        }
        return aResult;
    }

};