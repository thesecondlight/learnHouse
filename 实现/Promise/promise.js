/**
 * https://juejin.cn/post/6952083081519955998
 * https://es6.ruanyifeng.com/#docs/promise 阮一峰大佬
 * promise 介绍：
 * 异步编程的一种解决方案，比传统的解决方案 回调函数 更合理 
 * es6将其写进了语言标准，统一了用法，原生提供了promise对象
 * 简单来说就是是个容器，里面放着未来发生的事件结果 
 * 有三种状态 pending fulfilled  rejected  进行中 已成功 已失败
 * promise缺点: 
 *  无法取消Promise,一旦新建它就会立即执行，无法中途取消。
    如果不设置回调函数，promise内部抛出的错误，不会反应到外部。
    当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

 * 一些补充：
 *  es6新增的引用类型，可以通过new来实例化对象
 *  为了解决回调地狱{{{}}} 多层嵌套
 * 
 * promise 就会 .then() .then() .then() 链式调用似的代码更直观
 *  回调
    promise.all() 并行，都有了返回，才有返回
    promise.race()  有一个有返回(最先解决或者拒绝)就返回 
    await返回一个promise对象
    使用await可以用try catch处理JSON.parse错误

和async的区别 
async使异步操作更方便，更好的语义化 async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
await后面 可以是promise或者原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）
返回值是promise
try...catch...

async函数可以看成多个异步操作，包装成的一个promise对象，而await就是then的语法糖



 * promise
    实现一个promise
    写个class，定义状态 pending ，value存值，
    两个方法，resolve，reject（将pending改为对应状态） 参数是value
 */
function add(cb) {
    var x, y;
    (getX = () => {
        x = 2;
        // 两个都准备好了？
        if (y != undefined) {
            cb(x + y); // 发送和
        }
    })();

    (getY = () => {
        y = 4;
        // 两个都准备好了？
        if (x != undefined) {
            cb(x + y); // 发送和
        }
    })();
}
// fetchX() 和fetchY()是同步或者异步函数
add(function (sum) {
    // console.log("第一步 x+y",sum); // 是不是很容易？
});


let a, b;
let xFun = () => {
    a = 2;
}
let yFun = new Promise((resolve, reject) => {
   // b = 20;
     reject("error");
})

// let yFun = () => {
//     b = 20;
//     //reject("error");
// }

function add2(xFun, yFun) {
    return Promise.all([xFun, yFun]) //哇哦哇哦哇哦~~
        .then(
            () => {
                console.log('[ a+b ] >', a, b)
                return a + b;
                // return a + c; //test err
            }
        )
}
// add2(xFun(), yFun())
//     .then(
//         (sum) => console.log('[ sum ] >', sum),
//         (err) => console.error('[ error ] >', err)
//     );

// add2(xFun(), yFun())

add2(xFun(), yFun)
    .then(
        (sum) => console.log('[ sum ] >', sum),
    )
    .catch(
        (err) => {
            console.log('[ err ] >', err)
        }
    );

//嘿嘿嘿 真好玩


class Promise{
    constructor(executor){
      // 初始化state为等待态
      this.state = 'pending';
      // 成功的值
      this.value = undefined;
      // 失败的原因
      this.reason = undefined;
      let resolve = value => {
         console.log(value);
        if (this.state === 'pending') {
          // resolve调用后，state转化为成功态
          console.log('fulfilled 状态被执行');
          this.state = 'fulfilled';
          // 储存成功的值
          this.value = value;
        }
      };
      let reject = reason => {
         console.log(reason);
        if (this.state === 'pending') {
          // reject调用后，state转化为失败态
          console.log('rejected 状态被执行');
          this.state = 'rejected';
          // 储存失败的原因
          this.reason = reason;
        }
      };
      // 如果 执行器函数 执行报错，直接执行reject
      try{
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
  }
