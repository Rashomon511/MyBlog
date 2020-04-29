# 只出现一次的数字 II-中等

难度：中等<br />
<br />题目描述：<br />给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。<br />
<br />说明：<br />
<br />你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？<br />
<br />示例：

```javascript
输入: [2, 2, 3, 2];
输出: 3;
```

<br />解题思路：<br />排序，升序或降序均可<br />循环，每三组进行相加，并判断是否等于第一项的三倍<br />相同的话说明三个数字相同<br />不同的话，说明肯定存在不同的数字<br />进行异或<br />循环完后还没有，则最后一个是<br />

```javascript
var singleNumber = function (nums) {
  nums = nums.sort((a, b) => a - b);
  for (var i = 2; i < nums.length; i += 3) {
    if (nums[i] + nums[i - 1] + nums[i - 2] !== nums[i] * 3) {
      return nums[i] ^ nums[i - 1] ^ nums[i - 2];
    }
  }

  return nums[nums.length - 1];
};
```
