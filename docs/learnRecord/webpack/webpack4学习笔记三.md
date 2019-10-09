# webpack4学习笔记(三)

<a name="2feb428b"></a>
### Hot Module Replacement

HMR称为热模块替换,在前面我们知道webpack-dev-server在我们每次代码变更时都会自动刷新页面，但是我们想要的是只更新被修改代码都那部分页面显示，不希望页面全部刷新。这时候HMR可以来帮助我们实现这个功能

> tips:webpack-dev-server打包后会把dist目录放到内存里，从而提升打包速度


好处：

- 针对于样式调试更加方便
- 只会更新被修改代码的那部分显示

```javascript
...
    devServer: {
        contentBase: './dist',  // 起一个在dist文件夹下的服务器
        open: true,    // 自动打开浏览器并访问服务器地址
        proxy: {   // 跨域代理
            '/api': 'http: //localhost:3000'  // 如果使用/api,会被转发（代理）到该地址
        },
        hot: true,  // 开启HMR功能
        hotOnly: true  // 即使HMR不生效，也不自动刷新
    },
...
    plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'  // 模版html
    }), 
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
    ],
...
```

有时候我们需要手动的实现模块热更新，但是css-loader,vue-loader,babelp-preset主流的loader已经帮我们做了module.hot.accept()的事情，所以webpack的HRM会实时显示。(可能有误)

```javascript
if(module.hot) {
    module.hot.accept('./number', () => {
      ...dosomething
    })
}
```

<a name="Babel"></a>
### Babel

使用babel来处理es6的代码<br />安装：

```javascript
cnpm install babel-loader @babel/core -D  // 只是babel和webpack之间的桥梁，并不会将代码转译
 cnpm install @babel/preset-env -D   // 将es6的语法翻译成es5语法
 cnpm install @babel/polyfill --save   // @babel/polyfill 对es6语法在低版本浏览器上的补充
```

配置：

```javascript
rules: [
        {
            test: /\.(e|j)s$/,  
            exclude: /node_modules/,  // 排除node_modules中的代码
            loader: "babel-loader",   // 只是babel和webpack之间的桥梁，并不会将代码转译
            options: {
                presets: [['@babel/preset-env', {
                    useBuiltIns: 'usage'  // 做@babel/polyfill补充时，按需的补充，用到什么才补充什么
                }]]   // 将es6的语法翻译成es5语法
            }
        }
]
```

使用@babel/polyfill做打包补充时，是通过全局变量到形式补充的，因此就可能会污染到全局环境。如果是对组件库进行打包的话由于不想库里面的函数污染到全局，那么就需要换一种配置方式。我们可以使用plugin-transform-runtime来对代码进行补充<br />安装：

```javascript
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
npm install --save @babel/runtime-corejs2
```

配置：

```javascript
{
            test: /\.(e|j)s$/,  
            exclude: /node_modules/,  
            loader: "babel-loader",  
            options: {
                "plugins": [
                    [
                      "@babel/plugin-transform-runtime",
                      {
                        "corejs": 2,  //配置为2时必须安装@babel/runtime-corejs2
                        "helpers": true,
                        "regenerator": true,
                        "useESModules": false
                      }
                    ]
                  ]
            }
        }
```

> 由于babel里对配置相当的多，因此我们可以将options里面多内容放到.babelrc这个文件里，实现同样多结果


<a name="ced457dd"></a>
### 对react代码进行打包

可以使用@babel/preset-react来对jsx语法进行转移<br />安装：

```javascript
npm install --save-dev @babel/preset-react
```

配置：

```javascript
{
    presets: [ // 将es6的语法翻译成es5语法
        [
          "@babel/preset-env", {
            targets: {
               chrome: "67",
            },
            useBuiltIns: "usage" // 做@babel/polyfill补充时，按需的补充，用到什么才补充什么
          }
        ],
        "@babel/preset-react",
    ]   
}
```

> babel的执行顺序是从下往上从右往左的顺序


疑问: webpack+react的模块热更新不生效问题,,其实是因为我们前面说了babel-preset内置了module.hot.accept();这样的功能，但是其实那样的说法是有误的，并没有内置，因此我们还是需要手动设置module.hot.accept();或者使用react-hot-loader
