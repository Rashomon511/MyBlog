# 打家劫舍 II-中等

<br />难度：中等<br />
<br />题目描述：<br />你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。<br />
<br />给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。<br />
<br />示例：

```javascript
输入: [2,3,2]
输出: 3
解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
```

解题思路：<br />计算从 0 偷 n-1 户的最大值，与从 1 到 n 的最大值，比较两个值

```javascript
var rob = function (nums) {
  const n = nums.length;
  if (n === 1) return nums[0];
  return Math.max(robbing(nums.slice(0, n - 1)), robbing(nums.slice(1, n)));
};

// LeetCode 198
function robbing(nums) {
  const n = nums.length;
  // 状态：dp[i]表示经历前i个房子能获取的最大价值
  const dp = Array.from({ length: n + 1 }, () => 0);
  // 迭代
  for (let i = 1; i <= n; ++i) {
    dp[i] = Math.max(
      dp[i - 1], // 不偷i
      nums[i - 1] + (i - 2 >= 0 ? dp[i - 2] : 0) // 偷i
    );
  }
  // 目标
  return dp[n];
}
```
