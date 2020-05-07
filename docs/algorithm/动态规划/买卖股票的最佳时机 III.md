# 买卖股票的最佳时机 III-困难

难度：困难<br />
<br />
<br />题目描述：<br />给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。<br />
<br />设计一个算法来计算你所能获取的最大利润。你最多可以完成   两笔   交易。<br />
<br />注意:  你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。<br />
<br />示例：

```javascript
输入: [3,3,5,0,0,3,1,4]
输出: 6
解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
```

<br />
<br />解题思路：<br />分别利用动态规划计算前半段交易和后半段交易的最大收益
```javascript
var maxProfit = function(data) {
      let min = data[0];
      let max = 0;
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i] < min) {
          min = data[i];
        }
        max = Math.max(max, data[i] - min);
        let arr = data.slice(i + 1);
        let mins = arr[0];
        let maxs = 0;
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] < mins) {
            mins = arr[j];
          }
          maxs = Math.max(maxs, arr[j] - mins);
        }
        sum = Math.max(sum, max + maxs);
      }
      return sum;
};
```
