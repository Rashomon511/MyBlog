# webpack4学习笔记(四)

<a name="866b1a74"></a>
### Tree Shaking

Tree Shaking可以剔除掉一个文件中未被引用掉部分(在producton环境下才会提出)，并且只支持ES Modules模块的引入方式，不支持CommonJS的引入方式。原因：ES Modules是静态引入的方式，CommonJS是动态的引入方式，Tree Shaking只支持静态引入方式。<br />在开发环境下需要在webpack中配置，但是在生成环境下，由于已有默认配置可以不配置optimization，但是sideEffects依然需要配置

```javascript
optimization: {   // 开发环境时使用
        usedExports: true
    },
```

如果想要避免以下方式的引入使用Tree Shaking，可以在package.json中配置

```javascript
import './index.css';
import '@babel/polyfill';
// package.json
  "sideEffects": ["*.css", "@babel/polyfill"],
```

[Webpack 中的 sideEffects 到底该怎么用？](https://segmentfault.com/a/1190000015689240)

<a name="0f119f8c"></a>
### Develoment和Production模式的区分

在开发环境下我们会使用Develoment模式，在生成环境中我们使用Production模式。两个模式的区别：

- 在开发环境中，sourceMap是非常齐全的，可以帮快速地位问题，在Production环境下，sourceMap较简洁
- 在开发环境中，代码不会被压缩，在Production环境下，代码是被压缩过的

<a name="b8995df5"></a>
### Code Spliting

webpack和Code spliting之间的关系,在我们使用第三方库时，避免第三方库和业务代码打包到一起，拆成多个文件后在html中分别引入，这样当页面业务逻辑发生变更时，只需要加载main.js就行，因为lodash.js已经在缓存中，不用重新加载，这样当话可以加快页面当加载速度,提升执行性能，优化项目。<br />配置

```javascript
entry: {
        lodash: './src/lodash.js',
        main: './src/index.js'
    }, // 入口文件
```

lodash.js

```javascript
import _ from 'lodash';
window._ = _;
```

<a name="SplitChunksPlugin"></a>
### SplitChunksPlugin

不管是同步代码的分割还是异步的代码分割都要使用SplitChunksPlugin这个插件，可以将第三方库从业务代码中分割出来。

```javascript
optimization: {
        splitChunks: {
            chunks: 'all'， // 遇到公用当类库时，自动的Code Spliting
            cacheGroups: {
                vendors: false,
                default: false
            }
        }
    },
```

当splitChunks没有任何配置内容时，他会默认以下内容

```javascript
splitChunks: {
    chunks: "async",  // 只对异步引入代码起作用，设置all时并同时配置vendors才对两者起作用
    minSize: 30000,   // 引入的库大于30kb时才会做代码分割
    minChunks: 1,   // 一个模块至少被用了1次才会被分割
    maxAsyncRequests: 5,   // 同时异步加载的模块数最多是5个，如果超过5个则不错代码分割
    maxInitialRequests: 3,   // 入口文件进行加载时，引入的库最多分割出3个js文件
    automaticNameDelimiter: '~',  // 生成文件名的文件链接符
    name: true,   // 开启自定义名称效果
    cacheGroups: {  // 判断分割出的代码放到那里去
        vendors: {   // 配合chunks： ‘all’使用，表示如果引入对库是在node-modules中，那就会把这个库分割出来并起名为vendors.js
            test: /[\\/]node_modules[\\/]/,
            priority: -10，// 优先级越高文件就放到哪里
            fileName: 'vendors.js'
        },
    default: {  // 为非node-modules库中分割出的代码设置默认存放名称
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true，// 避免被重复打包分割
            fileName: 'common.js'
        }
    }
}
```

如果想要为分割出的代码文件自定以名称的话，还需要安装

```javascript
npm install --save-dev @babel/plugin-syntax-dynamic-import

// 自定义名称
import(/* webpackChunkName:"lodash" */ 'lodash')
```
