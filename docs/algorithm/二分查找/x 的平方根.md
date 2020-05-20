# x 的平方根-简单

难度：简单<br />
<br />题目描述：<br />实现  int sqrt(int x)  函数。<br />
<br />计算并返回  x  的平方根，其中  x 是非负整数。<br />
<br />由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。<br />
<br />示例：

```javascript
输入: 8
输出: 2
说明: 8 的平方根是 2.82842...,
     由于返回类型是整数，小数部分将被舍去。
```

<br />
<br />解题思路：<br />先写出边界情况: 0、1的平方根分别是0、1<br />剩下就是 x>=2 的情况：<br />设置 left 和 right 左右边界<br />开启 while 循环，每次循环求出中位数 mid<br />如果 mid 的平方正好等于 x，则返回 mid<br />如果 mid 的平方小于 x，说明平方根落在 mid 和 right 之间，让 left=mid，向目标值逼近<br />如果 mid 的平方大于 x，说明平方根落在 left 和 mid 之间，让 right=mid，向目标值逼近<br />退出循环的条件是 left 和 right 边界不再形成区间，产出不了有意义的 mid<br />

```javascript
var mySqrt = function (x) {
  if (x < 2) return x;
  let left = 1,
    right = x >> 1;
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (mid === x / mid) {
      return mid;
    } else if (mid < x / mid) {
      left = mid;
    } else {
      right = mid;
    }
  }
  return right > x / right ? left : right;
};
```
