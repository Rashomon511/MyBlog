---
title: 利用webpack搭建脚手架一套完整流程
---
### 前言

我们的目标是利用webpack搭建一个基于react + react-router +dva + es6 + less + antd用于中后台开发的脚手架，同学们可能会说社区里那么多优秀的脚手架为什么还要自己搭，而且网络上这类文章也非常的多，没有再重复写的必要，但是对我而言，分享也是再次学习的过程，只有自己动手实现一遍才会使印象更加深刻，总的来说基本秉持一个理念：在学习中分享，在分享中学习。
<!-- more -->
<a name="74h0M"></a>
### 初始化项目

```javascript
mkdir React-Whole-barrels  // 建立项目文件夹，名称随意
cd  React-Whole-barrels        
mkdir src                  // 新建src文件夹
npm init -y   //初始化项目
```

新建index.js和index.html文件：
```javascript
// index.js
console.log('hello world')
// index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>React-Whole-barrels</title>
</head>
<body>
	<div id='root'></div>
</body>
</html>
```

<a name="fjeVQ"></a>
### 安装webpack并配置
安装webpack
```javascript
npm add webpack webpack-cli  --save-dev
```

新建一个build文件夹存放wbepack配置文件
```javascript
mkdir build
touch webpack.dev.js
```

webpack.dev.js，并书写基本的[配置](https://github.com/LuoShengMen/React-Whole-barrels/commit/c39b7e9fb67326d0afdda408a600f0a88beca946)
```javascript
const path = require('path');

module.exports  = {
    mode: 'development',      // 模式，表示dev环境
    entry: './src/index.js',  // 入口文件
    module: {},               // 让 webpack 能够去处理那些非 JavaScript 文件
    plugins: [],              // 插件
    output: {
        filename: 'bundle.js',  // 打包后文件名称
        path: path.resolve(__dirname, '../dist') // 打包后文件夹存放路径
    }
}
```

package.json更改
```javascript
  "scripts": {
    "start": "webpack --config ./build/webpack.dev.js"
  },
```

<a name="mrNQO"></a>
### 配置babel
既然要使用react和es6,babel的配置是必不可少的
```javascript
npm install @babel/polyfill core-js@2  --save
// @babel/polyfill: 模拟一个es6+的环境,提供es6方法和函数的垫片
// core-js@2：@babel/preset-env实现按需引入polyfill时，声明core-js版本
npm install babel-loader @babel/core  @babel/preset-env @babel/preset-react  --save-dev
// babel-loader和@babel/core是核心模块
// @babel/preset-env是一个智能预设，允许您使用最新的JavaScript
// @babel/preset-react 转换JSX
```
> 扩展：如果是开发工具库，想要实现按需替换，可以使用下面下面两个工具来实现
> @babel/plugin-transform-runtime避免 polyfill 污染全局变量，减小打包体积，因此更适合作为开发工具库
> @babel/runtime-corejs2作为生产环境依赖，约等于@babel/runtime + babel-polyfill,使用了@babel/runtime-corejs2，就无需再使用@babel/runtime了


.babelrc文件
```javascript
{
    "presets": [ 
        [
          "@babel/preset-env", {  // 将es6的语法翻译成es5语法
            "targets": {
               "chrome": "67",
            },
            "useBuiltIns": "usage", // 做@babel/polyfill补充时，按需补充，用到什么才补充什么,
            "corejs": "2",
          }
        ],
		"@babel/preset-react",
	],
	"plugins": [
		"@babel/plugin-proposal-class-properties"
	  ]
}
```
> 1.解决：Support for the experimental syntax 'classProperties' isn't currently enabled 问题，
> npm i -D @babel/plugin-proposal-class-properties，并在plugins中配置。
> 2.useBuiltIns 和 transform-runtime 不能同时使用，如果使用transform-runtime就不要配useBuiltInsor，一般独立的类库项目才用transform-runtime，[出处](https://segmentfault.com/q/1010000018937075/)


更改webpack.dev.js
```javascript
...
    module: {                 
        rules: [{
            test: /\.js$/,   
            exclude: /node_modules/, // 排除node_modules中的代码
            use: [{
                loader: 'babel-loader'
            }],
        }]
    }, 
```

<a name="IAMc7"></a>
### 安装react
安装react、react-dom、react-router，并书写代码
```javascript
npm install react react-dom react-router react-router-dom --save
```
这部分代码较多，可以在github上查看[src的](https://github.com/LuoShengMen/React-Whole-barrels/commit/55a0a0efdf5f581886a303326259fa9b2ff88444)[代码](https://github.com/LuoShengMen/React-Whole-barrels/commit/55a0a0efdf5f581886a303326259fa9b2ff88444)

<a name="N7HZM"></a>
### webpack-dev-server
书写完成上述代码运行npm start后，打开index.html你会发现没有任何内容，此时我们需要配置一个简单的WEB服务器，指向index.html。
```javascript
// 安装webpack-dev-server
npm install webpack-dev-server --save-dev

// 配置webpack.dev.js
...
    devServer: {
        contentBase: path.join(__dirname, '../dist')
    },
...

// 更改npm start 命令
    "start": "webpack-dev-server --config ./build/webpack.dev.js"
```
运行npm start命令，既可以看到我们的代码内容。dev更多配置请看[这里]()

<a name="ESmGG"></a>
### 使用html-webpack-plugin和clean-webpack-plugin插件
到目前为止，我们会发现都需要手动都将index.html放到dist文件夹中，并手动引入bundle.js.这个问题可以通过html-webpack-plugin解决。<br />引入html-webpack-plugin后，在plugins生成一个实例,HtmlWebpackPlugin可以接受一个参数作为模版文件，打包结束后自动生成一个以参数为模版的html文件。并把打包生成的js文件自动引入到html文件中。clean-webpack-plugin可以实现在每次打包之前都把上一次的打包文件清空，这样避免了冗余文件的存在，用法也是直接在plugins里面生成一个实例.
```javascript
// 安装html-webpack-plugin和clean-webpack-plugin
npm install html-webpack-plugin clean-webpack-plugin --save-dev
```

更改webpack.dev.js
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
...
    plugins: [                     // 插件
        new HtmlWebpackPlugin({   // 向dist文件中自动添加模版html
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(), // 打包后先清除dist文件，先于HtmlWebpackPlugin运行
    ],
```

<a name="6yLFq"></a>
### less配置
样式使用less预处理器，那么就需要使用less,less-loader,css-loader,style-loader等
```javascript
npm install less less-loader css-loader style-loader postcss-loader --save-dev
// less-loader 编译less
// css-loader // 编译css
// style-loader创建style标签，并将css添加进去
// postcss-loader提供自动添加厂商前缀的功能，但是需要配合autoprefixer插件来使用
npm install autoprefixer --save-dev
```

更改webpack.dev.js配置
```javascript
rules: [
  ...
      {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }, 'less-loader', 'postcss-loader']
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }
]
```

postcss.config.js
```javascript
module.exports = { // 自动添加css厂商前缀
    plugins: [
        require('autoprefixer')
    ]
}
```


<a name="yhSj6"></a>
### 图标和图片的处理
安装file-loader和url-loader 
```javascript
npm install file-loader url-loader --save-dev
```
filr-loader帮助我们做两件事情：<br />1.当遇到图片文件时会将其打包移动到dist目录下<br />2.接下来会获得图片模块的地址，并将地址返回到引入模块到变量之中

url-loader基本上可以实现file-loader的功能，但是有一区别就是经过url-laoder打包后的dist文件下是不存在image文件的，这是因为url-loader会把图片转换成base64的字符串直接放在bundle.js里面。<br />好处：直接将图片打包到js里，不用额外到请求图片，省了http请求<br />坏处：如果遇到打包到文件非常大，那么加载会加载很长时间，影响体验<br />因此我们可以这样配置webpack.dev.js
```javascript
rules: [
  ...
       {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]', // placeholder 占位符
                    outputPath: 'images/', // 打包文件名
                    limit: 204800, // 小于200kb则打包到js文件里，大于则使用file-loader的打包方式打包到imgages里
                },
            },
        },
        {
            test: /\.(eot|woff2?|ttf|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:5].min.[ext]', // 和上面同理
                    outputPath: 'fonts/',
                    limit: 5000,
                }
            },
        }
]
```


<a name="rpDnC"></a>
### 模块热替换HMR
模块热替换也称为HMR，代码更新时只会更新被修改部分都显示。有如下有点

- 针对于样式调试更加方便
- 只会更新被修改代码的那部分显示，提升开发效率
- 保留在完全重新加载页面时丢失的应用程序状态。

HMR配置有两种方式，一种cli方式，一种Node.js API方式,我们这里采用第二种方式，如果想了解两种HMR的实现以及HMR实现原理可以看[这里](https://github.com/LuoShengMen/StudyNotes/issues/492)。<br />我们通过在自定义开发服务下，使用插件webpack-dev-middleware和webpack-hot-middleware配合实现HMR
```javascript
// 安装webpack-dev-middleware webpack-Hot-middleware
npm install webpack-dev-middleware webpack-hot-middleware --save-dev
// 不要忘记安装express,我们是通过express来启动本地服务
npm install express --save-dev
```

新建dev-server.js
```javascript
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware")
const config = require('./webpack.dev.js');

const complier = webpack(config);   // 编译器，编译器执行一次就会重新打包一下代码
const app = express();  // 生成一个实例
const DIST_DIR = path.resolve(__dirname, '../', 'dist');  // 设置静态访问文件路径

let devMiddleware = webpackDevMiddleware(complier, {
    quiet: true,
    noInfo: true,
    stats: 'minimal'
})

let hotMiddleware = webpackHotMiddleware(complier,{
    log: false,
    heartbeat: 2000
 })

app.use(devMiddleware)

app.use(hotMiddleware)

// 设置访问静态文件的路径
app.use(express.static(DIST_DIR))


app.listen(8080, () => {
    console.log("成功启动：localhost:"+ 8080)
})  //监听端口
```

更改webpack.dev.js,添加如下内容：
```javascript
const webpack = require('webpack');
...    
entry: {                  
        //实现刷新浏览器webpack-hot-middleware/client?noInfo=true&reload=true 是必填的
        main: ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/index.js']
    },  
    ...
    plugins: [
        ...
        new webpack.NamedModulesPlugin(),  //用于启动HMR时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // 开启模块热更新，热加载和模块热更新不同，热加载是整个页面刷新
    ]
```
webpack-hot-middleware更多配置在[这里](https://github.com/LuoShengMen/StudyNotes/issues/492)

修改启动命令:
```javascript
"start": "node ./build/dev-server.js"
```

<a name="nz6Cr"></a>
### 安装antd和dva
```javascript
npm install antd babel-plugin-import --save
```
安装antd后即可使用and-design里面的ui组件。使用babel-plugin-import来实现按需加载的效果<br />.babelrc
```javascript
  "plugins": [
    ...
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css" // `style: true` 会加载 less 文件
    }]
  ]
```

```javascript
npm install dva --save
```

成功安装后改写index.js和并新建router.js
```javascript
// index.js
import dva from 'dva';
// 1. Initialize
const app = dva({});
// app.use();
// 2. Model
// app.model();
// 3. Router
app.router(require('./router').default);
// 4. Start
app.start('#root');
```
这里的代码量有点多就不一一列出，可以在github上面[查看](https://github.com/LuoShengMen/React-Whole-barrels/commit/4dd8a5866760a2727acc95854cc6ab80b48d845d)
> 在使用react-router的过程中你可能会出现这样的问题，点击刷新后报错 or Cannot GET，解决方案有两个。
> 1.用的 BrowserRouter 改为 HashRouter 即可。2.devServer 中必须设置 historyApiFallback: true
> 由于我们使用的自定义服务，那么我们可以使用connect-history-api-fallback来实现和historyApiFallback相同的功能。具体实现看[代码](https://github.com/LuoShengMen/React-Whole-barrels/commit/5b3c332136b852ac836dfe2da2c647bf96315911)


<a name="joZ39"></a>
### public path
CDN通过将资源部署到世界各地，使得用户可以就近访问资源，加快访问速度。如果我们把网页的静态资源上传到CDN服务上，在访问这些资源时，publicPath填写的就是CDN提供URL<br />我们当前用/，相对于当前路径，是因为我们的资源在同一文件夹下。》》<br />webpack.dev.js
```javascript
    output: {
        ...
        publicPath : '/'
    }
```

<a name="TDhG3"></a>
### 使用sourcemap
sourceMap本质上是一种映射关系，打包出来的js文件中的代码可以映射到代码文件的具体位置,这种映射关系会帮助我们直接找到在源代码中的错误。可以直接在devtool中使用.合理的使用source-map可以帮助我们提高开发效率，更快的定位到错误位置。<br />生产环境和开发环境的devtool配置是不同的。我们可以在webpack.dev.js中添加devtool。
```javascript
devtool:"cheap-module-eval-source-map",// 开发环境配置最佳实践
devtool:"cheap-module-source-map",   // 生产配置最佳实践
```

<a name="58EVK"></a>
### 生产环境构建
到目前为止我们配置的都是开发环境的webpack,开发环境(development)和生产环境(production)的构建目标差异很大,而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间.<br />新建webpack.prod.js
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",  // 只要在生产模式下， 代码就会自动压缩，自动启用 tree shaking
    devtool:"cheap-module-source-map",
    entry: {                  // 入口文件
        main: './src/index.js'
    },  
    module: {                 
        rules: ...省略 //代码和dev中相同
    },
    plugins: [                     
        new HtmlWebpackPlugin({   
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(), 
    ],
    output: {
        publicPath: "/",
        filename: 'bundle.js',  
        path: path.resolve(__dirname, '../dist') 
    }
}
```

添加打包脚本,
```javascript
    "build": "webpack --config ./build/webpack.prod.js"
```
执行npm run build后，你会发现dist文件夹下已经生成一系列文件。你会发现生产环境下的配置和开发环境下的配置有很多相同，接下来我们会对webpack配置进行优化。

<a name="va22P"></a>
### 提取公共配置
webpack.dev.js和webpack.prod.js中有很多相同对配置，我们可以将公共配置提取出来，再使用webpack-merge来将不同环境下的配置合并起来。
```javascript
npm install webpack-merge --save
```

webpack配置文件更改<br />webpack.dev.js
```javascript
...
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
    mode: 'development',     
    devtool:"cheap-module-eval-source-map",
    entry: {                  
        main: ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/index.js']
    },  
    devServer: {
        contentBase: path.join(__dirname, '../dist')
    },
    plugins: [                     
        new webpack.NamedModulesPlugin(),  
        new webpack.HotModuleReplacementPlugin(), 
    ],
    output: {}
}
module.exports = merge.smart(commonConfig, devConfig)
```

webpack.prod.js
```javascript
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode: "production",  // 只要在生产模式下， 代码就会自动压缩
    devtool:"cheap-module-source-map",
    entry: {
        main: './src/index.js'
    },  
    module: {},
    plugins: [],
    output: {}
}
module.exports = merge.smart(commonConfig, prodConfig)
```

webpack.common.js
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = {
    module: {                 
        ...太多了省略吧
    },
    plugins: [                     
        new HtmlWebpackPlugin({   
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(), 
    ],
    output: {
        publicPath: "/",
        filename: 'bundle.js',  
        path: path.resolve(__dirname, '../dist') 
    }
}

module.exports = commonConfig;
```
具体的可以看[这里](https://github.com/LuoShengMen/React-Whole-barrels/commit/b1412d2debdcbd6f61819f33b2969e39014c5bb2)。

<a name="nNcSn"></a>
### CSS文件代码分割
想要分开打包我们的css文件，需要使用mini-css-extract-plugin这个插件，但是这个插件目前还不支持HMR,为了不影响开发效率，因此就在生成环境下使用该插件。<br />optimize-css-assets-webpack-plugin 这个插件可以帮助我们把相同的样式合并。<br />css-split-webpack-plugin插件可以帮我们把过大的css文件拆分
```javascript
npm install mini-css-extract-plugin optimize-css-assets-webpack-plugin css-split-webpack-plugin --save-dev
```

修改webpack.prod.js,并同步修改webpack.common.js、webpack.dev.js 看[这里](https://github.com/LuoShengMen/React-Whole-barrels/commit/b10a522a93a9935afd8a1e8cb13938627b65b83f)
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default; 
...
    module: {
        rules: [{
            test: /\.less$/,
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }, 'less-loader', 'postcss-loader']
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        }]
    },
    optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		}),
      new CSSSplitWebpackPlugin({
            size: 4000,
            filename: '[name]-[part].[ext]'
      })
   ]
```


<a name="pLfwj"></a>
### 浏览器缓存(Cathing)
为了解决浏览器文件缓存问题，例如：代码更新后，文件名称未改变，浏览器非强制刷新后，浏览器去请求文件时认为文件名称未改变而直接从缓存中读取不去重新请求。我们可以在webpack.prod.js输出文件名称中添加hash值.<br />使用HashedModuleIdsPlugin的原因是可以当更改某一个文件时，只改变这一个文件的hash值，而不是所有的文件都改变。
```javascript
plugins: [
    ...
        new webpack.HashedModuleIdsPlugin(),  //根据模块的相对路径生成一个四位数的hash
        new webpack.optimize.CommonsChunkPlugin({ // 配合上面的插件使用
            name: 'runtime'
        })
],
output: {
        filename: '[name].[contenthash].js',  // entry对应的key值
        chunkFilename: '[name].[contenthash].js',  // 间接引用的文件会走这个配置
    },
```
运行npm run build命令后，会发现dist文件中js文件名中已经有了hash值
> 记得同步修改webpack.common.js、webpack.dev.js，如果你不知道如何修改，请看[这里](https://github.com/LuoShengMen/React-Whole-barrels/commit/e846c1380d142332e7859a0bb1120ad6a053fd17)


<a name="N1OHh"></a>
### 文件路径优化
extension配置之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配<br />mainFiles配置后不用加入文件名，会依次尝试添加的文件名进行匹配<br />alias通过配置别名可以加快webpack查找模块的速度。<br />webpack.common.js更改：
```javascript
    resolve: {       
        extensions: ['.js', '.jsx'], // 当通过import login from './login/index'形式引入文件时，会先去寻找.js为后缀当文件，再去寻找.jsx为后缀的文件
        mainFiles: ['index', 'view'], // 如果是直接引用一个文件夹，那么回去直接找index开头的文件，如果不存在再去找view开头的文件
        // alias: {   // 暂时没用到，就注释掉
        //    home: path.resolve(__dirname, '../src/home') // 配置别名可以加快webpack查找模块的速度
        //}
    }
```


<a name="EfeLz"></a>
### Tree Shaking
Tree Shaking可以剔除掉一个文件中未被引用掉部分，并且只支持ES Modules模块的引入方式，不支持CommonJS的引入方式。原因：ES Modules是静态引入的方式，CommonJS是动态的引入方式，Tree Shaking只支持静态引入方式。
```javascript
// webpack.dev.js    
  optimization: {   // 开发环境时使用
        usedExports: true
    },
        
// package.json
  "sideEffects": [
    "*.css"
  ],
// 如果在项目中使用类似 css-loader 并 import 一个 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除
```
> 注意：mode 选项设置为 [production](https://webpack.docschina.org/concepts/mode/#mode-production)，可以自动启用 minification(代码压缩) 和 tree shaking


<a name="DXAvG"></a>
### 代码分割(SplitChunksPlugin)
不管是同步代码的分割还是异步的代码分割都可以使用SplitChunksPlugin这个插件，可以将第三方库从业务代码中分割出来.<br />webpack.prod.js
```javascript
...    
optimization: {
        splitChunks: {
            chunks: "all",    // 只对异步引入代码起作用，设置all时并同时配置vendors才对两者起作用
            minSize: 30000,   // 引入的库大于30kb时才会做代码分割
            minChunks: 1,     // 一个模块至少被用了1次才会被分割
            maxAsyncRequests: 5,     // 同时异步加载的模块数最多是5个，如果超过5个则不做代码分割
            maxInitialRequests: 3,   // 入口文件进行加载时，引入的库最多分割出3个js文件
            automaticNameDelimiter: '~',  // 生成文件名的文件链接符
            name: true,   // 开启自定义名称效果
            cacheGroups: {  // 判断分割出的代码放到那里去
                vendors: {   // 配合chunks： ‘all’使用，表示如果引入的库是在node-modules中，那就会把这个库分割出来并起名为vendors.js
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    filename: 'vendors.js'
                },
                default: {  // 为非node-modules库中分割出的代码设置默认存放名称
                    priority: -20,
                    reuseExistingChunk: true, // 避免被重复打包分割
                    filename: 'common.js'
                }
            }
        }
    }
```

<a name="F03w9"></a>
### DellPlugin提升打包速度
对于第三方库，这些库在很长的一段时间内，基本不会更新，打包的时候分开打包来提升打包速度, DllPlugin动态链接库插件，其原理就是把网页依赖的基础模块抽离出来打包到dll文件中，当需要导入的模块存在于某个dll中时，这个模块不再被打包，而是去dll中获取。
```javascript
cnpm install add-asset-html-webpack-plugin fs  --save
// add-asset-html-webpack-plugin: 将打包生产的dll.js文件自动引入html
// fs文件读取
```

新建webpack.dll.js
```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		vendors: ['lodash'],
		react: ['react', 'react-dom'],
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]',
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		}),
	],
};
```

webpack.common.js更改
```javascript
const fs = require('fs');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
...
const plugins = [
    new HtmlWebpackPlugin({ 
        template: 'src/index.html',
    }),
    new CleanWebpackPlugin(), 
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach((file) => {
	if (/.*\.dll.js/.test(file)) {
		plugins.push(new AddAssetHtmlWebpackPlugin({    // 将dll.js文件自动引入html
			filepath: path.resolve(__dirname, '../dll', file),
		}));
	}
	if (/.*\.manifest.json/.test(file)) {
		plugins.push(new webpack.DllReferencePlugin({    // 当打包第三方库时，会去manifest.json文件中寻找映射关系，如果找到了那么就直接从全局变量(即打包文件)中拿过来用就行，不用再进行第三方库的分析，以此优化打包速度
			manifest: path.resolve(__dirname, '../dll', file),
		}));
	}
});
```

package.json
```javascript
    "dll": "webpack --config ./build/webpack.dll.js"
```

<a name="7QQhc"></a>
### PWA优化
PWA全称progressive Web Application,PWA实现的功能是即便服务器挂掉，还是可以通过在本地的缓存来访问到页面。首先安装workbox-webpack-plugin插件,然后在webpack.prod.js中Plugins中配置,因为该功能只在线上使用。
```javascript
npm install workbox-webpack-plugin --save
```
<a name="D5dEO"></a>
### 
webpack.prod.js更改
```javascript
const WorkboxPlugin = require('workbox-webpack-plugin');
...
plugins: [
  ...
  new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
   })
]
```
运行命令打包后会多处两个文件precache-manifest.js和service-worker.js, service-worker这个文件就可以让我们的页面被缓存住

<a name="wkjaD"></a>
### 指定环境
可以通过指定环境，来使webpack进行选择性编译，择性编译是指根据打包是环境的不同，选择性地让特定的语句有效，让特定的语句无效。这样可以对具体用户的环境进行代码优化，从而删除或添加一些重要代码。<br />最简单的例子，在开发环境中，我们打印日志，但在生产环境中，我们让所有打印日志的语句无效（让程序不运行打印的语句，甚至让打包出来的文件根本就不包含打印日志的语句）<br />我们可以使用 webpack 内置的 DefinePlugin 来实现。
```javascript
// webpack.dev.js
...
plugins: [
  ...
  new Webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('development'),
  }),
]

// webpack.prod.js
plugins: [
  ...
  new Webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('production'),
  }),
]
```

<a name="eR95r"></a>
### 总结
写到这里，这样一个基本的脚手架也就搭起来了，本文所有代码[React-Whole-barrels](https://github.com/LuoShengMen/React-Whole-barrels)都在这里了。大家可以跟着代码进行配置，每一步基本都有commit,如果不清楚可以看commit。当然本文也有许多不完善的地方，例如mock、eslint、styleLint、ts等等都没有添加上去，而且也还有许多优化点，由于篇幅关系我也就不一一写了，后续我会加上以及不断完善优化该项目，感兴趣的同学可以持续关注哦!<br />希望可以通过本文让您对webpack工具有一个更加深入和全面的认识，以便于应对以后项目中配置更改。如果要使用项目框架的话当热是推荐creat-react-app或者umi了。<br />本文如果有错误的地方，您发现了，欢迎告诉我！！谢谢！！如果觉得对您有帮助，欢迎给我一个star! ! 谢谢！！
