(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{266:function(e,s,n){"use strict";n.r(s);var a=n(0),t=Object(a.a)({},(function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"onchange-回调中-setfieldsvalue-修改自身表单域-value-无效"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#onchange-回调中-setfieldsvalue-修改自身表单域-value-无效","aria-hidden":"true"}},[e._v("#")]),e._v(" onChange 回调中 setFieldsValue 修改自身表单域 value 无效")]),e._v(" "),n("blockquote",[n("p",[e._v("在业务中遇到需要在onChange中使用setFieldsValue修改表单值的需求，但是出现无效的状况，\n我们来看以下例子\n"),e._v("\n例子一")])]),e._v(" "),n("div",{staticClass:"language-angular2html line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("  handleSelectChange = (value) => {\n    console.log(value);\n    this.props.form.setFieldsValue({\n      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,\n    });\n  }\n  \n  changeValue = (value) => {\n        this.props.form.setFieldsValue({\n      note: 'Time',\n    });\n  }\n...\n      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>\n        <Form.Item\n          label=\"Note\"\n        >\n          {getFieldDecorator('note', {\n            rules: [{ required: true, message: 'Please input your note!' }],\n          })(\n            <Input onchange={this.changeValue}/>\n          )}\n        </Form.Item>\n        <Form.Item\n          label=\"Gender\"\n        >\n          {getFieldDecorator('gender', {\n            rules: [{ required: true, message: 'Please select your gender!' }],\n          })(\n            <Select\n              placeholder=\"Select a option and change input text above\"\n              onChange={this.handleSelectChange}\n            >\n              <Option value=\"male\">male</Option>\n              <Option value=\"female\">female</Option>\n            </Select>\n          )}\n        </Form.Item>\n        <Form.Item\n          wrapperCol={{ span: 12, offset: 5 }}\n        >\n          <Button type=\"primary\" htmlType=\"submit\">\n            Submit\n          </Button>\n        </Form.Item>\n      </Form>\n...\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br"),n("span",{staticClass:"line-number"},[e._v("25")]),n("br"),n("span",{staticClass:"line-number"},[e._v("26")]),n("br"),n("span",{staticClass:"line-number"},[e._v("27")]),n("br"),n("span",{staticClass:"line-number"},[e._v("28")]),n("br"),n("span",{staticClass:"line-number"},[e._v("29")]),n("br"),n("span",{staticClass:"line-number"},[e._v("30")]),n("br"),n("span",{staticClass:"line-number"},[e._v("31")]),n("br"),n("span",{staticClass:"line-number"},[e._v("32")]),n("br"),n("span",{staticClass:"line-number"},[e._v("33")]),n("br"),n("span",{staticClass:"line-number"},[e._v("34")]),n("br"),n("span",{staticClass:"line-number"},[e._v("35")]),n("br"),n("span",{staticClass:"line-number"},[e._v("36")]),n("br"),n("span",{staticClass:"line-number"},[e._v("37")]),n("br"),n("span",{staticClass:"line-number"},[e._v("38")]),n("br"),n("span",{staticClass:"line-number"},[e._v("39")]),n("br"),n("span",{staticClass:"line-number"},[e._v("40")]),n("br"),n("span",{staticClass:"line-number"},[e._v("41")]),n("br"),n("span",{staticClass:"line-number"},[e._v("42")]),n("br"),n("span",{staticClass:"line-number"},[e._v("43")]),n("br"),n("span",{staticClass:"line-number"},[e._v("44")]),n("br"),n("span",{staticClass:"line-number"},[e._v("45")]),n("br"),n("span",{staticClass:"line-number"},[e._v("46")]),n("br"),n("span",{staticClass:"line-number"},[e._v("47")]),n("br")])]),n("p",[e._v("从上面的例子可以发现handleSelectChange回调中设置值有效，changeValue回调中设置无效。因此在当前表单回调中设置\n该表单的值，setFieldsValue方法会无效。")]),e._v(" "),n("blockquote",[n("p",[e._v("例子二")])]),e._v(" "),n("p",[e._v("我们再对changeValue进行一点改动,我们在 onChange 回调中尝试引入 setTimeout(func, 0)这种非同步的方式来调用 setFieldsValue， 运行发现该设置有效。")]),e._v(" "),n("div",{staticClass:"language-angular2html line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("  changeValue = (value) => {\n    setTimeout(() =>{this.props.form.setFieldsValue({\n      note: 'Time'\n    })}, 0)\n  }\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br")])]),n("p",[e._v("导致这样对结果可能是：Form 组件在调用了我们的 onChange 后，再调用自己内部的 setFieldsValue 来同步页面数据，这样的话我们执行的 setFieldsValue 就相当于被覆盖掉了。")]),e._v(" "),n("blockquote",[n("p",[e._v("结合源码：")])]),e._v(" "),n("div",{staticClass:"language-angular2html line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("  // 对应到我们例子一的话，这里的三个参数分别是：'username', 'onChange', event\n  onCollectCommon(name, action, args) {\n    const fieldMeta = this.fieldsStore.getFieldMeta(name);\n    if (fieldMeta[action]) {\n      // 相当于执行了 onChange(...args)，这里会触发 setFieldsValue 操作\n      fieldMeta[action](...args);\n    } ...\n    ...\n  },\n\n  // 当有新的状态变化时会触发 Form 组件重新收集值\n  onCollect(name_, action, ...args) {\n    // 对 username 的输入做出响应 this.onCollectCommon('username', 'onChange', args)\n    // 此处先执行了用户自定义的 onChange 带件，即先调用调用了用户自定义的  setFieldsValue\n    const { name, field, fieldMeta } = this.onCollectCommon(name_, action, args);\n    ...\n    // 更新 fieldStore 中 username 的值，并执行 forceUpdate\n    // 此为后续调用，即用户自定义的会被后调用的这个 setFields({ username: newField }) 覆盖\n    this.setFields({[name]: newField });\n  },\n\n  setFieldsValue(changedValues, callback) {\n    ...\n    // 更新 fieldStore 中 username 的值，并执行 forceUpdate\n    this.setFields(newFields, callback);\n    ...\n  },\n\n  setFields(maybeNestedFields, callback) {\n    ...\n    // forceUpdate 类似于 setState，同步代码段里多个 forceUpdate 也会被优化最终只 render 一次\n    this.forceUpdate(callback);\n  },\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br"),n("span",{staticClass:"line-number"},[e._v("25")]),n("br"),n("span",{staticClass:"line-number"},[e._v("26")]),n("br"),n("span",{staticClass:"line-number"},[e._v("27")]),n("br"),n("span",{staticClass:"line-number"},[e._v("28")]),n("br"),n("span",{staticClass:"line-number"},[e._v("29")]),n("br"),n("span",{staticClass:"line-number"},[e._v("30")]),n("br"),n("span",{staticClass:"line-number"},[e._v("31")]),n("br"),n("span",{staticClass:"line-number"},[e._v("32")]),n("br"),n("span",{staticClass:"line-number"},[e._v("33")]),n("br")])]),n("p",[e._v("我们发现在 Antd-From 组件表单域 onChange 回调中 setFieldsValue 修改自身表单域 value 无效的问题是因为用户自定义的 setFieldsValue 先于 createBaseForm.js 中同步状态值的 setFields调用，导致用户对于同个 setFields 的修改并不生效。只是我们这样对解决方法会导致render两次。")]),e._v(" "),n("p",[e._v("但是我们有更优对解决方案：\noptions.getValueFromEvent不仅简化了代码，还确保了不会触发二次 render。可以把 onChange 的参数（如 event）转化为控件的值")])])}),[],!1,null,null,null);s.default=t.exports}}]);