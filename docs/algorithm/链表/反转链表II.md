# 反转链表 II-中等

难度：中等<br />
<br />题目描述：<br />反转从位置  *m*  到  *n*  的链表。请使用一趟扫描完成反转。

示例：

```javascript
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
1 ≤ m ≤ n ≤ 链表长度。
```

解题思路：申明 cur、pre、next 三个变量循环链表，当循环到第 m 个元素时，存储 pre 的值不变化，将 cur 与 next 重新连接： cur.next = next.next; next.next = pre.next, 同时将 pre.next 重新指向，同样规律遍历至第 n 个元素。最终得到结果

```javascript
var reverseBetween = function (head, m, n) {
  let cur = head;
  let pre = new ListNode(null);
  let next = new ListNode(null);
  let i = 1;
  let s = cur;
  while (cur) {
    if (i < m) {
      pre = cur; // 获取pre
    }
    next = cur.next;
    if (i >= m && i < n && next) {
      let n = pre.next;
      cur.next = next.next;
      if (m !== 1) {
        pre.next = next;
      }

      next.next = m === 1 ? s : n;
      s = next;
    } else {
      cur = cur.next;
    }
    i++;
  }
  return m === 1 ? s : head;
};
```

即将需要反转的 m 到 n 区间的链表反转，再重新连接首尾即可

```javascript
var reverseBetween = function (head, m, n) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let tmpHead = dummy;
  // 找到第m-1个链表节点
  for (let i = 0; i < m - 1; i++) {
    tmpHead = tmpHead.next;
  }
  // 206题解法一
  let prev = null;
  let curr = tmpHead.next;
  for (let i = 0; i <= n - m; i++) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // 将翻转的部分链表 和 原链表拼接
  tmpHead.next.next = curr;
  tmpHead.next = prev;
  return dummy.next;
};
```
