---
title: TypeScript入门—类型二三事(一)
---

作为入门Typescript的第一步，了解typescript中的类型必不可少，接下来我们就来详细介绍一下布尔值、数值、字符串、null、undefined、数组、any、nerver等常见类型。
<!-- more -->
<a name="YISce"></a>
### 布尔值
布尔值是最基础的数据类型，就是简单的true/false值，使用 boolean 定义布尔值类型
```javascript
let isDone: boolean = false;

// error,new Boolean() 返回的是一个 Boolean 对象
let createdByNewBoolean: Boolean = new Boolean(1);

// ok,直接调用Boolean即可
let createdByBoolean: boolean = Boolean(1);
```

<a name="qBIBA"></a>
### 数字
和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量
```javascript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

<a name="XrhYX"></a>
### bigint
bigint 就是一个表示范围无穷大的整数类型

<a name="wrG9q"></a>
### 字符串
使用string表示文本数据类型,可以使用双引号（ "）或单引号（'）表示字符串，并且可以使用模版字符串，它可以定义多行文本和内嵌表达式
```javascript
let name: string = ’Gene‘;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`;
```

<a name="59YM8"></a>
### 空值
使用void来表示没有任何返回值的函数
```javascript
function warn(): void {
    console.log('warn')
}
```

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
```javascript
let unusable: void = undefined;
```

<a name="5XLiO"></a>
### 数组
有两种方式可以定义数组。规定元素类型后，元素必须为同一类型。<br />第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组
```javascript

let list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，Array<元素类型>
```javascript
let list: Array<number> = [1, 2, 3];
```

另外常用的方法是用any 表示数组中允许出现任意类型
```javascript
let list: any[] = [1, 'foo', false, {a: 'bar'}];
```

<a name="OXbsJ"></a>
### 元组
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
```javascript
let x: [string, number];
// ok
x = ['hello', 10]; 
// error
x = [10, 'hello']; 
```

在ts 3.1版本之前，可以访问越界的元素，会使用联合类型替代，但是在3.1版本之后，已经不能访问越界元素了
```javascript
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型
```

<a name="UAmNg"></a>
### 枚举
使用枚举类型可以为一组数值赋予友好的名字，enum类型是对JavaScript标准数据类型的一个补充
```javascript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值，如果指定某一数值，则从该数值开始自增1。或者全部手动赋值
```javascript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
// 全部赋值
enum Color {Red = 1, Green = 3, Blue = 4}
let c: Color = Color.Green;

// 未手动赋值的枚举项与手动赋值的重复也是允许的，但是最好不这么做
enum Color {Red = 1, Green = 1, Blue = 4}
let c: Color = Color.Green;
```

枚举成员会对枚举值到枚举名进行反向映射
```javascript
enum Color {Red, Green, Blue}
let c: string = Color[1];

// 相当于
console.log(Color[0] === "Red")
console.log(Color[1] === "Green")
console.log(Color[2] === "Blue")
console.log(Color["Red"] === 0)
console.log(Color["Green"] === 1)
console.log(Color["Blue"] === 2)
```

<a name="M6JEE"></a>
### Null和Undefined
undefined和null两者各自有自己的类型分别叫做undefined和null,用处并不是很大
```javascript
let u: undefined = undefined;
let n: null = null;
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
```javascript
// ok
let num: number = undefined;

// error
let u: void;
let num: number = u;
```
但是当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。

<a name="xF6l6"></a>
### Any
当你不知道变量的类型或者只知道一部分的话，any是非常有用的，比较适用于js改造为ts
```javascript
let notSure: any = 4;
notSure = "maybe a string instead";

let list: any[] = [1, true, "free"];
list[1] = 100;
```

<a name="6qfcq"></a>
### Never
never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。<br />never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never
```javascript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

<a name="T7UBH"></a>
### void
对变量赋值void时，只相当于 undefined 类型的别名，我们一般用于函数的返回值声明。
```javascript
function error(message: string): void {
    console.log(message);
}
```

<a name="v5Ubw"></a>
### unknown
任何类型都是 unknown  的子类型，unknown 是所有类型的父类型,简单说就是任何值都可以赋值给类型是 unkown  的变量，与其对应的是，我们不能把一个 unkown 类型的值赋值给任意非 unkown 类型的值。
```javascript
let a: unknown = undefined
a = Symbol('deep dark fantasy')
a = {}
a = false
a = '114514'
a = 1919n

let b : bigint = a; // error
```


