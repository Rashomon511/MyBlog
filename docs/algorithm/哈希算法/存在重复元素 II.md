# 存在重复元素 II-简单

难度：简单<br />
<br />题目描述：<br />给定一个整数数组和一个整数  k，判断数组中是否存在两个不同的索引  i  和  j，使得  nums [i] = nums [j]，并且 i 和 j  的差的 绝对值 至多为 k。<br />
<br />示例：

```javascript
输入: (nums = [1, 2, 3, 1]), (k = 3);
输出: true;
```

<br />
<br />解题思路：<br />利用哈希表<br />

```javascript
var containsNearbyDuplicate = function (nums, k) {
  let map = new Map();
  for (let i in nums) {
    if (map.has(nums[i])) {
      if (Math.abs(map.get(nums[i]) - i) <= k) {
        return true;
      } else {
        map.set(nums[i], i);
      }
    } else {
      map.set(nums[i], i);
    }
  }
  return false;
};
```
