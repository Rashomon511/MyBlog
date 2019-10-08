# redux-saga源码分析(二)

[上一篇](/sourceCode/Saga/redux-saga源码分析一)中的runSaga作用为启动中间件，最终会执行proc

## proc函数

proc主要干了两件事情：

- 生成事件订阅通道，用于存放回调函数
- 执行一次Generator对象iterator的next，根据结果执行对应类型的effect

```javascript
function proc(env, iterator, parentContext, parentEffectId, meta, cont) {
  
  const taskContext = Object.create(parentContext)
  const finalRunEffect = env.finalizeRunEffect(runEffect)
  const task = newTask(parentEffectId, meta, cont)
  const mainTask = { meta, cancel: cancelMain, _isRunning: true, _isCancelled: false }

  const taskQueue = forkQueue(
    mainTask,
    function onAbort() {
      cancelledDueToErrorTasks.push(...taskQueue.getTaskNames())
    },
    end,
  )
  next()

  return task
}
```

## runEffec函数

runEffect根据类型执行逻辑：如果是take类型，封装回调加入当前作用域下的事件channel，初始化操作完成；如果是fork，进入proc逻辑。

```javascript
function runEffect(effect, effectId, currCb) {
    if (is.promise(effect)) {
      resolvePromise(effect, currCb)
    } else if (is.iterator(effect)) {
      resolveIterator(effect, effectId, meta, currCb)
    } else if (effect && effect[IO]) {
      const { type, payload } = effect
      if (type === effectTypes.TAKE) runTakeEffect(payload, currCb)
      else if (type === effectTypes.PUT) runPutEffect(payload, currCb)
      else if (type === effectTypes.ALL) runAllEffect(payload, effectId, currCb)
      else if (type === effectTypes.RACE) runRaceEffect(payload, effectId, currCb)
      else if (type === effectTypes.CALL) runCallEffect(payload, effectId, currCb)
      else if (type === effectTypes.CPS) runCPSEffect(payload, currCb)
      else if (type === effectTypes.FORK) runForkEffect(payload, effectId, currCb)
      else if (type === effectTypes.JOIN) runJoinEffect(payload, currCb)
      else if (type === effectTypes.CANCEL) runCancelEffect(payload, currCb)
      else if (type === effectTypes.SELECT) runSelectEffect(payload, currCb)
      else if (type === effectTypes.ACTION_CHANNEL) runChannelEffect(payload, currCb)
      else if (type === effectTypes.FLUSH) runFlushEffect(payload, currCb)
      else if (type === effectTypes.CANCELLED) runCancelledEffect(payload, currCb)
      else if (type === effectTypes.GET_CONTEXT) runGetContextEffect(payload, currCb)
      else if (type === effectTypes.SET_CONTEXT) runSetContextEffect(payload, currCb)
      else currCb(effect)
    } else {
      // anything else returned as is
      currCb(effect)
    }
}
```

next是一个自动执行函数

```javascript
function next(arg, isErr) {
    if (!mainTask._isRunning) {
      throw new Error('Trying to resume an already finished generator')
    }

    try {
      let result
      if (isErr) {
        result = iterator.throw(arg)
      } else if (shouldCancel(arg)) {
        mainTask._isCancelled = true
        
        next.cancel()
        
        result = is.func(iterator.return) ? iterator.return(TASK_CANCEL) : { done: true, value: TASK_CANCEL }
      } else if (shouldTerminate(arg)) {
        result = is.func(iterator.return) ? iterator.return() : { done: true }
      } else {
        result = iterator.next(arg)
      }

      if (!result.done) {
        digestEffect(result.value, parentEffectId, '', next)
      } else {
        mainTask._isRunning = false
        mainTask.cont(result.value)
      }
    } catch (error) {
      if (mainTask._isCancelled) {
        env.logError(error)
      }
      mainTask._isRunning = false
      mainTask.cont(error, true)
    }
  }
```

需要特别注意下sagaHelpers的实现，例如takeEveryHelper，它返回一个类iterator的对象，便于后续的遍历和执行。<br />当有redux事件进来时，会触发channel中的事件回调。回调函数是基于proc中next函数的封装，执行过程会触发一次fork和take，takeEvery借助的takeEveryHelper核心逻辑

```javascript
function takeEveryHelper(patternOrChannel, worker, ...args) {
  const yTake = { done: false, value: take(patternOrChannel) }
  const yFork = ac => ({ done: false, value: fork(worker, ...args, ac) }) 
  let action, setAction = ac => (action = ac)
  // 创建iterator函数，实现自定义next逻辑：q1() -> q2() -> q1() 循环进行下去
  // 执行第一步，会进入runTake逻辑
  // 执行第二步，会进入runFork，在runFork中会再执行一次runTake
  // 因此函数会按照：  q1()  -->   q2()->q1()  -->  q2()->q1()  --> ...  这种循环执行下去
  return fsmIterator(
    {
      q1() {
        return ['q2', yTake, setAction]
      },
      q2() {  // 触发事件时，进行此步操作，返回一个fork对象
        return action === END ? [qEnd] : ['q1', yFork(action)]
      },
    },
    'q1',
    `takeEvery(${safeName(patternOrChannel)}, ${worker.name})`,
  )
}

function fsmIterator(fsm, q0, name = 'iterator') {
  let updateState,
    qNext = q0

  function next(arg, error) {
    ...
    let [q, output, _updateState] = fsm[qNext]()
    qNext = q
    return qNext === qEnd ? done : output
  }
  // 封装返回iterator类型对象
  return makeIterator(next, error => next(null, error), name, true)
}
```

## Effect

Effect就是一个个对象，而这些对象的解释则交给上面的runEffect来进行<br />以put—effect为例解释来看

```javascript
function runPutEffect({ channel, action, resolve }, cb) {
    asap(() => {
      let result
      try {
      // dispatch相应的action
        result = (channel ? channel.put : env.dispatch)(action)
      } catch (error) {
        cb(error, true)
        return
      }
      if (resolve && is.promise(result)) {
        resolvePromise(result, cb)
      } else {
        cb(result)
      }
    })
  }
```

<a name="25f9c7fa"></a>
## 总结

中间件做的事情

- 根据你传入的generator函数，next执行
- generator函数中，存在一些副作用操作，比如put、call、race等，然后根据这些操作再进行其他的操作，而这些操作只做了一件事情，就是生成effect<br />
内部逻辑：
- proc：proc是运行的核心，effect方法适配其运行机制。
- 事件channel：每次proc执行都会生成一个事件channel，如果当前上下文执行逻辑后有take类型，那么会往channel中塞入对应的回调函数，否则channel为空。redux的action会通过sagaEmitter.emit(action)触发事件channel中的回调，如果channel中事件匹配的回调，执行对应逻辑。
- fork：可以对比linux中fork进行理解。每次fork都会执行proc函数生成一个新的task。
- take:  塞入当前作用域下的事件channel一个回调函数，此回调函数的主逻辑是proc中的next函数。
- put：遍历事件channel，执行匹配的回调
