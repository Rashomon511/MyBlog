# 杨辉三角 II-简单

难度：简单<br />
<br />题目描述：<br />给定一个非负索引  *k*，其中  *k* ≤ 33，返回杨辉三角的第  *k *行。

示例：

```javascript
输入: 3;
输出: [1, 3, 3, 1];
```

<br />
<br />解题思路：<br />同杨辉三角一样的思路
```javascript
var getRow = function(n) {
      let i = 0;
      let data = [];
      let pre = 0;
      let cur = 0;
      while (i < n + 1) {
        let arr = [];
        if (i === 0) {
          arr[i] = 1;
        } else {
          for (let j = 0; j < i + 1; j++) {
            pre = data[i - 1][j - 1] || 0;
            cur = data[i - 1][j] || 0;
            arr[j] = pre + cur;
          }
        }
        data.push(arr);
        i++;
      }
      return data[n];
};
```

<br />公式法

```javascript
var getRow = function (rowIndex) {
  let curr = 1;
  const ary = [];

  for (let i = 0; i <= rowIndex; i++) {
    ary[i] = curr;
    curr = (curr * (rowIndex - i)) / (i + 1);
  }

  return ary;
};
```
