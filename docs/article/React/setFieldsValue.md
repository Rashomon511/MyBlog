---
title: setFieldsValue修改表单域value无效
---

# onChange 回调中 setFieldsValue 修改自身表单域 value 无效

>在业务中遇到需要在onChange中使用setFieldsValue修改表单值的需求，但是出现无效的状况，
我们来看以下例子
<!-- more -->
> 例子一
```angular2html
  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }
  
  changeValue = (value) => {
        this.props.form.setFieldsValue({
      note: 'Time',
    });
  }
...
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item
          label="Note"
        >
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input onchange={this.changeValue}/>
          )}
        </Form.Item>
        <Form.Item
          label="Gender"
        >
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
...
```
从上面的例子可以发现handleSelectChange回调中设置值有效，changeValue回调中设置无效。因此在当前表单回调中设置
该表单的值，setFieldsValue方法会无效。

> 例子二

我们再对changeValue进行一点改动,我们在 onChange 回调中尝试引入 setTimeout(func, 0)这种非同步的方式来调用 setFieldsValue， 运行发现该设置有效。
```angular2html
  changeValue = (value) => {
    setTimeout(() =>{this.props.form.setFieldsValue({
      note: 'Time'
    })}, 0)
  }
```
导致这样对结果可能是：Form 组件在调用了我们的 onChange 后，再调用自己内部的 setFieldsValue 来同步页面数据，这样的话我们执行的 setFieldsValue 就相当于被覆盖掉了。

> 结合源码：
```angular2html
  // 对应到我们例子一的话，这里的三个参数分别是：'username', 'onChange', event
  onCollectCommon(name, action, args) {
    const fieldMeta = this.fieldsStore.getFieldMeta(name);
    if (fieldMeta[action]) {
      // 相当于执行了 onChange(...args)，这里会触发 setFieldsValue 操作
      fieldMeta[action](...args);
    } ...
    ...
  },

  // 当有新的状态变化时会触发 Form 组件重新收集值
  onCollect(name_, action, ...args) {
    // 对 username 的输入做出响应 this.onCollectCommon('username', 'onChange', args)
    // 此处先执行了用户自定义的 onChange 带件，即先调用调用了用户自定义的  setFieldsValue
    const { name, field, fieldMeta } = this.onCollectCommon(name_, action, args);
    ...
    // 更新 fieldStore 中 username 的值，并执行 forceUpdate
    // 此为后续调用，即用户自定义的会被后调用的这个 setFields({ username: newField }) 覆盖
    this.setFields({[name]: newField });
  },

  setFieldsValue(changedValues, callback) {
    ...
    // 更新 fieldStore 中 username 的值，并执行 forceUpdate
    this.setFields(newFields, callback);
    ...
  },

  setFields(maybeNestedFields, callback) {
    ...
    // forceUpdate 类似于 setState，同步代码段里多个 forceUpdate 也会被优化最终只 render 一次
    this.forceUpdate(callback);
  },
```

我们发现在 Antd-From 组件表单域 onChange 回调中 setFieldsValue 修改自身表单域 value 无效的问题是因为用户自定义的 setFieldsValue 先于 createBaseForm.js 中同步状态值的 setFields调用，导致用户对于同个 setFields 的修改并不生效。只是我们这样对解决方法会导致render两次。

但是我们有更优对解决方案：
options.getValueFromEvent不仅简化了代码，还确保了不会触发二次 render。可以把 onChange 的参数（如 event）转化为控件的值
                         
