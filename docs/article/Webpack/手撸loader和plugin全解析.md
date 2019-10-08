---
title: 手撸loader和plugin全解析
---

### 前言
我们在使用webpack配置项目时会使用过各种各样的loader和plugin,例如less-loader、file-loader、html-webpack-plugin、clean-webpack-plugin等等。但是我们是否想过这些loader或plugin是如何编写的呢？今天我们就来了解一下如何实现的loader和plugin.也方便我们以后编写自己的loader或者plugin
<!-- more -->
<a name="dEwb6"></a>
### **什么是loader**
loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

- 处理一个文件可以使用多个loader，loader的执行顺序是和本身的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行。
- 第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码

其实loader简单来说就是一个函数，通过一个函数参数接受到源代码，并在函数内部对源代码作出变更，并最终返回源代码

<a name="TUSIS"></a>
### 编写loader
我们就来实现一个可以接受txt文件并对其进行首字母大写的loader,因为这个没啥用，我们就单纯的用作了解laoder编写的过程。<br />第一步：新建项目并配置好webpack
```javascript
npm init
npm install -D webpack webpack-cli
```

webpack.config.js
```javascript
const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	}
}
```

src文件夹下index.js与index.txt
```javascript
// index.js
import './index.txt';
// index.txt
```

第二步：编写loader<br />新建一个loader文件夹存放自己编写的loader,这里我们新建一个uppercaseLoader.js文件。
```javascript
module.exports = function (source) { 
    // 这里的source代表的是源代码
}
```

我们是要将txt中字符串进行首字符大写的转换，接下来直接完善uppercaseLoader.js即可
```javascript
module.exports = function(source) {
	return result = source.charAt(0).toUpperCase() + source.slice(1)
}
```

第三步：使用loader<br />要使用我们自己编写的loader,不是像其他的loader一样直接在module里面配置就行了，还需要配合resolveLoader来使用。这样配置的意义是在module中只用写loader名称，webpack会先到node_modules里面找，找不到就去当前目录下的loaders中去找。
```javascript
const path = require('path');
module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	resolveLoader: {
		modules: ['node_modules', './loaders']
	},
	module: {
		rules: [{
			test: /\.txt$/, // 专门处理txt文件
			use: [
				{
					loader: 'uppercaseLoader',
				},
			]
		}]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	}
}
```
> package.json添加如下配置:  "script: {    "build": "webpack"}"

接下来运行npm run build,会生产一个dist文件，在dist文件下main.js中你会看到已经对txt文件下的字符串进行了首字母大写转换。

第四步：loader参数配置<br />loader通常还可以使用参数，可以使用loader-utils来读取loader的参数，例如我们现在只对首字母为a的字符串进行大写转换，我们可以这么做。
```javascript
npm install --save-dev loader-utils
```

改写webpack.config.js
```javascript
...		
rules: [{
			test: /\.txt$/,
			use: [
				{
					loader: 'uppercaseLoader',
					options: {
						initial: 'a'
					}
				},
			]
		}]
```

uppercaseLoader.js
```javascript
const loaderUtils = require('loader-utils');
module.exports = function(source) {
	const options = loaderUtils.getOptions(this); // 读取配置
	if (options.initial === source.charAt(0)) {
		return result = source.charAt(0).toUpperCase() + source.slice(1)
	}
	return source
}
```

有时候我们不止要return一个resource，如果想要返回err, 处理后源代码，source,或者其他内容，那么可以使用this.callback.
> this.callback(
>  err: Error | null,
>  content: string | Buffer,
>  sourceMap?: SourceMap,
>  meta?: any
> );

```javascript
module.exports = function (source) { 
   // ...
   this.callback(null, result);
}
```

如果想要在函数内部做异步处理那么可以使用this.async()
```javascript
module.exports = function (source) { 
	const options = loaderUtils.getOptions(this);
  const callback = this.async(); // 声明一下内部有异步操作
	setTimeout(() => {
	  let result = source
	  if (options.initial === source.charAt(0)) {
		   return result = source.charAt(0).toUpperCase() + source.slice(1)
	  }
		callback(null, result);
	}, 1000);
}

```
> 编写loader需要注意的是不要使用箭头函数，会导致this指向错误


<a name="SZPvn"></a>
### 什么是plugin
plugin是一个类，使用时plugins(插件包)中单独配置，每一项是一个 plugin 的实例，参数都通过构造函数传入。在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果,plugin让 webpack 具有更多的灵活性，提升开发效率.

<a name="B6ozM"></a>
### 编写plugin
我们来实现一个向打包文件中添加一个md说明文档功能的addMdWebpackPlugin<br />第一步：新建项目并配置好webpack<br />webpack.config.js
```javascript
const path = require('path');
module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	}
}
```

第二步：编写plugin<br />plugin因为是一个类，那么他的基本结构如下: 
```javascript
// addMdWebpackPlugin.js
class addMdWebpackPlugin {
	constructor(options){
		console.log(options) // options是插件传入的参数
	}
	apply(compiler) { // compiler是webpack的实例}
}
module.exports = addMdWebpackPlugin;
```
> compiler是在 Webpack 启动时候被实例化的，作为webpack的实例compiler包含了Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息。


结构写好之后接下来完善plugin,因为我们要在打包的文件中添加一个md文档，那么我们就要用到compiler的hooks,因为hooks代表着钩子函数，是webpack在执行过程中必经的过程，在hooks里面又定义了一些具体的时刻值。我们这里用到的是emit时刻，官网这样描述emmit:Executed right before emitting assets to output dir.意思是在打包输出dist之前执行。并且要注意的是emit是一个异步的时刻值。那么我们可以这样来写：
```javascript
class addMdWebpackPlugin {
	constructor(options){
		console.log(options) // options是插件传入的参数
	}
	apply(compiler) { // compiler是webpack的实例
    compiler.hooks.emit.tapAsync('addMdWebpackPlugin', (compilation, cb) => {
			compilation.assets['describe.md']= {  // compilation.assets是打包生成的文件，可以向其中添加内容
				source: function() {
					return 'hello word'
				},
				size: function() {
					return 21;
				}
			};
			cb();
		})
  }
}
module.exports = addMdWebpackPlugin;		
```
更多关于compiler的知识请看这里[https://webpack.js.org/api/compiler-hooks/](https://webpack.js.org/api/compiler-hooks/)

第三步：使用plugin<br />plugin写好之后，需要webpack中引入并使用插件
```javascript
const addMdWebpackPlugin = require('./addMdWebpackPlugin');
module.exports = {
  ...// 省略
	plugins: [
		new addMdWebpackPlugin()
	],
}
```
执行npm run build，即可在打包完成的dist目录中看到一个md文档。这个过程进行了如下步骤：

- wbepack启动后读取配置，运行new addMdWebpackPlugin()实例了一个addMdWebpackPlugin
- 接着调用addMdWebpackPlugin.apply(compiler) 给插件实例传入 compiler对象
- 再通过compiler的钩子函数hooks来拿到webpack执行的各个时刻，并在相应的时刻对进行某些操作

<a name="28gSp"></a>
### 总结
通过上述的两个例子，尽管两个例子没有什么大的用处，编写都也非常简单，但是我也学习到了应该如何编写loader和plugin，希望也可以打开大家编写loader和plugin的大门。webpack博大精深，如果想要写出更加有效和实用的loader或plugin，我们还是需要不断的学习。但这也让我们在以后遇到需要编写自己的loader或者plugin的情况下，不至于无从下手。 <br />还是那句话，学习中分享，分享中学习，欢迎关注无畏前端！!
