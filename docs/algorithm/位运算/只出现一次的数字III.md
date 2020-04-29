# 只出现一次的数字 III-中等

难度：中等<br />
<br />题目描述：<br />给定一个整数数组  `nums`，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。

示例：

```javascript
输入: [1, 2, 1, 3, 2, 5];
输出: [3, 5];
```

<br />解题思路：<br />对数组进行排序<br />遍历数组进行异或运算，若前后不相等则存入新数组，并前进一位<br />若相等则前进两位<br />注意元素为零时的特殊情况

```javascript
var singleNumber = function (data) {
  let nums = data.sort((a, b) => {
    return a - b;
  });
  let arr = [];
  for (let i = 0; i < nums.length; ) {
    if (
      (nums[i] ^ nums[i + 1]) != 0 ||
      (nums[i] !== nums[i + 1] && nums[1] === 0)
    ) {
      arr.push(nums[i]);
      i += 1;
    } else {
      i += 2;
    }
  }
  return arr;
};
```
