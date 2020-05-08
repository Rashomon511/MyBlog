# 买卖股票的最佳时机 IV-困难

难度：困难<br />
<br />题目描述：<br />给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。<br />
<br />设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。<br />
<br />注意:  你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）<br />
<br />示例：

```javascript
输入: [2,4,1], k = 2
输出: 2
解释: 在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
```

<br />解题思路：<br />第一个 for 循环，初始化 k 次交易买入和卖出时的利润，我把每次交易买入，卖出时的利润放在一个对象中，这样就把三维变成一维了

```javascript
var maxProfit = function (k, prices) {
  let n = prices.length;
  if (k > n / 2) {
    k = Math.floor(n / 2); //这样也可以，但其实增加了时间复杂度和内存消耗
    // return maxProfit_k_infinity(prices); //也可以
  }
  let profit = new Array(k);
  //初始化买入卖出时的利润
  for (let j = 0; j <= k; j++) {
    profit[j] = {
      profit_in: -prices[0],
      profit_out: 0,
    };
  }
  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      profit[j] = {
        profit_out: Math.max(
          profit[j].profit_out,
          profit[j].profit_in + prices[i]
        ),
        profit_in: Math.max(
          profit[j].profit_in,
          profit[j - 1].profit_out - prices[i]
        ),
      };
    }
  }
  return profit[k].profit_out;
};
```
