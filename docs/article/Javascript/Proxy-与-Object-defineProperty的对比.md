---
title: Proxy 与 Object.defineProperty的对比
---

### 前言
Object.defineProperty() 和 ES2015 中新增的 Proxy 对象,会经常用来做数据劫持(数据劫持:在访问或者修改对象的某个属性时，通过一段代码拦截这个行为，进行额外的操作或者修改返回结果)，数据劫持的典型应用就是我们经常在面试中遇到的双向数据绑定。
<!-- more -->
### Object.defineProperty
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象
语法：
> Object.defineProperty(obj, prop, descriptor)
- obj：要在其上定义属性的对象。
- prop：要定义或修改的属性的名称。
- descriptor：将被定义或修改的属性描述符。
```javascript
var o = {}; // 创建一个新对象
// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
  value : 37,
  writable : true,
  enumerable : true,
  configurable : true
});
// 对象o中有一个值为37的属性a
```
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)这样描述属性描述符：
数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。存取描述符是由getter-setter函数对描述的属性。描述符必须是这两种形式之一；不能同时是两者。两个属性描述符的具体介绍可以查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#%E5%B1%9E%E6%80%A7%E6%8F%8F%E8%BF%B0%E7%AC%A6)，这里不再缀诉。
示例：
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

// 报错
Object.defineProperty({}, "a", {
    value: 37,
    get: function() {
        return 1;
    }
});
```
#### Setters 和 Getters
下面的例子展示了如何实现一个自存档对象。 当设置temperature 属性时，archive 数组会获取日志条目
```javascript
function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    get: function() {
      console.log('get!');
      return temperature;
    },
    set: function(value) {
      console.log('set!');
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;  // 'set!'
arc.temperature = 13;  // 'set!'
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
```
### 存在对问题
一、不能监听数组的变化
数组的以下几个方法不会触发 set,push、pop、shift、unshift、splice、sort、reverse
```javascript
let arr = [1,2,3]
let obj = {}
Object.defineProperty(obj, 'arr', {
  get () {
    console.log('get arr')
    return arr
  },
  set (newVal) {
    console.log('set', newVal)
    arr = newVal
  }
})
obj.arr.push(4) // 只会打印 get arr, 不会打印 set
obj.arr = [1,2,3,4] // 这个能正常 set
```

二、必须遍历对象的每个属性
使用 Object.defineProperty() 多数要配合 Object.keys() 和遍历，于是多了一层嵌套
```javascript
Object.keys(obj).forEach(key => {
  Object.defineProperty(obj, key, {
    // ...
  })
})
```

三、必须深层遍历嵌套的对象
如果嵌套对象，那就必须逐层遍历，直到把每个对象的每个属性都调用 Object.defineProperty() 为止。 Vue 的源码中就能找到这样的逻辑 (叫做 walk 方法)。


### Proxy
Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等），ES6 原生提供 Proxy 构造函数，用来生成 一个Proxy 实例。
语法：
> let p = new Proxy(target, handler);
- target:用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- handler:一个对象，其属性是当执行一个操作时定义代理的行为的函数
示例：
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
在例子中，通过new Proxy(target, handler)返回了一个Prosy实例，在访问或者添加实例对象的某个属性时
，调用了get或者set操作，在get操作中，在当对象不存在属性名时，会返回37.除了进行get和set操作外，还会进行无操作转发代理，代理会将所有应用到它的操作转发到这个目标对象上。

### 解决问题
一、针对对象
Proxy 是针对 整个对象obj 的。因此无论 obj 内部包含多少个 key ，都可以走进 set。(并不需要通过Object.keys() 的遍历)，解决了上述 Object.defineProperty() 的第二个问题
```javascript
let obj = {
  name: 'Eason',
  age: 30
}
let handler = {
  get (target, key, receiver) {
    console.log('get', key)
    return Reflect.get(target, key, receiver)
  },
  set (target, key, value, receiver) {
    console.log('set', key, value)
    return Reflect.set(target, key, value, receiver)
  }
}
let proxy = new Proxy(obj, handler)
proxy.name = 'Zoe' // set name Zoe
proxy.age = 18 // set age 18
```
>  Reflect.get 和 Reflect.set 可以理解为类继承里的 super，即调用原来的方法

二、支持数组
Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的
```javascript
let arr = [1,2,3]
let proxy = new Proxy(arr, {
    get (target, key, receiver) {
        console.log('get', key)
        return Reflect.get(target, key, receiver)
    },
    set (target, key, value, receiver) {
        console.log('set', key, value)
        return Reflect.set(target, key, value, receiver)
    }
})
proxy.push(4)
// 能够打印出很多内容
// get push     (寻找 proxy.push 方法)
// get length   (获取当前的 length)
// set 3 4      (设置 proxy[3] = 4)
// set length 4 (设置 proxy.length = 4)
```

三、嵌套支持
Proxy 也是不支持嵌套的，这点和 Object.defineProperty() 是一样的。因此也需要通过逐层遍历来解决。Proxy 的写法是在 get 里面递归调用 Proxy 并返回
```javascript
let obj = {
  info: {
    name: 'eason',
    blogs: ['webpack', 'babel', 'cache']
  }
}
let handler = {
  get (target, key, receiver) {
    console.log('get', key)
    // 递归创建并返回
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key, receiver)
  },
  set (target, key, value, receiver) {
    console.log('set', key, value)
    return Reflect.set(target, key, value, receiver)
  }
}
let proxy = new Proxy(obj, handler)
// 以下两句都能够进入 set
proxy.info.name = 'Zoe'
proxy.info.blogs.push('proxy')
```

### 扩展
#### 实现构造函数
方法代理可以轻松地通过一个新构造函数来扩展一个已有的构造函数,这个例子使用了construct和apply。
```javascript
function extend(sup,base) {
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype,"constructor"
  );
  base.prototype = Object.create(sup.prototype);
  var handler = {
    construct: function(target, args) {
      var obj = Object.create(base.prototype);
      this.apply(target,obj,args);
      return obj;
    },
    apply: function(target, that, args) {
      sup.apply(that,args);
      base.apply(that,args);
    }
  };
  var proxy = new Proxy(base,handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, "constructor", descriptor);
  return proxy;
}
var Person = function(name){
  this.name = name
};
var Boy = extend(Person, function(name, age) {
  this.age = age;
});
Boy.prototype.sex = "M";
var Peter = new Boy("Peter", 13);
console.log(Peter.sex);  // "M"
console.log(Peter.name); // "Peter"
console.log(Peter.age);  // 13
```

#### 面试题
什么样的 a 可以满足 (a === 1 && a === 2 && a === 3) === true 呢？这里我们就可以采用数据劫持来实现
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

### 总结
Proxy / Object.defineProperty 两者的区别：
- 当使用 defineProperty，我们修改原来的 obj 对象就可以触发拦截，而使用 proxy，就必须修改代理对象，即 Proxy 的实例才可以触发拦截
- defineProperty 必须深层遍历嵌套的对象。 Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的

Proxy对比defineProperty的优势
- Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
- Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法
- Proxy 的兼容性不如 Object.defineProperty() (caniuse 的数据表明，QQ 浏览器和百度浏览器并不支持 Proxy，这对国内移动开发来说估计无法接受，但两者都支持 Object.defineProperty())
- 不能使用 polyfill 来处理兼容性

接下来我们将会分别用Proxy / Object.defineProperty 来实现双向绑定

##### 参考链接：
- [defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [数据劫持 OR 数据代理](https://mp.weixin.qq.com/s/SPoxin9LYJ4Bp0goliEaUw)