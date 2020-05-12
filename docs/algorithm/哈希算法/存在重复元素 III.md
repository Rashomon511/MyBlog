# 存在重复元素 III-中等

难度：中等<br />
<br />题目描述：<br />给定一个整数数组，判断数组中是否有两个不同的索引 i 和 j，使得  nums [i] 和  nums [j]  的差的绝对值最大为 t，并且 i 和 j 之间的差的绝对值最大为 ķ。<br />
<br />示例：

```javascript
输入: (nums = [1, 2, 3, 1]), (k = 3), (t = 0);
输出: true;
```

<br />解题思路：<br />双重循环

```javascript
var containsNearbyAlmostDuplicate = function (nums, k, t) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let x = Math.abs(nums[i] - nums[j]);
      let n = Math.abs(i - j);
      if (x <= t && n <= k) {
        return true;
      }
    }
  }
  return false;
};
```

<br />参照官方题解该题可以使用桶排序的思想来设置查找表的 key - value。比较好理解的一个例子: 小敏生日在 3 月份, 她想知道是否有其他同学生日和她在 30 天以内, 假设每个月有 30 天, 那么只要找 2 月份和 4 月份两个月生日的同学就行了, 转化到该题目即 key 只要保留一个 value 就行。<br />

```javascript
var containsNearbyAlmostDuplicate = function (nums, k, t) {
  if (k < 0 || t < 0) return false;
  const getKey = (value) => {
    return Math.floor(value / (t + 1));
  };

  const map = new Map();

  let l = 0;
  while (l < nums.length) {
    const key = getKey(nums[l]);

    if (map.has(key)) {
      return true;
    } else if (map.has(key + 1) || map.has(key - 1)) {
      if (map.get(key + 1) - nums[l] <= t) {
        return true;
      }
      if (nums[l] - map.get(key - 1) <= t) {
        return true;
      }
    }

    map.set(key, nums[l]);

    if (l >= k) {
      map.delete(getKey(nums[l - k]));
    }

    l++;
  }

  return false;
};
```
