# webpack4学习笔记(一)

<a name="01f899ae"></a>
## 什么是webpack

webpack核心是一个模块打包工具,webpack安装时不建议全局安装：全局安装的webpack版本可能和某一个项目的webpack版本不匹配，导致项目运行失败。

> webpack-cli的作用是为了可以在命令行里使用webpack命令
> webpack基本配置：


```javascript
const path = require('path');
module.exports = {
    mode: 'production',  // production代码会被压缩为一行，development不会被压缩
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') // _dirname是值webpackconfig文件所在目录的路径， 生成一个名叫bundle文件的绝对路径
    }
}
```

<a name="d72e76c9"></a>
### entry与output

entry作为入口，即可以设置为字符串也可以设置为对象,下面两种写法实现的是一样的效果，在output没有设置输出文件名时，默认的输出文件js文件名为main.

```javascript
entry: './src/index.js',
```

```javascript
entry: {
        main: './src/index.js',
    }, // 入口文件
```

output文件作为输出，可以设置输出的文件名以及文件路径

```javascript
output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist') // _dirname是值webpackconfig文件所在目录的路径， 生成一个名叫bundle文件的绝对路径
    },
```

如果我们遇到需要打包多个入口文件的需求，我们可以这样设置entry和output,最终会在dist文件夹下生成main.js和sub.js两个文件。

```javascript
entry: {
        main: './src/index.js',
        sub: './src/index.js'
    }, // 入口文件
    output: {
        publicPath: 'http://cdn.com.cn',
        filename: '[name].js',  // entry对应的key值
        path: path.resolve(__dirname, 'dist') // _dirname是值webpackconfig文件所在目录的路径， 生成一个名叫bundle文件的绝对路径
    },
```

<a name="d733382f"></a>
### loader是什么

loader是一个打包方案，当webpack遇到一些文件不知如何打包时，可以求助loader，loader知道如何打包这些文件。

<a name="file-loader"></a>
#### file-loader

webpack图片打包可以使用file-loader,通过在module里面设置rule来实现。

```javascript
module: {
        rules: [{
            test: /\.png/,
            use: {
                loader: 'file-loader'
            }
        }]
    },
```

filr-loader帮助我们做了两件事情：<br />1.当遇到图片文件时会将其打包移动到dist目录下<br />2.接下来会获得图片模块的地址，并将地址返回到引入模块到变量之中。

如果需要打包后文件有所要求，例如输出名称，存放地址等，我们可以在options里面进行设置

```javascript
module: {
        rules: [{
            test: /\.(png|jpg|gif|svg|jpeg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    // placeholder 占位符
                    name: '[name]_[hash].[ext]',
                     // 图片存储文件
                    outputPath: 'images/'
                }
            }
        }]
    },
```

<a name="url-loader"></a>
#### url-loader

url-loader基本上可以实现上述file-loader的功能，但是有一区别就是经过url-laoder打包后的dist文件下是不存在image文件的，这是因为url-loader会把图片转换成base64的字符串直接放在bundle.js里面。<br />好处：<br />1.直接将图片打包到js里，不用额外到请求图片，省了http请求<br />坏处：<br />1.如果遇到打包到文件非常大，那么加载会加载很长时间，影响体验

url最佳使用方式：如果图片很小，只有1-2kb，可以直接打包到js文件里，如果图片很大，可以使用file-loader的打包方式，打包到images里面。

```javascript
options: {
                    // placeholder 占位符
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    // 小于200kb则打包到js文件里，大于则打包到imgages里
                    limit: 204800
                }
```

<a name="1f7885fb"></a>
### 样式打包

webpack通常不知道怎么打包css文件，我们想要实现样式打包，通常需要借助style-loader, css-loader

```javascript
rules: [
{
test: /\.scss$/,
use: ['style-loader', 'css-loader']
}]
```

style-loader和css-loader的作用：<br />1.css-loader帮助我们分析几个css文件的关系，并合成一个文件<br />2.style-laoder获得文件后，会把文件挂载到header中

<a name="sass-loader"></a>
#### sass-loader

我们通常需要打包sass、less等样式文件，我们需要使用sass-laoder.<br />安装：

```javascript
npm install sass-loader node-sass  --save-dev
```

```javascript
rules: [
{
test: /\.scss$/,
use: ['style-loader', 'css-loader', 'sass-loader']
}]
```

loader的执行顺序是从下至上，从右到左来执行。

<a name="postcss-loader"></a>
#### postcss-loader

我们写样式代码时，为了实现不同浏览器兼容，通常会手动添加厂商前缀，但是这样非常的影响开发效率。现在postcss-loader提供自动添加厂商前缀的功能，但是需要配合autoprefixer插件来使用。<br />postcss.config.js

```javascript
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

webbpack配置：

```javascript
{
            test: /\.scss$/,
            use: ['style-loader', ‘css-laoder’, 'sass-loader', 'postcss-loader']
        },
```

<a name="css-loader"></a>
#### css-loader

我们经常会遇到在一个样式文件引用另一个文件，但是webpack打包时，被引入的文件不会走'sass-loader', 'postcss-loader',而去走css-laoder,如果需要被引入的文件安装正常的顺序来走loader,可以通过css-loader的importLoaders来实现。

```javascript
rules: [
        {
            test: /\.scss$/,
            use: ['style-loader', 
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                }
            }, 'sass-loader', 'postcss-loader']
        },
]
```

<a name="css-module"></a>
### css-module

CSS-Module 是一个 css 模块化解决方案，可以通过webpack 在 css-loader 配置 css-module ，开启后默认局部作用域.即样式文件只作用于该模块，不会和其他样式文件耦合。用于解决以下问题：

- 全局污染
- 命名混乱
- 依赖管理不彻底
- 无法共享变量
- 代码压缩不彻底

我们可以设置modules: true来开启css-module.

```javascript
rules: [
        {
            test: /\.scss$/,
            use: ['style-loader', 
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                    // modules: true
                }
            }, 'sass-loader', 'postcss-loader']
        },
]
```

<a name="c2f004d9"></a>
#### 图标打包

通过新增rule来实现图片打包

```javascript
rules: [
        {
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader'
            }
        },]
```
