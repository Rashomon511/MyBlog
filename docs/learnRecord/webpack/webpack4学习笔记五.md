# webpack4学习笔记(五)

<a name="b2ed89cf"></a>
### Lazy Loading

在使用时才通过import去异步加载的模块，称为懒加载模块。<br />示例：

```javascript
async function getComponent() {
    const {default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash')
    var element = document.createElement('div');
    element.innerHTML = _.join(['Dell', 'Lee'], '-');
    return element;
}

document.addEventListener('click', () => {
    getComponent().then(element => {
        document.body.appendChild(element);
    });
})
```

<a name="Chunk"></a>
### Chunk

Chunk是指项目打包后在dist中生成的文件，每一个文件都是一个Chunk.

<a name="4395b241"></a>
### 打包分析

在webapack打包之后，我们可以借助打包分析工具对打包后对文件进行分析，来查看打包是否合理。我们可以在package.json中配置这样一段, 这样就会生成一个分析文件stats.json，然后将文件上传到[analyse](https://github.com/webpack/analyse)的文件分析器中，会帮组我们分析出一系列数据。

```
"dev-build": "webpack --profile --json > stats.json  --config ./build/webpack.dev.js",
```

官方也提供这样的工具bundle analysis

- webpack-chart: webpack 数据交互饼图。
- webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- webpack-bundle-analyzer: 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。

<a name="1218df47"></a>
### Prefetch和PreLoad

/_ webpackPrefetch: true _/ 这个意思是在主要的js加载完成后，带宽有空闲时会先把click预先加载好。

```javascript
document.addEventListener('click', () =>{
	import(/* webpackPrefetch: true */ './click.js').then(({default: func}) => {
		func();
	})
});
```

两者的区别

- PreLoad是和核心的业务代码一起加载，Prefetch是在核心的业务代码加载后再加载

<a name="dd8fcdc5"></a>
### CSS文件代码分割

想要分开打包我们的css文件则需要使用mini-css-extract-plugin这个插件，但是这个插件目前还不支持HMR,为了不影响开发效率，因此建议在生成环境下使用该插件。optimize-css-assets-webpack-plugin 这个插件可以帮助我们把相同的样式合并。

```javascript
// 安装
cnpm install mini-css-extract-plugin --save-dev
 cnpm install optimize-css-assets-webpack-plugin -D

// webpack.prod.js配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
....其他代码
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,   // 注意这里不再使用style-load而是使用插件提供的loader
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        // modules: true
                    }
                }, 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',  // 如果一个文件会被直接引用就会走filename
			chunkFilename: '[name].chunk.css'  // 间接被引用的文件会走chunkFilename
		})
	]


// webpack.comon.js， 记得在common里面配置
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all',  // 遇到公用当类库时，自动的Code Spliting
        },
    },
```

<a name="f29cba2f"></a>
### 浏览器缓存(Cathing)

为了解决浏览器文件缓存问题，例如：代码更新后，文件名称未改变，浏览器非强制刷新后，浏览器去请求文件时认为文件名称未改变而直接从缓存中读取不去重新请求。我们可以在webpack输出文件名称中添加hash值

```javascript
output: {
        filename: '[name].[contenthash].js',  // entry对应的key值
        chunkFilename: '[name].[contenthash].js',  // 间接引用的文件会走这个配置
    },
```

<a name="33fdb632"></a>
### shimming的作用

在webpack打包过程中，往往会做代码的兼容或者打包过程的兼容，shimming可以解决webpack的兼容性问题.webpack自带的插件ProvidePlugin可以实现这个功能

```javascript
plugins: [
       .....
        new webpack.ProvidePlugin({
            $: 'jquery',   // 如果在模块中发现$,webpack会帮助你自动引入jquery.
        })
        ],
```

如果想要js文件中的this等于window的话我们可以使用imports-loader 这个插件，这一类也可以称为shimming的功能。

```javascript
// 安装
cnpm install imports-loader --save-dev
// 配置
        {
            test: /\.js$/,  // 注意这里要写正确，不然useBuiltIns不起作用
            exclude: /node_modules/,  // 排除node_modules中的代码
            use: [{
                loader: "babel-loader",
            }, {
                loader: 'imports-loader?this=>window'
            }],
        }
```

<a name="54a5700b"></a>
### 环境变量的使用

```javascript
// package.json
  "scripts": {
    "dev-build": "webpack --config ./build/webpack.common.js",
    "dev": "webpack-dev-server --config ./build/webpack.common.js",
    "build": "webpack --env.production --config ./build/webpack.common.js"
  },

// webpack.common.js
module.exports = (env) => {
    if(env && env.production){
        return merge(commonConfig, prodConfig);
    }
    else {
        return merge(commonConfig, devConfig);
    }
}
```
