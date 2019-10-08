## JavaScript

### javascript数据类型
**基本数据类型**：字符串(String)、数字(Number)、布尔(Boolean)、对空(Null)、未定义(Undefined)、Symbol<br />**引用数据类型**：对象(Object)、数组(Array)、函数(Function)
> 区别：基本数据类型存储在栈内存中，引用数据类型的值存储在堆内存中，在栈中存储的是指向堆内存的指针

**null和undefined的区别**：<br />1.Undefined 与 null 的值相等，但类型不相等.
```javascript
typeof undefined              // undefined
typeof null                   // object
// 在验证null时，一定要使用　=== ，因为 ==无法分别null 和　undefined
null === undefined            // false
null == undefined             // true
```

2.给变量赋值null相当于分配了一块空的内存，会被js回收。赋值undefined只是将值清空，变量依然存在。
<a name="QxbFy"></a>
### javascript三大对象
**本地对象**：

- 与宿主无关，独立于宿主环境的ECMAScript实现提供的对象,需要通过new来创建所需的实例对象
- Object、Array、Boolean、Number、String、Function、Arguments、Math、Date、RegExp、Error

**内置对象**：

- 与宿主无关，独立于宿主环境的ECMAScript实现提供的对象,内置对象是本地对象的子集
- Global、Math、Json

**宿主对象**：

- 由 ECMAScript 实现的宿主环境提供的对象，包含两大类，一个是宿主提供，一个是自定义类对象,所有非本地对象都属于宿主对象
- Window 、Document、DOM、BOM
> 扩展内置对象不好的原因：如果自己扩展的方法和js的不同，而浏览器或者js的实现更新会导致所有使用扩展原型的代码都崩溃。[详细介绍](https://segmentfault.com/a/1190000011467723?utm_source=tag-newest)

<a name="RQsFb"></a>
### 类型判断
**typ****eof**: typeof能准确判断除null以外的原始类型的值，对于对象类型，除了函数会判断成function，其他对象类型一律返回object

```javascript
console.log(typeof undefined) // undefind
console.log(typeof null) // object
console.log(typeof true) // boolean
console.log(typeof 43) // number
console.log(typeof '21') // string
console.log(typeof {a:1}) // object
console.log(typeof Symbol()) // symbol
function a() {}
console.log(typeof a); // function
var date = new Date();
var error = new Error();
console.log(typeof date); // object
console.log(typeof error); // object
```

**instanceof**: instanceof可以准确的判断复杂数据类型，但是不能正确判断基本数据类型

```javascript
console.log(12 instanceof Number)  // false
console.log('22' instanceof String)  // false
console.log([] instanceof Array)   // true
console.log({a: 1} instanceof Object) // true
console.log(true instanceof Boolean) // false
console.log(json instanceof Object) // true
function a() {}
console.log(new Date() instanceof Date)  //true
console.log(a instanceof Function)  // true
console.log(reg instanceof RegExp) //true
console.log(error instanceof Error) // true
console.log(null instanceof Object) // false
console.log(undefined instanceof Object) // false
```

**constructor: **也不是保险的，因为constructor属性是可以被修改的，会导致检测出的结果不正确

```javascript
console.log([].constructor === Array)   // true
function a() {}
console.log(a.constructor === Function)   // true
console.log(12.constructor === Number)  // true
console.log('22'.constructor === String)  // true
console.log([] .constructor ===  Array)   // true
console.log({a: 1}.constructor ===  Object) // true
console.log(true.constructor === Boolean) // true
console.log(json.constructor === Object) // true
console.log((new Date()).constructor === Date)   // true
console.log(reg.constructor ===  RegExp) //true
console.log(error.constructor === Error) // true
```

**Object.prototype.toString:**

```javascript
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]
function a() {
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
// 封装
let isType = type => obj => {
  return Object.prototype.toString.call( obj ) === '[object ' + type + ']';
}
// 或者
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
```

<a name="o1qg7"></a>
### 类型转换
=== 是严格相等，不允许类型转换只有类型相同并且值相等时，才返回true<br />== 允许在相等比较中进行强制类型转换，然后进行值的比较，值相等返回true<br />== 比较流程：
> 1.首先判断两者类型是否相同，如果相等，判断值是否相等.
> 2.如果类型不同，进行类型转换
> 3.判断比较的是否是 null 或者是 undefined, 如果是, 返回 true .
> 4.判断两者类型是否为 string 和 number, 如果是, 将字符串转换成 number
> 5.判断其中一方是否为 boolean, 如果是, 将 boolean 转为 number 再进行判断,如果另外一方为string,又进行第4步
> 5.判断其中一方是否为 object 且另一方为 string、number 或者 symbol , 如果是, 将 object 转为原始类型再进行判断。
> 对象转原始类型逻辑：
> - 是否已经是原始类型，是则直接返回
> - 调用`valueOf()`，如果转换为原始类型，则返回
> - 调用`toString()`，如果转换为原始类型，则返回
> - 也可以重写`Symbol.toPrimitive()`方法，优先级别最高
> - 如果都没有返回原始类型，会报错
> 
参考：[你不知道的类型转换](https://github.com/LuoShengMen/StudyNotes/issues/381)

**类型转换规则**：转布尔值、转字符串、转数字<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1562685999944-9fcb45f8-3662-4152-894b-cbab0a8865c5.png#align=left&display=inline&height=446&name=image.png&originHeight=648&originWidth=910&size=230164&status=done&width=627)<br />**类型转换应用**：
```javascript
// 案例一
[] == ![] //true =>
[] == false // => 
[] == 0 // =>
0 == 0 // true
// 案例二
var a = {
  value: 0,
  valueOf() {
    this.value++;
    return this.value;
  }
}
if(a==1 && a==2 && a==3) {
  console.log('true'); // 输出true
}
// 案例三
// 在 == 中 null 和 undefined 相等(它们也与其自身相等)，除此之外其他值都不存在这种情况
var a = null;
var b;
a == b;     // true
a == null;  // true
b == null;  // true
a == false; // false
b == false; // false
a == "";    // false
b == "";   // false
a == 0;  // false
b == 0;  // false
```

<a name="LNpm0"></a>
### New实现原理

- 创建一个新对象。
- 这个新对象会被执行[[原型]]连接。
- 将构造函数的作用域赋值给新对象，即this指向这个新对象.
- 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

**字面量和通过new方式创建的区别**：

- 字面量创建对象，不会调用 Object构造函数, 简洁且性能更好;
- new Object() 方式创建对象本质上是方法调用，涉及到在proto链中遍历该方法，当找到该方法后，又会生产方法调用必须的 堆栈信息，方法调用结束后，还要释放该堆栈，性能不如字面量的方式。

<a name="8cWDh"></a>
### this指向
**默认绑定**：独立函数调用，在全局模式下，全局对象将无法使用默认绑定，this指向window<br />**隐式绑定**：调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含,对象属性引用链中只有最顶层或者说最后一层会影响调用位置，this指向调用对象<br />**显示绑定**：call()、apply()和bind()改变上下文的方法，this指向取决于这些方法的第一个参数，当第一个参数为null时，this指向全局对象window
> call是需要参数按顺序传递进去，apply接受参数数组，第二个参数可以是 Array 的实例，也可以是 arguments 对象.call比apply的性能要好

**New绑定**：调用new来构造返回一个实例，this指向该实例

**优先级**：new绑定>显示绑定>隐式绑定>默认绑定
> 箭头函数不适用 this 的四种标准规则，而是根据外层(函数或者全局)作用域来决定this。箭头函数会继承外层函数调用的 this 绑定(无论 this 绑定到什么)。这 其实和 ES6 之前代码中的 self = this 机制一样


**this解析流程图**:<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1562770344188-2c4ca416-5869-455c-881b-eef9d33edcc9.png#align=left&display=inline&height=426&name=image.png&originHeight=531&originWidth=744&size=35355&status=done&width=597)

<a name="XrFOH"></a>
### 闭包
当一个函数能够记住并访问它所在的词法作用域的时候，就产生了闭包，即使函数式在词法作用域之外执行<br />**闭包带来的影响**：因为变量一直被引用所以不会被回收，这就会增加内存消耗，导致内存泄漏。<br />**闭包的几种表现形式**<br />**返回一个函数**：这种形式的闭包在`JavaScript`的代码编写中，是非常常见的一种方式
```javascript
var a  = 1;
function foo(){
  var a = 2;
  // 这就是闭包
  return function(){
    console.log(a);
  }
}
var bar = foo();
// 输出2，而不是1
bar();
```

**作为函数参数传递**：无论通过何种手段将内部函数传递到它所在词法作用域之外，它都会持有对原始作用域的引用，无论在何处执行这个函数，都会产生闭包。
```javascript
var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这就是闭包
  fn();
}
// 输出2，而不是1
foo();
```

**回调函数**：在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。
```javascript
// 定时器
setTimeout(function timeHandler(){
  console.log('timer');
}，100)

// 事件监听
$('#container').click(function(){
  console.log('DOM Listener');
})
```

**IIFE**：IIFE(立即执行函数表达式)并不是一个典型的闭包，但它确实创建了一个闭包。
```javascript
var a = 2;
(function IIFE(){
  // 输出2
  console.log(a);
})();
```

**经典闭包面试题**：
```javascript
for(var i=1;i<=5;i++){
  setTimeout(function timer(){
    console.log(i)
  }, i*1000)
}
// 方法一,利用IIFE(立即执行函数表达式)当每次for循环时，把此时的i变量传递到定时器中
for(var i=1;i<=5;i++){
  (function(j){
    setTimeout(function timer(){
      console.log(j)
    }, i*1000)
  })(i)
}
// 方法二,setTimeout函数的第三个参数，可以作为定时器执行时的变量进行使用
for(var i=1;i<=5;i++){
  setTimeout(function timer(j){
    console.log(j)
  }, i*1000, i)
}
// 方法三，使用let
for(let i=1;i<=5;i++){
  setTimeout(function timer(){
    console.log(i)
  }, i*1000)
}
```

<a name="DNUnV"></a>
### 内存泄漏
内存泄漏指任何对象在您不再拥有或需要它之后仍然存在，常见有四种类型的内存泄漏<br />1.**意外的全局变量**<br />解决办法：在JavaScript 文件头部加上 'use strict'(消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为)，使用严格模式避免意外的全局变量，此时上例中的this指向undefined。如果必须使用全局变量存储大量数据时，确保用完以后把它设置为 null 或者重新定义。<br />2.**被遗忘的计时器或回调函数**<br />解决办法：现代的浏览器（包括 IE 和 Microsoft Edge）使用了更先进的垃圾回收算法（标记清除），已经可以正确检测和处理循环引用了。即回收节点内存时，不必非要调用 removeEventListener 了。<br />3.**脱离 DOM 的引用**<br />4.**闭包**<br />解决方法：使用后给变量复制null<br />5.**事件监听**: 没有正确销毁 (低版本浏览器可能出现)

<a name="XClPj"></a>
### 原型与原型链
对象都有一个[[prototype]]的属性，他指向它的原型对象，原型对象也有一个[[prototype]]的属性，以此循环，最终指向null,原型链是由原型对象组成，每个对象都有 **proto** 属性，指向了创建该对象的构造函数的原型，**proto** 将对象连接起来组成了原型链。是一个用来实现继承和共享属性的有限的对象链。

- 属性查找机制: 当查找对象的属性时，如果实例对象自身不存在该属性，则沿着原型链往上一级查找，找到时则输出，不存在时，则继续沿着原型链往上一级查找，直至最顶级的原型对象Object.prototype，如还是没找到，则输出undefined；<br />
- 属性修改机制: 只会修改实例对象本身的属性，如果不存在，则进行添加该属性，如果需要修改原型的属性时，则可以用: b.prototype.x = 2；但是这样会造成所有继承于该对象的实例的属性发生改变。<br />

```javascript
    function SuperType() {
      this.name = 'hello world'
    }
    const instance = new SuperType();
    console.log(instance.__proto__ === SuperType.prototype) //true
    console.log(SuperType.prototype.__proto__ === Object.prototype); //true
    console.log(Object.prototype.__proto__ === null) //true
    console.log(instance.constructor === SuperType) //true instance没有实例属性，会想原型对象上寻找
    console.log(SuperType.prototype.constructor === SuperType) //true
    console.log(Object.getPrototypeOf(instance) === SuperType.prototype) //true
    console.log(SuperType.prototype.isPrototypeOf(instance)) //true
    console.log(SuperType.constructor === Function)         // true
    console.log(Function.__proto__=== Object.prototype)       // false
    console.log(Function.__proto__=== Function.prototype)  // true
    console.log(Function.prototype.__proto__ === Object.prototype)  // true
```

几乎所有的js对象都是位于原型链顶端的Object实例

- 只有构造函数才有prototype属性
- 构造函数的prototype，默认情况下就是一个new Object()还额外添加了一个constructor属性
- 除了Object.prototype这个对象，其他所有的实例对象都会有__proto__属性（函数也是对象）

**一张图即可解释**：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1562852254449-bd216080-0be5-40c8-957f-a7854c79c36d.png#align=left&display=inline&height=559&name=image.png&originHeight=1034&originWidth=960&size=186326&status=done&width=519)

<a name="PTOBy"></a>
### 函数
**箭头函数**：箭头函数就是普通函数的简写，但是有所区别<br />1.函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象，它会从自己的作用域链的上一层继承 this（因此无法使用 apply / call / bind 进行绑定 this 值）<br />2.箭头函数不可以使用 arguments 对象,，该对象在函数体内不存在，如果要用，可以用 rest 参数代替<br />3.不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数<br />4.不绑定 super 和 new.target<br />5.不可以使用 new 命令，因为

- 没有自己的 this，无法调用 call，apply
- 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 **proto**

**纯函数**：是指同输入同输出，没有副作用的函数(无副作用指的是函数内部的操作不会对外部产生影响（如修改全局变量的值、修改 dom 节点等）)<br />**匿****名函数**：就是没有函数名的函数,常用于IIFE，仅在调用时，才临时创建函数对象和作用域链对象
```javascript
var a=function(){ return 1 };
```

**IIFE(自执行匿名函数)**：声明立即调用执行这个函数，用于闭包和避免全局变量的污染以及函数名的冲突<br />常见形式：
```javascript
(function(){ alert(1);})()
(function(){ alert(2);}())
(() => {console.log(1)})()
void function(){ alert(3); }()
!function foo(){ }()
+function foo(){ }()
!function(){}();
~function(){}();
// error
(() => {console.log(1)}())
```
作用：

1. 创建作用域，内部保存一些大量临时变量的代码防止命名冲突。
1. 一些库的外层用这种形式包起来防止作用域污染。
1. 运行一些只执行一次的代码

优点：<br />1.提升性能—减少作用域查找: 使用IIFE的一个微小的性能优势是通过匿名函数的参数传递常用全局对象window、document、jQuery，在作用域内引用这些全局对象。JavaScript解释器首先在作用域内查找属性，然后一直沿着链向上查找，直到全局范围。将全局对象放在IIFE作用域内提升js解释器的查找速度和性能。<br />2.有利于压缩—有利于压缩: 另一个微小的优势是有利于代码压缩。既然通过参数传递了这些全局对象，压缩的时候可以将这些全局对象匿名为一个字符的变量名(只要这个字符没有被其他变量使用过)<br />3.避免冲突—避免全局命名冲突: 当使用jQuery的时候，全局的window.jQuery对象作为一个参数传递给在匿名函数内部你再也不需要担心和其他库或者模板申明冲突。<br />4.依赖加载—通过传参的方式: 可以灵活的加载第三方插件。
> 不同的函数调用模式：函数调用，方法调用，构造器调用模式、.call() 和 .apply()


<a name="JVDk8"></a>
### 深度优先与广度优先
**深度优先遍历(Depth-First-Search)**: 是搜索算法的一种，它沿着树的深度遍历树的节点，尽可能深地搜索树的分支。当节点v的所有边都已被探寻过，将回溯到发现节点v的那条边的起始节点。这一过程一直进行到已探寻源节点到其他所有节点为止，如果还有未被发现的节点，则选择其中一个未被发现的节点为源节点并重复以上操作，直到所有节点都被探寻完成。一般采用递归来实现
```javascript
Graph.prototype.dfs = function() {
    var marked = []
    for (var i=0; i<this.vertices.length; i++) {
        if (!marked[this.vertices[i]]) {
            dfsVisit(this.vertices[i])
        }
    }
    
    function dfsVisit(u) {
        let edges = this.edges
        marked[u] = true
        console.log(u)
        var neighbors = edges.get(u)
        for (var i=0; i<neighbors.length; i++) {
            var w = neighbors[i]
            if (!marked[w]) {
                dfsVisit(w)
            }
        }
    }
}
```

**广度优先遍历(Breadth-First-Search):** 是从根节点开始，沿着图的宽度遍历节点，如果所有节点均被访问过，则算法终止，BFS 同样属于盲目搜索，一般用队列数据结构来辅助实现BFS.
```javascript
Graph.prototype.bfs = function(v) {
    var queue = [], marked = []
    marked[v] = true
    queue.push(v) // 添加到队尾
    while(queue.length > 0) {
        var s = queue.shift() // 从队首移除
        if (this.edges.has(s)) {
            console.log('visited vertex: ', s)
        }
        let neighbors = this.edges.get(s)
        for(let i=0;i<neighbors.length;i++) {
            var w = neighbors[i]
            if (!marked[w]) {
                marked[w] = true
                queue.push(w)
            }
        }
    }
}
```

**经典案例**：数组扁平化
```javascript
// 展开数组[3,[4,8,[9,1],3],[6,8],[2,10],5,7]
// 深度
  function flatten(arr) {
    var newArr = [];
    arr.map(item => {
      if(Array.isArray(item)){
        newArr.push(...flatten(item))
      } else {
        newArr.push(item)
      }
    })
    return newArr
  }
// 广度
  function flatten(arr) {
    let stack = [...arr].reverse()
    let newArr = []
    while(stack.length){
      let o = stack.pop()
      if(Array.isArray(o)){
        stack.push(...o.reverse())
      } else {
        newArr.push(o)
      }
    }
    return newArr
  }
// 其他方式
function flatten(arr) {
    return arr.toString().split(',').map(function(item) {
        return Number(item);
    })
} 
function flatten(arr) {
    return arr.join(',').split(',').map(function(item) {
        return Number(item);
    })
}
```

<a name="RfepR"></a>
### 浅拷贝与深拷贝
**浅拷贝(shallow copy):** 只复制指向某个对象的指针，而不复制对象本身，新旧对象共享一块内存<br />1.利用Object.assign()方法<br />2.利用...扩展运算符<br />3.Array的slice和concat
> 上述的都可以进行部分部分深拷贝,但是只能拷贝一层，不能对对象的子对象进行拷贝

**深拷贝(deep copy): **复制并创建一个一摸一样的对象，不共享内存，修改新对象，旧对象保持不变<br />1.配合使用JSON.parse()和JSON.stringify()两个函数(局限性比较大)<br />2.实现自己的简易深拷贝方法<br />3.lodash第三方库实现深拷贝<br />**分析表：**<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1562900083155-5d9f7415-bb5d-46e4-b6f2-cc88fe04d073.png#align=left&display=inline&height=622&name=image.png&originHeight=1244&originWidth=1384&size=217675&status=done&width=692)
<a name="Arq0i"></a>
### 继承
在JavaScriptES6之前，实现继承需要依赖原型、原型链和构造函数等等技术手段组合使用，在ES6之后，可以使用Class类继承(并没有真正的类，只是一个语法糖，实质依然是函数)<br />**继承的几种方式**
> 1.原型链实现继承
2.借用构造函数实现继承3.组合继承4.寄生组合继承5.类继承
**原型链实现继承**
> 通过重写子类的原型，并将它指向父类的手段实现。这种方式实现的继承，创建出来的实例既是子类的实例，又是父类的实例。它有如下几种缺陷：
> 1. 不能向父类构造函数传参
> 1. 父类上的引用类型属性会被所有实例共享，其中一个实例改变时，会影响其他实例

```javascript
function Animal() {
  this.colors = ['red','blue'];
}
function Dog(name) {
  this.name = name;
}
Dog.prototype = new Animal();

var dog1 = new Dog('旺财');
var dog2 = new Dog('钢镚');
dog2.colors.push('yellow');
console.log(dog1.colors); // ["red", "blue", "yellow"]
console.log(dog2.colors); // ["red", "blue", "yellow"]

console.log(dog1 instanceof Dog);   // true
console.log(dog1 instanceof Animal);// true
```

**借用构造函数实现继承**
> 借用构造函数实现继承，通过在子类中使用call()方法，实现借用父类构造函数并向父类构造函数传参的目的。但这种方法，无法继承父类原型对象上的属性和方法。

```javascript
function Animal(name) {
  this.name = name;
  this.colors = ['red','blue'];
}
Animal.prototype.eat = function() {
  console.log(this.name + ' is eating!');
}
function Dog(name) {
  Animal.call(this,name);
}

var dog1 = new Dog('旺财');
var dog2 = new Dog('钢镚');
dog2.colors.push('yellow');

console.log(dog1.colors); // ["red", "blue"]
console.log(dog2.colors); // ["red", "blue", "yellow"]
console.log(dog1 instanceof Dog);   // true
console.log(dog2 instanceof Animal);// false
console.log(dog1.eat()); // 报错
```

**组合继承**
> 组合继承是组合了原型链继承和借用构造函数继承这两种方法，它保留了两种继承方式的优点，但它并不是百分百完美的：父类构造函数被调用多次。

```javascript
function Animal(name) {
  this.name = name;
  this.colors = ['red','blue'];
}
Animal.prototype.eat = function() {
  console.log(this.name + ' is eatting');
}
function Dog(name) {
  Animal.call(this,name);
}
Dog.prototype = new Animal(); // 第一次调用
var dog1 = new Dog('dog1');   // 第二次调用
var dog2 = new Dog('dog2');   // 第三次调用
dog1.colors.push('yellow');
console.log(dog1.name);  // 输出dog1
console.log(dog2.colors);// 输出['red','blue']
console.log(dog2.eat()); // 输出dog2 is eatting
```

**寄生组合继承**
> 寄生组合继承是在组合继承的基础上，采用Object.create()方法来改造实现

```javascript
function Animal(name) {
  this.name = name;
  this.colors = ['red','blue'];
}
Animal.prototype.eat = function() {
  console.log(this.name + ' is eatting');
}
function Dog(name) {
  Animal.call(this,name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
var dog1 = new Dog('dog1');
var dog2 = new Dog('dog2');
dog1.colors.push('yellow');
console.log(dog1.name);  // 输出dog1
console.log(dog2.colors);// 输出['red','blue']
console.log(dog2.eat()); // 输出dog2 is eatting
```

**Class实现继承**
> 运用ES6 class新特性来实现继承
> 1.ES6 class 内部所有定义的方法都是不可枚举的;
> 2.ES6 class 必须使用 new 调用;
> 3.ES6 class 不存在变量提升;
> 4.ES6 class 默认即是严格模式;
> 5.ES6 class 子类必须在父类的构造函数中调用super()，这样才有this对象;ES5中类继承的关系是相反的，先有子类的this，然后用父类的方法应用在this上。

```javascript
class Animal {
  constructor(name) {
    this.name = name;
    this.colors = ['red','blue'];
  }
  eat() {
    console.log(this.name + ' is eatting');
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name);
  }
}
var dog1 = new Dog('dog1');
var dog2 = new Dog('dog2');
dog1.colors.push('yellow');
console.log(dog1.name);  // 输出dog1
console.log(dog2.colors);// 输出['red','blue']
console.log(dog2.eat()); // 输出dog2 is eatting
```
**区别：**
> ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
> ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。


<a name="5ySya"></a>
### 设计模式
javacript创建对象的多种设计模式
> 1. 工厂模式
> 1. 构造函数模式
> 1. 原型模式
> 1. 组合模式
> 1. 寄生构造函数模式

**工厂模式**
> 用函数来封装以特定接口创建对象,缺点是没有解决对象识别的问题

```javascript
function createPerson(name, age, job){
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function(){
            alert(this.name);
        };
        return o;
 }
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");
```

**构造函数模式**
> ECMAScript 中的构造函数可用来创建特定类型的对象,使用构造函数的主要问题，就是每个方法都要在每个 实例上重新创建一遍

```javascript
function Person(name, age, job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function(){
            alert(this.name);
        }; 
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```

**原型模式**
> 不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象,但是实例没是要有属于自己的全部属性的

```javascript
function Person(){}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
   alert(this.name);
};
var person1 = new Person();
person1.sayName();   //"Nicholas"
var person2 = new Person();
person2.sayName(); //"Nicholas"
alert(person1.sayName == person2.sayName);  //true
```

**组合模式**
> 组合使用构造函数模式与原型模式。构造函数模式用于定义实 例属性，而原型模式用于定义方法和共享的属性

```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court”];
}

Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);
    }
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
alert(person1.friends);    //"Shelby,Count,Van"
alert(person2.friends);    //"Shelby,Count"
alert(person1.friends === person2.friends);//false
alert(person1.sayName === person2.sayName);//true
```

**寄生构造函数模式**
> 创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象 

```javascript
function Person(name, age, job){
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function(){
            alert(this.name);
        };
        return o;
 }

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();  //"Nicholas"
```

<a name="LXEMD"></a>
### 观察者模式和订阅-发布模式
**概念：**

- 发布-订阅模式就好像报社， 邮局和个人的关系，报纸的订阅和分发是由邮局来完成的。报社只负责将报纸发送给邮局。
- 观察者模式就好像 个体奶农和个人的关系。奶农负责统计有多少人订了产品，所以个人都会有一个相同拿牛奶的方法。奶农有新奶了就负责调用这个方法。

**区别：**

- 观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知
- 总的来说，发布-订阅模式适合更复杂的场景

<a name="z3Rx0"></a>
### let、const、var

1. var声明的变量会提升到作用域的顶部，而let和const不会进行提升
1. var声明的全局变量会被挂载到全局window对象上，而let和const不会
1. 同一作用域下let和const不能声明同名变量，而var可以
1. var声明的变量作用域范围是函数作用域，而let和const声明的变量作用域范围是块级作用域。
1. const声明的常量，一旦声明则不能再次赋值，再次赋值会报错(更改对象属性不会，因为对象地址没有变)
1. let有暂时性死区
```javascript
var a = 100;
if(1){
    a = 10;
    //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a，
    // 而这时，还未到声明时候，所以控制台Error:a is not defined
    let a = 1;
}
```

<a name="kzBuY"></a>
### 遍历
**for...of**
> 具有 iterator 接口，就可以用for...of循环遍历它的成员(属性值)。for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象、Generator 对象，以及字符串。for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。可以中断循环。

```javascript
const iterable = ['mini', 'mani', 'mo'];
for (const value of iterable) {
  console.log(value);       // mini、manni、mo
}
```



**for...in**
> 遍历对象自身的和继承的可枚举的属性, 不能直接获取属性值。可以中断循环。

```javascript
const iterable = ['mini', 'mani', 'mo'];
for (const value in iterable) {
  console.log(value);       // 0、1、2
}
const dog = {age: 1, name: 'dubi', color: 'white'};
for (const value in dog) {
  console.log(value, dog[value]);      
}
// age 1
// name dubi
// color white
```



**forEach**
> 只能遍历数组，不能中断，没有返回值(或认为返回值是undefined)

```javascript
const iterable = ['mini', 'mani', 'mo'];
iterable.forEach((item, index, array) => {
  console.log(item, index, array)
})
// mini 0 (3) ["mini", "mani", "mo"]
// mani 1 (3) ["mini", "mani", "mo"]
// mo 2 (3) ["mini", "mani", "mo"]
```



**map**
> 只能遍历数组，不能中断，返回值是修改后的数组

```javascript
const iterable = ['mini', 'mani', 'mo'];
let  newArr = iterable.map((item, index, array) => {
  return `hello ${item}`
})
// ["hello mini", "hello mani", "hello mo"]
```

**filter**
> filter方法的作用是从原数组中过滤出符合条件的元素，并生成一个新数组

```javascript
const iterable = ['mini', 'mani', 'mo'];
let newArr = iterable.filter((item, index, array) => {
  return item.indexOf('ni') !== -1
})
// ["mini", "mani"]
```

**reduce**
> reduce方法的作用是通过回调函数的形式，把原数组中的元素最终转换成一个值，第一个参数是回调函数，第二个参数是初始值

```javascript
const iterable = ['mini', 'mani', 'mo'];
let newString = iterable.reduce((account, current) => {
  return `${account} - ${current}`
},'')
// " - mini - mani - mo"
```

**some**
> some() 方法用于检测数组中的元素是否满足指定条件
> - 如果有一个元素满足条件，则表达式返回_true_ , 剩余的元素不会再执行检测。
> - 如果没有满足条件的元素，则返回false

```javascript
const iterable = ['mini', 'mani', 'mo'];
iterable.some((item, index, array) => {
  return item.indexOf('mo') !== -1
})
// true
```

<a name="766vW"></a>
### Map和Set
**Map结构：** 对象是创建无序键值对数据结构映射的主要机制，在ES6之前，对象的属性只能是字符串，在ES6之后，Map结构允许使用对象、数组等作为键。Map结构的方法或者属性如下

- set()：新增一个map结构的数据
- get(key)：根据键获取值
- size：获取map结构的长度
- delete(key)：根据指定的键删除
- has(key)：判断指定的键是否存在于map结构中
- keys()遍历，values()遍历，entries()键值对遍历
- clear()清空map结构
```javascript
// Map结构
var map = new Map();
var x = { id: 1 },
    y = { id: 2 };

// 设置map数据
map.set(x,'bar');
map.set(y,'foo');

// 获取map数据
console.log(map.get(x));  // 输出bar
console.log(map.get(y));  // 输出foo

// 获取map结构的长度
console.log(map.size);    // 输出2

// 根据指定键删除map数据
map.delete(x);

// 根据指定的键判断是否存在于map结构中
console.log(map.has(x));  // 输出false

// 遍历map键
for(var key of map.keys()) {
  console.log(key);       // 输出{id:2}
}

// 遍历map值
for(var value of map.values()) {
  console.log(value);     // 输出foo
}

// 遍历map键值对
for(var item of map.entries()) {
  console.log(item[0]);   // 输出y
  console.log(item[1]);   // 输出{id:2}
}
```

**WeakMap**<br />WeakMap结构与Map结构类似，也是用于生成键值对的集合,但是有所区别：

- WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
- WeakMap的键名所指向的对象，不计入垃圾回收机制，此时键名是无效的，不能遍历
- 只有四个方法可用：get()、set()、has()、delete()，（即没有keys()、values()和entries()方法），也没有size属性
```javascript
const wm = new WeakMap();
// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined
```

**Set结构：** Set是一个集合，它里面的值是唯一的，重复添加会被忽略(Set结构不允许强制类型转换，1和"1"被认为是两个不同的值)。Set结构的方法和属性如下

- add()：添加新值
- size：获取Set结构的长度
- delete()：根据指定的键删除
- has()：判断指定的键是否存在Set集合中
- keys()遍历、values()遍历、entries()遍历
- clear()：清空Set结构
```javascript
// Set结构
var set = new Set();
var x = { id: 1 };
var y = { id: 2 };
var a = 1;
var b = "1";
var c = true

// 添加Set数据
set.add(x);
set.add(y);
set.add(a);
set.add(b);
set.add(c);

// 获取Set数据的长度
console.log(set.size);  // 输出5

// 删除Set数据
set.delete(c);

// 判断某个值是否存在Set结构中
console.log(set.has(c));// 输出false

// 遍历Set的键
for(var key of set.keys()) {
  console.log(key);     // 输出{id：1} {id:2} 1 "1"
}

// 遍历Set的值
for(var value of set.values()) {
  console.log(value);   // 输出{id:1} {id:2} 1 "1"
}

// 遍历Set的键值对
for(var item of set.entries()) {
  console.log(item[0]); // 输出 {id:1} {id:2} 1 "1"
  console.log(item[1]); // 输出 {id:1} {id:2} 1 "1"
}
```

**WeakSet**<br />WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别

- WeakSet 的成员只能是对象，而不能是其他类型的值
- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，如果其他对象都不再引用该对象，垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
- 可以用来保存DOM节点，不容易造成内存泄漏,不能遍历，方法有add、delete、has
```javascript
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
```

<a name="HQd3l"></a>
### [Proxy 与 Object.defineProperty](https://github.com/LuoShengMen/StudyNotes/issues/455)
**Object.defineProperty()方法**：会直接在一个对象上定义一个新属性,或修改一个对象的现有属性，并返回该对象
> Object.defineProperty(obj, prop, descriptor) mytttttttttt
> - obj：要在其上定义属性的对象。
> - prop：要定义或修改的属性的名称。
> - descriptor：将被定义或修改的属性描述符

```javascript
// 正确
Object.defineProperty({}, "a", {
    value: 37,
    writable: true,
    enumerable: true,
    configurable: true
});
// 正确
var value = 37;
Object.defineProperty({}, "a", {
    get : function(){
      return value;
    },
    set : function(newValue){
      value = newValue;
    },
    enumerable : true,
    configurable : true
});
// 报错, value和get不能同时存在
Object.defineProperty({}, "a", {
    value: 37,
    get: function() {
        return 1;
    }
});
```

**存在的问题:**<br />1.不能监听数组的变化：数组的以下几个方法不会触发 set,push、pop、shift、unshift、splice、sort、reverse<br />2.必须遍历对象的每个属性：使用 Object.defineProperty() 多数要配合Object.keys() 和遍历，于是多了一层嵌套<br />3.必须深层遍历嵌套的对象：嵌套对象必须逐层遍历，直把每个对象的属性都调用Object.defineProperty() 为止。
> hasOwnProerty用于检查某一属性是不是存在于对象本身，hasOwnProperty函数执行时对象查找时，永远不会去查找原型,即继承来的父亲的属性不算
> propertyIsEnumerable用来检测某一属性是否可遍历，也就是能不能用for..in循环来取到



**Proxy对象**：用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等），ES6 原生提供 Proxy 构造函数，用来生成 一个Proxy 实例
> let p = new Proxy(target, handler);
> - target:用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
> - handler:一个对象，其属性是当执行一个操作时定义代理的行为的函数

```javascript
let target = {};
let handler = {
get: function (obj, name) {
     console.log('get')
     return name in obj ? obj[name] : 37;
   },
set: function (obj, name, value) {
     console.log('set');
     obj[name] = value
   },
};
let p = new Proxy(target, handler);
p.a = 1;  // 进行set操作，并且操作会被转发到目标
p.b = undefined; // 进行set操作，并且操作会被转发到目标
console.log(p.a, p.b);    // 1, undefined ，进行get操作
console.log('c' in p, p.c);    // false, 37  进行get操作
console.log(target) // {a: 1, b: undefined}. 操作已经被正确地转发
```

**解决的问题：**<br />1.针对对象：Proxy 是针对 整个对象obj 的。因此无论 obj 内部包含多少个 key ，都可以走进 set。(并不需要通过Object.keys() 的遍历)，解决了上述 Object.defineProperty() 的第二个问题<br />2.支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的<br />3.嵌套支持:Proxy 也是不支持嵌套的，这点和 Object.defineProperty() 是一样的。因此也需要通过逐层遍历来解决。Proxy 的写法是在 get 里面递归调用 Proxy 并返回<br />**经典案例：**
```javascript
let current = 0
Object.defineProperty(window, 'a', {
  get () {
    current++
    return current
  }
})
console.log(a === 1 && a === 2 && a === 3) // true
```

**Proxy对比defineProperty的优势**:

- Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
- Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法
- Proxy 的兼容性不如 Object.defineProperty() (caniuse 的数据表明，QQ 浏览器和百度浏览器并不支持 Proxy，这对国内移动开发来说估计无法接受，但两者都支持 Object.defineProperty())
- 不能使用 polyfill 来处理兼容性

<a name="qtEh4"></a>
### 异步解决方案
**同步和异步**<br />同步调用，在发起一个函数或方法调用时，没有得到结果之前，该调用就不返回，直到返回结果；<br />异步调用的概念和同步相对，在一个异步调用发起后，被调用者立即返回给调用者，但调用者不能立刻得到结果，被调用者在实际处理这个调用的请求完成后，通过状态、通知或回调等方式来通知调用者请求处理的结果<br />**并发和并行**<br />并行和并发是两个概念，容易混淆是因为并行和并发在中文意思上相近，其实在英文中，这是完全不相同的东西，并行(parallelism)、并发(concurrency)
> 并行(parallelism)：是微观概念，假设CPU有两个核心，则我们就可以同时完成任务A和任务B，同时完成多个任务的情况就可以称之为并行。
> 并发(concurrency)：是宏观概念，现在有任务A和任务B，在一段时间内，通过任务之间的切换完成这两个任务，这种情况称之为并发。

**回调函数**<br />回调函数表现在事件绑定，Ajax请求或者其他的情况下，回调函数表现形式如下：
```javascript
ajax(url, () => {
  console.log('这里是回调函数');
})
```
> 缺点：回调地狱，嵌套过多影响代码结构不能用 try catch 捕获错误，不能 return，缺乏顺序性 和可信任性，不利于维护，代码耦合高
> 优点：解决了同步的问题，简单、容易理解

[**promise**](https://github.com/LuoShengMen/StudyNotes/issues/280)<br />Promise一共有三种状态：pending(等待中)、resolve(完成)和reject(拒绝)，这个承诺意味着在将来一定会有一个表决，并且只能表决一次，表决的状态一定是resolve(完成)或者reject(拒绝)，Promise表现形式如下：
```javascript
let p1 = new Promise(function (resolve, reject) {
    resolve('success')；
    resolve(false); // 不会执行
})
p1.then(res =>  {
    console.log(res)
}, function (err) {
    console.log(err)
})
```
> 缺点：无法取消 Promise ，错误需要通过回调函数来捕获
> 优点：解决了回调的回调地狱，多重嵌套，promise采用链式调用，可以利用try,catch捕获错误

**generator**<br />在ES6之前，一个函数一旦执行将不会被中断，一直到函数执行完毕，在ES6之后，由于Generator的存在，函数可以暂停自身，待到合适的机会再次执行。表现形式如下：
```javascript
function *fetch() {
  yield ajax(url, () => {console.log('这里是首次回调函数');});
  yield ajax(url, () => {console.log('这里是第二次回调函数');});
  yield ajax(url, () => {console.log('这里是第三次回调函数');});
}
var it = fetch();
var result1 = it.next();
var result2 = it.next();
var result3 = it.next();
```
> 优点：可以控制函数的执行，可以配合 co 函数库使用,解决了回调低于，函数体内外的数据交换、错误处理机制
> 缺点：手动进行流程控制，流程管理不方便

**Async/Await**<br />Async 是 Generator 的一个语法糖,async 对应的是 * ,await 对应的是 yield 。
> - await关键字只能用在aync定义的函数内。
> - async函数会隐式地返回一个promise，该promise的reosolve值就是函数return的值。因此需要加上错误处理，可以给每个 await 后的 Promise 增加 catch 方法；也可以将 await 的代码放在 try...catch 中。
> - 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
> - async 函数可以保留运行堆栈。

async/await表现形式如下：
```javascript
// 普通的async/await
async function foo() {
  let number = await 3; // await自动用promise.resolve()包装
  console.log(number);
}
foo();
// async/await解决回调地狱
async function fetch() {
  var result1 = await ajax(url1);
  var result2 = await ajax(url2);
  var result3 = await ajax(url3);
}
fetch();
```
> 优点： ，内置执行器、更好的语义、更广的适用性、返回的是Promise、结构清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题
> 缺点： await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。


<a name="JCodl"></a>
### 数据请求
**XMLHttpRequest**<br />XMLHttpRequest 对象用于在后台与服务器交换数据。表现形式如下：
```javascript
var xmlhttp;
function loadXMLDoc(url)
{
xmlhttp=null;
if (window.XMLHttpRequest)
  {// code for all new browsers
  xmlhttp=new XMLHttpRequest();
  }
else if (window.ActiveXObject)
  {// code for IE5 and IE6
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
if (xmlhttp!=null)
  {
  xmlhttp.onreadystatechange=state_Change;
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
  }
else
  {
  alert("Your browser does not support XMLHTTP.");
  }
}
```
> - 在不重新加载页面的情况下更新网页
> - 在页面已加载后从服务器请求数据
> - 在页面已加载后从服务器接收数据
> - 在后台向服务器发送数据


**AJAX**<br />Ajax的原理简单来说是在用户和服务器之间加了—个中间层(AJAX引擎)，通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据。表现形式如下:
```javascript
   // 1. 创建连接
   var xhr = null;
   xhr = new XMLHttpRequest()
   // 2. 连接服务器
   xhr.open('get', url, true)
   // 3. 发送请求
   xhr.send(null);
   // 4. 接受请求
   xhr.onreadystatechange = function(){
       if(xhr.readyState == 4){
           if(xhr.status == 200){
               success(xhr.responseText);
           } else { // fail
               fail && fail(xhr.status);
           }
       }
   }
```
> 优点：
> - 通过异步模式，提升了用户体验.
> - 优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用.
> - Ajax在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载。
> - Ajax可以实现动态不刷新（局部刷新）
> 
缺点：
> - 安全问题 AJAX暴露了与服务器交互的细节。
> - 对搜索引擎的支持比较弱。
> - 不容易调试。
> 
防止发送重复请求方案：用户点击之后按钮disabled、函数节流、abort掉上一个请求。


**axios**<br />axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生XHR的封装,表现形式如下：
```javascript
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
```
> 优点：
> - 从 node.js 创建 http 请求
> - 支持 Promise API
> - 客户端支持防止CSRF
> - 提供了一些并发请求的接口（重要，方便了很多的操作）
> - .拦截请求和响应
> - 转换请求和响应数据
> - 取消请求
> - 自动转换JSON数据
> 
**PS:防止CSRF:就是让你的每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略**


**Fetch**<br />Fetch API 提供了一个 JavaScript接口，用于访问和操纵HTTP管道的部分，例如请求和响应，在 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 中有四个基本概念，他们分别是 Headers、Request 、Response 和 Body。表现形式如下：
```javascript
  const headers = new Headers({
    'X-Token': 'fe9',
  });
  setTimeout(() => {
    fetch('/data?name=fe', {
      method: 'GET', // 默认为 GET，不写也可以
      headers,
    })
      .then(response => response.json())
      .then(resData => {
        const { status, data } = resData;
        if (!status) {
          window.alert('发生了一个错误！');
          return;
        }
      });
  }, 1000);
```
> 优点：
> - 符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
> - 更好更方便的写法
> - 更加底层，提供的API丰富（request, response）
> 
缺点：
> - 不能取消（虽然 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController) 能实现，但是目前兼容性基本不能使用，可以使用 [polyfill](https://github.com/mo/abortcontroller-polyfill) ),不能获取进度
> - 在默认情况下，fetch不会接受或者发送cookies
> - fetch没有办法原生监测请求的进度，而XMLHttpRequest可以
> - 不能设置超时（可以通过简单的封装来模拟实现）
> - fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
> - 脱离了XHR，是ES规范里新的实现方式，兼容性目前比较差<br />


[**JSONP**](https://www.cnblogs.com/soyxiaobi/p/9616011.html)<br />JSONP是一种非官方跨域数据交互协议，它允许在服务器端集成< script >标签返回至客户端，通过javascript回调的形式实现跨域访问，JSONP不使用XMLHttpRequest对象加载资源，不属于真正意义上的AJAX，表现形式如下:
> 实现原理：客户端定义一个函数，比如jsonpCallback，然后创建< script >，src为url + ?jsonp=jsonpCallback这样的形式，之后服务器会生成一个和传递过来jsonpCallback一样名字的参数，并把需要传递的数据当做参数传入，比如jsonpCallback(json)，然后返回给客户端，此时客户端就执行了这个服务器端返回的jsonpCallback(json)回调

```javascript
<script type="text/javascript">
//回调函数
function callback(data) {
    alert(data.message);
}
</script>
<script type="text/javascript" src="http://localhost:20002/test.js"></script>
// test.js
callback({message:"success"});
```
> 优点
> - 兼容性好，简单易用，支持浏览器与服务器双向通信 
> 
缺点
> - 只支持GET请求；存在脚本注入以及跨站请求伪造等安全问题

<a name="bJFpx"></a>
### 
<a name="C7lOV"></a>
### [跨域解决方案](https://juejin.im/post/5c23993de51d457b8c1f4ee1)
**同源策略**<br />同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1563098090259-a2fad5da-94a3-4d1c-9b83-d40b70cde6a8.png#align=left&display=inline&height=104&name=image.png&originHeight=208&originWidth=872&size=85493&status=done&width=436)<br />**同源策略限制内容有：**

- Cookie、LocalStorage、IndexedDB 等存储性内容
- DOM 节点
- AJAX 请求发送后，结果被浏览器拦截了

但是有三个标签是允许跨域加载资源：

- '<'img src=XXX'>'
- '<'link href=XXX'>'
- '<'script src=XXX'>'

**常见跨域场景**<br />当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域。不同域之间相互请求资源，就算作“跨域”。常见跨域场景如下图所示<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1563098149974-391516b5-5d5a-41c8-b9a5-6e0de460c548.png#align=left&display=inline&height=508&name=image.png&originHeight=819&originWidth=827&size=286973&status=done&width=513)
> 1.如果是协议和端口造成的跨域问题“前台”是无能为力的。
> 2.在跨域问题上，仅仅是通过“URL的首部”来识别而不会根据域名对应的IP地址是否相同来判断。“URL的首部”可以理解为“协议, 域名和端口必须匹配”

**解决方案**<br />**1.Jsonp利用 script 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP请求一定需要对方的服务器做支持才可以<br />**2.CORS**<br />CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现,浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。<br />服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源<br />**3.PostMessage**<br />postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递<br />**4.Websocket**<br />Websocket是HTML5的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案。WebSocket和HTTP都是应用层协议，都基于 TCP 协议。但是 WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据。同时，WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了<br />**5.Node中间件代理(两次跨域)**<br />实现原理：同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。 代理服务器，需要做以下几个步骤：

- 接受客户端请求 。
- 将请求 转发给服务器。
- 拿到服务器 响应 数据。
- 将 响应 转发给客户端

**6.Nginx反向代理**<br />实现原理类似于Node中间件代理，需要你搭建一个中转nginx服务器，用于转发请求。<br />使用nginx反向代理实现跨域，是最简单的跨域方式。只需要修改nginx的配置即可解决跨域问题，支持所有浏览器，支持session，不需要修改任何代码，并且不会影响服务器性能。<br />实现思路：通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。<br />**7.Window.name + iframewindow.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）<br />**8.Location.hash + iframe**<br />实现原理：a.html欲与c.html跨域相互通信，通过中间页b.html来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。<br />**9.document.domain + iframe该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。
只需要给页面添加 document.domain ='test.com' 表示二级域名都相同就可以实现跨域。<br />实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域

<a name="IQA2i"></a>
### [EventLoop事件循环](https://github.com/LuoShengMen/StudyNotes/issues/278)
Event Loop就是事件循环，是浏览器和NodeJS用来解决Javascript单线程运行带来的问题的一种运行机制,针对于浏览器和NodeJS两种不同环境，Event Loop也有不同的实现

- 浏览器的Event Loop是在html5的规范中明确定义
- NodeJS的Event Loop是基于libuv实现的
- libuv已经对Event Loop做出了实现，而HTML5规范中只是定义了浏览器中Event Loop的模型，具体的实现留给了浏览器厂商

**进程、程序、线程**

- 进程(process)是系统分配的独立资源，是 CPU 资源分配的基本单位，进程是由一个或者多个线程组成的。
- 程序是指令和数据的有序集合，进程中的文本区域就是代码区就是程序。
- 线程(thread)是进程的执行流，是CPU调度和分派的基本单位。描述了执行一段指令所需的时间
> JavaScript是单线程执行的，在JavaScript运行期间，有可能会阻塞UI渲染，这在一方面说明JavaScript引擎线程和UI渲染线程是互斥的。JavaScript被设计成单线程的原因在于，JavaScript可以修改DOM，如果在js工作期间，UI还在渲染的话，则可能不会正确渲染DOM。单线程也有一些好处，如下：
> - 节省内存空间
> - 节省上下文切换时间
> - 没有锁的问题存在
> 
ps:HTML5则提出了 Web Worker 标准，表示js允许多线程，但是子线程完全受主线程控制并且不能操作dom，只有主线程可以操作dom，所以js本质上依然是单线程语言
> web worker就是在js单线程执行的基础上开启一个子线程，进行程序处理，而不影响主线程的执行，当子线程执行完之后再回到主线程上，在这个过程中不影响主线程的执行。子线程与主线程之间提供了数据交互的接口postMessage和onmessage，来进行数据发送和接收
> 通常用于：
> • 处理密集型数学计算
> • 大数据集排序
> • 数据处理(压缩、音频分析、图像处理等)
> • 高流量网络通信

**事件循环**<br />JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。任务队列是先进先出的数据结构。**调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1563090949620-4b288a01-8ba3-4a5d-a0a1-a16d416e7447.png#align=left&display=inline&height=500&name=image.png&originHeight=669&originWidth=800&size=278649&status=done&width=598)<br />**宏任务、微任务**

- 宏任务(script、setTimeout、setInterval、setImmidiate、I/O、UI Rendering)可以有多个队列
- 微任务(procress.nextTick、Promise.then、Object.observe、mutataionObserver)只能有一个队列

执行流程：

1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout）等；<br />遇到了 setTimeout ，就会等到过了指定的时间后将回调函数放入到宏任务的任务队列中，遇到 Promise，将 then 函数放入到微任务的任务队列中
1. 全局Script代码执行完毕后，调用栈Stack会清空；
1. 去检测微任务的任务队列中是否存在任务，存在就执行，从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；
1. 继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；
1. microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
1. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行，发现在这次循环中并不存在微任务。存在就进行第三个步骤。不存在就进行第7步骤。
1. 宏任务执行完后，Macrotask Queue为空。
1. 全部执行完后，Stack Queue为空，Macrotask Queue为空，Micro Queue为空
1. 重复第3-8个步骤；

**经典案例：**
```javascript
// 案例一
console.log('start');
setTimeout(function() {
  console.log(1);
}, 0);

Promise.resolve().then(function() {
  console.log(2);
}).then(function() {
  console.log(3);
});
setTimeout(() => {
  console.log(4);
  Promise.resolve().then(() => {
    console.log(5)
  });
});
new Promise((resolve, reject) => {
  console.log(6),
  resolve(7)
}).then((data) => {
  console.log(data);
})
console.log('end');

// 案例二
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');
// script start， async1 start，async2,promise1，script end， async1 end，promise2，setTimeout,hello world
```

<a name="qkMaN"></a>
### [模块化](https://github.com/LuoShengMen/StudyNotes/issues/479)
模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等<br />**IIFE**<br />使用自执行函数来编写模块化
```javascript
(function(){
 return {
   data:[]
 }
})()
```
> 特点：在一个单独的函数作用域中执行代码，避免变量冲突。


**AMD**<br />使用requireJS 来编写模块化，
```javascript
define('./index.js',function(code){
	// code 就是index.js 返回的内容
})
```
> 特点：依赖必须提前声明好。


**CMD**<br />使用seaJS 来编写模块化
```javascript
define(function(require, exports, module) {  
  var indexCode = require('./index.js');
});
```
> 特点：支持动态引入依赖文件。


**CommonJS**<br />nodejs 中自带的模块化。
```javascript
var fs = require('fs');
```

**AMD与CMD、CommonJS的区别与优缺点：**

- CommonJs主要针对服务端，AMD/CMD主要针对浏览器端
- AMD/CMD区别，虽然都是并行加载js文件，但还是有所区别，AMD是预加载，在并行加载js文件同时，还会解析执行该模块（因为还需要执行，所以在加载某个模块前，这个模块的依赖模块需要先加载完成）；而CMD是懒加载，虽然会一开始就并行加载js文件，但是不会执行，而是在需要的时候才执行
- CMD 推崇依赖就近，AMD 推崇依赖前置
- AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。
- AMD优点：加载快速，尤其遇到多个大文件，因为并行解析，所以同一时间可以解析多个文件
- AMD缺点：并行加载，异步处理，加载顺序不一定，可能会造成一些困扰，甚至为程序埋下大坑
- CMD优点：因为只有在使用的时候才会解析执行js文件，因此，每个JS文件的执行顺序在代码中是有体现的，是可控的
- CMD缺点：执行等待时间会叠加。因为每个文件执行时是同步执行（串行执行），因此时间是所有文件解析执行时间之和，尤其在文件较多较大时，这种缺点尤为明显

**UMD**<br />兼容AMD，CommonJS 模块化语法。

**ES Modules**<br />ES6 引入的模块化，支持import 来引入另一个 js 。
```javascript
import a from 'a';
```

**ES6模块和CommonJS模块的区别**

1. ES6模块在编译时，就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 模块，运行时加载。
1. ES6 模块自动采用严格模式，无论模块头部是否写了 "use strict";
1. require 可以做动态加载，import 语句做不到，import 语句必须位于顶层作用域中。
1. ES6 模块中顶层的 this 指向 undefined，CommonJS 模块的顶层 this 指向当前模块。
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
> CommonJS 中的 require/exports 和 ES6 中的 import/export 区别
> - CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。
> - ES6 模块是动态引用，如果使用 import 从一个模块加载变量，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。
> - import/export 最终都是编译为 require/exports 来执行的。
> - CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。
> - export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
> - require是 同步 导入，import属于 异步 导入
> - require是 值拷贝，导出值变化不会影响导入值；import指向 内存地址，导入值会随导出值而变化


<a name="Ra6f7"></a>
### [事件绑定、事件监听、事件委托](https://blog.poetries.top/2016/12/13/js-event-listener/)
**事件绑定**<br />在JavaScript中，有三种常用的绑定事件的方法<br />DOM元素中直接绑定
```javascript
<input type="button" value="click me" onclick="hello()">
<script>
function hello(){
  alert("hello world!");
}
</script>
```

JavaScript代码中绑定
```javascript
<input type="button" value="click me" id="btn">
<script>
document.getElementById("btn").onclick = function(){
  alert("hello world!");
}
</script>
```

绑定事件箭头函数
```javascript
<input type="button" value="click me" id="btn1">
<script>
  // 其他浏览器
document.getElementById("btn1").addEventListener("click",hello);
function hello(){
  alert("hello world!");
}
// ie浏览器
document.getElementById("btn2").attachEvent("onclick",hello);
function hello(){
  alert("hello world!");
}
</script>
```
> 优点：
> - 可以绑定多个事件，常规的事件绑定只执行最后绑定的事件
> - 可以解除相应的绑定，removeEventListener、detachEvent

关于事件监听中的事件(也称事件流)，W3C规范中定义了3个事件阶段，依次是捕获阶段、目标阶段、冒泡阶段，

- 捕获事件流从根节点开始执行，一直往子节点查找执行，直到查找执行到目标节点。
- 冒泡事件流从目标节点开始执行，一直往父节点冒泡查找执行，直到查到到根节点
```javascript
// 阻止冒泡事件event.stopPropagation()
 		  function stopBubble(e) {
   		if (e && e.stopPropagation) { // 如果提供了事件对象event 这说明不是IE浏览器
  		e.stopPropagation()
    		} else {
  		window.event.cancelBubble = true //IE方式阻止冒泡
    	      }
  		   }
// 阻止默认行为event.preventDefault()
	 function stopDefault(e) {
	    if (e && e.preventDefault) {
         e.preventDefault()
        } else {
            // IE浏览器阻止函数器默认动作的行为
            window.event.returnValue = false
        }
    }
```

**事件委托**<br />事件委托就是利用冒泡的原理，把事件加到父元素或祖先元素上，触发执行效果
```javascript
<input type="button" value="click me" id="btn6">

var btn6 = document.getElementById("btn6");
document.onclick = function(event){
  event = event || window.event;
  var target = event.target || event.srcElement;
  if(target == btn6){
    alert(btn5.value);
  }
}
```
> 优点
> - 提高JavaScript性能。事件委托可以显著的提高事件的处理速度，减少内存的占用
> - 动态的添加DOM元素，不需要因为元素的改动而修改事件绑定

**事件代理优点**

1. 添加到页面上的事件数量会影响页面的运行性能，如果添加的事件过多，会导致网页的性能下降。采用事件代理的方式，可以大大减少注册事件的个数。
1. 事件代理的当时，某个子孙元素是动态增加的，不需要再次对其进行事件绑定。
1. 不用担心某个注册了事件的DOM元素被移除后，可能无法回收其事件处理程序，我们只要把事件处理程序委托给更高层级的元素，就可以避免此问题


<a name="Hsh1o"></a>
### 面向对象编程
面向对象的程序设计把计算机程序视为一组对象的集合，而每个对象都可以接收其他对象发过来的消息，并处理这些消息，计算机程序的执行就是一系列消息在各个对象之间传递<br />数据封装、继承和多态是面向对象的三大特点<br />对象有如下几个特点：

- 对象具有唯一标识性:即完全相同的两个对象，也并非同一个对象
- 对象有状态： 对象具有状态，同一对象可能处于不同状态下
- 对象具有行为：即对象的状态可能因为行为发生变迁

对象的第一特征在js体现在内存地址，对象的内存地址不同，第二第三特征js体现具有属性和方法<br />在实现了对象基本特征的基础上，js中对象独有的特色是对象具有高度的动态性，这是因为js赋予来使用者在运行时为对象添加状态和行为的能力，js的对象设计虽然和目前主流基于类的面向对象差异非常大，但是提供了完全运行时的对象系统，因此js是面向对象的语言<br />**面向对象与面向过程的区别**<br />面向对象思想：基本思想是使用对象，类，继承，封装等基本概念来进行程序设计<br />面向过程思想：分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现<br />优点

- 易维护
- 采用面向对象思想设计的结构，可读性高，由于继承的存在，即使改变需求，那么维护也只是在局部模块，所以维护起来是非常方便和较低成本的
- 易扩展，开发工作的重用性、继承性高，降低重复工作量。
- 缩短了开发周期
