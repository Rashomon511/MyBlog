# webpack4学习笔记(七)

<a name="3b964ca8"></a>
### Eslint的配置

为了遵循代码规范，使用eslint是必不可少的，配置eslint有两种方式<br />第一：使用eslintrc.js配置文件

```javascript
// 安装
npm install eslint --save

// 生成文件
npx eslint --init

// 安装 'babel-eslint',并在eslintrc.js中配置
    "parser": 'babel-eslint',
```

第二：通过eslint-loader的配置

```javascript
// 安装
npm install eslint-loader --save-dev
// module中配置
              { 
			test: /\.js$/, 
			exclude: /node_modules/, 
			use: ['babel-loader', {
				loader: 'eslint-loader',
				options: {
					fix: true // 较为简单的错误可以自动帮助修复
				}
			}

// devserver中配置
		overlay: true, // eslint报错时会在屏幕提示
```

为了提升团队的代码规范，也可以通过git的钩子，在代码提交时就对代码作出eslint检查

<a name="b0a32474"></a>
### webpack优化性能

一：提升webpack打包速度

- 1.跟上技术的迭代更新
- 2.尽可能少的模块使用loader
- 3.plugin尽可能精简并保证可靠<br />
例如尽可能使用官方的插件，并在合适的环境下使用对象的插件
- 4.resolve参数合理配置<br />
当通过import child from './child/child'形式引入文件时，会先去寻找.js为后缀当文件，再去寻找.jsx为后缀的文件

```javascript
resolve: {
   extensions: ['.js', '.jsx']，
  mainFiles: ['index', 'child']，  // 如果是直接引用一个文件夹，那么回去直接找index开头的文件，如果不存在再去找child开头的文件
  alias: {
   roshomon: path.resolve(__dirname, '../src/child');  // 别名替换，引入roshomon其实是引入../src/child
}
}
```

- 5.使用DellPlugin提高打包速度<br />
对于第三方库，只打包分析一次，后面的每次打包都不会重复打包第三方库<br />
webpack.dll.js

```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		vendors: ['lodash'],
		react: ['react', 'react-dom'],
		jquery: ['jquery']
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({ // 使用该插件分析第三方库，并把库里面的映射关系放到[name].manifest.json里，并放在dll文件里
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		})
	]
}
```

webpack.common.js

```javascript
// 引用
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
// plugins配置
....
const plugins = [
	new HtmlWebpackPlugin({
		template: 'src/index.html'
	}), 
	new CleanWebpackPlugin(['dist'], {
		root: path.resolve(__dirname, '../')
	})
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
	if(/.*\.dll.js/.test(file)) {
		plugins.push(new AddAssetHtmlWebpackPlugin({  // 将dll.js文件自动引入html
			filepath: path.resolve(__dirname, '../dll', file)
		}))
	}
	if(/.*\.manifest.json/.test(file)) {
		plugins.push(new webpack.DllReferencePlugin({ // 当打包第三方库时，会去manifest.json文件中寻找映射关系，如果找到了那么就直接从全局变量(即打包文件)中拿过来用就行，不用再进行第三方库的分析，以此优化打包速度
			manifest: path.resolve(__dirname, '../dll', file)
		}))
	}
})
```

package.json

```javascript
"build:dll": "webpack --config ./build/webpack.dll.js"
```

- 6.控制包文件大小<br />
可以通过treeShaking或者拆分文件来优化打包速度
- 7.thread-loader, parallel-webpack,happywebpack多进程打包
- 8.合理使用sourceMap
- 9.结合stats分析打包结果<br />
通过命令生成一个关于打包情况的stats文件，并借助工具进行打包情况分析，通过分析打包的流程对相应内容进行优化
- 10.开发环境内存编译
- 11.开发环境无用插件剔除

<a name="ddcde9ac"></a>
### webpack多页面打包配置

在entry中配置多入口，并在plugins中配置多个HtmlWebpackPlugin

```javascript
// config配置
const configs = {
	entry: {
		index: './src/index.js',
		list: './src/list.js',
		detail: './src/detail.js',
	},
        ......其他配置
}
// 根据配置自动生成HtmlWebpackPlugin
	Object.keys(configs.entry).forEach(item => {
		plugins.push(
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				filename: `${item}.html`,
				chunks: ['runtime', 'vendors', item]  // 只引入需要的打包生成文件，不需要引入其他多余的文件
			})
		)
	});
configs.plugins = makePlugins(configs);
```
