## JavaScript手写

<a name="43aJR"></a>
#### 手写forEach
```javascript
let family = ['jim', 'tom', 'jack', 'kim']
Array.prototype.myforEach= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    func(arr[i], i, arr)
  }
}
family.forEach((item, index, arr) => {arr[index] = `hello ${item}`}) // ["hello jim", "hello tom", "hello jack", "hello kim"]
family.myforEach((item, index, arr) => {arr[index] = `${item}!`}) // ["hello jim!", "hello tom!", "hello jack!", "hello kim!"]
```

<a name="NqYFX"></a>
#### 手写map
```javascript
let family = ['jim', 'tom', 'jack', 'kim']
Array.prototype.myMap= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  console.log(arr)
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(func(arr[i], i, arr))
  }
  return newArr;
}
let  arr1 = family.map((item, index, arr) => {return `hello ${item}`})  // ["hello jim", "hello tom", "hello jack", "hello kim"]
let  arr2 = family.myMap((item, index, arr) => {return `hello ${item}`})  // ["hello jim", "hello tom", "hello jack", "hello kim"]
```

<a name="DdUie"></a>
#### 手写filer
```javascript
let family = ['jim', 'tom', 'jack', 'kim']
Array.prototype.myFilter= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i, arr)) {
      newArr.push(arr[i])
    }
  }
  return newArr;
}
let arr1 = family.filter((item, index, arr) => { return index !== 2}) // ['jim', 'tom', 'kim']
let arr2 = family.myFilter((item, index, arr) => { return index !== 2}) // ['jim', 'tom', 'kim']
```

<a name="SNO7e"></a>
#### 手写some
```javascript
let family = ['jim', 'tom', 'jack', 'kim']
Array.prototype.mySome= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i, arr)) {
      return true
    }
  }
  return false;
}
family.some((item, index, arr) => { return item === 'bim'}) // true
family.mySome((item, index, arr) => { return item === 'bim'}) // true
// every
Array.prototype.myEvery= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (!func(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}
family.every((item, index, arr) => { return item === 'bim'}) // false
family.myEvery((item, index, arr) => { return item === 'bim'}) // false
```

<a name="wupoL"></a>
#### 手写find
```javascript
let family = ['jim', 'tom', 'jack', 'kim']
Array.prototype.myFind= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i, arr)) {
      return arr[i]
    }
  }
  return undefined;
}
let name1 = family.find((item, index, arr) => { return item === 'kim'}) // kim
let name2 = family.myFind((item, index, arr) => { return item === 'kim'})  // kim
// findIndex
Array.prototype.myFindIndex= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i, arr)) {
      return i
    }
  }
  return -1;
}
let num1 = family.findIndex((item, index, arr) => { return item === 'kim'}) // 3
let num2 = family.myFindIndex((item, index, arr) => { return item === 'kim'})  // 3
```

<a name="KzMt8"></a>
#### 手写reduce
```javascript
let family = ['jim', 'tom', 'jack', 'kim']
Array.prototype.myReduce = function(func, initialValue) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  let prev = initialValue || arr[0]
  let len = initialValue ? arr.length : arr.length - 1
  for (let i = 0; i < len; i++) {
    let cur = initialValue ? arr[i] : arr[i + 1]
    prev = func(prev, cur, i, arr)
  }
  return prev;
}
let arr1 = family.reduce((prev, cur, index, arr) => { return `${prev}-${cur}`}) // jim-tom-jack-kim
let arr2 = family.myReduce((prev, cur, index, arr) => { return `${prev}-${cur}`}) // jim-tom-jack-kim
// reduceRight
Array.prototype.myReduceRight = function(func, initialValue) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  let prev = initialValue || arr[arr.length - 1]
  let num = initialValue ? -1 : 0
  for (let i = arr.length - 1; i > num; i--) {
    let cur = initialValue ? arr[i] : arr[i - 1]
    prev = func(prev, cur, i, arr)
  }
  return prev;
}
let arr3 = family.reduce((prev, cur, index, arr) => { return `${prev}-${cur}`}) // kim-jack-tom-jim
let arr4 = family.myReduce((prev, cur, index, arr) => { return `${prev}-${cur}`}) // kim-jack-tom-jim
```

<a name="cmfWP"></a>
#### 手写Array.from
```javascript
Array.myFrom = function (el) {
  return Array.apply(this, el);
}
var arrLike = {length: 4, 2: "foo" };
var arr = Array.from( arrLike ); //  [undefined, undefined, "foo", undefined]
```

<a name="2wasz"></a>
#### 手写对象属性迭代器
```javascript
var obj = {
  name: 'AAA',
  age: 23,
  address: '广州'
}
Object.defineProperty(obj, Symbol.iterator, {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function() {
    var self = this;
    var index = 0;
    var keys = Object.keys(self);
    return {
      next: function() {
        return {
          value: self[keys[index++]],
          done: index > keys.length
        }
      }
    }
  }
})
for (const val of obj) {
  console.log(`属性值为：${val}`);
}
```


<a name="WBlXo"></a>
#### 手写call
```javascript
Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    throw new Error("Error");
  }
  context = context || window   // context是第一个参数，作为this将要指向的对象，当传入null或者undefined时指向window
  context.fn = this             // 这里的this代表调用myCall的函数，向context对象添加这个函数,其实是改变this指向
  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) { 
    args.push('arguments[' + i + ']'); // 获取第二个到最后一个参数,将类数组对象转成数组
  }
  var result = eval('context.fn(' + args +')'); // 传入参数并执行函数
  delete context.fn                           // 从对象中删除这个属性
  return result;                              // 返回结果
}
// es6
Function.prototype.yourCall = function (context) {
  if (typeof this !== "function") {
     throw new Error("Error");
  }
  context = context || window; 
  context.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn
  return result;
}

var color = 'blue'
let colors = {
  color: 'red'
}

function box(width, height) {
  console.log(width)
  console.log(height)
  console.log(this.color)
}
box.myCall(colors, 200, 300)   // 200, 300, red
box.yourCall(colors, 200, 300) // 200, 300, red
box.myCall(null, 200, 300)     // 200, 300, blue
box.yourCall(null, 200, 300)   // 200, 300, blue
```

<a name="oDHK4"></a>
#### 手写apply
```javascript
Function.prototype.myApply = function (context, arr) {
  if (typeof this !== "function") {
    throw new Error("Error");
  }
  context = context || window;
  context.fn = this;
  var result;
  if (!arr) {
    result = context.fn();
  }
  else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
       args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + arr + ')')
  }
  delete context.fn
  return result;
}
// es6
Function.prototype.yourApply = function (context, arr) {
    if (typeof this !== "function") {
      throw new Error("Error");
    }
    context = context || window; 
    context.fn = this;
    let result;
    if (!arr) {
        result = context.fn();
    } else {
        result = context.fn(...arr);
    }
    delete context.fn
    return result;
}

var color = 'blue'
let colors = {
  color: 'red'
}

function box(width, height) {
  console.log(width)
  console.log(height)
  console.log(this.color)
}
box.myApply(colors, [200, 300])   // 200, 300, red
box.yourApply(colors, [200, 300]) // 200, 300, red
box.myApply(null, [200, 300])     // 200, 300, blue
box.yourApply(null, [200, 300])   // 200, 300, blue
```

<a name="4wOzg"></a>
#### 手写bind
```javascript
Function.prototype.myBind = function (context) {
    if (typeof this !== "function") {
      throw new Error("Error");
    }
 
    let self = this;
    let args = [...arguments].slice(1);
    let newFuc = function () {};
    let resultFuc = function () {
        var bindArgs = [...arguments].slice();
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof newFuc ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    newFuc.prototype = self.prototype;
    resultFuc.prototype = new newFuc();
    return resultFuc;
}
let colors = {
  color: 'red'
}

function box(width, height) {
  this.length = 20
  console.log(width)
  console.log(height)
  console.log(this.color)
}
box.prototype.price = 666

let mybox = box.myBind(colors, 200)
mybox(300)  // 200, 300, red mybox作为普通函数，this指向了colors
let yourBox = new mybox(300) // 200, 300, undefined
console.log(yourBox.length, yourBox.price) // 20 ,600 mybox作为构造函数，this指向了实例yourBox
```

<a name="Qb12l"></a>
#### 手写instanceof
```javascript
function myInstanceof(left,right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined)
      return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}
function Box(width) {
  this.width = width;
}
var bigBox = new Box(666);
console.log(myInstanceof(bigBox, Box));
```

<a name="J8l9V"></a>
#### 手写Object.create()
```javascript
Object.myCreate = function(obj, properties){
  let F = function(){}
  F.prototype = obj;
  if (properties) {
     Object.defineProperties(F, properties)
  }
  return new F()
}
let box = {
  color: 'blue',
  width: 200,
  height: 300
}
let obj = Object.myCreate(box) // {}
obj.__proto__ === box // true
```

<a name="0sUwB"></a>
#### 手写new
```javascript
function myNew(){
   let obj = new Object(); //从Object.prototype上克隆一个对象
   let Constructor = [].shift.call(arguments); //取得外部传入的构造器
   
   let F = function(){};
   F.prototype = Constructor.prototype;
   obj = new F();   //指向正确的原型
   let ret = Constructor.apply(obj, arguments); //借用外部传入的构造器给obj设置属性,即this指向这个新对象
   if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
       return ret;
   }
   return obj; //确保构造器总是返回一个对象
}
function yourNew(Obj, ...args) {
     let obj = Object.create(Obj.prototype);//使用指定的原型对象及其属性去创建一个新的对象
     let ret = Obj.apply(obj,args); // 绑定 this 到obj, 设置 obj 的属性
     if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
       return ret;
     }
     return obj; //确保构造器总是返回一个对象
}
function Foo(name, age) {
   this.name = name;
   this.age = age
}

let tom = new Foo('tom', 18)  // {name: "tom", age: 18}
let kim = yourNew(Foo, 'kim', 20) //{name: "kim", age: 20}
let jim = myNew(Foo, 'jim', 15) // {name: "jim", age: 15}
```

<a name="dKOVE"></a>
#### 手写Object.assin()
```javascript
Object.myAssign = function (target) {
  let len = arguments.length
	if (target === undefined || target === null || len == 0 ) {  // 判断参数是否正确(目的对象不能为空，我们可以直接设置{}传递进去,但必须设置该值)
	  throw new TypeError('Cannot convert undefined or null to object');
	}
	
  if(len == 1){
    if(target instanceof Object) {
       return target;
    }else {
       let newObj =target;
       if(typeof target === 'string'){
         return new String(newObj);
       }else if(typeof target === 'boolean'){
         return new Boolean(newObj);
       }else if(typeof target === 'number'){
         return new Number(newObj);
       }
    }
  } else {
    let output = Object(target);  // 使用Object在原有的对象基础上返回该对象，并保存为output
	  for (let index = 1; index < arguments.length; index++) {
	  let source = arguments[index];
	  if (source !== undefined && source !== null) {
	    for (let nextKey in source) {  // 使用for…in循环遍历出所有的可枚举的自有对象。并复制给新的目标对象(hasOwnProperty返回非原型链上的属性)
	      if (source.hasOwnProperty(nextKey)) {
	        output[nextKey] = source[nextKey];
	      }
	    }
	  }
	}
	return output;
  }
};
let box = {
  color: 'blue',
  width: 200,
  height: 300
}
let obj1 = Object.myAssign({}, box) // {color: "blue", width: 200, height: 300}
let obj2 = Object.myAssign({color: 'red'}, box) // {color: "blue", width: 200, height: 300}
```

<a name="CvrcS"></a>
#### 手写深拷贝
```javascript
// 递归
function dfsCloneDeep(source, hash = new WeakMap()) {
    if (!typeof sorce === 'object') return source; // 非对象返回自身
    if (hash.has(source)) return hash.get(source); // 查哈希表,如果以拷贝，则直接返回值，解决循环引用
      
    let target = Array.isArray(source) ? [] : {}; // 区分数组和对象
    hash.set(source, target); // 哈希表设值，哈希表存储已拷贝过的对象
    
    let symKeys = Object.getOwnPropertySymbols(source); // 解决拷贝symbol
    if (symKeys.length) {
        symKeys.forEach(symKey => {
            if (typeof source[symKey] === 'object' && source[symKey] !== null) {
                target[symKey] = dfsCloneDeep(source[symKey], hash); 
            } else {
                target[symKey] = source[symKey];
            }    
        });
    }
    
    for(let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object' && source[key] !== null) {
                target[key] = dfsCloneDeep(source[key], hash); // 注意这里传入hash
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}
// 队列
 function bfsCloneDeep(obj) {
   let root = Array.isArray(obj) ? [] : {};
   let nodeList = [{
       parent: root,
       key: undefined,
       data: obj,
   }];
   while (nodeList.length) {
     let node = nodeList.pop(),
         parent = node.parent,
         key = node.key,
         data = node.data;
     let result = parent;
     if (typeof key !== 'undefined') { // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        result = parent[key] = Array.isArray(data) ? [] : {};
     }

     let symKeys = Object.getOwnPropertySymbols(data); // 解决拷贝symbol
     if (symKeys.length) {
          symKeys.forEach(symKey => {
            if (typeof data[symKey] === 'object' && data[symKey] !== null) {
                nodeList.push({
                   parent: result,
                   key: symKeys,
                   data: data[symKey],
                });
            } else {
              result[symKey] = data[symKey];
            }
         });
      }
      
      for (let key in data) {
          if (data.hasOwnProperty(key)) {
             if (typeof data[key] === 'object') {
                 nodeList.push({
                    parent: result,
                    key,
                    data: data[key],
                 });
             } else {
                 result[key] = data[key];
             }
          }
       }
    }
    return root;
};
let obj = {colors: ['blue', 'red'],width: 200, height: 300};
let l = Symbol('length');
obj[l] = 400 ;
let obj1 = bfsCloneDeep(obj)
// {colors: ['blue', 'red'], width: 200, height: 300, Symbol(length): 400}
let obj2 = dfsCloneDeep(obj)
// {colors: ['blue', 'red'], width: 200, height: 300, Symbol(length): 400}
```

<a name="pSr5T"></a>
#### 手写JSON.stringify、JSON.parse
```javascript
if (!window.JSON) {
    window.JSON = {
        parse: function(jsonStr) {
            return eval('(' + jsonStr + ')');
        },
        stringify: function(jsonObj) {
            var result = '',
                curVal;
            if (jsonObj === null) {
                return String(jsonObj);
            }
            switch (typeof jsonObj) {
                case 'number':
                case 'boolean':
                    return String(jsonObj);
                case 'string':
                    return '"' + jsonObj + '"';
                case 'undefined':
                case 'function':
                    return undefined;
            }

            switch (Object.prototype.toString.call(jsonObj)) {
                case '[object Array]':
                    result += '[';
                    for (var i = 0, len = jsonObj.length; i < len; i++) {
                        curVal = JSON.stringify(jsonObj[i]);
                        result += (curVal === undefined ? null : curVal) + ",";
                    }
                    if (result !== '[') {
                        result = result.slice(0, -1);
                    }
                    result += ']';
                    return result;
                case '[object Date]':
                    return '"' + (jsonObj.toJSON ? jsonObj.toJSON() : jsonObj.toString()) + '"';
                case '[object RegExp]':
                    return "{}";
                case '[object Object]':
                    result += '{';
                    for (i in jsonObj) {
                        if (jsonObj.hasOwnProperty(i)) {
                            curVal = JSON.stringify(jsonObj[i]);
                            if (curVal !== undefined) {
                                result += '"' + i + '":' + curVal + ',';
                            }
                        }
                    }
                    if (result !== '{') {
                        result = result.slice(0, -1);
                    }
                    result += '}';
                    return result;

                case '[object String]':
                    return '"' + jsonObj.toString() + '"';
                case '[object Number]':
                case '[object Boolean]':
                    return jsonObj.toString();
            }
        }
    };
}
```

<a name="X8aNa"></a>
#### 手写promise
```javascript
        class Promise {
            constructor(executor) {
                this.state = 'pending';
                this.value = undefined;
                this.reason = undefined;
                this.onResolvedCallbacks = [];
                this.onRejectedCallbacks = [];
                let resolve = value => {
                    if (this.state === 'pending') {
                        this.state = 'fulfilled';
                        this.value = value;
                        this.onResolvedCallbacks.forEach(fn => fn());
                    }
                };
                let reject = reason => {
                    if (this.state === 'pending') {
                        this.state = 'rejected';
                        this.reason = reason;
                        this.onRejectedCallbacks.forEach(fn => fn());
                    }
                };
                try {
                    executor(resolve, reject);
                } catch (err) {
                    reject(err);
                }
            }
            then(onFulfilled, onRejected) {
                onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
                onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
                let promise2 = new Promise((resolve, reject) => {
                    if (this.state === 'fulfilled') {
                        setTimeout(() => {
                            try {
                                let x = onFulfilled(this.value);
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (e) {
                                reject(e);
                            }
                        }, 0);
                    };
                    if (this.state === 'rejected') {
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.reason);
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (e) {
                                reject(e);
                            }
                        }, 0);
                    };
                    if (this.state === 'pending') {
                        this.onResolvedCallbacks.push(() => {
                            setTimeout(() => {
                                try {
                                    let x = onFulfilled(this.value);
                                    resolvePromise(promise2, x, resolve, reject);
                                } catch (e) {
                                    reject(e);
                                }
                            }, 0);
                        });
                        this.onRejectedCallbacks.push(() => {
                            setTimeout(() => {
                                try {
                                    let x = onRejected(this.reason);
                                    resolvePromise(promise2, x, resolve, reject);
                                } catch (e) {
                                    reject(e);
                                }
                            }, 0)
                        });
                    };
                });
                return promise2;
            }
            catch(fn) {
                return this.then(null, fn);
            }
        }
        function resolvePromise(promise2, x, resolve, reject) {
            if (x === promise2) {
                return reject(new TypeError('Chaining cycle detected for promise'));
            }
            let called;
            if (x != null && (typeof x === 'object' || typeof x === 'function')) {
                try {
                    let then = x.then;
                    if (typeof then === 'function') {
                        then.call(x, y => {
                            if (called) return;
                            called = true;
                            resolvePromise(promise2, y, resolve, reject);
                        }, err => {
                            if (called) return;
                            called = true;
                            reject(err);
                        })
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    if (called) return;
                    called = true;
                    reject(e);
                }
            } else {
                resolve(x);
            }
        }
        //resolve方法
        Promise.resolve = function (val) {
            return new Promise((resolve, reject) => {
                resolve(val)
            });
        }
        //reject方法
        Promise.reject = function (val) {
            return new Promise((resolve, reject) => {
                reject(val)
            });
        }
        //race方法 
        Promise.race = function (promises) {
            return new Promise((resolve, reject) => {
                for (let i = 0; i < promises.length; i++) {
                    promises[i].then(resolve, reject)
                };
            })
        }
        //all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
        Promise.all = function (promises) {
            let arr = [];
            let i = 0;
            function processData(index, data) {
                arr[index] = data;
                i++;
                if (i == promises.length) {
                    resolve(arr);
                };
            };
            return new Promise((resolve, reject) => {
                for (let i = 0; i < promises.length; i++) {
                    promises[i].then(data => {
                        processData(i, data);
                    }, reject);
                };
            });
        }
        let p1 = new Promise((resolve, reject) => { 
            setTimeout(() => {
                resolve('success') 
            }, 5000)
            })
        p1.then((data) => { return data }).then((data) => {
            return new Promise((resolve) => resolve(data))
        }).then((data) => {
            console.log(data, 'end');  // success end
        })
```

<a name="tDAfT"></a>
#### 手写co
```javascript
function makePromisify(source) {
    if (source.then && typeof source.then === "function") return source
    return Promise.resolve(source)
}

function run(generatorFunc) {
    let it = generatorFunc()
    let result = it.next()

    return new Promise((resolve, reject) => {
        const next = function (result) {
            if (result.done) {
                resolve(result.value)
            }
            //保证返回的是一个promise
            result.value = makePromisify(result.value)
            result.value.then(res => {
                //将promise的返回值res传入iterator迭代器的next方法中,作为yield后面表达式的返回值
                //it.next将停止的yield继续执行到下一个yield,返回的result是一个value,done属性组成的对象
                let result = it.next(res)
                //递归执行next函数
                next(result)
            }).catch(err => {
                reject(err)
            })
        }
        next(result)
    })
}
const data = "{a:1,b:2}"
const data2 = "{c:3,d:4}"
const data3 = "{e:5,f:6}"

const api = function (data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data)
        }, 1000)
    })

}

function* func() {
    let res = yield api(data)
    console.log(res)
    let res2 = yield api(data2)
    console.log(res2)
    let res3 = yield api(data3)
    console.log(res3)
    console.log(res, res2, res3)
}

run(func)
```

<a name="uVqx0"></a>
#### 手写async/awai
```javascript
function spawn(genF) {
    return new Promise(function(resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(
                function(v) {
                    step(function() {
                        return gen.next(v);
                    });
                },
                function(e) {
                    step(function() {
                        return gen.throw(e);
                    });
                }
            );
        }
        step(function() {
            return gen.next(undefined);
        });
    });
}
```

<a name="tfaRN"></a>
#### 手写AJAX
```javascript
function ajax(options, callback){
  var xmlhttp = null;
  var url = options.url;
  var method = options.method.toLocaleLowerCase() || 'get';
  var data = options.data
  if (window.XMLHttpRequest) {  // 1.创建XMLHttpRequest对象
    xmlhttp = new XMLHttpRequest();      
    if (xmlhttp.overrideMimeType) {         //针对某些特定版本的mozillar浏览器的BUG进行修正    
      xmlhttp.overrideMimeType("text/xml");     
    }     
  } else if (window.ActiveXObject) {         //针对IE6，IE5.5，IE5        
    var activexName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];         //两个可以用于创建XMLHTTPRequest对象的控件名称，保存在一个js的数组中 
    for ( var i = 0; i < activexName.length; i++) {     
      try {     
        xmlhttp = new ActiveXObject(activexName[i]);   //取出一个控件名进行创建，如果创建成功就终止循环 ，如果创建失败，回抛出异常，然后可以继续循环，继续尝试创建   
        if(xmlhttp){  
           break;  
        }  
      } catch (e) {
        console.log(e)
      }     
    }     
  }
  var paramArr = []
  var encodeData
  if (data instanceof Object) {
    for (var key in data) {
      paramArr.push( encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) ) // 参数拼接需要通过 encodeURIComponent 进行编码
    }
    encodeData = paramArr.join('&')
  }

  if (method === 'get') { // 检测 url 中是否已存在 ? 及其位置
   var index = url.indexOf('?')
   if (index === -1) url += '?'
   else if (index !== url.length -1) url += '&' // 拼接 url
     url += encodeData
  }
  xmlhttp.open(method, url); // 2.使用open方法设置和服务器的交互信息
  if (method === 'get') xmlhttp.send(null) // 3.发送请求
  else {
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');     // post 方式需要设置请求头
    xmlhttp.send(encodeData)
  }
  xmlhttp.onreadystatechange = function() {  // 响应函数
    if(xmlhttp.readyState ==4 && xmlhttp.status==200) {
      callback(xmlhttp.responseText)
    }
  }
}
function getData(data){
  console.log('请求成功', data)
}
ajax({
    url: 'your request url',
    method: 'get',
    data: {
      name: 'rashomon',
      age: 13
    }
},getData)
```

<a name="P3zXY"></a>
#### 手写JSONP
```javascript
// 利用script标签没有跨域限制，通过src指向一个ajax的URL，最后跟一个回调函数callback
var jsonp = function (url, data, callback) {
  var cbName = 'callback_' + new Date().getTime();
  var queryString = url.indexOf('?') == -1 ? '?' : '&';
  for (var k in data) {
    queryString += k + '=' + data[k] + '&';
  }
  queryString += 'callback=' + cbName;
  var script = document.createElement('script');
  script.src = url + queryString;
  window[cbName] = function (data) {
    callback(data);
    document.body.removeChild(script);
  };
  // 添加到body尾部
  document.body.appendChild(script);
}

// 实测
jsonp('http://api.douban.com/v2/movie/in_theaters', {'count': 1}, function (data) {
  console.log(data)
})

```

<a name="1LnfK"></a>
#### 手写双向绑定
```javascript
// html
    <span id="box">
        <h1 id='text'></h1>
        <input type="text" id='input' oninput="inputChange(event)" />
        <button id="button" onclick="clickChange()">Click me</button>
    </span>

        const input = document.getElementById('input');
        const text = document.getElementById('text');
        const button = document.getElementById('button');
        const data = {
            value: ''
        }
// 使用defineProperty
        function defineProperty(obj, attr) {
            let val
            Object.defineProperty(obj, attr, {
                set(newValue) {
                    if (val === newValue) {
                        return;
                    }
                    val = newValue;
                    input.value = newValue;
                    text.innerHTML = newValue;
                },
                get() {
                    return val
                }
            })
        }
        defineProperty(data, 'value')
        function inputChange(event) {
            data.value = event.target.value
        }

        function clickChange() {
            data.value = 'hello'
        }
// 使用proxy
        let handler = {
            get: function (obj, name) {
                return name in obj ? obj[name] : '';
            },
            set: function (obj, name, value) {
                obj[name] = value;
                text.innerHTML = value;
                input.value = value;
            },
        };
        let p = new Proxy(data, handler);
        function inputChange(event) {
            p.value = event.target.value
        }

        function clickChange() {
            p.value = 'hello'
        }
```

<a name="ItRvw"></a>
#### 手写柯里化函数
```javascript
		function adds(a, b, c) {
			return a + b + c
		}
		function currying(fn, length){
			length = length || fn.length;  // 第一次调用获取函数 fn 参数的长度，后续调用获取 fn 剩余参数的长度
			return function(){
				var args = [].slice.call(arguments)  // currying返回函数接受的参数
				if (args.length < length) {   // 判断参数的长度是否小于 fn 剩余参数需要接收的长度
					return curry(fn.bind(this, ...args), length - args.length)  // 递归 currying 函数，新的 fn 为 bind 返回的新函数（bind 绑定了 ...args 参数，未执行），新的 length 为 fn 剩余参数的长度
				}else {
					return fn.call(this, ...args)   // 执行 fn 函数，传入新函数的参数
				}
			}
		}

		var addCurry = currying(adds);
// 极简版
		const currying = fn =>
			judge = (...args) =>
				args.length >= fn.length
					? fn(...args)
					: (...arg) => judge(...args, ...arg)

		var addCurry = currying(adds);
		addCurry(2)(3)(4)  // 9
		addCurry(2, 3)(4)  // 9
		addCurry(2, 3, 4)  // 9
		addCurry(2)(3, 4)  // 9
// 其他版本
		function add() {
			let data = [].concat(Array.prototype.slice.call(arguments))
			function tmp() { // 使用闭包
			  data = data.concat(Array.prototype.slice.call(arguments))
				return tmp;
			}
			tmp.valueOf = function () {
				return data.reduce(((source, item) => source + item), 0);
			}
			tmp.toString = function () {
				return data.reduce(((source, item) => source + item), 0);
			}
			return tmp
		}
		add(1) // 1
		add(1,4)(2);  // 7
		add(1)(2, 5)(3)// 11
		add(1,5,6)(2,5)(3)(4, 4) // 30
```

<a name="Cj2wi"></a>
#### 手写防抖函数
```javascript
function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this;
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(context, ...arguments);
    }, delay || 500);
  }
}
window.onresize = debounce(function() {
  console.log('window onresize end');
}, 500)
```

<a name="8LtlV"></a>
#### 手写节流函数
```javascript
function throttle(fn, interval) {
  var timer = null;
  var firstTime = true;
  var _self = fn;
  return function() {
    var that = this;
    var args = arguments;
    // 判断是否第一次执行
    if(firstTime) {
      _self.apply(that, args);
      return firstTime = false;
    }
    // 判断定时器是否执行完毕
    if(timer) {
      return false;
    }
    // 设置定时器
    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(that,args);
    }, interval || 500)
  }
}
window.onresize = throttle(function() {
  console.log('window onresize');
}, 500)
```
<a name="Qkmeh"></a>
#### 手写事件委托
```javascript
// 循环创建10个li标签，当点击li标签时，打印其对应的索引
<ul id="list"></ul>

function loadNode(len) {
  var html = '';
  for (let index = 0; index < 10; index++) {
    html += '<li>'+index+'</li>';
  }
  var list = document.getElementById('list');
  list.onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if(target.nodeName.toLowerCase() === 'li') {
      console.log(target.innerText);
    }
  }
  list.innerHTML = html;
}
loadNode();
```

<a name="dIeBk"></a>
#### 手写AOP
```javascript
// 把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计，安全控制，异常处理等。
// 把这些功能抽离出来后，再通过动态织入的方式掺入业务逻辑模块中
Function.prototype.before = function(beforeFn) {
  var _self = this;
  return function() {
    beforeFn.apply(this,arguments);
    return _self.apply(this,arguments);
  }
}
Function.prototype.after = function(afterFn) {
  var _self = this;
  return function() {
    var ret = _self.apply(this,arguments);
    afterFn.apply(this,arguments);
    return ret;
  }
}
var func = function() {
  console.log(2);
}
func = func.before(function(){
  console.log(1);
}).after(function(){
  console.log(3);
})
func();
```

<a name="K14oq"></a>
#### 手写 ES6 的 class 语法
```javascript
function object(){
    function F() {}
    F.prototype = proto;
    return new F();
}
function _inherits(Child, Parent){
    // Object.create
    Child.prototype = Object.create(Parent.prototype);
    // __proto__
    // Child.prototype.__proto__ = Parent.prototype;
    Child.prototype.constructor = Child;
    // ES6
    // Object.setPrototypeOf(Child, Parent);
    // __proto__
    Child.__proto__ = Parent;
}
function Parent(name){
    this.name = name;
}
Parent.sayHello = function(){
    console.log('hello');
}
Parent.prototype.sayName = function(){
    console.log('my name is ' + this.name);
    return this.name;
}

function Child(name, age){
    // 相当于super
    Parent.call(this, name);
    this.age = age;
}
_inherits(Child,  Parent);
Child.prototype.sayAge = function(){
    console.log('my age is ' + this.age);
    return this.age;
}
var parent = new Parent('Parent');
var child = new Child('Child', 18);
```

<a name="8IcLD"></a>
#### 手写模版引擎
```javascript
function easyTpl(tpl, data){
    var re = /{{([a-zA-Z$_][a-zA-Z$_0-9\.]*)}}/g;
    return tpl.replace(re, function(raw, key, offset, string){
      var paths = key.split('.'),
          lookup = data;
      while(paths.length>0){
        lookup = lookup[paths.shift()];
      }
      return lookup||raw;
    }); 
}
var data = {
    name: 'rashomon',
    dog: {
        color: 'yellow',
        age: 2
    }
};
var tpl = 'Hello, my name is  {{name}}. I have a {{dog.age}} year old  {{dog.color}} dog.';
console.log(easyTpl(tpl, data));
```
<a name="IcZds"></a>
#### 手写EventEmitter
```javascript
class EventEmitter {
    constructor() {
        this.subs = {}
    }

    on(event, cb) {
        (this.subs[event] || (this.subs[event] = [])).push(cb)
    }

    // 也可以使用 call 指定 context
    trigger(event, ...args) {
        this.subs[event] && this.subs[event].forEach(cb => {
            cb(...args)
        })
    }

    once(event, onceCb) {
        const cb = (...args) => {
            onceCb(...args)
            this.off(event, onceCb)
        }
        this.on(event,cb)
    }

    off(event, offCb) {
        if (this.subs[event]) {
            let index = this.subs[event].findIndex(cb => cb === offCb)
            this.subs[event].splice(index, 1)
            if (!this.subs[event].length) delete this.subs[event]
        }
    }
}

let dep = new EventEmitter()

let cb = function () {
    console.log('handleClick')
}

let cb2 = function () {
    console.log('handleMouseover')
}

console.group()
dep.on('click', cb)
dep.on('click',cb2)
dep.trigger('click')
console.groupEnd()

console.group()
dep.off('click', cb)
dep.trigger('click')
console.groupEnd()

console.group()
dep.once('mouseover', cb2)
dep.trigger('mouseover')
dep.trigger('mouseover')
console.groupEnd()
```

<a name="jgjph"></a>
#### 实现简单路由
```javascript
class Route{
  constructor(){
    // 路由存储对象
    this.routes = {}
    // 当前hash
    this.currentHash = ''
    // 绑定this，避免监听时this指向改变
    this.freshRoute = this.freshRoute.bind(this)
    // 监听
    window.addEventListener('load', this.freshRoute, false)
    window.addEventListener('hashchange', this.freshRoute, false)
  }
  // 存储
  storeRoute (path, cb) {
    this.routes[path] = cb || function () {}
  }
  // 更新
  freshRoute () {
    this.currentHash = location.hash.slice(1) || '/'
    this.routes[this.currentHash]()
  }   
}
```

<a name="LzYAG"></a>
#### 手写图片懒加载
```javascript
var myImage = (function(){
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  var img = new Image();
  img.onload = function() {
    imgNode.src = img.src;
  }
  return {
    setSrc: function(src) {
      imgNode.src = './img/loading.gif';
      img.src = src;
    }
  }
})()
myImage.setSrc('https://img1.sycdn.imooc.com/5c09123400014ba418720632.jpg');
// 代理模式实现
var myImage = (function(){
  var image = document.createElement('img');
  document.body.appendChild(image);
  return {
    setSrc: function(src) {
      image.src = src;
    }
  }
})();

var proxyImage = (function(){
  var img = new Image();
  img.onload = function() {
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('file:///C:/Users/admin/Desktop/mask/img/7.jpg');
      img.src = src;
    }
  }
})()
proxyImage.setSrc('https://img1.sycdn.imooc.com/5c09123400014ba418720632.jpg');
```

<a name="yeKyi"></a>
#### 手写图片预加载
```javascript
<body>
    <h1 class="loading"></h1>
</body>
</html>
<script>
    let imglist = [{name: 'AKM', url: 'AKM.png'},{name: 'AUG', url: 'AUG.png'},{name: 'AWM', url: 'AWM.png'},{name: 'crossbow', url: 'crossbow.png'},{name: 'Crowbar', url: 'Crowbar.png'},{name: 'DP-28', url: 'DP-28.png'},{name: 'G36C', url: 'G36C.png'},{name: 'Groza', url: 'Groza.png'},{name: 'Kar98k', url: 'Kar98k.png'},{name: 'M16A4', url: 'M16A4.png'},{name: 'M24', url: 'M24.png'},{name: 'M249', url: 'M249.png'},{name: 'M416', url: 'M416.png'},{name: 'M762', url: 'M762.png'},{name: 'Machete', url: 'Machete.png'},{name: 'Micro-UZI', url: 'Micro-UZI.png'},{name: 'Mini14', url: 'Mini14.png'},{name: 'Mk14', url: 'Mk14.png'},{name: 'MK47', url: 'MK47.png'},{name: 'P18C', url: 'P18C.png'},{name: 'p1911', url: 'p1911.png'},{name: 'P92', url: 'P92.png'},{name: 'Pan', url: 'Pan.png'},{name: 'QBU', url: 'QBU.png'},{name: 'QBZ', url: 'QBZ.png'},{name: 'R1895', url: 'R1895.png'},{name: 'R45', url: 'R45.png'},{name: 'S12K', url: 'S12K.png'},{name: 'S1897', url: 'S1897.png'},{name: 'S686', url: 'S686.png'},{name: 'Sawed-off', url: 'Sawed-off.png'},{name: 'SCAR-L', url: 'SCAR-L.png'},{name: 'Scorpion', url: 'Scorpion.png'},{name: 'Sickle', url: 'Sickle.png'},{name: 'Signal', url: 'Signal.png'},{name: 'SKS', url: 'SKS.png'},{name: 'SLR', url: 'SLR.png'},{name: 'Thomson', url: 'Thomson.png'},{name: 'UMP9', url: 'UMP9.png'},{name: 'Vector', url: 'Vector.png'},{name: 'VSS', url: 'VSS.png'},{name: 'win94', url: 'win94.png'}];
    let length = imglist.length;
    let images = new Array(); // 定义一个数组容器，用来存储预加载完成的图片
    let loadEl = document.querySelector('.loading');
    function preload () {
        let count = 0; // 计算器，计算加载了多少图片
        for (let i = 0; i < length; i++) {
            images[i] = new Image();
            images[i].src = `./imgs/${imglist[i].url}`; 
            // 谷歌浏览器高版本支持大部分ES6，所以这里就不用字符串拼接了。
            images[i].onload = function () {
                count++;
                if (count === length) {
                    loadEl.innerHTML = '加载完成';
                } else {
                    loadEl.innerHTML = '正在加载中';
                }
            }
        }
    }
    preload();
</script>
```

<a name="hfmpH"></a>
#### 手写分时函数
```javascript
// 把1秒创建1000个DOM节点，改成每隔200毫秒创建10个节点，这样不同短时间在页面中创建大量的DOM。
var timeChunk = function(arr,fn,count,interval) {
  var timer = null;
  var data = null;
  var start = function() {
    for(var i = 0 ; i < Math.min(count || 1 , arr.length) ; i++) {
      data = arr.shift();
      fn(data);
    }
  }
  return function() {
    timer = setInterval(function(){
      if(arr.length == 0) {
        clearInterval(timer);
        timer = null;
        return;
      }
      start();
    }, interval || 200)
  }
}

var arr = [];
for(var i = 0 ; i < 1000 ; i++) {
  arr.push(i);
}

var renderDOMList = timeChunk(arr, function(data) {
  var div = document.createElement('div');
  div.innerHTML = data;
  document.body.appendChild(div);
},10,200);
renderDOMList();
```

<a name="eC30O"></a>
#### 手写拖拽
```javascript
window.onload = function () {
  // drag处于绝对定位状态
  let drag = document.getElementById('box')
  drag.onmousedown = function(e) {
    var e = e || window.event
    // 鼠标与拖拽元素边界的距离 = 鼠标与可视区边界的距离 - 拖拽元素与边界的距离
    let diffX = e.clientX - drag.offsetLeft
    let diffY = e.clientY - drag.offsetTop
    drag.onmousemove = function (e) {
      // 拖拽元素移动的距离 = 鼠标与可视区边界的距离 - 鼠标与拖拽元素边界的距离
      let left = e.clientX - diffX
      let top = e.clientY - diffY
      // 避免拖拽出可视区
      if (left < 0) {
        left = 0
      } else if (left > window.innerWidth - drag.offsetWidth) {
        left = window.innerWidth - drag.offsetWidth
      }
      if (top < 0) {
        top = 0
      } else if (top > window.innerHeight - drag.offsetHeight) {
        top = window.innerHeight - drag.offsetHeight
      }
      drag.style.left = left + 'px'
      drag.style.top = top + 'px'
    }
    drag.onmouseup = function (e) {
      this.onmousemove = null
      this.onmouseup = null
    }
  }
}
```

<a name="J191K"></a>
#### 手写localstorge
```javascript
const localStorage = (function () {
  let store = {}
  return {
    getItem: function (key) {
      return store[key] || null
    },
    setItem: function (key, val, time) {
      time = Number(time) || 0;
      store[key] = val.toString();
      if (time > 0) {
        this.timeOut(key, time);
      }
    },
    timeOut: function (key, time) {
      var timer = setTimeout(() => {
        this.removeItem(key);
        clearTimeout(timer)
      }, time);
    },
    removeItem: function (key) {
      delete store[key]
    },
    clear: function () {
      store = {}
    }
  }
})()
Object.defineProperty(window, 'localStorage2', {
  value: localStorage
})
```

<a name="zIxAi"></a>
#### 手写setInterval方法
```javascript
function mySetInterval(callback, interval) {
  var timer = null;
  var now = Date.now;
  var startTime = now();
  var endTime = startTime;
  var loop = function() {
    timer = requestAnimationFrame(loop); // 使用requestAnimationFrame
    endTime = now();
    if(endTime - startTime >=interval) {
      startTime = endTime = now();
      callback && callback(timer);
    }
  }

  timer = requestAnimationFrame(loop);
  return timer;
}

var count = 0;
mySetInterval(function(timer){
  console.log('超级定时器已部署');
  count++;
  if(count>=3) {
    cancelAnimationFrame(timer);
  }
}, 500)
```

<a name="5YUh9"></a>
#### 手写sleep函数
```javascript
//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve,time))
}
sleep(1000).then(()=>{
  console.log('sleep')
})

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve,reject){
    setTimeout(resolve,time);
  })
}
sleepGenerator(1000).next().value.then(()=>{  console.log('sleep')})

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}
async function output() {
  let out = await sleep(1000);
   console.log('sleep')
  return out;
}
output();

//ES5
function sleep(callback,time) {
  if(typeof callback === 'function')
    setTimeout(callback,time)
}

function output(){
  console.log('sleep');
}
sleep(output,1000);
```

<a name="UmN76"></a>
#### 手写GetQueryString
```javascript
var url = 'https://www.baidu.com/s?id=123&name=why&phone=13876769797';
function getQueryString(name) {
  var strs = '';
  var index = url.indexOf('?');
  if(index!=-1) {
    strs = url.substring(index+1).split('&');
  }
  for (let index = 0; index < strs.length; index++) {
    var splitItem = strs[index].split('=');
    if(splitItem[0]==name) {
      return splitItem[1];
    }
  }
};

console.log(getQueryString('name')); 
```

<a name="eQzn9"></a>
#### 手写flatten
```javascript
  function flatten1(arr) {
    return arr.join(',').split(',').map(function(item) {
      return Number(item);
    })
  }
  function flatten2(arr) {
    var newArr = [];
    arr.map(item => {
      if(Array.isArray(item)){
        newArr.push(...flatten2(item))
      } else {
        newArr.push(item)
      }
    })
    return newArr
  }

  function flatten3(arr) {
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
  function flatten4(arr) {
    while(arr.some(item=>Array.isArray(item))) {
      arr = [].concat(...arr);
    }
    return arr;
  }
flatten1([3,[4,8,[9,1],3],[6,8],[2,10],5,7])
flatten2([3,[4,8,[9,1],3],[6,8],[2,10],5,7])
flatten3([3,[4,8,[9,1],3],[6,8],[2,10],5,7])
flatten4([3,[4,8,[9,1],3],[6,8],[2,10],5,7])
```

