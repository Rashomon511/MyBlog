# redux源码分析(一)

从源码来解析redux的运作流程，帮助我们更加深刻的理解redux。对于redux的工作流程不了解的同学可以看这篇介绍redux的[文章](/article/数据流/前端数据流管理方案之一)。

<a name="kdceu"></a>
## 文件结构
redux的源码并不是很多，大致只分为下列几个文件：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1567673702702-6821a140-954f-4d60-a00c-a72e269ad01b.png#align=left&display=inline&height=348&name=image.png&originHeight=696&originWidth=1446&size=173934&status=done&width=723)<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1567673713011-a0f5843a-4a07-4776-b6b8-396fbf1e4d2c.png#align=left&display=inline&height=178&name=image.png&originHeight=356&originWidth=1278&size=89575&status=done&width=639)

index.js是整个代码的入口，主要是判断代码在非生成环境是否压缩暴露出createStore、combineReducers、bindActionCreators、applyMiddleware、compose等方法,如果没有则发出警告⚠️

```javascript
import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
import warning from './utils/warning'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */
function isCrushed() {}

if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === "production". ' +
      'This means that you are running a slower development build of Redux. ' +
      'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
      'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' +
      'to ensure you have the correct code for your production build.'
  )
}

export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes
}
```

<a name="createStore.js"></a>
## createStore.js
createStore是redux中一个非常重要的API，createStore会生成一个store，维护一个状态树，里面是全局的state.
```javascript
store = createStore(reducer, preloadedState, enhancer)
```

createStore接受三个参数，分别为reducer纯函数，初始状态，增强器（即 applyMiddleware()返回的内容以及其他的中间件）用法如下：
```javascript
const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    composeWithDevTools()
);
```

createStore生成的store提供了dispath,subscribe,getState,replaceReducer,observable等方法，接下来逐一分析。
```javascript
export default function createStore(reducer, preloadedState, enhancer) {
  // 判断接受的参数个数，来指定 reducer 、 preloadedState 和 enhancer
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  let currentReducer = reducer   // 存储当前的reducer
  let currentState = preloadedState  // 存储当前的状态
  let currentListeners = []     // 储存当前的监听函数列表
  let nextListeners = currentListeners  // 储存下一个监听函数列表
  let isDispatching = false  //是否在执行reducer
  }
```

首先判定参数个数，分别指定三个参数，接着判断enhancer是否存在如果存在并且为函数则调用enhancer，并且终止当前函数执行，前面的判断基本上是对三个参数对判断。接下来是对当前状态及reducer的存储。

<a name="getState"></a>
### getState
这里判断是否在执行reducer，返回当前的最新状态state
```javascript
// 接上述代码，这里不在重复
  function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }
    return currentState
  }
```


<a name="dispatch"></a>
### dispatch
dispatch接受一个参数action，action 是把数据从应用传到 store 的有效载荷,它是 store 数据的唯一来源,action包含type和payload,payload表示最新的状态state，type代表操作类型。传入action后会首先运行reducer，reducer接收action和当前状态state,reducer通过判断action.type来返回最新的state。
```javascript
function dispatch(action) {
    // ...一些条件判断
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    // ....
    return action
  }
```

dispatch还会触发整个监听函数列表，所以最后整个监听函数列表都会按顺序执行一遍。dispatch返回值就是传入的action。
```javascript
function dispatch(action) {
    // ...一些条件判断
   const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
    return action
  }   

```

<a name="subscribe"></a>
### subscribe
subscribe会接受一个listener函数，首先运行ensureCanMutateNextListeners函数，ensureCanMutateNextListeners 会根据当前的监听函数列表生成监听函数列表副本。这可以防止用户在中间调用订阅/取消订阅的产生错误
```javascript
function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }
```




然后向列表中添加进新的监听函数listenner,subscribe的返回值是一个unsubscribe，是一个解绑函数，调用该解绑函数，会将已经添加的监听函数删除，该监听函数处于一个闭包之中，会一直存在，所以在解绑函数中能删除该监听函数。这就是redux精妙之处。
```javascript
function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }

    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
      )
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
        )
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }
```



<a name="replaceReducer"></a>
### replaceReducer
```javascript
function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE })
  }
```

顾名思义replaceReducer的意思就是替换掉reducer，replaceReducer接受一个reducer替换的当前的reducer，之后立即执行dispatch({ type: ActionTypes.INIT }) ，用来初始化store的状态。<br />replaceReducer的使用场景，分别是：

> 1.当你的程序要进行代码分割的时候
> 2.当你要动态的加载不同的reducer的时候
> 3.当你要实现一个实时reloading机制的时候


<a name="observable"></a>
### observable
该方法并不是暴露给使用者的，一般用于内部，在测试的时候会用到，这里不深究。
