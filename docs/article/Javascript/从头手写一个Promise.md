---
title: 从头手写一个Promise
---

## 前言
在javascript的世界中，所有代码都是单线程执行的。由于这个“缺陷”，导致JavaScript的所有网络操作，浏览器事件，都必须是异步执行。
最开始我们可以用回调函数来解决这个问题，
<!-- more -->
```javascript
function callBack(){
console.log('回调')
}
setTimeout(callBack, 1000)
// 回调
```
但是随着业务的不断深入，难免会像陷入回调地狱这样的问题。直到后来我们有了Promise来解决这个问题。

## 手写一个promise
promise的基本用法如下: 在实例化一个Promise时，传入一个函数作为参数，该函数接受两个参数，分别为resolve,reject.如解决则会打印数据，如被拒绝则会打印拒绝原因
```javascript
let p1 = new Promise(function (resolve, reject) {

})
p1.then(function (data) {
    console.log(data)
}, function (err) {
    console.log(err)
})
```
### 相关概念
1. 术语
- 解决（fulfill）：指一个 promise 成功时进行的一系列操作，如状态的改变、回调的执行。虽然规范中用 fulfill 来表示解决，但在后世的 promise 实现多以 resolve 来指代之。
- 拒绝（reject）：指一个 promise 失败时进行的一系列操作。
- 终值（eventual value）：所谓终值，指的是 promise 被解决时传递给解决回调的值，由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值，有时也直接简称为值（value）。
 - 拒因（reason）：也就是拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值

2. 执行流程
![image](https://user-images.githubusercontent.com/21194931/57177517-13a1d200-6e97-11e9-97d0-d6a8e1ec1219.png)
每个promise后面链一个对象该对象包含onfulfiled,onrejected,子promise三个属性，当父promise 状态改变完毕,执行完相应的onfulfiled/onfulfiled的时候呢，拿到子promise,在等待这个子promise状态改变，再执行相应的onfulfiled/onfulfiled。依次循环直到当前promise没有子promise

3.状态机制切换
如图所示，状态只能由pengding-->fulfilled，或者由pending-->rejected这样转变。
只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的
![image](https://user-images.githubusercontent.com/21194931/57177572-93c83780-6e97-11e9-9be3-1531a7743d91.png)

### 基本结构
```javascript
        function Promise(executor) {
            this.state = 'pending'; //状态
            this.value = undefined; //成功结果
            this.reason = undefined; //失败原因
            function resolve(value) { }
            function reject(reason) { }
            executor(resolve, reject) //立即执行
        }
```
接收一个executor函数，executor函数传入就执行（当我们示例化一个promise时，executor立即执行），执行完同步或异步操作后，调用它的两个参数resolve和reject。其中state保存了promise的状态，包含三个状态：等待态(pending)成功态(resolved)和失败态(rejected)。promise执行成功后的结果由value保存，失败后的原因由reason保存。

### 完善resolve与reject
- new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。
- new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。
- 若是executor函数报错 直接执行reject()
我们可以这样实现：
```javascript
        function Promise(executor) {
            this.state = 'pending'; //状态
            this.value = undefined; //成功结果
            this.reason = undefined; //失败原因
            resolve = (value) => {
                // state改变,resolve调用就会失败
                if (this.state === 'pending') {
                    // resolve调用后，state转化为成功态
                    this.state = 'fulfilled';
                    // 储存成功的值
                    this.value = value;
                }
            }
            reject = (reason) => {
                // state改变,reject调用就会失败
                if (this.state === 'pending') {
                    // reject调用后，state转化为失败态
                    this.state = 'rejected';
                    // 储存失败的原因
                    this.reason = reason;
                }
            }
            //如果executor执行报错，直接执行reject
            try {
                executor(resolve, reject)
            } catch (err) {
                reject(err)  // executor出错就直接调用
            }
        }
```

### 实现then方法
每一个Promise实例都有一个then方法，接收两个为函数的参数，它用来处理异步返回的结果，它是定义在原型上的方法。
```javascript
        Promise.prototype.then = function (onFulfilled, onRejected) {
        };
```
当promise的状态发生了变化，不论成功或失败都会调用then方法，因此then方法里面也会根据不同的状态来判断调用哪一个回调函数。
两个参数的注意事项：
- onFulfilled 和 onRejected 都是可选参数，也就是说可以传也可以不传。传入的回调函数如不是一个函数类型，可以直接忽略。
- 两个参数在 promise 执行结束前其不可被调用，其调用次数不可超过一次。
```javascript
        Promise.prototype.then = function (onFulfilled, onRejected) {
            if (this.state === 'resolved') {
                //判断参数类型，是函数执行之，如果 onFulfilled 不是函数，其必须被忽略
                if (typeof onFulfilled === 'function') { 
                    onFulfilled(this.value);  // 传入成功的值
                }
            }
           // 如果 onRejected 不是函数，其必须被忽略
            if (this.state === 'rejected') {
                if (typeof onRejected === 'function') { 
                    onRejected(this.reason); // 传入失败的原因
                }
            }
        };
```

### 支持异步实现
上述把promise的基本功能都实现了，但是还是会存在一个问题，就是promise不支持异步代码，当resolve或reject在setTimeout中实现时，调用then方法时，此时状态仍然是pengding，then方法即没有调用onFulfilled也没有调用onRejected，也就运行没有任何结果。

我们可以参照发布订阅模式，在执行then方法时状态还是状态还是pengding时，把回调函数存储在一个数组中，当状态发生改变时依次从数组中取出执行就好了，首先在类上新增两个Array类型的数组，用于存放回调函数。
```javascript
        function Promise(executor) {
            this.state = 'pending'; //状态
            this.value = undefined; //成功结果
            this.reason = undefined; //失败原因
            this.onFulfilledFunc = [];//保存成功回调
            this.onRejectedFunc = [];//保存失败回调
            function resolve(value) { 
              // ....
            }
            function reject(reason) { 
              // ....
            }
            executor(resolve, reject) //立即执行
        }
```
并修改then方法
```javascript
        Promise.prototype.then = function (onFulfilled, onRejected) {
            if (this.state === 'pending') {
                if (typeof onFulfilled === 'function') {
                    this.onFulfilledFunc.push(onFulfilled);//保存回调
                }
                if (typeof onRejected === 'function') {
                    this.onRejectedFunc.push(onRejected);//保存回调
                }
            }
            if (this.state === 'resolved') {
                //判断参数类型，是函数执行之，如果 onFulfilled 不是函数，其必须被忽略
                if (typeof onFulfilled === 'function') {
                    onFulfilled(this.value);  // 传入成功的值
                }
            }
            // 如果 onRejected 不是函数，其必须被忽略
            if (this.state === 'rejected') {
                if (typeof onRejected === 'function') {
                    onRejected(this.reason); // 传入失败的原因
                }
            }
        };
```
修改resolve和reject方法：
```javascript
        function Promise(executor) {
           //  其他代码
            function resolve(value) {
                // state改变,resolve调用就会失败
                if (this.state === 'pending') {
                    // resolve调用后，state转化为成功态
                    this.state = 'fulfilled';
                    // 储存成功的值
                    this.value = value;
                    this.onFulfilledFunc.forEach(fn => fn(value))
                }
            }
            function reject(reason) {
                // state改变,reject调用就会失败
                if (this.state === 'pending') {
                    // reject调用后，state转化为失败态
                    this.state = 'rejected';
                    // 储存失败的原因
                    this.reason = reason;
                    this.onRejectedFunc.forEach(fn => fn(reason))
                }
            }
           //  其他代码
        }
```
到这里Promise已经支持了异步操作了。

### 链式调用实现
光是实现了异步操作可不行，我们常常用到new Promise().then().then()这样的链式调用来解决回调地狱。
规范如何定义then方法：
- 每个then方法都返回一个新的Promise对象（原理的核心）
- 如果then方法中显示地返回了一个Promise对象就以此对象为准，返回它的结果
- 如果then方法中返回的是一个普通值（如Number、String等）就使用此值包装成一个新的Promise对象返回。
- 如果then方法中没有return语句，就视为返回一个用Undefined包装的Promise对象
- 若then方法中出现异常，则调用失败态方法（reject）跳转到下一个then的onRejected
- 如果then方法没有传入任何回调，则继续向下传递（值的传递特性）
总的来说就是不论何时then方法都要返回一个Promise，这样才能调用下一个then方法。我们可以实例化一个promise2返回，将这个promise2返回的值传递到下一个then中。
```javascript
Promise.prototype.then = function (onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
    // 其他代码
    }
    return promise2;
};
```
接下来就处理根据上一个then方法的返回值来生成新Promise对象.
```javascript
/**
 * 解析then返回值与新Promise对象
 * @param {Object} promise2 新的Promise对象 
 * @param {*} x 上一个then的返回值
 * @param {Function} resolve promise2的resolve
 * @param {Function} reject promise2的reject
 */
function resolvePromise(promise2, x, resolve, reject) {
    //...
}
```
当then的返回值与新生成的Promise对象为同一个（引用地址相同），状态永远为等待态（pending），再也无法成为resolved或是rejected，程序会死掉,则会抛出TypeError错误
```javascript
let promise2 = p.then(data => {
    return promise2;
});
// TypeError: Chaining cycle detected for promise #<Promise>
```
因此需要判断x。
1. x不能和新生成的promise对象为同一个
2. x 不能是null，可以是对象或者函数(包括promise), 否则是普通值,那么直接resolve(x)
3. 当x是对象或者函数（默认promise）则声明then，let then = x.then
4. 如果取then报错，则走reject()
5. 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调，成功和失败只能调用一个 所以设定一个called来防止多次调用
6. 如果成功的回调还是pormise，就递归继续解析
>小提示： 为什么取对象上的属性有报错的可能？Promise有很多实现（bluebird，Q等），Promises/A+只是一个规范，大家都按此规范来实现Promise才有可能通用，因此所有出错的可能都要考虑到，假设另一个人实现的Promise对象使用Object.defineProperty()恶意的在取值时抛错，我们可以防止代码出现Bug
resolvePromise实现
```javascript
        function resolvePromise(promise2, x, resolve, reject) {
            if (promise2 === x) {  // 1.x不能等于promise2
                reject(new TypeError('Promise发生了循环引用'));
            }
            let called;
            if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
                // 2. 可能是个对象或是函数
                try {
                    let then = x.then;// 3.取出then方法引用
                    if (typeof then === 'function') {  // 此时认为then是一个Promise对象
                        //then是function，那么执行Promise
                        then.call(x, (y) => {   // 5.使用x作为this来调用then方法，即then里面的this指向x
                            if (called) return;
                            called = true;
                            // 6.递归调用，传入y若是Promise对象，继续循环
                            resolvePromise(promise2, y, resolve, reject);
                        }, (r) => {
                            if (called) return;
                            called = true;
                            reject(r);
                        });
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    // 也属于失败
                    if (called) return;
                    called = true;
                    reject(e); // 4.取then报错，直接reject
                }

            } else {
                //否则是个普通值
                resolve(x);
            }
        }
```
此时链式调用支持已经实现，在相应的地方调用resolvePromise方法即可。

### 最后完善
规范还对onFulfilled和onRejected有规定
- onFulfilled返回一个普通的值，成功时直接等于 value => value
- onRejected返回一个普通的值，失败时如果直接等于 value => value，则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误reason => throw err
- onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
- 如果onFulfilled或onRejected报错，则直接返回reject()

完善then方法
```javascript
        Promise.prototype.then = function (onFulfilled, onRejected) {
            let promise2 = new Promise((resolve, reject) => {
                // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
                onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
                // onRejected如果不是函数，就忽略onRejected，直接扔出错误
                onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
                if (this.state === 'pending') {
                    this.onFulfilledFunc.push(() => {
                        // 异步
                        setTimeout(() => {
                            try {
                                let x = onFulfilled(this.value);
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (e) {
                                reject(e);
                            }
                        }, 0);
                    })
                    this.onRejectedFunc.push(() => {
                        // 异步
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.value);
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (e) {
                                reject(e);
                            }
                        }, 0);
                    })
                }
                if (this.state === 'fulfilled') {
                    // 异步
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                }
                if (this.state === 'rejected') {
                    // 异步
                    setTimeout(() => {
                        // 如果报错
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                }
            })
            return promise2;
        };
```
到这里手写一个Promise已经全部实现了
完整代码
```javascript
        function Promise(executor) {
            this.state = 'pending'; //状态
            this.value = undefined; //成功结果
            this.reason = undefined; //失败原因
            this.onFulfilledFunc = [];//保存成功回调
            this.onRejectedFunc = [];//保存失败回调
            resolve = (value) => {
                // state改变,resolve调用就会失败
                if (this.state === 'pending') {
                    // resolve调用后，state转化为成功态
                    this.state = 'fulfilled';
                    // 储存成功的值
                    this.value = value;
                    this.onFulfilledFunc.forEach(fn => fn(value))
                }
            }
            reject = (reason) => {
                // state改变,reject调用就会失败
                if (this.state === 'pending') {
                    // reject调用后，state转化为失败态
                    this.state = 'rejected';
                    // 储存失败的原因
                    this.reason = reason;
                    this.onRejectedFunc.forEach(fn => fn(reason))
                }
            }
            //如果executor执行报错，直接执行reject
            try {
                executor(resolve, reject)
            } catch (err) {
                reject(err)  // executor出错就直接调用
            }
        }
        Promise.prototype.then = function (onFulfilled, onRejected) {
            let promise2 = new Promise((resolve, reject) => {
                // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
                onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
                // onRejected如果不是函数，就忽略onRejected，直接扔出错误
                onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
                if (this.state === 'pending') {
                    this.onFulfilledFunc.push(() => {
                        // 异步
                        setTimeout(() => {
                            try {
                                let x = onFulfilled(this.value);
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (e) {
                                reject(e);
                            }
                        }, 0);
                    })
                    this.onRejectedFunc.push(() => {
                        // 异步
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.value);
                                resolvePromise(promise2, x, resolve, reject);
                            } catch (e) {
                                reject(e);
                            }
                        }, 0);
                    })
                }
                if (this.state === 'fulfilled') {
                    // 异步
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                }
                if (this.state === 'rejected') {
                    // 异步
                    setTimeout(() => {
                        // 如果报错
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                }
            })
            return promise2;
        };
        function resolvePromise(promise2, x, resolve, reject) {
            if (promise2 === x) {
                reject(new TypeError('Promise发生了循环引用'));
            }
            let called;
            if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
                //可能是个对象或是函数
                try {
                    let then = x.then;//取出then方法引用
                    if (typeof then === 'function') {  // 认为then是一个Promise对象
                        //then是function，那么执行Promise
                        then.call(x, (y) => {
                            // 成功和失败只能调用一个
                            if (called) return;
                            called = true;
                            //递归调用，传入y若是Promise对象，继续循环
                            resolvePromise(promise2, y, resolve, reject);
                        }, (r) => {
                            // 成功和失败只能调用一个
                            if (called) return;
                            called = true;
                            reject(r);
                        });
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    // 也属于失败
                    if (called) return;
                    called = true;
                    reject(e);
                }

            } else {
                //否则是个普通值
                resolve(x);
            }
        }
```
但是只用构造函数实现当然是不够的，我们再用class来实现一个Promise，基本原理同上
class实现
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
```

### 最终测试
开源社区提供了一个包用于测试我们的代码：promises-aplus-tests，安装这个包然后运行命令行 promises-aplus-tests [js文件名] 即可验证。别忘了再代码后面加上这一段代码
```javascript
// 目前是通过他测试 他会测试一个对象
// 语法糖
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = Promise;
```

> 参考链接
- [Promises/A+规范](https://promisesaplus.com/)
- [只会用？一起来手写一个合乎规范的Promise](https://www.jianshu.com/p/c633a22f9e8c)
- [史上最最最详细的手写Promise教程](https://juejin.im/post/5b2f02cd5188252b937548ab?spm=a2c4e.11153940.blogcont613412.15.22ac3fcdmN9ul0)
- [确认过眼神，你就是我的Promise~~](https://juejin.im/post/5af8ee2bf265da0b8f62a757#heading-8)
- [手写一个promise](https://www.cnblogs.com/xianyulaodi/p/6256399.html)

