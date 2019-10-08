---
title: Typescript文件模块知多少
---

<a name="WA3en"></a>
### 前言
Typescript将内部模块称为命名空间，外部模块称为模块，我们就来介绍下模块的用法。
  <!-- more -->
<a name="LmZvZ"></a>
### 命名空间
一般情况下，当你在一个新的Typescript文件中写下代码时，它会处于全局命名空间中，比如你声明一个变量，该变量是在全局可以访问到的。
```javascript
// foo.ts
const foo = 123;
// bar.ts
const bar = foo;
```

使用全局变量空间是危险的，因为它会与文件内的代码命名冲突,为了确保变量不会泄漏至全局变量，我们可以使用文件模块来解决这个问题。<br />如在 TypeScript 文件的根级别位置含有 import 或者 export，它就会在这个文件中创建一个本地的作用域，如果其他文件想要使用变量，必须显示的导入该变量，上述例子可以进行以下修改：
```javascript
// foo.ts
export const foo = 123;
// bar.ts
import { foo } from './foo';
const bar = foo; // allow
```

避免全局变量污染的第二种方法是使用 namespace 的外部的模块
```javascript
namespace Utility {
  export const foo = 123;
}

console.log(Utility.foo) // 123
```
> 命名空间是支持嵌套的。因此，你在在一个命名空间下嵌套另外一个命名空间 ，对于快速的演示和移植旧的 JavaScript 代码。推荐使用namespace 的外部的模块。


<a name="Pe6hO"></a>
### 文件模块
言归正传，既然文件模块有如此强大的功能，我们就来学习他的一些用法。
<a name="QdvTj"></a>
#### 模块导出
任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出，当我们需要导出大量的内容时，可以采用这种方式。
```javascript
export const someVar = 123;
export const numberRegexp = /^[0-9]+$/;
export type someType = {
  foo: string;
};
export interface StringValidator {
    isAcceptable(s: string): boolean;
}
export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
```
除了上面的写法，还可以以另一种方式书写
```javascript
const someVar = 123;
const numberRegexp = /^[0-9]+$/;
export { someVar, numberRegexp };
```
或者可以重新命名变量导出
```javascript
const someVar = 123;
export { someVar as aDifferentName };
```

**重新导出**<br />通过重命名，部分导出从另一个模块导入的项目。想要扩展某个模块的功能可以使用重新导出，因为重新导出可以不要去改变原来的对象，而是导出一个新的实体来提供新的功能。
```javascript
export { someVar as aDifferentName } from './foo';
```
从其他模块导出后部分导出
```javascript
export { someVar } from './foo';
```
从其他模块导出后整体导出
```javascript
export * from './foo';
```

<a name="sAyCL"></a>
#### 模块导入
使用import关键字导入一个变量或者类型，需要明确的导出模块名称时使用这种方式。
```javascript
import { someVar, someType } from './foo';
```
可以对导入对模块进行重命名
```javascript
import { someVar as aDifferentName } from './foo';
```
用星号（*）指定一个变量，所有输出值都加载在这个变量上面,进行整体导入
```javascript
import * as foo from './foo';
```
具有副作用的导入模块，一些模块会设置一些全局状态供其它模块使用,一般不推荐这么做
```javascript
import "./my-module.js";
```

<a name="nJoeG"></a>
#### 默认导入/导出
默认导出使用 default关键字标记；并且一个模块只能够有一个default导出，如果仅导出单个 class 或 function，使用 export default。<br />使用方式：

- 在一个变量之前（不需要使用 let/const/var）；
- 在一个函数之前；
- 在一个类之前
```javascript
// some var
export default (someVar = 123);
// some function
export default function someFunction() {}
// some class
export default class someClass {}
```
导入使用import即可
```javascript
import foo from './foo';
```

<a name="uPLfl"></a>
#### export = 和 import = require()
CommonJS和AMD的环境里都有一个exports变量,为了支持CommonJS和AMD的exports, TypeScript提供了export =语法.<br />export =语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举
```javascript
export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export = ZipCodeValidator
```

若使用export =导出一个模块，则必须使用TypeScript的特定语法import module = require("module")
```javascript
import ZipCodeValidator = require("./ZipCodeValidator");
```

<a name="VRnZj"></a>
#### 重写类型的动态查找
在项目里，也可以通过 declare module 'somePath' 来声明一个全局模块的方式，用来解决查找模块路径的问题
```javascript
// globals.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number;
}
// other.ts
import * as foo from 'foo';
```

<a name="w90uT"></a>
#### 模块懒加载
编译器会检测是否每个模块都会在生成的JavaScript中用到。 如果一个模块只在类型注解部分使用，并且完全没有在表达式中使用时，就不会生成 require这个模块的代码,如下例子:
```javascript
import foo = require('foo');
var bar: foo;
// 编译的js
let bar
```

在某些情形下，只想在需要时加载模块，此时需要仅在类型注解中使用导入的模块名称，而不是在变量中使用。那么在编译javascript时，就不会生成 require这个模块的代码.<br />如下基于commonjs例子中，使用typeof关键字来获取foo的类型
```javascript
import foo = require('foo');

export function loadFoo() {
  // 这是懒加载 foo，原始的加载仅仅用来做类型注解
  const _foo: typeof foo = require('foo');
  // 现在，你可以使用 `_foo` 替代 `foo` 来做为一个变量使用
}
```

一个同样简单的 amd 模块（使用 requirejs）
```javascript
import foo = require('foo');

export function loadFoo() {
  // 这是懒加载 foo，原始的加载仅仅用来做类型注解
  require(['foo'], (_foo: typeof foo) => {
    // 现在，你可以使用 `_foo` 替代 `foo` 来做为一个变量使用
  });
}
```

使用场景：

- 在 web app 里， 当你在特定路由上加载 JavaScript 时；
- 在 node 应用里，当你只想加载特定模块，用来加快启动速度时

<a name="cuLPa"></a>
### 总结
我们了解到来文件模块的众多使用方法，以及相应使用方法下的应用场景，我们可以根据业务需要采取合适的模块导入导出方式。

<a name="vPAvL"></a>
### 参考

- [TypeScript官网](http://www.typescriptlang.org/)
- [深入理解Typescript](https://basarat.gitbooks.io/typescript/docs/project/external-modules.html)
- [Import statements in TypeScript: which syntax to use](https://blog.atomist.com/typescript-imports/)

