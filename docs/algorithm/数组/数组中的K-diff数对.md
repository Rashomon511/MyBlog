# 数组中的 K-diff 数对-简单

难度：简单<br />
<br />题目描述：<br />给定一个整数数组和一个整数  k, 你需要在数组里找到不同的  k-diff 数对。这里将  k-diff  数对定义为一个整数对 (i, j), 其中 i 和 j 都是数组中的数字，且两数之差的绝对值是  k.<br />
<br />示例:

```javascript
输入: [3, 1, 4, 1, 5], k = 2
输出: 2
解释: 数组中有两个 2-diff 数对, (1, 3) 和 (3, 5)。
尽管数组中有两个1，但我们只应返回不同的数对的数量。
```

<br />题目解析：<br />两数之和的变形，对于任何一个`n`，寻找`n - k`和`n + k`，我们只需要记录 diff 对中左值(最小)即可

```javascript
function thirdMax(nums, k) {
  if (k < 0) return 0;
  let visit = new Set(),
    map = new Set();

  for (let n of nums) {
    if (visit.has(n - k)) {
      map.add(n - k); //2
    }
    if (visit.has(n + k)) {
      map.add(n); // 2
    }
    visit.add(n);
  }
  return map.size;
}
```
