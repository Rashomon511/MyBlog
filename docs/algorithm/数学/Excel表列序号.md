# Excel 表列序号-简单

难度：简单<br />
<br />题目描述：<br />给定一个 Excel 表格中的列名称，返回其相应的列序号。<br />A -> 1<br />    B -> 2<br />    C -> 3<br />    ...<br />    Z -> 26<br />    AA -> 27<br />    AB -> 28<br />
<br />示例：

```javascript
输入: "A";
输出: 1;
输入: "AB";
输出: 28;
```

<br />
<br />解题思路：<br />从末尾开始取得每一个字符对应的数cur = c.charCodeAt() - 64<br />数字总和sum += 当前数 * 进制位数<br />进制位数 *= 26，初始化进制位数carry = 1<br />

```javascript
var titleToNumber = function (s) {
  let sum = 0,
    i = s.length - 1,
    carry = 1;

  while (i >= 0) {
    let cur = s[i].charCodeAt() - 64;

    sum += cur * carry;
    carry *= 26;
    i--;
  }

  return sum;
};
```
