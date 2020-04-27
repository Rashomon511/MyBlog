# 反转链表 II-中等

难度：中等<br />
<br />题目描述：<br />反转从位置  *m*  到  *n*  的链表。请使用一趟扫描完成反转。

示例：

```javascript
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
1 ≤ m ≤ n ≤ 链表长度。
```

<br />
<br />解题思路：<br />申明cur、pre、next三个变量<br />循环链表，当循环到第m个元素时，存储pre的值不变化，将cur与next重新连接： cur.next = next.next; next.next = pre.next, 同时将pre.next 重新指向，同样规律遍历至第n个元素。最终得到结果
```javascript
var reverseBetween = function(head, m, n) {
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

```
