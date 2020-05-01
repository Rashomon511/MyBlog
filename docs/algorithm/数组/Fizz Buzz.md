# Fizz Buzz-简单

难度：简单<br />
<br />题目描述<br />写一个程序，输出从 1 到 n 数字的字符串表示。<br />
<br />1. 如果  n  是 3 的倍数，输出“Fizz”；<br />
<br />2. 如果  n  是 5 的倍数，输出“Buzz”；<br />
<br />3.如果  n  同时是 3 和 5 的倍数，输出 “FizzBuzz”。<br />
<br />示例：

```javascript
n = 15,

返回:
[
    "1",
    "2",
    "Fizz",
    "4",
    "Buzz",
    "Fizz",
    "7",
    "8",
    "Fizz",
    "Buzz",
    "11",
    "Fizz",
    "13",
    "14",
    "FizzBuzz"
]
```

<br />解题思路：<br />循环即可<br />

```javascript
var fizzBuzz = function (n) {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      arr.push("FizzBuzz");
    } else if (i % 3 === 0) {
      arr.push("Fizz");
    } else if (i % 5 === 0) {
      arr.push("Buzz");
    } else {
      arr.push(`${i}`);
    }
  }
  return arr;
};
```
