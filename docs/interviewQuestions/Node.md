## Node

<a name="QLJ0X"></a>
### node优点
总结起来node有以下几个特点:简单强大，轻量可扩展．简单体现在node使用的是javascript,json来进行编码，人人都会；强大体现在非阻塞IO,可以适应分块传输数据，较慢的网络环境，尤其擅长高并发访问；轻量体现在node本身既是代码，又是服务器，前后端使用统一语言;可扩展体现在可以轻松应对多实例，多服务器架构，同时有海量的第三方应用组件<br />*（优点）因为Node是基于事件驱动和无阻塞的，所以非常适合处理并发请求，<br />因此构建在Node上的代理服务器相比其他技术实现（如Ruby）的服务器表现要好得多。<br />此外，与Node代理服务器交互的客户端代码是由javascript语言编写的，<br />因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情。<br />*（缺点）Node是一个相对新的开源项目，所以不太稳定，它总是一直在变，<br />而且缺少足够多的第三方库支持。看起来，就像是Ruby/Rails当年的样子。

<a name="BHSex"></a>
### node全局变量
process, console, Buffer<br />process常用方法:

- process.stdin,
- process.stdout
- process.stderr,
- process.on,
- process.env
- process.argv
- process.arch
- process.platform
- process.exit

console常用方法:

- console.log/console.info
- console.error/console.warning,
- console.time/console.timeEnd
- console.trace
- console.table

Buffer是用来处理二进制数据的，比如图片，mp3,数据库文件等.Buffer支持各种编码解码，二进制字符串互转

<a name="Km7P2"></a>
### node定时功能
setTimeout/clearTimeout, setInterval/clearInterval, setImmediate/clearImmediate, process.nextTick

<a name="eW8pF"></a>
### node构架
主要分为三层，应用app >> V8及node内置架构 >> 操作系统. V8是node运行的环境，可以理解为node虚拟机．node内置架构又可分为三层: 核心模块(javascript实现) >> c++绑定 >> libuv + CAes + http<br />[![](https://cdn.nlark.com/yuque/0/2019/png/218767/1566982501522-554dca39-19af-44fd-9041-fde90735f877.png#align=left&display=inline&height=862&originHeight=862&originWidth=1385&size=0&status=done&width=1385)](https://user-images.githubusercontent.com/21194931/56270693-53dc2300-6129-11e9-931a-cf2b9cd0c8d4.png)<br />node核心模块：EventEmitter, Stream, FS, Net和全局对象

<a name="RkoWm"></a>
### node应用场景
特点：<br />1、它是一个Javascript运行环境<br />2、依赖于Chrome V8引擎进行代码解释<br />3、事件驱动<br />4、非阻塞I/O<br />5、单进程，单线程<br />优点：<br />高并发（最重要的优点）<br />缺点：<br />1、只支持单核CPU，不能充分利用CPU<br />2、可靠性低，一旦代码某个环节崩溃，整个系统都崩溃

<a name="dxiWY"></a>
### EventEmitter 
<br />EventEmitter是node中一个实现观察者模式的类，主要功能是监听和发射消息，用于处理多模块交互问题.

实现：主要分三步：定义一个子类，调用构造函数，继承EventEmitter

```javascript
var util = require('util');
	var EventEmitter = require('events').EventEmitter;

	function MyEmitter() {
		EventEmitter.call(this);
	} // 构造函数

	util.inherits(MyEmitter, EventEmitter); // 继承

	var em = new MyEmitter();
	em.on('hello', function(data) {
		console.log('收到事件hello的数据:', data);
	}); // 接收事件，并打印到控制台
	em.emit('hello', 'EventEmitter传递消息真方便!');
```

应用：

- 1.模块间传递消息
- 2.回调函数内外传递消息
- 3.处理流数据，因为流是在EventEmitter基础上实现的.
- 4.观察者模式发射触发机制相关应用

如何捕获错误事件：<br />监听error事件即可．如果有多个EventEmitter,也可以用domain来统一处理错误事件

```javascript
var domain = require('domain');
	var myDomain = domain.create();
	myDomain.on('error', function(err){
		console.log('domain接收到的错误事件:', err);
	}); // 接收事件并打印
	myDomain.run(function(){
		var emitter1 = new MyEmitter();
		emitter1.emit('error', '错误事件来自emitter1');
		emitter2 = new MyEmitter();
		emitter2.emit('error', '错误事件来自emitter2');
	});
```

EventEmitter中的newListenser事件用处：<br />newListener可以用来做事件机制的反射，特殊应用，事件管理等．当任何on事件添加到EventEmitter时，就会触发newListener事件，基于这种模式，我们可以做很多自定义处理.

```javascript
var emitter3 = new MyEmitter();
emitter3.on('newListener', function(name, listener) {
	console.log("新事件的名字:", name);
	console.log("新事件的代码:", listener);
	setTimeout(function(){ console.log("我是自定义延时处理机制"); }, 1000);
});
emitter3.on('hello', function(){
	console.log('hello　node');
});
```


<a name="3twC8"></a>
### Stream
<br />定义：<br />stream是基于事件EventEmitter的数据管理模式．由各种不同的抽象接口组成，主要包括可写，可读，可读写，可转换等几种类型

优点：<br />非阻塞式数据处理提升效率，片断处理节省内存，管道处理方便可扩展等

应用：<br />文件，网络，数据转换，音频视频等

如何捕获错误事件：<br />监听error事件，方法同EventEmitter.

常用的Stream：<br />Readable为可被读流，在作为输入数据源时使用；Writable为可被写流,在作为输出源时使用；Duplex为可读写流,它作为输出源接受被写入，同时又作为输入源被后面的流读出．Transform机制和Duplex一样，都是双向流，区别时Transfrom只需要实现一个函数_transfrom(chunk, encoding, callback);而Duplex需要分别实现_read(size)函数和_write(chunk, encoding, callback)函数.

实现Writable Stream：<br />三步走:1)构造函数call Writable 2)　继承Writable 3) 实现_write(chunk, encoding, callback)函数

```javascript
var Writable = require('stream').Writable;
var util = require('util');

function MyWritable(options) {
	Writable.call(this, options);
} // 构造函数
util.inherits(MyWritable, Writable); // 继承自Writable
MyWritable.prototype._write = function(chunk, encoding, callback) {
	console.log("被写入的数据是:", chunk.toString()); // 此处可对写入的数据进行处理
	callback();
};

process.stdin.pipe(new MyWritable()); // stdin作为输入源，MyWritable作为输出源
```


<a name="8Dfn3"></a>
### node文件系统
**内置的fs模块架构:**<br />fs模块主要由下面几部分组成: 1) POSIX文件Wrapper,对应于操作系统的原生文件操作 2) 文件流 fs.createReadStream和fs.createWriteStream 3) 同步文件读写,fs.readFileSync和fs.writeFileSync 4) 异步文件读写, fs.readFile和fs.writeFile<br />**读写一个文件方法:**<br />总体来说有四种: 1) POSIX式低层读写 2) 流式读写 3) 同步文件读写 4) 异步文件读写<br />**读取json配置文件:**<br />主要有两种方式，第一种是利用node内置的require('data.json')机制，直接得到js对象; 第二种是读入文件入内容，然后用JSON.parse(content)转换成js对象．二者的区别是require机制情况下，如果多个模块都加载了同一个json文件，那么其中一个改变了js对象，其它跟着改变，这是由node模块的缓存机制造成的，只有一个js模块对象; 第二种方式则可以随意改变加载后的js变量，而且各模块互不影响，因为他们都是独立的，是多个js对象.<br />fs.watch和fs.watchFile有什么区别，怎么应用?<br />二者主要用来监听文件变动．fs.watch利用操作系统原生机制来监听，可能不适用网络文件系统; fs.watchFile则是定期检查文件状态变更，适用于网络文件系统，但是相比fs.watch有些慢，因为不是实时机制

<a name="ztUlC"></a>
### node的网络模块架构 
<br />node的网络模块架构:<br />node全面支持各种网络服务器和客户端，包括tcp, http/https, tcp, udp, dns, tls/ssl等.

node是怎样支持https,tls的?<br />主要实现以下几个步骤即可: 1) openssl生成公钥私钥 2) 服务器或客户端使用https替代http 3) 服务器或客户端加载公钥私钥证书

实现一个简单的http服务器?<br />经典又很没毛意义的一个题目．思路是加载http模块，创建服务器，监听端口.

```javascript
var http = require('http'); // 加载http模块

	http.createServer(function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'}); // 200代表状态成功, 文档类型是给浏览器识别用的
		res.write('<meta charset="UTF-8"> <h1>我是标题啊！</h1> <font color="red">这么原生，初级的服务器，下辈子能用着吗?!</font>'); // 返回给客户端的html数据
		res.end(); // 结束输出流
	}).listen(3000); // 绑定3ooo, 查看效果请访问 http://localhost:3000
```


<a name="khetb"></a>
### child-process 
**为什么需要child-process?**<br />node是异步非阻塞的，这对高并发非常有效．可是我们还有其它一些常用需求，比如和操作系统shell命令交互，调用可执行文件，创建子进程进行阻塞式访问或高CPU计算等，child-process就是为满足这些需求而生的．child-process顾名思义，就是把node阻塞的工作交给子进程去做．

exec,execFile,spawn和fork都是做什么用的?<br />exec可以用操作系统原生的方式执行各种命令，如管道 cat ab.txt | grep hello; execFile是执行一个文件; spawn是流式和操作系统进行交互; fork是两个node程序(javascript)之间时行交互.

**实现一个简单的命令行交互程序?**<br />使用spawn
```javascript
var cp = require('child_process');

	var child = cp.spawn('echo', ['你好', "钩子"]); // 执行命令
	child.stdout.pipe(process.stdout); // child.stdout是输入流，process.stdout是输出流
	// 这句的意思是将子进程的输出作为当前程序的输入流，然后重定向到当前程序的标准输出，即控制台
```

**两个node程序之间怎样交互:**<br />用fork嘛，上面讲过了．原理是子程序用process.on, process.send，父程序里用child.on,child.send进行交互.
```javascript
1) fork-parent.js
	var cp = require('child_process');
	var child = cp.fork('./fork-child.js');
	child.on('message', function(msg){
		console.log('老爸从儿子接受到数据:', msg);
	});
	child.send('我是你爸爸，送关怀来了!');

	2) fork-child.js
	process.on('message', function(msg){
		console.log("儿子从老爸接收到的数据:", msg);
		process.send("我不要关怀，我要银民币！");
	});
```

**怎样让一个js文件变得像linux命令一样可执行?**

- 在myCommand.js文件头部加入 #!/usr/bin/env node
- chmod命令把js文件改为可执行即可
- 进入文件目录，命令行输入myComand就是相当于node myComand.js了

**child-process和process的stdin,stdout,stderror是一样的吗?**<br />概念都是一样的，输入，输出，错误，都是流．区别是在父程序眼里，子程序的stdout是输入流，stdin是输出流

<a name="8vNPV"></a>
### node异步，部署，性能调优，异常调试
<br />node中的异步和同步怎么理解<br />node是单线程的，异步是通过一次次的循环事件队列来实现的．同步则是说阻塞式的IO,这在高并发环境会是一个很大的性能问题，所以同步一般只在基础框架的启动时使用，用来加载配置文件，初始化程序什么的．<br />有哪些方法可以进行异步流程的控制?

  1. 多层嵌套回调
- 2)　为每一个回调写单独的函数，函数里边再回调
  1. 用第三方框架比方async, q, promise等

怎样绑定node程序到80端口?<br />多种方式 1) sudo 2) apache/nginx代理 3) 用操作系统的firewall iptables进行端口重定向<br />有哪些方法可以让node程序遇到错误后自动重启?

  1. runit
  1. forever
  1. nohup npm start &

怎样充分利用多个CPU?<br />一个CPU运行一个node实例<br />怎样调节node执行单元的内存大小?<br />用--max-old-space-size 和 --max-new-space-size 来设置 v8 使用内存的上限<br />程序总是崩溃，怎样找出问题在哪里?

  1. node --prof 查看哪些函数调用次数多
  1. memwatch和heapdump获得内存快照进行对比，查找内存溢出

有哪些常用方法可以防止程序崩溃?

  1. try-catch-finally
  1. EventEmitter/Stream error事件处理
  1. domain统一控制
  1. jshint静态检查 5) jasmine/mocha进行单元测试

怎样调试node程序?<br />node --debug app.js 和node-inspector<br />如何捕获NodeJS中的错误，有几种方法?

  1. 监听错误事件req.on('error', function(){}), 适用EventEmitter存在的情况;
  1. Promise.then.catch(error),适用Promise存在的情况
  1. try-catch,适用async-await和js运行时异常，比如undefined object


<br />

<a name="DywmI"></a>
### async
<br />async]常用方法:<br />async是一个js类库，它的目的是解决js中异常流程难以控制的问题．async不仅适用在node.js里，浏览器中也可以使用．<br />1.async.parallel并行执行完多个函数后，调用结束函数

```javascript
async.parallel([
	    function(){ ... },
	    function(){ ... }
	], callback);
```

2.async.series串行执行完多个函数后，调用结束函数

```javascript
async.series([
	    function(){ ... },
	    function(){ ... }
	]);
```

3.async.waterfall依次执行多个函数，后一个函数以前面函数的结果作为输入参数

```javascript
async.waterfall([
	    function(callback) {
	        callback(null, 'one', 'two');
	    },
	    function(arg1, arg2, callback) {
	      // arg1 now equals 'one' and arg2 now equals 'two'
	        callback(null, 'three');
	    },
	    function(arg1, callback) {
	        // arg1 now equals 'three'
	        callback(null, 'done');
	    }
	], function (err, result) {
	    // result now equals 'done'
	});
```

4.async.map异步执行多个数组，返回结果数组

```javascript
async.map(['file1','file2','file3'], fs.stat, function(err, results){
	    // results is now an array of stats for each file
	});
```

5.async.filter异步过滤多个数组，返回结果数组

```javascript
async.filter(['file1','file2','file3'], fs.exists, function(results){
	    // results now equals an array of the existing files
	});
```


<a name="BkAa9"></a>
### express
<br />express项目的目录<br />app.js, package.json, bin/www, public, routes, views.<br />express常用函数<br />express.Router路由组件,app.get路由定向，app.configure配置，app.set设定参数,app.use使用中间件<br />express中如何获取路由的参数<br />/users/:name使用req.params.name来获取; req.body.username则是获得表单传入参数username; express路由支持常用通配符 ?, +, *, and ()<br />express response常用方法<br />res.download()	弹出文件下载<br />res.end()	结束response<br />res.json()	返回json<br />res.jsonp()	返回jsonp<br />res.redirect()	重定向请求<br />res.render()	渲染模板<br />res.send()	返回多种形式数据<br />res.sendFile	返回文件<br />res.sendStatus()	返回状态


<a name="P5lnM"></a>
### mongodb与mongoose
<br />mongodb常用优化措施<br />类似传统数据库，索引和分区．<br />mongoose支持哪些特性:<br />mongoose是mongodb的文档映射模型．主要由Schema, Model和Instance三个方面组成．Schema就是定义数据类型，Model就是把Schema和js类绑定到一起，Instance就是一个对象实例．常见mongoose操作有,save, update, find. findOne, findById, static方法等．

<a name="z5uqB"></a>
### redis最简单的应用
redis支持的功能：<br />set/get, mset/hset/hmset/hmget/hgetall/hkeys, sadd/smembers, publish/subscribe, expire

简单应用：
```javascript
var redis = require("redis"),
	    client = redis.createClient();

	client.set("foo_rand000000000000", "some fantastic value");
	client.get("foo_rand000000000000", function (err, reply) {
	    console.log(reply.toString());
	});
	client.end();
```

<a name="8gWJZ"></a>
### apache,nginx区别
二者都是代理服务器，功能类似．apache应用简单，相当广泛．nginx在分布式，静态转发方面比较有优势．

<a name="6tWPU"></a>
### path.join 与 path.resolve 的区别
一.path.join(path1，path2，path3.......)<br />作用：将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径。若任意一个路径片段类型错误，会报<br />二.path.resolve([from...],to)<br />作用：把一个路径或路径片段的序列解析为一个绝对路径。相当于执行cd操作<br />以webpack中webpack.config.js配置路径为例<br />```javascript<br />const DIST_DIR = path.resolve(__dirname, '../dist');  // 设置静态访问文件路径<br />const DIST_DIRs = path.join(__dirname, '/dist');<br />console.log(__dirname) // ...../React-Whole-barrels/build 即当前文件夹的绝对路径<br />console.log(DIST_DIR) // ..../React-Whole-barrels/dist  这是相对于当前文件夹的另一个文件的路径<br />console.log(DIST_DIRs) //...../React-Whole-barrels/build/dist 这是将两个路径连接起来<br />```
