---
title: 一文即可了解react前后生命周期
---

# 组件生命周期

<a name="1b129924"></a>
### react16前的生命周期
在react16的之前生命周期其实主要分为四个阶段：组件初始化、组件挂载、组件更新、组件卸载。<br />
<!-- more -->
![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1553838272903-bcab18a4-7c25-46ca-8f52-735b456c07fb.png#align=left&display=inline&height=462&name=image.png&originHeight=924&originWidth=2000&size=226738&status=done&width=1000)
<a name="1a757f41"></a>

#### 组件初始化阶段
<a name="constructor"></a>
##### constructor
在该阶段组件中的构造方法 constructor() 接受 props 接收父组件传下来的 props。还可以在 constructor() 内部定义定义this.state 的初始内容。注意：在组件中写了 constructor 方法就必须在里面使用 super()，并且应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug。

```javascript
 constructor(props) {
  super(props)
  console.log(this.props) // 在内部可以使用props
  this.state = {
    //定义state初始值
  }
}
```

<a name="6a954c08"></a>
#### 组件挂载阶段
<a name="componentWillMount"></a>
##### componentWillMount
在组件将要挂载到 DOM 前调用，只会被调用一次，在该方法中修改 state 的值，并不会引起组件重新渲染。(数据请求等异步操作不建议写在该方法内，异步操作可能阻塞 UI)。

```javascript
componentWillMount(){}
```

<a name="eaad0dd0"></a>
##### render()
该函数会创建一个虚拟 DOM，用来表示组件的输出。只能通过 this.props 和 this.state 访问数据，且不能在里面执行 this.setState 更该组件状态。在 render 中可以返回 null、false 或者任何 React 组件，只能出现一个顶级组件，不能返回一组元素(在 react16 中有所改善，可以返回一组元素或单个字符串)。
```javascript
Render(){
	return (
  		// react组件
  )
}
```

<a name="componentDidMount"></a>
##### componentDidMount
组件挂载到 Dom 后调用，且只调用一次。此时组件已经生成对应的 DOM 结构，可以在该函数中通过ReactDOM.findDOMNode()访问到真实的 DOM 或者通过 this.refs.[refName] 属性获取真实 DOM 。(数据请求等异步操作建议写在该方法内)

```javascript
componentDidMount() {
  // 进行异步数据请求或者获取dom
}
```

<a name="f6953361"></a>
#### 组件更新阶段
<a name="componentWillReceiveProps"></a>
##### componentWillReceiveProps
该函数接受一个参数 nextProps,当父组件重传props时会调用。拿到新的 props 与旧的 props 来比较是否变化，若变化可以通过 this.setState 更新 state。当然也可以不比较新旧 props 值直接更新 state。

```javascript
componentWillReceiveProps(nextProps) {
  // 示例
  if (nextProps.state !== this.props.state) {
     this.setState({
       state: nextProps.state 
     });
  }
}
```

> 官方提示：在componentWillReceiveProps中调用 this.setState() 将不会引起第二次渲染。

由于每次子组件接收到新的props，都会重新渲染一次，除非你使用 shouldComponentUpdate 来阻止重新渲染，但是你可以 componentWillReceiveProps 中根据新的 props 更新 state，虽然更新state也会触发一次重新渲染，但并不会触发额外的render。

<a name="2fdfa5f8"></a>
##### shouldComponentUpdate(nextProps,nextState)
该函数是唯一可以控制组件渲染的生命周期。如果 props 和 state 的改变不需要重新渲染组件。则可以在该函数内返回 false，阻止组件的重新渲染。为了优化组件性能，减少组件的不必要渲染。

```javascript
shouldComponentUpdate(nextProps, nextState){
  // return true 更新组件
  // return false 则不更新组件
}
```

<a name="a3afa298"></a>
##### componentWillUpdate(nextProps,nextState)
shouldComponentUpdate 方法返回 true 后，在组件即将进行重新渲染前调用该函数(注意不要里面去更新 props 或者 state，会导致组件进入死循环),在这之后会调用 render 方法进行重新渲染。

```javascript
componentWillUpdate(nextProps,nextState) {
  // 不要在此处更新props或state
}
```
<a name="d41d8cd9"></a>
#### 
<a name="4e03cd7e"></a>
##### componentDidUpdate(prevProps,prevState)
组件被重新渲染后该方法会被调用，可以拿到更新前的 props 和 state 。除了首次渲染时调用的componentDidMount，之后每次渲染都会调用该函数。和 componentDidMount 类似的是可以在这里操作更新后的DOM。

```javascript
componentDidUpdate(prevProps,prevState) {}
```

<a name="2f9d8157"></a>
#### 组件卸载阶段
<a name="componentWillUnmount"></a>
##### componentWillUnmount
该函数在组件卸载前被调用，可以在执行一些清理工作，比如清除组件中使用的定时器或者事件监听器，以避免引起内存泄漏。<br /><br />
```javascript
componentWillUnmount() {
  // 清除定时器或事件监听器
}
```

<a name="bbf416f0"></a>
### react16的生命周期
react16的生命周期新引入了三个新的生命周期函数：getDerivedStateFromProps，getSnapshotBeforeUpdate，componentDidCatch,弃用的三个生命周期函数：componentWillMount、componentWillReceivePorps，componentWillUpdate。其他的生命周期功能与前面介绍的相同。
<a name="484e93dd"></a>
##### getDerivedStateFromProps(props, state)
该函数在组件挂载阶段和后续更新阶段调用，根据 props 和 state 两个参数，计算出预期的状态改变，返回一个对象表示新的 state进行更新；如果不需要更新，返回 null 即可。该函数用来替代 componentWillReceiveProps。

```javascript
static getDerivedStateFromProps(props, state) {
  //根据props和state计算出预期的状态改变，返回结果会被送给setState
}
```

<a name="48be8521"></a>
##### getSnapshotBeforeUpdate(prevProps, prevState)
该函数在render之后被调用，可以读取但无法使用DOM的时候。它使得组件能在发生更改之前从 DOM 中捕获一些信息(例如，滚动位置)。返回值将作为componentDidUpdate的第三个参数。该函数配合componentDidUpdate, 可以替代componentWillUpdate。

```javascript
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return 'react16';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('snapshot = ', snapshot);
  }
```

<a name="60ec39b8"></a>
##### static getDerivedStateFromError()
此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state。

```
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显降级 UI
    return { hasError: true };
  }
```

<a name="c941aea6"></a>
##### componentDidCatch(error，info)
任何一处的javascript会触发该函数。
```
componentDidCatch(error, info) {
  // 获取到javascript错误
}
```
<a name="d41d8cd9-1"></a>
#### 
<a name="25f9c7fa"></a>
### 总结
react16更新后的生命周期可以总结为：
<a name="6a954c08-1"></a>
##### 组件挂载阶段
* constructor
* getDerivedStateFromProps
* render
* componentDidMount
<a name="f6953361-1"></a>
##### 组件更新阶段
* getDerivedStateFromProps
* shouldComponentUpdate
* render
* getSnapshotBeforeUpdate
* componentDidUpdate
<a name="2f9d8157-1"></a>
##### 组件卸载阶段
* componentWillUnmount

![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1553838592339-afdcbdfd-bcf8-484f-bab7-bb96c674841c.png#align=left&display=inline&height=783&name=image.png&originHeight=1566&originWidth=2816&size=269991&status=done&width=1408)![image](https://user-images.githubusercontent.com/21194931/55275775-13f1ff00-5326-11e9-9399-946de9d083ec.png)


* 图片来自[http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

参考链接：
* [react官方文档](https://reactjs.org/docs/react-component.html)
