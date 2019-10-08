---
title: 使用reactHooks模拟生命周期
---

### 前言
在 React 16.8 之前，函数组件只能是无状态组件，也不能访问 react 生命周期。hook 做为 react 新增特性，可以让我们在不编写 class 的情况下使用 state 以及其他的 react 特性，例如生命周期。接下来我们便举例说明如何使用 hooks 来模拟比较常见的 class 组件生命周期。


### constructor
class 组件
```javascript
class Example extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }
    render() {
      return null;
  }
}
```

函数组件不需要构造函数,可以通过调用 useState 来初始化 state
```javascript
function Example() {
  const [count, setCount] = useState(0);
  return null;
}
```

<a name="vqqm9"></a>
### componentDidMount
class 组件访问 componentDidMount
```javascript
class Example extends React.Component {
  componentDidMount() {
    console.log('I am mounted!');
  }
  render() {
    return null;
  }
}
```

使用 hooks 模拟 componentDidMount
```javascript
function Example() {
  useEffect(() => console.log('mounted'), []);
  return null;
}
```

useEffect 拥有两个参数，第一个参数作为回调函数会在浏览器布局和绘制完成后调用，因此它不会阻碍浏览器的渲染进程。<br />第二个参数是一个数组

- 当数组存在并有值时，如果数组中的任何值发生更改，则每次渲染后都会触发回调。
- 当它不存在时，每次渲染后都会触发回调。
- 当它是一个空列表时，回调只会被触发一次，类似于 componentDidMount。

<a name="yoJZm"></a>
### shouldComponentUpdate
class 组件访问 shouldComponentUpdate
```javascript
shouldComponentUpdate(nextProps, nextState){
  console.log('shouldComponentUpdate')
  // return true 更新组件
  // return false 则不更新组件
}
```

hooks 模拟 shouldComponentUpdate
```javascript
const MyComponent = React.memo(
    _MyComponent, 
    (prevProps, nextProps) => nextProps.count !== prevProps.count
)
```

React.memo 包裹一个组件来对它的 props 进行浅比较,但这不是一个 hooks，因为它的写法和 hooks 不同,其实React.memo 等效于 PureComponent，但它只比较 props。

<a name="zQhcm"></a>
### componentDidUpdate
class 组件访问 componentDidUpdate
```javascript
componentDidMount() {
  console.log('mounted or updated');
}

componentDidUpdate() {
  console.log('mounted or updated');
}
```

使用 hooks 模拟 componentDidUpdate
```javascript
useEffect(() => console.log('mounted or updated'));
```

值得注意的是，这里的回调函数会在每次渲染后调用，因此不仅可以访问 componentDidUpdate，还可以访问componentDidMount，如果只想模拟 componentDidUpdate，我们可以这样来实现。
```javascript
const mounted = useRef();
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
   console.log('I am didUpdate')
  }
});
```
useRef 在组件中创建“实例变量”。它作为一个标志来指示组件是否处于挂载或更新阶段。当组件更新完成后在会执行 else 里面的内容，以此来单独模拟 componentDidUpdate。

<a name="iPRJy"></a>
### componentWillUnmount
class 组件访问 componentWillUnmount
```javascript
componentWillUnmount() {
  console.log('will unmount');
}
```

hooks 模拟 componentWillUnmount
```javascript
useEffect(() => {
  return () => {
    console.log('will unmount');
  }
}, []);
```

当在 useEffect 的回调函数中返回一个函数时，这个函数会在组件卸载前被调用。我们可以在这里面清除定时器或事件监听器。

<a name="2IE7Y"></a>
### 总结
引入 hooks 的函数组件功能越来越完善，在多数情况下，我们完全可以使用 hook 来替代 class 组件。并且使用函数组件也有以下几点好处。

- 纯函数概念，同样的 props 会得到同样的渲染结果。
- 可以使用函数组合，嵌套，实现功能更加强大的组件。
- 组件不会被实例化，整体渲染性能得到提升。

但是 hooks 模拟的生命周期与class中的生命周期不尽相同，我们在使用时，还是需要思考业务场景下那种方式最适合。 

参考链接

- [https://blog.solutotlv.com/react-class-to-hooks/](https://blog.solutotlv.com/react-class-to-hooks/)
- [https://dev.to/trentyang/replace-lifecycle-with-hooks-in-react-3d4n](https://dev.to/trentyang/replace-lifecycle-with-hooks-in-react-3d4n)

