/**
 * 理解一下闭包
 * 就是能访问、调用函数内部的变量就叫闭包
 * 闭包就是函数内部定义的函数 
 * 
 * 应用场景:需要维护内部变量的场景下
 * 产生场景:当一个函数（fun）运行时他的形参或者私有变量被内部函数引用，fun就形成了闭包
 * 
 * 意义：
 * 延长生命周期 （不会被垃圾回收机制回收掉）
 * 私有环境
 * 永久保存在内存当中
 */


/**下面这个例子，私有变量，不会被影响 */
let makeCounter = function () {
    let num = 0;

    function changeNum() {
        num += 1;
    }

    return {
        add:function(){
            changeNum(1)
        },
        reduce:function(){
            changeNum(-1)
        },
        value:function(){
            return num
        }
    }
}
let a1=makeCounter()
let a2=makeCounter();
a1.add()
a1.add()
console.log('[ a1.value ] >', a1.value())
a2.add()
a2.add()
console.log('[ a2.value ] >', a2.value())
/**  
 * 循环与闭包，eg2 
 * 1.共享一个i，所以第一次输出的是五个6，之后把setTimeout声明为一个函数，创建作用域，
 * 并且传递i进去，就有一个真正的变量提供使用
 * 2.i定义用let
 */


function fun() {
    let num = 10;

    function littleFun() {
        console.log('[ num ] >', num)
        debugger
    }
    littleFun();
}
fun();
//eg1
// function baz() {
//     var a = 2;

//     function ofun() {
//         console.log('[ a ] >', a);
//     }
//     return ofun;
// }
// var foo = baz();
// foo();

function foo() {
    var a = 100;

    function fun() {
        console.log('[ a ] >', a);
    }
    bar(fun);
}

function bar(fn) {
    fn(); //这就是一个闭包
}
foo();


//eg2
// for (var i=1; i<=5; i++) { 
//     setTimeout( function timer() { 
//     console.log( i ); 
//     }, i*1000 ); 
//    }

for (var i = 1; i <= 5; i++) {
    (function () {
        var j = i;
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })();
}

for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })(i);
}


for (let i = 1; i <= 5; i++) {
    (function (i) {
        setTimeout(function timer() {
            console.log('[ i ] >', i)
        }, i * 1000)
    })(i);
}

// for (var i = 1; i <= 5; i++) {
//     let j = i; // 是的，闭包的块作用域！
//     setTimeout(function timer() {
//         console.log(j);
//     }, j * 1000);
// }

//var 和 let的区别
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        // console.log("i",i);
    }, i * 1000);
}

for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log("i", i);
    }, i * 1000);
}