/**面向过程 
 * 有流程，有步骤，按照顺序自己去一步一步的做
 */

/**面向对象
 * 通过某功能来实现自己想要的，或者制造某功能来实现，
 * 不需要自己一步一步去做
 * 对面向过程的'高度封装'，高内聚低耦合（提高模块内部的关联程度，降低模块之间的关联程度）
 */

/**
 * 举例，把大象放进冰箱
 * 1.面向过程
 * 开门（冰箱）
 * 装进去（大象）
 * 关门（冰箱）
 * 
 * 2.面向对象
 * 冰箱.开门
 * 冰箱.装进大象
 * 冰箱.关门
 */

//创建对象的方式
//1- 字面量创建对象
let obj1 = {
    name: "obj1",
    order: 1
}
//2- 内置构造函数创建对象
let obj2 = new Object();
obj2.name = "obj2";
obj2.order = 2;

/**3- 工厂函数创建对象
 * 自己创建一个工厂函数
 * 使用这个工厂函数来创建对象   
 * 
 * 工厂函数:指这些内建函数都是类对象，当调用他们时，实际上是创建了一个类实例
 */
function createObj(name,order) {
    let obj = new Object();
    obj.name = name;
    obj.order = order;
    return obj;
}
let obj3 = createObj("obj3",3);
console.log('[工厂函数创建对象 - obj3 ] >', obj3);
let obj4=createObj("obj4",4);
console.log('[工厂函数创建对象 - obj4 ] >', obj4);

/**4-自定义构造函数来创建对象 
 * 自己写一个构造函数
 * 使用这个构造函数来创建对象
 * 
 * 构造函数：普通函数，与new连用，才有了构造函数的能力
*/
function mycreateObj(name,order){
    this.name=name;
    this.order=order;
}
let obj5=new mycreateObj("obj5",5);//this指向obj5
console.log('[自定义构造函数创建对象 - obj5 ] >', obj5)

/**
 * 构造函数--（抽象的类）
 * 构造函数就是函数，只不过在调用的时候与new连用
 * 构造函数的目的是创建一个有属性，有方法，合理的对象，如果达不到这些，构造函数就没有意义哦
 * 
 * 1.调用的时候必须用new 不然没有创建对象的能力 undefined，有new 自动创建对象 =>实例对象，创造的过程叫实例化的过程
 * 2.构造函数不要return 
 * 3.不传递参数的时候，new obj() 这个()可以不写
 * 4.建议首字母大写 直观看出和普通函数的区别
 */

/**构造函数的不合理性
 * 多余的内存空间被占用
 */
function Person(name){
    this.name=name;
    this.fun=function fun(){
        console.log('[ 我是一个函数，每次创建实例化对象的时候，我都new一个新的来占用内存空间 ] >')
    }
}
let obj6=new Person("obj6");//本次创建的时候，开辟一段内存空间存储fun函数
console.log('[ obj6 ] >', obj6);
let obj7=new Person("obj7");//本次创建的时候，开辟一段内存空间存储fun函数
console.log('[ obj7 ] >', obj7);
/**解决不合理性
 * 把函数单独提取出来，并且把所有的函数放在一个对象里
 * 一百个构造函数，一百个对象
 * 又出现了新的问题，太繁琐了，一层又一层   
 * Person_2.fun, Person_2.fun2, Person_2.fun3 ...
 */
// function fun(){
//     console.log('[ 我是一个函数，我现在被放到外面了] >')
// }
// function fun2(){
//     console.log('[ 我是第二个函数，我现在被放到外面了] >')
// } //一个函数占用一个变量
let PersonObj={
    fun:function fun(){console.log('[ 我被放在了对象里 ] >')},
    fun2:function fun2(){console.log('[ 我被放在了对象里 ] >')},
}
function Person_2(name){
    this.name=name;
    this.fun=PersonObj.fun;
    this.fun2=PersonObj.fun2;
}
let obj8=new Person_2("obj8");
console.log('[ obj8 ] >',obj8 );
let obj9=new Person_2("obj9");
console.log('[ obj9 ] >', obj9);

/**prototype 原型/原型对象 
 * 每个函数都有个prototype属性，他是个对象
 * prototype里面有个constructor属性 constructor表示我是由哪个构造函数伴生的原型对象，
 * eg下面这个例子obj10，constructor是Person_3
 * 
 * 
*/
function Person_3(){};
// console.log('[ Person_3.prototype] >', Person_3.prototype);
Person_3.prototype.say=function(){
    console.log('[ person3 say hello ] >');
};
let obj10=new Person_3();
console.log('[ Person_3.prototype ] >', obj10.prototype);

/** __proto__ 
 * 每个对象自带一个__proto__,指向所属构造函数的prototype
 * 实例化对象也是对象
*/
function Person_4(){};  
let obj11=new Person_4();
console.log('[ obj11 ] >', obj11);
/**
 * obj11的proto=Person_4的prototype
 * obj11的construstor=Person_4
*/

/**面向对象的特性-封装 继承 多态
 * 封装：把客观事物封装成抽象的类，隐藏属性和方法的实现细节，仅对外公开接口
 * 继承：子类可以使用父类的所有功能
 * 多态：核心思想就是将做什么，怎么做，谁去做分离。将不变的事物和可变的事物分离。
 */
function mantoPlay(man){
    man.play();
}
let guitarist=function(){};
guitarist.prototype.play=function(){
    console.log('[ 哆啦咪嗦啦 ] >' )
}
let rocker=function(){};
rocker.prototype.play=function(){
    console.log("[ we're rocker ] >");
}
mantoPlay(new guitarist());
mantoPlay(new rocker());
/**
 * 输出
 * [ 哆啦咪嗦啦 ] >
 * [ we're rocker ] >
 * 我的理解，不同的人通过这个方法做事情，有可能得到一样的结果，也有可能得到不同的结果
 */


// 再来一遍
function main(man){
    man.play();
}
let a1=function(){}
let a2=function(){};
a1.prototype.play=function(){
    console.log('[ a1 to play ] >');
}

a2.prototype.play=function(){
    console.log('[ a2 to play ] >');
}
main(new a1); //没有参数，可以省略()
main(new a2);




