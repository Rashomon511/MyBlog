---
title: TypeScript入门—类型二三事(二)
---
上一篇我们介绍不少typescript的常用类型，这一篇我们继续介绍泛型以及函数的类型
Typescript入门系列：
> [TypeScript入门—类型二三事(一)](https://github.com/LuoShengMen/MyBlog/issues/47)   
   [TypeScript入门—类型二三事(二)](https://github.com/LuoShengMen/MyBlog/issues/48)
  [TypeScript入门—高级类型](https://github.com/LuoShengMen/MyBlog/issues/49)
  [Typescript入门——接口与类](https://github.com/LuoShengMen/MyBlog/issues/50)
<a name="DvWqi"></a>
<!-- more -->
### 泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。<br />我们来创建一个identity函数。 这个函数会返回任何传入它的值。可以使用any来定义函数
```javascript
function identity(arg: any): any {
    return arg;
}
```
使用any类型会导致这个函数可以接收任何类型的arg参数，这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。如果我们传入一个数字，我们只知道任何类型的值都有可能被返回。<br />这个时候我们就可以使用泛型，我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型,这样参数类型与返回值类型是相同
```javascript
function identity<T>(arg: T): T {
    return arg;
}
```
**多个类型参数**<br />定义泛型的时候，可以一次定义多个类型参数
```javascript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

**泛型约束**<br />使用泛型时，由于不知道参数的类型，因此不能随意使用参数的属性。如下：
```javascript
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
```

如果想要使用参数的length属性， 只要传入的类型至少包含这一属性，ts便允许使用。 为此，我们需要列出对于T的约束要求。<br />为此，我们定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束：如果传入的参数不包含length属性便会报错
```javascript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({length: 10, value: 3});
```

**在泛型约束中使用类型参数**<br />你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束。
```javascript
function getProperty(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

**泛型接口**<br />使用含有泛型的接口来定义函数的形状
```javascript
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

进一步，我们可以把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型（比如： Dictionary string 而不只是Dictionary）。 这样接口里的其它成员也能知道这个参数的类型了。
```javascript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

**泛型类**<br />除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间<br />泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
```javascript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

**泛型参数的默认类型**在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用
```javascript
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```

<a name="sacXY"></a>
### 函数
**函数声明**<br />函数声明后，typescript对输入输出都做了约束，调用该函数时不能多传也不能少传参数，或者传入参数的类型与约束的形参类型不同也是不被允许的。
```javascript
function sum(x: number, y: number): number {
    return x + y;
}
sum(2,3) // ok
sum(2)   // error
sum(2,3,4) //error
sum(2, '3') // error
```

**函数表达式**<br />函数表达式即是将声明的匿名函数复制给一个变量
```javascript
let mySum = function (x: number, y: number): number {
    return x + y;
};
// 或者手动给mySum添加类型
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
// 也可以用接口来定义函数的形状
interface sumFuc {
    (x: number, y: number): number;
}
let mySum : sumFuc
mySum = function (x: number, y: number): number {
    return x + y;
};
```

**函数参数**<br />前面提到了输入多余或者少输参数都会报错，我们可以通过可选参数或者剩余参数来解决这个问题
```javascript
function sum(x: number, y？: number): number {
    if(y) {
       return x + y;
    }
    return x;
}
sum(2,3) // 5
sum(2)  // 2
```

当设置可选参数时，可选参数必须接在必需参数后面，可选参数后面不能再出现必需参数，如果要解决可选参数必须接在必需参数后面这个限制，我们可以利用参数默认值来解决
```javascript
function sum(x: number = 2, y: number): number {
       return x + y;
}
sum(3, 5) // 8
sum(undefined, 3) // 5
sum(3) // error
```

如果不确定传入参数的个数，我们可以使用剩余参数
```javascript
function sum(x: number = 2, ...item: number[]): number {
      items.forEach(function(item) {
        x = x + item;
      });
       return x;
}
sum(2, 3, 4, 6, 8) // 23
```

**函数重载**<br />如果我们想要实现一个sum函数，当x类型为number时返回两者之和，当传入x为数组时，返回一个数组。因为需要函数接受不同的类型参数，我们可以使用联合类型来解决。
```javascript
function sum(x: number | number[], y: number): number | number[] {
       if (typeof x === 'number') {
          return x + y;
       }
       else {
          return x.map(function(item) {
            return y + item;
          });
       }
}
sum([1,2],3) // [4,5]
sum(1,2)    // 3
```
但是这样存在一个问题就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为数组的时候，输出也应该为数组。<br />那么我们可以使用函数重载来解决：重载允许一个函数接受不同数量或类型的参数时，作出不同的处理我们可以重复定义多次sum函数,最后才来实现函数。
```javascript
function sum(x: number, y: number): number
function sum(x: number[], y: number): number[] 
function sum(x: number | number[], y: number): number | number[] {
       if (typeof x === 'number') {
          return x + y;
       }
       else {
          return x.map(function(item) {
            return y + item;
          });
       }
}
sum([1,2],3) // [4,5]
sum(1,2)    // 3
```
> TypeScript会优先从最前面的函数定义开始匹配，所以多个函数定义如有包含关系，需要优先把精确的定义写在前面


**函数中的this**<br />我们来看下面的一个例子，最终打印出来undefined,因为此时speedRun中的this是指向windom，我们知道我们可以使用箭头函数改变this指向来解决这个问题，但是在ts中如果你给编译器设置了--noImplicitThis标记，便会警告你犯了一个错误，它会指出 this.speed里的this的类型为any。
```javascript
let jim = {
  name: 'jim',
  age: 20,
  speed: 50,
  runspeed: function(){
    return function(){
      return this.speed
    }
  }
}
let speedRun = jim.runspeed();
let speed = speedRun()  // undefined,
```

我们可以提供一个显式的 this参数。 this参数是个假的参数，它出现在参数列表的最前面，表示 this是Person类型的，而非any,这样就不会报错了。
```javascript
interface Person {
  name: string
  age: number
  speed: number
  runspeed(this: Person): () => number
}
let jim : Person  = {
  name: 'jim',
  age: 20,
  speed: 50,
  runspeed: function(this: Person){
    return () => {
      return this.speed
    }
  }
}
let speedRun = jim.runspeed();
let speed = speedRun()  // 50
```

**回调函数的this**<br />在回调函数里this报错的情况，当你将一个函数传递到某个库函数里稍后会被调用时。 因为当回调被调用的时候，它们会被当成一个普通函数调用， this将为undefined.我们来看一个例子：
```javascript
interface UIElement{
    addClickListener(onclick: (this:void, e:Event) => void);
}
```

上面的例子接口中 this:void 表明 onclick 函数应该是一个不需要 this 对象的函数。如果 onclick 指向的是一个成员函数而且函数需要使用 this 对象，那么则 onclick 需要通过箭头函数来实现。这样就不会报错，因为箭头函数不会捕获this，所以你总是可以把它们传给期望this: void的函数。
```javascript
class Handler{
   info:string;
   onClick = (e:Event) => { this.info = e.message }
}
let h = new Handler();
uiElement.addClickListener(h.onClick);
```
缺点是每个 Handler对象都会创建一个箭头函数。 另一方面，方法只会被创建一次，添加到 Handler的原型链上。 它们在不同 Handler对象间是共享的。
