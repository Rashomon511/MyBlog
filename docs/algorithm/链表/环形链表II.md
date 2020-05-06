# 环形链表 II-中等

难度： 中等<br />
<br />
<br />题目描述：<br />给定一个链表，返回链表开始入环的第一个节点。  如果链表无环，则返回  null。<br />
<br />为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。<br />
<br />说明：不允许修改给定的链表<br />
<br />
<br />示例：

```javascript
输入：head = [3,2,0,-4], pos = 1
输出：tail connects to node index 1
解释：链表中有一个环，其尾部连接到第二个节点。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/linked-list-cycle-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

<br />解题思路：<br />
<br />快慢指针，设置快慢两个指针，遍历单链表，快指针一次走两步，慢指针一次走一步，如果单链表中存在环，则快慢指针终会指向同一个节点，否则直到快指针指向 null 时，快慢指针都不可能相遇<br />
<br />当他们相遇时，经过验证，此时从 head 和 相遇节点，同步前行，能到达环节点<br />

```javascript
var detectCycle = function (head) {
  if (!head || !head.next) return null;
  let slow = head;
  let fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) {
      fast = head;
      while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
};
```

<br />
<br />利用set， set中的每一个值都是唯一的，遍历链表，如果 set中有节点曾经访问过，立即返回改节点<br />
<br />时间复杂度：O(n)，对于含有 n 个元素的链表，我们访问每个元素最多一次。添加一个结点到哈希表中只需要花费 O(1) 的时间。<br />空间复杂度：O(n)，空间取决于添加到哈希表中的元素数目，最多可以添加 n 个元素。<br />

```javascript
var detectCycle = function (head) {
  let s = new Set();
  while (head) {
    if (!s.has(head)) {
      s.add(head);
      head = head.next;
    } else {
      return head;
    }
  }
  return null;
};
```
