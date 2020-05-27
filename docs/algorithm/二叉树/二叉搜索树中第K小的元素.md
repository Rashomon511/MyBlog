# 二叉搜索树中第 K 小的元素-中等

难度：中等<br />
<br />题目描述：<br />给定一个二叉搜索树，编写一个函数  kthSmallest  来查找其中第  k  个最小的元素。<br />
<br />说明：<br />你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。<br />
<br />
<br />示例：

```javascript
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 1
```

<br />解题思路：

```javascript
var kthSmallest = function (root, k) {
  let count = 0;
  let res = -1;
  // 中序遍历，何为中序？
  // 即遍历顺序为：node.left -> node -> node.right
  // 为什么可以这么做？
  // BST特征决定：节点 N 左子树上的所有节点的值都小于等于节点 N 的值
  //          :  节点 N 右子树上的所有节点的值都大于等于节点 N 的值
  function order(node) {
    if (!node) {
      return;
    }
    order(node.left); // 如果left 一直存在，则一直深度遍历left
    if (count >= k) {
      // 提前终止
      return;
    }
    if (node.val !== null) {
      // 遍历一次中序节点，则找到的当前值为第count大，只要不为count 大，需要继续遍历（上一句逻辑）
      res = node.val;
      count++;
    }
    order(node.right);
  }
  order(root);
  return res;
};
```
