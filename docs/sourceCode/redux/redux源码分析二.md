# redux源码分析(二)

[上一篇](/sourceCode/redux/redux源码分析一)分析了createStore的源码，接下来分析剩下的文件。

<a name="combineReducers.js"></a>
## combineReducers.js

combineReducers的作用在于将多个reducer转化为一个reducer,该函数接收reducer为参数，返回一个名为combination的函数。

```javascript
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)

  let unexpectedKeyCache
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }

  let shapeAssertionError
  try {
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }

    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      )
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}
```

首先一个for循环筛选出reducer中为functuon的key，并以key-value的方式存在finalReducers中，通过  const finalReducerKeys = Object.keys(finalReducers),<br />获取到reducer到key数组finalReducerKeys，在返回的函数中通过对finalReducerKeys循环逐一调用每一个reducer会生成一个新的值nextStateForKey，redux在这里直接直接比较新值<br />和之前的值，如果有变化则返回新值，没有则返回原来的值。

> combineReducers是有缺陷的，源码中mapValues只是一级深度的映射，目前redux并没有提供简便的映射到state.a.b一级以上深度的state的方法。这是它目前的不足之处。


<a name="compose.js"></a>
## compose.js

```javascript
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
```

参数为空或者只有一个时，直接返回该参数，当参数为多个时，则调用reducer,函数内部是一层一层函数的叠加，该函数参数在叠加的最内层调用.

<a name="bindActionCreators.js"></a>
## bindActionCreators.js

bindActionCreators的作用就是将actionCreator和dispatch联结在一起。

```javascript
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}
```

该高阶函数是在文件内部使用，这个是为了减少重复代码，返回的函数中的参数传给的actionCreator函数执行，然后dispatch将其返回值作为参数再执行，其返回值作为该函数的返回值。

```javascript
export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
```

如果参数actionCreators为函数时，便直接执行bindActionCreator返回一个函数，如果参数为对象，通过循环其key值递归找到每一个对应的ActionCreator，<br />逐一执行bindActionCreator，最终返回一个对象。以下为具体用法：

```javascript
// createAction
export const request_login = createAction('REQUEST_LOGIN');

// 调用bindActionCreators
function mapDispatchToProps(dispatch) {
    return {
        handleLogin: bindActionCreators(request_login, dispatch),
    };
}
```

<a name="applyMiddleware.js"></a>
## applyMiddleware.js

```javascript
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 将整合出来的store和dispatch传递给中间件使用，并将中间件放在chain数组中
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch) // 再组合出新的 dispatch

    return {
      ...store,
      dispatch
    }
  }
}
```

applyMiddleware接收中间件为参数，并返回一个以createStore为参数的函数而这个函数返回store和dispatch；同时applyMiddleware又是createStore函数中的第三个参数，所以我们回到createStore的代码

```
if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
    throw new Error('Expected the enhancer to be a function.')
  }

  return enhancer(createStore)(reducer, preloadedState)
}
```

当createStore中传了第三个参数的时候，会执行enhancer(createStore)(reducer, preloadedState)，这是一个柯里化函数；我们可以设想中间件的使用方法：const store = createStore( reducer, applyMiddleware([...中间件]))。applyMiddleware([...中间件])的返回值是一个以createStore为参数的函数，这个函数会在createStore中执行，返回的函数也会继续执行，最后返回一个store。我们继续回到applyMiddleware中，在返回store之前，中间件做了什么处理呢？中间件将最重要的两个方法 getState/dispatch整合出来，并传递给中间件使用，中间件处理完之后，返回一个新的dispatch.<br />applyMiddleware把中间件放在一个chain数组中，并通过compose方法（我们上面已经介绍过了），让每个中间件按照顺序一次传入diapatch参数执行，再组合出新的 dispatch。由此可见，每个中间件的格式都应该是接收一个{ dispatch, getState }，返回一个(dispatch) => { return function(action) { ... } }

> applyMiddleware

