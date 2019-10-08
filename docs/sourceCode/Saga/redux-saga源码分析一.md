
# redux-saga源码分析(一)

<a name="59683fbc"></a>
## 简述

redux-saga就是用于管理副作用如异步获取数据，访问浏览器缓存的一个中间件。其中reducer负责处理state更新，sagas负责协调异步操作，并提供一系列的API（take,put,call等）让副作用管理更容易，执行更高效，测试更简单。

<a name="8ce750bd"></a>
## 源码分析

由于是redux的异步扩展，redux-saga中广泛应用了redux中的很多函数，比如applyMiddleware、dispatch、getState等。如对redux不熟悉，建议看下[redux源码分析](https://github.com/LuoShengMen/StudyNotes/issues/169),我们会通过[该例子](https://github.com/LuoShengMen/MyBlog-front/blob/master/src/store/index.js)来分析redux-sgag源码

<a name="e70c4be4"></a>
### 内部执行逻辑

![](https://user-images.githubusercontent.com/21194931/56470449-dbeb6100-6478-11e9-819e-41dfa39d2cb8.png#align=left&display=inline&height=557&originHeight=557&originWidth=1000&status=uploading&width=1000)

<a name="f4151af4"></a>
### 入口文件

在store/index.js中通过createSagaMiddleware和sagaMiddleware.run(rootSaga)引入redux-saga逻辑。sagaMiddleware.run其实调用的是runsage。

```javascript
// 这是redux-saga中间件的入口函数，是按照中间件的基本编写方式来写的
// context、options默认是空的，分析的时候可以忽略
function sagaMiddlewareFactory({ context = {}, ...options } = {}) {
  const { sagaMonitor, logger, onError, effectMiddlewares } = options
  let boundRunSaga

  // 下面就是中间件基本的编写方式
// sagaMiddleware.run其实调用的是runsage
  function sagaMiddleware({ getState, dispatch }) {
    const channel = stdChannel()
    channel.put = (options.emitter || identity)(channel.put)
   // 为runSaga提供redux的函数以及subscribe
    boundRunSaga = runSaga.bind(null, {
      context,
      channel,
      dispatch,
      getState,
      sagaMonitor,
      logger,
      onError,
      effectMiddlewares,
    })

    return next => action => {
      if (sagaMonitor && sagaMonitor.actionDispatched) {
        sagaMonitor.actionDispatched(action)
      }
      const result = next(action) 
      channel.put(action)
      return result
    }
  }
  // 负责启动中间件的函数，下一小节讲述
  sagaMiddleware.run = (...args) => {
    return boundRunSaga(...args)
  }

  sagaMiddleware.setContext = props => {
    assignWithSymbols(context, props)
  }

  return sagaMiddleware
}
```

<a name="f46f8b82"></a>
### runSaga函数

你传入的saga函数是一个generator函数。

```javascript
function runSaga(options, saga, ...args) {
  // saga就是传过来的saga函数
  const iterator = saga(...args)

  const {
    channel = stdChannel(),
    dispatch,
    getState,
    context = {},
    sagaMonitor,
    logger,
    effectMiddlewares,
    onError,
  } = options

  const effectId = nextSagaId()
  // 日志
  const log = logger || _log
  const logError = err => {
    log('error', err)
    if (err && err.sagaStack) {
      log('error', err.sagaStack)
    }
  }
  // 是否有effectMiddlewares
  const middleware = effectMiddlewares && compose(...effectMiddlewares)
  const finalizeRunEffect = runEffect => {
    if (is.func(middleware)) {
      return function finalRunEffect(effect, effectId, currCb) {
        const plainRunEffect = eff => runEffect(eff, effectId, currCb)
        return middleware(plainRunEffect)(effect)
      }
    } else {
      return runEffect
    }
  }

  const env = {
    stdChannel: channel,
    dispatch: wrapSagaDispatch(dispatch),
    getState,
    sagaMonitor,
    logError,
    onError,
    finalizeRunEffect,
  }

  try {
    suspend()
    // 这一行是最终执行的
    const task = proc(env, iterator, context, effectId, getMetaInfo(saga), null)

    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task)
    }

    return task
  } finally {
    flush()
  }
}
```

<a name="13408a22"></a>
### oasp函数

asap是一个调度策略，存放了一个quene，然后每次只允许一个任务执行

```javascript
const queue = []
let semaphore = 0

function exec(task) {
  try {
    suspend()
    task()
  } finally {
    release()
  }
}

export function asap(task) {
  queue.push(task)

  if (!semaphore) {
    suspend()
    flush()
  }
}

export function suspend() {
  semaphore++
}

function release() {
  semaphore--
}
// while循环，将队列中执行完成，直到为空
export function flush() {
  release()

  let task
  while (!semaphore && (task = queue.shift()) !== undefined) {
    exec(task)
  }
}
```

<a name="ad698183"></a>
### stdChannel函数

stdChannel函数运行时才去运行multicastChannel，最终返回multicastChannel的运行结果，该结果为一个对象

```javascript
function stdChannel() {
  const chan = multicastChannel()
  const { put } = chan
  chan.put = input => {
    // SAGA_ACTION :一个字符串，模版字符串 `@@redux-saga/${name}`
    if (input[SAGA_ACTION]) {
      put(input)
      return
    }
    // asap是一个调度策略，存放了一个quene，然后每次只允许一个任务执行
    asap(() => {
      put(input)
    })
  }
  return chan
}
```

上面函数中的chan是multicastChannel函数执行的结果,返回了一个对象，对象包含put、take方法

- take方法：将回调函数存入nextTakers
- put方法：执行相应的回调函数

```javascript
function multicastChannel() {
  let closed = false

  // 在状态管理中，经常碰到current和next的操作，为了保持一致性
  // 一个代表当前状态（任务队列），
  // 一个代表下一个状态（任务队列），
  // 初始状态两个是一致的
  let currentTakers = []
  let nextTakers = currentTakers
  // 下面函数做的操作是，将当前的队列，复制给下一个队列
  const ensureCanMutateNextTakers = () => {
    if (nextTakers !== currentTakers) {
      return
    }
    nextTakers = currentTakers.slice()
  }

  const close = () => {

    closed = true
    const takers = (currentTakers = nextTakers)
    nextTakers = []
    takers.forEach(taker => {
      // END是一个对象，END = { type: CHANNEL_END_TYPE }
      taker(END)
    })
  }

  return {
    [MULTICAST]: true,
    put(input) {

      if (closed) {
        return
      }
      // isEND是一个函数，判断是不是已经结束了
      // isEnd = a => a && a.type === CHANNEL_END_TYPE
      if (isEnd(input)) {
        close()
        return
      }

      const takers = (currentTakers = nextTakers)

      for (let i = 0, len = takers.length; i < len; i++) {
        const taker = takers[i]

        if (taker[MATCH](input)) {
          taker.cancel()
          taker(input)
        }
      }
    },
    take(cb, matcher = matchers.wildcard) {
      if (closed) {
        cb(END)
        return
      }
      cb[MATCH] = matcher
      ensureCanMutateNextTakers()
      nextTakers.push(cb)

      cb.cancel = once(() => {
        ensureCanMutateNextTakers()
        remove(nextTakers, cb)
      })
    },
    close,
  }
}
```
