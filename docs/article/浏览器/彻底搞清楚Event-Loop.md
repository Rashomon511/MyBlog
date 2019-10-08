---
title: 彻底搞清楚Event Loop
---


## 前言
说到为什么写这篇文章，在学习Event Loop过程中都要在网上搜索大量的相关文章，而且不少文章都只是介绍浏览器和NodeJS单一方面的Event Loop，因此需要综合多篇文章着来学习。既然这样不如自己来写一篇就能彻底搞清楚Event Loop 的文章。这样不仅能懂得JavaScript的运行机制，也能掌握底层原理。一举两得之事何乐不为。
<!-- more -->
##  什么是Event Loop
Event Loop就是事件循环，是浏览器和NodeJS用来解决Javascript单线程运行带来的问题的一种运行机制。
针对于浏览器和NodeJS两种不同环境，Event Loop也有不同的实现：
- 浏览器的Event Loop是在html5的规范中明确定义
- NodeJS的Event Loop是基于libuv实现的
- libuv已经对Event Loop做出了实现，而HTML5规范中只是定义了浏览器中Event Loop的模型，具体的实现留给了浏览器厂商

因此浏览器和NodeJS的Event Loop是两种不同的概念。不过在搞清楚Event Loop之前我们先来搞清楚一些其他概念。

## 进程、程序、线程
- 进程(process)是系统分配的独立资源，是 CPU 资源分配的基本单位，进程是由一个或者多个线程组成的。
- 程序是指令和数据的有序集合，进程中的文本区域就是代码区就是程序。
- 线程(thread)是进程的执行流，是CPU调度和分派的基本单位。

进程是包含程序的，进程的执行离不开程序，程序本身没有任何运行的含义，是一个静态的概念。而进程则是在处理机上的一次执行过程，它是一个动态的概念。同一个程序包含多个进程。
进程和线程独立运行，并可能同时运行。在不同的处理器，甚至不同的计算机上，但多个线程能够共享单个相同进程的内存。不同的进程则不能。

> 很多人都会搞混异步和并行,但是他们的意义是截然不同的，异步是关于现在和将来的时间间隙，而并行是关于能够同时发生的事情

## 堆、栈、队列
![image](https://user-images.githubusercontent.com/21194931/56850129-c8387280-6930-11e9-80fc-6ab56ac4efd7.png)
### 堆（Heap）
堆是一种经过排序的树形数据结构，每个节点都有一个值，通常我们所说的堆的数据结构是指二叉树。堆分为两种情况，有最大堆和最小堆。将根节点最大的堆叫做最大堆或大根堆，根节点最小的堆叫做最小堆或小根堆。
![image](https://user-images.githubusercontent.com/21194931/56850268-c5d71800-6932-11e9-84b8-880ead26d947.png)
堆在程序运行时而不是在程序编译时申请的动态内存，一般是申请/给予的过程，堆用来存储对象的值，并会用一个地址来记录存储值的位置，该地址存储在命名对象的变量中（即存储在栈内存中）。因此复制这个变量只是复制了地址，而不是复制了对象。

### 栈（Stack）
栈是一种运算受限的线性表，只被运行在表尾进行插入和删除操作。我们把允许插入和删除的一端称为栈顶，另一端称为栈底，不含任何数据元素的栈称为空栈。
栈是一种具有后进先出的数据结构，又称为后进先出的线性表，简称 LIFO（Last In First Out）结构。可以想象为一个桶，后放进去的东西会先拿出来，而且只能在桶口操作。栈定义了两个方法：
- PUSH操作在堆栈的顶部加入一个元素。
- POP操作相反，在堆栈顶部移去一个元素，并将堆栈的大小减一
![image](https://user-images.githubusercontent.com/21194931/56850285-223a3780-6933-11e9-846c-9b407613fd30.png)
> 其实堆栈本身就是栈，只是换了个抽象的名字。栈的空间一般由程序员释放，会用来存储javascript基本类型的值以及引用对象的引用地址。

### 队列（Queue）
队列是一种特殊的线性表，只运行在表的前端进行删除操作，表的后端进行插入操作，进行插入操作的端称为队尾，进行删除操作的端称为队头。 队列中没有元素时，称为空队列。
队列是一种先进先出的数据结构，又称为先进先出的线性表，简称 FIFO（First In First Out）结构。也就是说先放的先取，后放的后取，就如同行李过安检的时候，先放进去的行李在另一端总是先出来，后放入的行李会在最后面出来。
![image](https://user-images.githubusercontent.com/21194931/56850289-30885380-6933-11e9-8027-e989cd17624c.png)

## Event Loop
我们可以先通过伪代码来简单理解下概念：
```javascript
// eventLoop是一个用作队列的数组 //(先进，先出)
var eventLoop = [ ];
var event;
//“永远”执行 
while (true) {
  // 一次tick
  if (eventLoop.length > 0) {
    // 拿到队列中的下一个事件 
    event = eventLoop.shift();
    // 现在，执行下一个事件 
    try {
      event();
    }
    catch (err) {
      reportError(err);
    }
  }
}
```
javascript是一种单线程语言，所有任务都在一个线程上完成(即采用排队形式：因为一个进程一次只能执行一个任务，只好等前面的任务执行完了，再执行后面的任务)。一旦遇到大量任务或者遇到一个耗时的任务，网页就会出现"假死"，因为JavaScript停不下来，也就无法响应用户的行为。但是javascript采用了Event Loop的异步模式（asynchronous I/O）或"非堵塞模式"（non-blocking mode）来解决这一问题。
### 宏队列、微队列
在JavaScript中，任务被分为两种，一种宏任务（MacroTask）也叫Task，一种叫微任务（MicroTask）。
1.宏队列，macrotask，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括
- setTimeout
- setInterval
- setImmediate (Node独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

2.微队列，microtask，也叫jobs。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：
- process.nextTick (Node独有)
- Promise
- Object.observe
- MutationObserver

## 浏览器的Event Loop
Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行
### JS 调用栈
JS 调用栈是一种后进先出的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。
### 同步任务、异步任务
JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。任务队列是先进先出的数据结构。
![image](https://user-images.githubusercontent.com/21194931/56851084-a7c2e500-693d-11e9-999b-aafba46659ad.png)
### 事件循环
调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环
![image](https://user-images.githubusercontent.com/21194931/56851095-d640c000-693d-11e9-95bf-1296c1bfe930.png)
### 定时器
定时器会开启一条定时器触发线程来触发计时，定时器会在等待了指定的时间后将事件放入到任务队列中等待读取到主线程执行。
例如setTimeout：定时器的精度可能不高。大体说来，只能确保你的回调函数不会在指定的 时间间隔之前运行，但可能会在那个时刻运行，也可能在那之后运行，要根据事件队列的 状态而定。定时0的话是4ms,
程序通常分成了很多小块，在事件循环队列中一个接一个地执行,严 格地说，和你的程序不直接相关的其他事件也可能会插入到队列中。

### JavaScript代码的具体流程
1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout）等；
遇到了 setTimeout ，就会等到过了指定的时间后将回调函数放入到宏任务的任务队列中，遇到 Promise，将 then 函数放入到微任务的任务队列中
2. 全局Script代码执行完毕后，调用栈Stack会清空；
3. 去检测微任务的任务队列中是否存在任务，存在就执行，从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；
4. 继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；
5. microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
6. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行，发现在这次循环中并不存在微任务。存在就进行第三个步骤。不存在就进行第7步骤。
7. 宏任务执行完后，Macrotask Queue为空。
8.全部执行完后，Stack Queue为空，Macrotask Queue为空，Micro Queue为空
9. 重复第3-8个步骤；

### 示例
按照上面的步骤运行一下示例，看你是否掌握：
```javascript
console.log('start');

setTimeout(function() {
  console.log(1);
}, 0);

Promise.resolve().then(function() {
  console.log(2);
}).then(function() {
  console.log(3);
});
setTimeout(() => {
  console.log(4);
  Promise.resolve().then(() => {
    console.log(5)
  });
});
new Promise((resolve, reject) => {
  console.log(6),
  resolve(7)
}).then((data) => {
  console.log(data);
})
console.log('end');
// start,7,end,2,7,3,1,4,5
```

## NodeJs得Event Loop
Node的Event loop一共分为6个阶段，每个阶段都有自己的任务队列，当本阶段的任务队列都执行完毕，或者达到了执行的最大任务数，就会进入到下一个阶段。
![image](https://user-images.githubusercontent.com/21194931/56851681-510cd980-6944-11e9-93af-f4947159b82b.png)
### timers 阶段
这个阶段会执行被 setTimeout 和 setInterval 设置的定时任务。
当然，这个定时并不是准确的，而是在超过了定时时间后，一旦得到执行机会，就立刻执行。
### pending callbacks 阶段
这个阶段会执行一些和底层系统有关的操作，例如TCP连接返回的错误等。这些错误发生时，会被Node 推迟到下一个循环中执行。
### 轮询阶段
这个阶段是用来执行和 IO 操作有关的回调的，Node会向操作系统询问是否有新的 IO 事件已经触发，然后会执行响应的事件回调。几乎所有除了 定时器事件、 setImmediate() 和 close callbacks 之外操作都会在这个阶段执行。
### check 阶段
这个阶段会执行 setImmediate() 设置的任务。
### close callbacks 阶段
如果一个 socket 或 handle(句柄) 突然被关闭了，例如通过 socket.destroy() 关闭了，close 事件将会在这个阶段发出。
### 宏队列、微队列
- 宏队列
在浏览器中，可以认为下面只有一个宏队列，所有的macrotask都会被加到这一个宏队列中，但是在NodeJS中，不同的macrotask会被放置在不同的宏队列中
1. Timers Queue
2. IO Callbacks Queue
3. Check Queue
4. Close Callbacks Queue

- 微队列
在浏览器中，也可以认为只有一个微队列，所有的microtask都会被加到这一个微队列中，但是在NodeJS中，不同的microtask会被放置在不同的微队列中
1. Next Tick Queue：是放置process.nextTick(callback)的回调任务的
2. Other Micro Queue：放置其他microtask，比如Promise等

### NodeJS的Event Loop过程
1. 执行全局Script的同步代码
2. 执行microtask微任务，先执行所有Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务
3. 开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第一个任务出来执行，每一个阶段的macrotask任务执行完毕后，开始执行微任务，也就是步骤2
4. Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> Timers Queue ......
5. 这就是Node的Event Loop

### 示例
按照上面的步骤运行一下示例，看你是否掌握：
```javascript
console.log('start');

setTimeout(() => {          
  console.log(1);
  setTimeout(() => {       
    console.log(2);
  }, 0);
  setImmediate(() => {      
    console.log(3);
  })
  process.nextTick(() => { 
    console.log(4);  
  })
}, 0);

setImmediate(() => {        
  console.log(5);
  process.nextTick(() => {  
    console.log(6);  
  })
})

setTimeout(() => {          
  console.log(7);
  process.nextTick(() => { 
    console.log(8);   
  })
}, 0);

process.nextTick(() => {    
  console.log(9);  
})

console.log('end');
// start，end，9，1，7，4，8，5，3，6，2
```

### setTimeout 对比 setImmediate
- setTimeout(fn, 0)在Timers阶段执行，并且是在poll阶段进行判断是否达到指定的timer时间才会执行
- setImmediate(fn)在Check阶段执行
两者的执行顺序要根据当前的执行环境才能确定：
- 如果两者都在主模块(main module)调用，那么执行先后取决于进程性能，顺序随机
- 如果两者都不在主模块调用，即在一个I/O Circle中调用，那么setImmediate的回调永远先执行，因为会先到Check阶段

### setImmediate 对比 process.nextTick
- setImmediate(fn)的回调任务会插入到宏队列Check Queue中
- process.nextTick(fn)的回调任务会插入到微队列Next Tick Queue中
- process.nextTick(fn)调用深度有限制，上限是1000，而setImmedaite则没有

### 参考链接
- 《你不知道javascript》
- [堆、栈、队列，进程与线程](http://www.pianshen.com/article/638899786/)
- [什么是 Event Loop？](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)
- [Node中的事件循环](https://segmentfault.com/a/1190000015700094)
- [JS浏览器事件循环机制](https://segmentfault.com/a/1190000015559210)
- [带你彻底弄懂Event Loop](https://segmentfault.com/a/1190000016278115?utm_source=tag-newest)