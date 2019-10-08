---
title: webpack实现HMR及其实现原理
---

### 前言
在这之前我总是容易把热重载和模块热替换混淆成一个概念，在自己动手实现之后才发现两者还是有一些差别的。
<!-- more -->
- 热加载可以通过开启webpack-dev-server来实现，每次修改代码都会刷新整个页面
- 模块热替换也称为HMR，代码更新时只会更新被修改部分都显示
HMR相比热加载的好处：
- 针对于样式调试更加方便
- 只会更新被修改代码的那部分显示，提升开发效率
- 保留在完全重新加载页面时丢失的应用程序状态。 

### 实现HMR
 HMR的有两种实现方式，一种是通过插件HotModuleReplacementPlugin和devserver配和实现，一种是通过在自定义开发服务下，使用插件webpack-dev-middleware和webpack-Hot-middleware配合实现HMR
#### 通过插件HotModuleReplacementPlugin()
1.配置
在webpack.config.js中配置devServer
```javascript
	devServer: {
		contentBase: './dist',  // 起一个在dist文件夹下的服务器
		open: true,  // 自动打开浏览器并访问服务器地址
		port: 8085,
                hot: true,      // 开启HMR功能
                 hotOnly: true   // 即使HMR不生效，也不自动刷新
	},
```
pluginsp配置中使用HotModuleReplacementPlugin插件
```javascript
    plugins: [
   ...// 其他插件
    new webpack.HotModuleReplacementPlugin()
    ],
```
2.判断
然后进行手动判断进行模块热更新，如果你不想做以下判断那么可以使用module.hot.accept()，整个项目做hmr只要有代码变化就进行更新。
```javascript
if(module.hot) {
    module.hot.accept('./number', () => {
      // 使用更新过的 library 模块执行某些操作...
    })
}
```
3.启动
最重要一点不要忘了修改启动命令
```javascript
    "start": "webpack-dev-server"
```
此时运行npm start,即可实现模块热更新

#### 通过 Node.js API
通过自己在本地搭建一个服务器，利用webpack-dev-middleware和webpack-Hot-middleware两个插件来配合实现HMR.
1.安装
```javascript
// 安装express, webpack-dev-middleware , webpack-Hot-middleware
cnpm install express webpack-dev-middleware webpack-Hot-middleware -D
```
2.配置dev.server.js
dev.server.js
```javascript
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-Hot-middleware")
const config = require('./webpack.dev.js');

const complier = webpack(config);   // 编译器，编译器执行一次就会重新打包一下代码
const app = express();  // 生成一个实例
const {devServer: {port, contentBase}} = config
const DIST_DIR = path.resolve(__dirname, '../', contentBase);  // 设置静态访问文件路径
// 等同于const DIST_DIR = path.resolve(__dirname, '../dist');


let devMiddleware = webpackDevMiddleware(complier, {  // 使用编译器
    publicPath: config.output.publicPath,
    quiet: true, //向控制台显示任何内容
    noInfo: true
})

let hotMiddleware = webpackHotMiddleware(complier,{
    log: false,
    heartbeat: 2000
 })

app.use(devMiddleware)

app.use(hotMiddleware)

// 设置访问静态文件的路径
app.use(express.static(DIST_DIR))


app.listen(port, () => {
    console.log("成功启动：localhost:"+ port)
})  //监听端口
```
webpack.dev.js配置
```javascript
module.exports = {
        entry: {             // 入口文件配置
        //实现刷新浏览器webpack-hot-middleware/client?noInfo=true&reload=true 是必填的
        main: ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/index.js']
    },
       devServer: {
        contentBase: 'dist',
        port: 8081
    },
       plugins: [  
        new webpack.NamedModulesPlugin(),  //用于启动HMR时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), 
        new OpenBrowserPlugin({ url: 'http://localhost:8081' }), // 自动打开浏览器
    ],
    ...// 其他配置
}
```
完整实现在[这里](https://github.com/LuoShengMen/React-Whole-barrels)

##### webpack-hot-middleware的配置项
配置项可以通过query 方式添加到webpack config中的路径来传递给客户端
配置项都有

- path - 中间件为事件流提供的路径
- name - 捆绑名称，专门用于多编译器模式
- timeout - 尝试重新连接后断开连接后等待的时间
- overlay - 设置为false禁用基于DOM的客户端覆盖。
- reload - 设置为true在Webpack卡住时自动重新加载页面。
- noInfo - 设置为true禁用信息控制台日志记录。
- quiet - 设置为true禁用所有控制台日志记录。
- dynamicPublicPath - 设置为true使用webpack publicPath作为前缀path。（我们可以__webpack_public_path__在入口点的运行时动态设置，参见output.- publicPath的注释）
- autoConnect - 设置为false用于防止从客户端自动打开连接到Webpack后端 - 如果需要使用该setOptionsAndConnect功能修改选项

通过传递第二个参数，可以将配置选项传递给中间件
```javascript
webpackHotMiddleware(webpack,{
    log: false,
    path: "/__what",
    heartbeat: 2000
})
```

- log - 用于记录行的函数，传递false到禁用。默认为console.log
- path - 中间件将服务事件流的路径必须与客户端设置相匹配
- heartbeat - 多长时间将心跳更新发送到客户端以保持连接的活动。应小于客户的timeout设置 - 通常设置为其一半值。
更多配置在这里[webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware)
> 注意：通过express启动服务器后，devServer中的配置就不起作用了。

3.启动命令
```javascript
    "start": "node ./build/dev-server.js",
```
启动命令npm start，即可实现HMR的功能

### HMR实现原理
1.HMR的更新流程
- 修改了一个或多个文件。
- 文件系统接收更改并通知Webpack。
- Webpack重新编译构建一个或多个模块，并通知HMR服务器进行了更新。
- HMR Server使用websockets通知HMR Runtime需要更新。（HMR运行时通过HTTP请求这些更新。）
- HMR运行时再替换更新中的模块。如果确定这些模块无法更新，则触发整个页面刷新

2.HMR 工作流程图解
此为更加详细的流程分析：
![image](https://user-images.githubusercontent.com/21194931/59565179-8f8c5e00-9082-11e9-983b-999b019ca12e.png)
上图是webpack 配合 webpack-dev-server 进行应用开发的模块热更新流程图。

- 上图底部红色框内是服务端，而上面的橙色框是浏览器端。
- 绿色的方框是 webpack 代码控制的区域。蓝色方框是 webpack-dev-server 代码控制的区域，洋红色的方框是文件系统，文件修改后的变化就发生在这，而青色的方框是应用本身
步骤分析：
- 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。
- 第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。
- 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。
- 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。
- webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。
- HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。
- 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。
- 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。

#### 参考链接
- [模块热替换](https://www.webpackjs.com/guides/hot-module-replacement/)
- [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)
