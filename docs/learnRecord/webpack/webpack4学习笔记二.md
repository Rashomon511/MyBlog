# webpack4学习笔记(二)

<a name="plugins"></a>
### plugins

plugins可以使打包更便捷，plugin可以在webpack运行到某个时刻，帮我们干一些事情。例如：我们打包出的dist文件中是没有index.html文件的，我们如果要运行还需要手动的添加，这是相当不便捷的，但是plugins可以提供html-webpack-plugin来减少我们手动添加的麻烦.

<a name="html-webpack-plugin"></a>
#### html-webpack-plugin

引入html-webpack-plugin后，在plugins生成一个实例,HtmlWebpackPlugin可以接受一个参数作为模版文件，打包结束后自动生成一个以参数为模版的html文件。并把打包生成的js文件自动引入到html文件中。

```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
...
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    })],
```

<a name="clean-webpack-plugin"></a>
#### clean-webpack-plugin

clean-webpack-plugin可以实现在每次打包之前都把上一次的打包文件清空，这样避免了冗余文件的存在，用法也是直接在plugins里面生成一个示例

```javascript
const CleanWebpackPlugin = require('clean-webpack-plugin');
...
    // CleanWebpackPlugin会在打包之前先被运行
    // HtmlWebpackPlugin是在打包之后再运行的
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'  // 模版html
    }), new CleanWebpackPlugin()],
```

如果在CleanWebpackPlugin里面设置参数，打包时可能会出现这样的错误,那么我们应该不传入任何参数。才能保证webpack运行不报错。

> clean-webpack-plugin only accepts an options object


<a name="sourceMap"></a>
### sourceMap

sourceMap本质上是一种映射关系，打包出来的js文件中的代码可以映射到代码文件的具体位置。例如在打包后有代码错误，这种映射关系会帮助我们直接找到在源代码中的错误。可以直接在devtool中使用

```javascript
devtool: 'source-map',
```

我们可以从[官网](https://www.webpackjs.com/configuration/devtool/#devtool)来看，如果使用‘cheap-line-souece-map’后，打包的速度会有明显的提升，其他带cheap的同理。

- line,添加后不会单独打包出映射关系，而是被合并到打包出的js文件
- cheap,添加后同line一样的功能，只是性能更好，因为只精确到行，不精确到列，而且只关心业务代码
- module不仅关心业务代码到=映射，还会关心第三方模块的代码映射
- eval 是打包速度最快，性能最好的一种方式，通过eval这种形式来生成映射关系的，但是如果遇到复杂的代码，eval提示出的内容并不全面<br />
在开发环境下使用'cheap-module-eval-source-map',是最佳实践，但是在产品环境使用‘cheap-module-source-map’是最好的。

<a name="webpackDevServer"></a>
### webpackDevServer

如果我们想要在修改代码后，webpack可以自动的来打包代码，现在有三种方式可以实现

1. 在script命令中设置"watch": "webpack --watch"这样一个命令，意思是运行webpack，会帮助我们监听代码，代码一有变化就会重新打包
1. webpackDevServer可以自动的帮我们打开浏览器，自动打包,自动刷新浏览器，甚至实现服务器的一些功能

```javascript
devServer: {
        contentBase: './dist',  // 起一个在dist文件夹下的服务器
        open: true,    // 自动打开浏览器并访问服务器地址
        proxy: {   // 跨域代理
            '/api': 'http: //localhost:3000'  // 如果使用/api,会被转发（代理）到该地址
        }
    },
```

3.自己手动实现一个热更新插件

```javascript
// 安装express, webpack-dev-middleware 
cnpm install express webpack-dev-middleware -D
```

package.js

```javascript
"script": {
    "middleware": "node server.js"
}
```

server.js

```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const complier = webpack(config);  // 编译器，编译器执行一次就会重新打包一下代码

const app = express();  // 生成一个实例

app.use(webpackDevMiddleware(complier, {  // 使用编译器
    publicPath: config.output.publicPath
}))


app.listen(4000, () => {
    console.log('server is runing')
})  //监听端口
```

但是这种只是实现了部分功能，我们还需要手动刷新浏览器，还需要继续的完善才能实现webpackDevServer的全部功能，因此我们还是选择webpackDevServer来提升我们的开发效率。
