# 前 K 个高频元素-中等

难度：中等<br />
<br />题目描述：<br />给定一个非空的整数数组，返回其中出现频率前  **_k _**高的元素。

示例：

```javascript
输入: (nums = [1, 1, 1, 2, 2, 3]), (k = 2);
输出: [1, 2];
```

<br />解题思路：

```javascript
var topKFrequent = function (nums, k) {
  let i = 0;
  let obj = {};
  let arr = [];
  while (i < nums.length) {
    if (obj[nums[i]]) {
      obj[nums[i]] = obj[nums[i]] + 1;
    } else {
      obj[nums[i]] = 1;
      arr.push(nums[i]);
    }
    i++;
  }
  arr.sort((a, b) => {
    return obj[b] - obj[a];
  });
  return arr.splice(0, k);
};
```
