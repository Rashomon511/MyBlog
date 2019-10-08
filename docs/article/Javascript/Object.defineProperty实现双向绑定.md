# 用Proxy/Object.defineProperty实现双向绑定

<a name="df368884"></a>
### 前言

上文我们讲了[Proxy 与 Object.defineProperty的对比](https://github.com/LuoShengMen/StudyNotes/issues/455)，Proxy 与 Object.defineProperty最典型的应用就是用于实现双向数据绑定。但实现双向数据绑定的方法不止于此。

- 发布者-订阅者模式（backbone.js）：一般通过sub, pub的方式实现数据和视图的绑定监听
- 脏值检查（angular.js） ：通过脏值检测的方式比对数据是否有变更，来决定是否更新视图
- 数据劫持（vue.js）：采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调

不过我们今天只讲一讲如何使用Proxy 与 Object.defineProperty来实现双向数据绑定。

<a name="4989f3b4"></a>
### 双向数据绑定

简单来说双向数据绑定就是数据和UI建立双向的通信通道，可以通过数据来更新UI显示，也可以通过UI的操做来更新数据。下图可以很好的说明一切<br />![](https://user-images.githubusercontent.com/21194931/58619925-73559680-82f8-11e9-9848-c6af48e3914e.png#align=left&display=inline&height=260&originHeight=260&originWidth=800&status=uploading&width=800)

<a name="3cd454e4"></a>
### 实现思路

实现一个简单的双向数据绑定并不难，我们来看一个简单的例子<br />html:

```javascript
<span id="box">
        <h1 id='text'></h1>
        <input type="text" id='input' oninput="inputChange(event)" />
        <button id="button" onclick="clickChange()">Click me</button>
    </span>
```

js:

```javascript
<script>
        const input = document.getElementById('input');
        const text = document.getElementById('text');
        const button = document.getElementById('button');
        const data = {
            value: ''
        }
        function defineProperty(obj, attr) {
            let val
            Object.defineProperty(obj, attr, {
                set(newValue) {
                    console.log('set')
                    if (val === newValue) {
                        return;
                    }
                    val = newValue;
                    input.value = newValue;
                    text.innerHTML = newValue;
                },
                get() {
                    console.log('get');
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
    </script>
```

但是想要实现Vue的双向数据绑定并没有这么简单，我们知道Vue的双向数据绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的，那么我们起码要做以下三个步骤：<br />1.实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。<br />2.实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。<br />3.实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。<br />流程图如下：<br />![](https://user-images.githubusercontent.com/21194931/58623762-48237500-8301-11e9-8a69-75b342eaa7ab.png#align=left&display=inline&height=390&originHeight=390&originWidth=730&status=uploading&width=730)

<a name="9f67b5b6"></a>
#### 实现Observer

使用 Object.defineProperty 定义一个Observer

```javascript
function defineProperty(obj, key, value) {
            Observer(value); // 递归遍历所有子属性
            Object.defineProperty(obj, key, {
                enumerable: true, // 可枚举
                configurable: false, // 不能再define
                set(newValue) {
                    if (value === newValue) {
                        return;
                    }
                    value = newValue;
                    console.log(`set ${key}: ${newValue}`);
                },
                get() {
                    console.log(`get ${key}: ${value}`);
                    return value
                }
            })
        }

        function Observer(data) {
            if (!data || typeof data !== 'object') {  // 非对象即终止遍历
                return;
            }
            Object.keys(data).forEach(function (key) {
                defineReactive(data, key, data[key]);   // 监听所有对象属性
            });
        }
```

<a name="5bf0296d"></a>
#### 实现Dep

创建一个用来存储订阅者Watcher的订阅器，订阅器Dep主要负责收集订阅者，然后再属性变化的时候执行对应订阅者的更新函数。

```javascript
function Dep() {
            this.list = [];
        }
        Dep.prototype = {
            addSub: function (watcher) {
                this.list.push(watcher);
            },
            notify: function () {
                this.list.forEach(function (watcher) {
                    watcher.update();
                });
            }
        };
```

<a name="0f280f31"></a>
#### 实现Watcher

既然实现了一个订阅器，那么就需要一个订阅者，订阅者Watcher在初始化的时候需要将自己添加进订阅器Dep中，<br />1、在自身实例化时往属性订阅器(dep)里面添加自己<br />2、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发回调，更新视图

```javascript
function Watcher(obj, key, cb) {
            this.cb = cb;
            this.obj = obj;
            this.key = key;
            // 此处为了触发属性的getter，从而在dep添加自己
            this.value = this.get();
        }
        Watcher.prototype = {
            update: function () {
                this.run();    // 属性值变化收到通知
            },
            run: function () {
                var value = this.get(); // 取到最新值
                var oldVal = this.value;
                if (value !== oldVal) {
                    this.value = value;
                    this.cb.call(this.obj, value, oldVal); // 执行Compile中绑定的回调，更新视图
                }
            },
            get: function () {
                Dep.target = this;    // 将当前订阅者指向自己
                var value = this.obj[this.key];    // 触发getter，添加自己到属性订阅器中
                Dep.target = null;    // 添加完毕，重置
                return value;
            }
        };
```

实现了订阅器和订阅者之后，需要将订阅器添加进入订阅者，将Observer改造以下植入订阅器。如果不好理解可以结合watcher一起看。

```javascript
function defineProperty(obj, key, value) {
            Observer(value); // 递归遍历所有子属性
            var dep = new Dep();  // 生成一个Dep实例
            Object.defineProperty(obj, key, {
                enumerable: true, // 可枚举
                configurable: false, // 不能再define
                set(newValue) {
                    if (value === newValue) {
                        return;
                    }
                    value = newValue;
                    console.log(`set ${key}: ${newValue}`);
                    dep.notify(); // 如果数据变化，通知所有订阅者
                },
                get() {
                    if (Dep.target) {
                        dep.addSub(Dep.target); // 在这里添加一个订阅者，这里的Dep.target是指订阅器本身
                    }
                    console.log(`get ${key}: ${value}`);
                    return value
                }
            })
        }
```

Observer改造完成后，已经具备了监听数据， 添加订阅器和数据变化通知订阅者的功能。接下来就是将watcher添加进入订阅者，模拟实现Compile，并进行数据初始化。

<a name="63c5c64a"></a>
#### 模拟实现Compile

我们这里不解析指令所以直接写出watcher,并添加进去订阅者

```javascript
function inputChange(event) {
            data.value = event.target.value
        }

        function clickChange() {
            data.value = '你好 世界'
        }
        function renderInput(newValue) {
            if (input) {
                input.value = newValue
            }
        }

        function renderText(newValue) {
            if (text) {
                text.innerHTML = newValue
            }
        }
        new Watcher(data, 'value', renderInput)
        new Watcher(data, 'value', renderText)
```

数据初始化

```javascript
let data = {
            value: ''
        }
        Observer(data)
```

这样一个简单的基于 Object.defineProperty 的双向数据绑定就完成了。

<a name="Proxy"></a>
### Proxy

由于Object.defineProperty在数组监控方面的不足，我们可以采用Proxy，只需要修改Observer即可实现上面例子的功能

```javascript
function Observer(target) {
            var dep = new Dep();  // 生成一个Dep实例
            let handler = {
                get: function (obj, name) {
                    console.log('get')
                    const prop = obj[name];
                    if (Dep.target) {
                        dep.addSub(Dep.target); // 在这里添加一个订阅者，这里的Dep.target是指订阅器本身
                    }
                    if (typeof prop === 'undefined') return;
                    if (!prop.isBindingProxy && typeof prop === 'object') {
                        obj[name] = new Proxy(prop, proxyHandler);
                    }
                    return obj[name]
                },
                set: function (obj, name, value) {
                    Reflect.set(target, name, value);
                    obj[name] = value
                    dep.notify(); // 如果数据变化，通知所有订阅者
                },
            };
            let p = new Proxy(target, handler);
        }
```

<a name="ea6f3b87"></a>
### 参考链接

- [基于Object.defineProperty实现双向数据绑定](https://segmentfault.com/a/1190000015427628)
- [剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)
- [vue的双向绑定原理及实现](https://www.cnblogs.com/canfoo/p/6891868.html)
