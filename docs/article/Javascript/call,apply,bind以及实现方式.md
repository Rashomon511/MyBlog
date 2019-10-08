# call,apply,bind以及实现方式

<a name="df368884"></a>
### 前言

apply()和 call()这两个方法的用途都是在特定的作 用域中调用函数，实际上等于设置函数体内 this 对象的值。bind()方法会创建一个函数的实例，其 this 值会被绑定到传给 bind()函数的值。总的来说是用来改变函数运行时this的指向。

<a name="call"></a>
### call

<a name="bc120b21"></a>
##### 用法

call方法将需要参数按顺序传递进去

```javascript
function sum(num1, num2){
    return num1 + num2;
}

function callSum(num1, num2){
    return sum.call(this, num1, num2);
}
alert(callSum(10,10));   //20
```

<a name="90ed305f"></a>
##### 实现原理

```javascript
Function.prototype.call2 = function (context) {
      context = context || window
      context.fn = this
      var args = [];
      for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
      }
      var result = eval('context.fn(' + args +')');
      delete context.fn
      return result;
    }
```

<a name="apply"></a>
### apply

<a name="bc120b21-1"></a>
##### 用法

apply()方法接收两个参数:一个 是在其中运行函数的作用域，另一个是参数数组，第二个参数可以是 Array 的实例，也可以是 arguments 对象。

```javascript
function sum(num1, num2){
    return num1 + num2;
}

function callSum1(num1, num2){
    return sum.apply(this, arguments);
}

function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]);
}

alert(callSum1(10,10));   //20
alert(callSum2(10,10));   //20
```

其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)<br />apply()和 call()的用法，接受参数的方式不一样，使用 call()(或 apply())来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系，如果你传的 context 就 null 或者 undefined，那么 window 对象就是默认的 context（严格模式下默认 context 是 undefined)。

<a name="90ed305f-1"></a>
##### 实现原理

```javascript
Function.prototype.apply = function (context, arr) {
      context = Object(context) || window;
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
        result = eval('context.fn(' + args + ')')
      }

      delete context.fn
      return result;
    }
```

<a name="bind"></a>
### bind

<a name="bc120b21-2"></a>
##### 用法

bind()用法：第一个参数是this的指向，从第二个参数开始是接收的参数列表

```javascript
window.color = "red";

var o = { color: "blue" };

function sayColor(){

    alert(this.color);

}

var objectSayColor = sayColor.bind(o);

objectSayColor();    //blue
```

<a name="90ed305f-2"></a>
##### 实现原理

```javascript
Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
                  // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
            return fToBind.apply(
                this instanceof fNOP && oThis ? this : oThis || window,
                aArgs.concat(Array.prototype.slice.call(arguments))
            );
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
```

<a name="25f9c7fa"></a>
### 总结

call、apply和bind函数存在的区别:

- bind()不会立即执行，而是返回一个改变了上下文 this 后的函数, 便于稍后调用；
- apply, call则是立即调用.
- call比apply的性能要好，平常可以多用call, call传入参数的格式正是内部所需要的格式

需要注意的一点的是：

- 在 ES6 的箭头函数下, call 和 apply 将失效, 对于箭头函数来说箭头函数体内的 this 对象, 就是定义时所在的对象。
- 箭头函数不可以当作构造函数，也就是说不可以使用 new 命令, 否则会抛出一个错误
- 箭头函数不可以使用 arguments 对象,，该对象在函数体内不存在
