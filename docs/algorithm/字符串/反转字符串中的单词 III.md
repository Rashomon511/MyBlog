# 反转字符串中的单词 III

**难度：简单**<br />**描述：** <br />给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序

**示例 1:**<br />输入: "Let's take LeetCode contest"<br />输出: "s'teL ekat edoCteeL tsetnoc"****** ******

**思路分析：**<br /> 1. 字符串按空格进行分隔，保存数组，数组的元素的先后顺序就是单词的顺序<br /> 2. 对数组进行遍历，然后每个元素进行反转

**代码实现:**
```javascript
export default (str) => {
  // 字符串按空格进行分隔，保存数组，数组的元素的先后顺序就是单词的顺序
  let arr = str.split(' ')
  // 对数组进行遍历，然后每个元素进行反转
  let result = arr.map(item => {
    return item.split('').reverse().join('')
  })
  return result.join(' ')
}

export default (str) => {
  // 1. 字符串按空格进行分隔，保存数组，数组的元素的先后顺序就是单词的顺序
  // 2. 对数组进行遍历，然后每个元素进行反转
  return str.split(' ').map(item => {
    return item.split('').reverse().join('')
  }).join(' ')
}

export default (str) => {
  // 1. 字符串按空格进行分隔，保存数组，数组的元素的先后顺序就是单词的顺序
  // 2. 对数组进行遍历，然后每个元素进行反转
  return str.split(/\s/g).map(item => {
    return item.split('').reverse().join('')
  }).join(' ')
}

export default (str) => {
  // 1. 字符串按空格进行分隔，保存数组，数组的元素的先后顺序就是单词的顺序
  // 2. 对数组进行遍历，然后每个元素进行反转
  return str.match(/[\w']+/g).map(item => {
    return item.split('').reverse().join('')
  }).join(' ')
}
```

