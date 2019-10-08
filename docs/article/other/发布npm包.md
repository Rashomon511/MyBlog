---
title: 发布自己的第一个npm包
---

# 发布自己的第一个npm包

在如今的项目开发中，npm基本已经成为前端必不可少的一部分，作为一个合格的前端，了解并学习npm是相当必要的，接下来发布
我自己的第一个npm包。
<!-- more -->
## 第一步:注册

1.前往github和npm网站分别注册账号，在github上新建一个项目，并clone下来
![](/img/npm/npm1.png)

2.clone下来后，进入项目执行npm init，一路center按到底。
3.接下来执行npm addUser 输入你在npm上面注册的用户名和密码与邮箱。

## 第二步:封装

1.在packeage.json里面加入
```
  "devDependencies": {
    "babel-cli": "^6.0.0",
    "babel-core": "^6.14.0",
    "babel-loader": "^6.2.5",
    "babel-plugin-istanbul": "^2.0.1",
    "babel-preset-es2015": "^6.14.0",
    "babel-preset-react": "^6.24.1",
    "react": "^15.6.1",
    "react-dom": "^15.6.1"
  },
```
基于react，babel用于将es6转成es5,接下来执行npm install 安装依赖包。完成之后可以来编写代码。

2.项目结构
![](/img/npm/1548148986774.jpg)

.babelrc负责编译将es6转为es5
```
{
    "presets": ['react', 'es2015',"stage-1"],
    "plugins": ['transform-react-jsx']
}
```
index.js作为入口文件

```
import HRate from './components/HRate';
module.exports = {
  HRate
};
```
[HRate.js](https://github.com/LuoShengMen/HRate/blob/master/src/components/HRate.js)则为具体的组件
```
import React from 'react';

export default class HRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 根据页面当中的星星的数量来设置默认值
      value: 0,
      arr: [1, 2, 3, 4, 5]
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.value !== nextProps.value){
      this.setState({
        value: nextProps.value
      })
    }
  }

  // 返回数值
  changeRate = (data) => {
    const {disabled} = this.props;
    const {value} = this.state;
    if (!disabled && this.props.onChange) {
      this.props.onChange(value !== data ? data : 0);
    }
    this.setState({
      value: value !== data ? data : 0
    })
  };

  render() {
    const {arr, value} = this.state;
    const {size = 20, item = '☆'} = this.props;
    return (
        <span>
          {
            arr.map((ele, index) => (
              <span key={index}>
                {value >= ele
                    ? <span  style={{color:"#FFAC2D",fontSize:`${size}px`}} onClick={() => this.changeRate(ele)}>{item}</span>
                    : <span  style={{color:"#999999",fontSize:`${size}px`}} onClick={() => this.changeRate(ele)}>{item}</span>
                }
              </span>
            ))
          }
        </span>
    );
  }
}

```
接下来在package.json中加入
```
  "main": "lib/index.js",
  script: {
    "build": "babel src --out-dir lib"
  }
```
运行npm run build将src目录下的文件输出到lib目录下

## 第三步:发布及运用

1.在项目中执行npm addUser, npm publish，发布成功后就可以在npm官网上看到自己发布的包
![](/img/npm/npm3.png)

![](/img/npm/npm4.png)

![](/img/npm/1548149326311.jpg)

2.如果要运用发布的包，则可以执行

> npm install hrate
```
import { HRate } from 'hrate';
...
render(){
    return <HRate />
}
```

最终效果
![](/img/npm/npm5.png)

npm地址 [hratw](https://www.npmjs.com/package/hrate)
gitHub地址 [hrate](https://github.com/LuoShengMen/HRate)






