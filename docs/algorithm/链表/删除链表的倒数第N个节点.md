# 删除链表的倒数第 N 个节点-中等

难度: 中等<br />
<br />题目描述：<br />给定一个链表，删除链表的倒数第  *n *个节点，并且返回链表的头结点。

示例：

```javascript
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```

<br />
<br />解题思路：<br />其实只需要找到那个点，怎么再一次遍历中就找到呢，很简单，只需要把每个节点的序列保存到一个数据结构中，这个数据结构还保存着相邻父子节点的关系就可以了
```javascript
var removeNthFromEnd = function(head, n) {
    var hashmap = [], i = 0;
    while (head) {
        hashmap[i++] = head;
        head = head.next;
    }
    var cur = i - n;
    (hashmap[cur - 1] || {}).next = hashmap[cur + 1];
    if (cur == 0) return hashmap[1] || null;
    return hashmap[0];
};
```

<br />使用 2 个指针：<br />
<br />fast 快指针提前走 n+1 步<br />slow 指针指向当前距离 fast 倒数第 n 个节点， 初始为 head<br />然后， fast 、 slow 同步向前走，直到 fast.next 为 null<br />

```javascript
var removeNthFromEnd = function (head, n) {
  let preHead = new ListNode(0);
  preHead.next = head;
  let fast = preHead,
    slow = preHead;
  // 快先走 n+1 步
  while (n--) {
    fast = fast.next;
  }
  // fast、slow 一起前进
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return preHead.next;
};

var removeNthFromEnd = function (head, n) {
  let fast = head,
    slow = head;
  // 快先走 n 步
  while (--n) {
    fast = fast.next;
  }
  if (!fast.next) return head.next;
  fast = fast.next;
  // fast、slow 一起前进
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
};
```
