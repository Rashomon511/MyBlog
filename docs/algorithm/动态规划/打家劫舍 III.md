# 打家劫舍 III-中等

难度：中等<br />
<br />题目描述：<br />在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。<br />
<br />计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。<br />
<br />示例：

```javascript
输入: [3,2,3,null,3,null,1]

     3
    / \
   2   3
    \   \
     3   1

输出: 7
解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.

```

<br />解题思路：

```javascript
var rob = function (root) {
  return help(root);
};

function help(node) {
  if (!node) return 0;
  // 偷取根节点
  let res1 = 0;
  if (node.left) {
    res1 += help(node.left.left) + help(node.left.right);
  }
  if (node.right) {
    res1 += help(node.right.left) + help(node.right.right);
  }
  res1 += node.val;

  // 不偷去根节点
  let res2 = help(node.left) + help(node.right);
  return Math.max(res1, res2);
}
```
