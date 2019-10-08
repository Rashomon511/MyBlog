---
title: Typescript入门——接口与类
---

Typescript入门系列：
> [TypeScript入门—类型二三事(一)](https://github.com/LuoShengMen/MyBlog/issues/47)   
   [TypeScript入门—类型二三事(二)](https://github.com/LuoShengMen/MyBlog/issues/48)
  [TypeScript入门—高级类型](https://github.com/LuoShengMen/MyBlog/issues/49)
  [Typescript入门——接口与类](https://github.com/LuoShengMen/MyBlog/issues/50)
  
  <!-- more -->
### 接口
object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型，我们一般使用接口来定义对象的类型.<br />typeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
```javascript
interface Car {
  speed: number;
  color?: string;  // 可选属性
  readonly price: number // 只读属性
  [propName: string]: any // 额外属性
}
let car1 : Car = {
  speed: 200,
  price: 300,
  color: 'blue', 
}
let car2 : Car = {
  speed: 100,
  price: 200,
  name: 'mycar'
}
car2.price = 400 // error
```
上面定一个了一个接口，赋值的时候，变量的形状必须和接口的形状保持一致。但是接口包含了，可选属性，只读属性，额外属性。这会允许变量会不一样。

- 可选属性在属性后面添加一个？，表示变量中该属性可以不存在。
- 只读属性在属性前面加上readonly即可，表示变量对对象赋值后不可变更(只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候)
- 额外属性通常以[propName: [string]]: any表示，表示对象允许有一个值任意属性

需要注意的是，一旦定义了任意属性的类型，那么确定属性和可选属性的类型都必须是它的类型的子集.<br />任意属性的值允许是string，但是可选属性speed的值却是 number，number 不是 string 的子属性，因此会报错。
```javascript
interface Car {
  speed: number;
  color?: string;  
  [propName: string]: string 
}
let car2 : Car = { // error 
  speed: 100,
  color: 'blue',
  name: 'mycar'
}
```

接口同样可以应用于数组：NumberArray 表示： index 的类型是 number，值的类型也是 number
```javascript
interface NumberArray {
    [index: number]: number;
}
let foo: NumberArray = [1, 2, 4, 3, 9];
interface StringArray {
    [index: number]: string;
}
let bar: StringArray = ['1', '2', '4', '3', '9'];
```
<a name="pnuq5"></a>
### 类
Typescript中类的写法如下:
```javascript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
      return `My name is ${this.name}`;
    }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

**public private 和 protected**

- public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

当成员被标记pubilc后，所有直接访问实例当属性都是允许的。
```javascript
class Person {
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }
}
let a = new Person('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom
```

当成员被标记成 private时，它就不能在声明它的类的外部访问
```javascript
class Animal {
    Person name: string;
    constructor(name: string) { this.name = name; }
}

let a = new Person('Jack');
console.log(a.name); // error
a.name = 'Tom';
console.log(a.name); // error
```

protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。
```javascript
class Person {
    protected name: string;
    public constructor(name: string) {
        this.name = name;
    }
}

class Sporter extends Person {
    constructor(name: string) {
        super(name);
        console.log(this.name);
    }
}
```

**抽象类**<br />抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化， 不同于接口，抽象类可以包含成员的实现细节。abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法.并且抽象类中的抽象方法必需被子类实现。
```javascript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
class Cat extends Animal {
    makeSound() {
        console.log('meao!meao!')
    }
}
```

**类实现接口**<br />实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性
```javascript
interface Alarm {
    alert();
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```
一个类可以实现多个接口

```javascript
interface Alarm {
    alert();
}

interface Light {
    lightOn();
    lightOff();
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

**接口继承接口**<br />接口与接口之间可以是继承关系
```javascript
interface Alarm {
    alert();
}

interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
```

**接口继承类**<br />接口也可以继承类
```javascript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

