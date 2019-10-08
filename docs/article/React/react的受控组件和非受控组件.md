---
layout: post
title: react的受控组件和非受控组件
---

# react的受控组件和非受控组件

现在写这个主要是在项目中使用antd的组件input的过程中遇到了问题，才发现之前没有很理解react的受控组件和非受控组件。
至于我的问题是什么呢！
<!-- more -->
我要实现的功能：
>1、支持传入默认值；

>2、可控：组件外部修改props可改变input组件的真实值及显示值；

>3、非可控：输入框中输入值，可同时改变input组件的真实值及显示值

遇到的问题：

就是在使用过程中在input框的defalutValue传递props.value赋默认值后，这导致了即使后续prop.value值改变，defaulteValue也不会改变，原因是什么呢！原来React的form表单组件中的defaultValue一经传递值后，后续改变defaultValue都将不起作用，被忽略了。
此处：如果使用value代替defaultValue,会发现输入框的值无法改变。

怎么解决这个问题！这就涉及到react的受控组件和非受控组件了。具体来说这是一种react非受控组件，其状态是在input的react内部控制，不受调用者控制。可以使用受控组件来实现。

## 受控组件

就形式上来说，受控组件就是为某个form表单组件添加value属性；非受控组件就是没有添加value属性的组件；，受控组件的形式如下形式：

```
<input type="text" value="Hello!" />;

```

这种写法带来一个问题：渲染后的input组件的用户交互，用户输入的任何值将不起作用，input输入框中的值始终为Hello!。
为了控制该组件，就需要能能够控制input组件的值，需要借助其内部的状态state，即组件内部要维护一个状态state以便配合input组件的onChange和setState方法来完成对组件的控制。

解决方法：可以将props的value赋给组件内部状态的state:

```
componentWillReceiveProps(nextProps) {
      this.setState({
      value: nextProps.value
      });
  }
```

onchange函数写法：

```
onchange = (e) => {
  this.setState({
    value: e.target.value,
  });
};

```
Input组件写法

```
<Input value={this.state.value} onChange={this.onChange}/>
```
这样就实现了我的功能。

## 非受控组件

表现形式上，react中没有添加value属性的表单组件元素就是非受控组件。表现形式如下：

```
<input type="text" />

```
## 总结
鉴于受控组件与非受控组件的特点，二者应用的地方也有所不同，主要表现在：

>受控元素，一般用在需要动态设置其初始值的情况；例如某些form表单信息编辑时，input表单元素需要初始显示服务器返回的某个值然后进行编辑。

> 非受控元素， 一般用于无任何动态初始值信息的情况； 例如form表单创建信息时，input表单元素都没有初始值，需要用户输入的情况
