---
title: TypeScript入门—高级类型
---
总结了常见的类型之后，再来了解一下typescript中的高级类型以及一些关于类型的知识
Typescript入门系列：
> [TypeScript入门—类型二三事(一)](https://github.com/LuoShengMen/MyBlog/issues/47)   
   [TypeScript入门—类型二三事(二)](https://github.com/LuoShengMen/MyBlog/issues/48)
  [TypeScript入门—高级类型](https://github.com/LuoShengMen/MyBlog/issues/49)
  [Typescript入门——接口与类](https://github.com/LuoShengMen/MyBlog/issues/50)
<a name="9R4f5"></a>
<!-- more -->
### 交叉类型
交叉类型(intersection types)是将多个类型合并成一个类型，使用 & 分隔每一个类型，可以让我们把现有类型叠加在一起成为一种类型，它包含了所需的所有类型的特性
```javascript
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }

   for (let id in second) {
      if (!result.hasOwnProperty(id)) {
          (<any>result)[id] = (<any>second)[id];
      }
    }

  return result;
}

class Person {
  constructor(public name: string) { }
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() : void {
      console.log('log')
  }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

<a name="ptcxn"></a>
### 联合类型
联合类型（Union Types）表示取值可以为多种类型中的一种,使用 | 分隔每个类型,联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型,因此只能访问该类型的属性。
```javascript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
myFavoriteNumber = false; // 编译时报错，类型不包括布尔值
```

<a name="1ZTo3"></a>
### 混合类型
混合类型的一个例子就是一个对象可以同时做为函数和对象使用，并带有额外的属性
```javascript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

<a name="Xg61H"></a>
### 类型别名
类型别名简单来说就是给已有的类型另起一个新名字，并不会创建新类型，通常使用type来创建。
```javascript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```
使用类型别名需要但注意事项：
> - 错误信息、鼠标悬停时，不会使用别名，而是直接显示为所引用的类型
> - 别名不能被extends和implements
> - 给原始类型取别名通常没什么用
> - 类型别名不能出现在声明右侧的任何地方
> - 如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，交叉类型，这时通常会使用类型别名


**泛型别名**<br />别名支持泛型
```javascript
type Container<T> = {
  value: T
}

let name: Container<string> = {
  value: 'funlee'
}
```

<a name="0WMev"></a>
### 字符串字面量类型
字符串字面量(string literal types)允许我们使用type定一个别名，类型为别名的变量只能取某几个值中的一个
```javascript
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
let x1: Easing = 'uneasy' // error
let x2: Easing = 'ease-in' // ok
```
除去字符串字面量类型，字面量类型还包括真值字面量类型（boolean literal types），数字字面量类型（numeric literal types），枚举字面量类型（enum literal types） ，大整数字面量类型（bigInt literal types）<br />例子：
```javascript
const a: 2333 = 2333
const b : 'xue xi qiang guo' = 'xue xi qiang guo'
const c : false = false
const foo: 'foo' = 'foobar' // error
```
> 注意：字面量类型的要和实际的值的字面量一一对应。如果值不是同一个实例，则会报错


<a name="1xz4k"></a>
### 类型推论
类型推论即在变量声明赋值时没有明确指定类型，Typescript会推论出一个类型,但是如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查。
```javascript
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7; // error
// 等价于
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7; // error

let myFavoriteNumber;
myFavoriteNumber = 'seven'; // ok
myFavoriteNumber = 7;   // ok
```

<a name="1NsDc"></a>
### 类型断言
类型断言即判定变量的类型，类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用.类型断言的两种方法是等价的<br />第一种：尖括号”语法
```javascript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

第二种：as语法
```javascript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```
如果要在TypeScript里使用JSX时，只有 as语法断言是被允许的。

<a name="yN08W"></a>
### 类型保护
类型保护用来明确一个联合类型变量的具体类型，一般形式为param is SomeType。我们也可以使用typeof instanceof用于类型保护。typeof 用于基本数据类型，instanceof 用于引用类型，对于类，我们则可以使用 instanceof.在使用了 typeof 和 instanceof 后，TypeScript 就会自动限制类型为某一具体类型。<br />例子如下：
```javascript
// typeof
function show(param: number | string) {
  if (typeof param === 'number') {
    console.log(`${param} is number`)
  } else {
    console.log(`${param} is string`)
  }
}
// instanceof
class Person {
  name: string = 'funlee';
  age: number = 18;
}

class Man {
  age: number = 12;
  love: string = 'TS';
}

let me: Person | Man;
me = Math.random() < 0.5 ? new Person() : new Man();

if(me instanceof Person) {
  console.log(me.name);
}
if(me instanceof Man) {
  console.log(me.love);
}
```

<a name="4OAIq"></a>
### 类型兼容性
TypeScript里的类型兼容性是基于结构子类型的。 结构类型是一种只使用其成员来描述类型的方式。 它正好与名义（nominal）类型形成对比.<br />TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性。比如：
```javascript
interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x = y;
function greet(n: Named) {
    console.log('Hello, ' + n.name);
}
greet(y); // OK
```
这里要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性。 在这个例子中，y必须包含名字是name的string类型成员。y满足条件，因此赋值正确.

**函数**<br />形参
```javascript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```
要查看x是否能赋值给y，首先看它们的参数列表。 x的每个参数必须能在y里找到对应类型的参数。 注意的是参数的名字相同与否无所谓，只看它们的类型。 这里，x的每个参数在y中都能找到对应的参数，所以允许赋值。x可以赋值给y是因为允许忽略参数。<br />第二个赋值错误，因为y有个必需的第二个参数，但是x并没有，所以不允许赋值。

返回值
```javascript
let x = () => ({name: 'Alice'});
let y = () => ({name: 'Alice', location: 'Seattle'});

x = y; // OK x的属性都可以在y中找到对应属性
y = x; // Error because x() lacks a location proper，y的属性在x中找不到全部对应属性
```

**枚举**<br />枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。
```javascript
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Green;  //error
```

**类**<br />比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。
```javascript
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  //OK
s = a;  //OK
```

**泛型**<br />因为TypeScript是结构性的类型系统，类型参数只影响使用其做为类型一部分的结果类型。比如
```javascript
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x
```
上面代码里，x和y是兼容的，因为它们的结构使用类型参数时并没有什么不同。 把这个例子改变一下，增加一个成员，就能看出是如何工作的了
```javascript
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // Error, because x and y are not compatible
```
这是因为在没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较， 然后用结果类型进行比较，就像上面第一个例子。
