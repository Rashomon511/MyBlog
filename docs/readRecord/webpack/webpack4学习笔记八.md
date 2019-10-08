# webpack4学习笔记(八)

<a name="669014c7"></a>
### 编写一个loader

loader简单来说就是一个函数，通过一个函数参数接受到源代码，并在函数内部对代码作出变更<br />newLoader.js

```javascript
module.exports = function (source) { // source代表的是源代码
    return source.replace('world', ‘wang’) // 将代码中的world替换成wang
}
```

此时也需要在webpack.config.js中进行配置

```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.js/,
            use: [
                path.resolve(__dirname, './loaders/newLoaders.js') //  使用编写的loader
            ]
        }]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}
```

loader的使用还可以通过对象的形式使用例如

```javascript
use: [
                {
                    loader: path.resolve(__dirname, './loaders/newLoaders.js'),
                    options: {
                        name: 'Wang'
                    }
                }
            ]
```

loader有两种方式获取options中传递的参数

```javascript
// 通过this.query访问参数
module.exports = function (source) {
    return source.replace('world', this.query.name)
}
// 通过loader-utils处理参数
const loaderUtils = require('loader-utils');
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    return source.replace('world', options.name)
}
```

如果想要返回err, 处理后源代码，source,或者其他内容，那么可以使用this.callback

```javascript
const loaderUtils = require('loader-utils');
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    const result = source.replace('world', options.name)
    this.callback(null, result);
}
```

如果想要在函数内部做异步处理那么可以使用this.async()

```javascript
const loaderUtils = require('loader-utils');
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    const result = source.replace('world', options.name)
	const callback = this.async(); // 声明一下内部有异步操作

	setTimeout(() => {
		const result = source.replace('dell', options.name);
		callback(null, result);
	}, 1000);
}
```

如果我们有多个loader需要使用，我们可以通过resolveLoader来统一使用loaders文件中loader<br />如下配置

```javascript
....
	resolveLoader: {
		modules: ['node_modules', './loaders']
	},
	module: {
		rules: [{
			test: /\.js/,
			use: [
				{
					loader: 'replaceLoader',
				},
				{
					loader: 'newloaders',
					options: {
						name: 'Wang'
					}
				},
			]
		}]
	},
        ....
```

> 编写loader需要注意的是不要使用箭头函数，会导致this指向错误


<a name="44d71039"></a>
### 编写一个Plugin

plugin插件是一个类，如下是一个plugin的基本结构

```javascript
class CopyrightWebpackPlugin {
	constructor(options){
		console.log(options) // options是插件传入的参数
	}
	apply(compiler) { // compiler是webpack的实例}
}
module.exports = CopyrightWebpackPlugin;
```

结构写好之后，需要webpack中引入使用插件

```javascript
const path = require('path');
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	plugins: [
		new CopyRightWebpackPlugin()
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	}
}
```

接下啦完善apply, 利用打包过程中emit的时刻来进行处理，添加一个copyright.txt文件，

```javascript
apply(compiler) { // compiler是webpack的实例

		compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
			console.log('compiler');
		})

		compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
			compilation.assets['copyright.txt']= {  // compilation.assets是打包生成的文件，可以向其中添加内容
				source: function() {
					return 'copyright by dell lee'
				},
				size: function() {
					return 21;
				}
			};
			cb();
		})
	}
```
