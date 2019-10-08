---
layout: post
title: react中的key值
---

# react中key的属性和用法

在代码中，我们很容易忽略react中的key值，当我们动态的生产react元素时。并且这个元素包含多个且不确定时，
如果没有key值，浏览器就会警告
<!-- more -->
>Warning: Each child in an array or iterator should have a unique "key" prop.
例如：
```
  renderProduct = () => {
    const { application: { product } } = this.props;
    return product.map(
      item => <Option value={item.id}>{item.productName}</Option>);
  };
```

这时我们就需要key这个属性, 这里的key具有唯一性，
```
  renderProduct = () => {
    const { application: { product } } = this.props;
    return product.map(
      item => <Option value={item.id} key={item.id}>{item.productName}</Option>);
  };
```

我们知道当组件的属性发生了变化，其 render 方法会被重新调用，组件会被重新渲染。
那么，为数组中的元素传一个唯一的 key（比如ID），就很好地解决了这个问题。React 比较更新前后的元素 key 值，如果相同则更新，如果不同则销毁之前的，重新创建一个元素。

那么有人会问，为什么只有数组中的元素需要有唯一的 key，而其他的元素（比如上面的<h3>用户列表</h3>）则不需要呢？答案是：React 有能力辨别出，更新前后元素的对应关系。
这一点，也许直接看 JSX 不够明显，看 Babel 转换后的 React.createElement 则清晰很多
```
// 转换前
const element = (
  <div>
    <h3>example</h3>
    {[<p key={1}>hello</p>, <p key={2}>world</p>]}
  </div>
);

// 转换后
"use strict";

var element = React.createElement(
  "div",
  null,
  React.createElement("h3",null,"example"),
  [
    React.createElement("p",{ key: 1 },"hello"),
    React.createElement("p",{ key: 2 },"world")
  ]
);
```

不管 props 如何变化，数组外的每个元素始终出现在 React.createElement() 参数列表中的固定位置，这个位置就是天然的 key。

那我们可以在哪里用上key呢？

>也就是需要动态渲染的子组件上用
在项目中，该表单由多个相同的表单子组件组成，
![](/img/reactkey/key.jpeg)

```
  renderEnvForm = (formItemLayout, env) => {
    const { getFieldDecorator } = this.props.form;
    const { keys, change } = this.state;
    const forItem = keys.map((k) => {
      return (
        <FormItem
          {...formItemLayout}
          label="软件环境"
          required={false}
          key={k}
        >
          {getFieldDecorator(`envId[${k}]`, {
            rules: [{ required: true, message: '请输入' }],
            initialValue: !change ? this.getInitialValue(k) : '',
          })(
            <Select
              showSearch
              placeholder="请选择软件环境"
              disabled={env.length === 0}
              style={{ width: '78%' }}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.renderWebEnv(env)}
            </Select>
          )}
          <Icon
            style={{ marginLeft: 10 }}
            type="plus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.add()}
          />
          <Icon
            style={{ marginLeft: 10 }}
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      );
    });
    return forItem;
  };
```
每个组件都有唯一的key值，但组件产生变化时，react可以根据key值来判断渲染哪一个组件，从而导致不出错。