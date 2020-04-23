# 反转字符串 II

<br />难度：简单<br />
<br />题目描述：<br />给定一个字符串和一个整数 k，你需要对从字符串开头算起的每个 2k 个字符的前 k 个字符进行反转。如果剩余少于 k 个字符，则将剩余的所有全部反转。如果有小于 2k 但大于或等于 k 个字符，则反转前 k 个字符，并将剩余的字符保持原样。<br />
<br />示例：

```javascript
输入: (s = "abcdefg"), (k = 2);
输出: "bacdfeg";
```

<br />
<br />解题思路：

- 将 s 分割为 2k 长度字符串并存入数组
- 遍历数组当 item 长度小于 k 个，全部反转，否则反转前 k 个字符串

```javascript
var reverseStr = function (s, k) {
  let arr = [];
  let i = 0;
  let str = "";
  while (i < s.length) {
    arr.push(s.slice(i, 2 * k + i));
    i = 2 * k + i;
  }
  arr.forEach((item) => {
    if (item.length <= 2 * k && item.length >= k) {
      str +=
        item.slice(0, k).split("").reverse().join("") +
        item.slice(k, item.length);
    } else {
      str += item.split("").reverse().join("");
    }
  });
  return str;
};
```
