# 四数相加 II-中等

<br />难度：中等<br />
<br />题目描述：<br />给定四个包含整数的数组列表  A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得  A[i] + B[j] + C[k] + D[l] = 0。<br />
<br />为了使问题简单化，所有的 A, B, C, D 具有相同的长度  N，且 0 ≤ N ≤ 500 。所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过  231 - 1 。<br />
<br />示例：

```javascript
输入:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

输出:
2

解释:
两个元组如下:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0

```

<br />解题思路：

```javascript
var fourSumCount = function (A, B, C, D) {
  let count = 0;
  const dataMap = new Map();
  const length = A.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const sum = A[i] + B[j];
      let result = dataMap.get(sum);
      if (result) {
        dataMap.set(sum, ++result);
      } else {
        dataMap.set(sum, 1);
      }
    }
  }
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const sum = C[i] + D[j];
      let result = dataMap.get(0 - sum);
      if (result) {
        count += result;
      }
    }
  }
  return count;
};
```
