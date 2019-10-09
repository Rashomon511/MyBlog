# webpack4学习笔记(六)

<a name="2e035275"></a>
### Libary打包

在对库打包时，为了使用者可以方便使用打包后对库，我们需要在库文件中webpack配置里做如下配置.

```javascript
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	externals: ['lodash'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'library.js',
		library: 'root',
		libraryTarget: 'umd'
	}
}
```

library的配置是为了支持使用者可以通过script标签来引用该库<br />libraryTarget的配置是为了支持使用者可以通过AMD或CommonJs来引用库。umd的意思不管是AMD或CommonJs等形式引入，都可以引用到库。<br />externals是为打包过程中如果遇到lodash，则忽略lodash而不打包进库文件中。externals既可以是一个数组也可以是一个对象。

<a name="PWA"></a>
### PWA

PWA全称progressive Web Application,pwa实现的功能是即便服务器挂掉，还是可以通过在本地的缓存来访问到页面。首先安装插件,然后在webpack.prod.js中Plugins中配置,因为该功能只在线上使用

> cnpm install workbox-webpack-plugin --save-dev


```javascript
plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
```

运行命令打包后会多处两个文件precache-manifest.js和service-worker.js, service-worker这个文件就可以让我们的页面被缓存住。

<a name="81e4e998"></a>
### TypeScript打包

安装ts-loader,配置webpack

```javascript
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.tsx',
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

当打包ts文件时，不要忘了在根目录下配置一个tsconfig.json的文件

```javascript
{
	"compilerOpitons": {
		"outDir": "./dist",  // 打包文件放在dist文件中
		"module": "es6", // 用es6语法的模块引入方式引用
		"target": "es5",  // 打包成es5语法
		"allowJs": true,  // 运行映入js文件
	}
}
```

<a name="f016a273"></a>
### webpackDevServer实现请求转发

当我们在业务开发中进行ajax请求时，我们不需要每次请求都把请求路径写死写成绝对路径，我们可以写成相对路径，然后通过devserver中都proxy来实现转发。

```javascript
devServer: {
		contentBase: './dist',
		open: true,
		port: 8089,
		hot: true,
		hotOnly: true,
		proxy: {
			'/react/api': {
				target: 'http://www.dell-lee.com',
                                  secure: false,  // 对https起作用
				pathRewrite: {
					'header.json': 'demo.json'
				}，
				bypass: function(req, res, proxyOptions) {  // 对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理
					if (req.headers.accept.indexOf("html") !== -1) {
					  console.log("Skipping proxy for browser request.");
					  return "/index.html";
					}
				  },
				changeOrigin: true, // 解决网站对origin的限制
			}
		}
	},
```

上面配置都意思就是，当请求遇到/react/api开头的路径时，webpack就会通过prosy将这个请求转发到'http://www.dell-lee.com'，pathRewrite配置的意思是虽然请求的是'/react/api/header.json'，但是实际上回去请求'/react/api/demo.json'.

> 注意一点的是，devserver的转发配置只在dev环境下生效，对线上的代码不起作用
> proxy不仅仅可以做转发的配置，还可以配置请求头headers和cookie的设置


<a name="ccbced4b"></a>
#### 单页面路由

在devserver中配置historyApiFallback: true的作用是任意的 404 响应都可能需要被替代为 index.html，<br />通过传入一个对象，比如使用 rewrites 这个选项，此行为可进一步地控制：

```javascript
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }
  ]
}
```
