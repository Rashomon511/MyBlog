# 两个数组的交集 II-简单

难度：简单<br />
<br />题目描述：<br />给定两个数组，编写一个函数来计算它们的交集。

示例：

```javascript
输入: (nums1 = [1, 2, 2, 1]), (nums2 = [2, 2]);
输出: [2, 2];
```

<br />解题思路：<br />暴力解法，遍历短数组，查询元素在长数组中 index 值，如果存在则找到交集，并从长数组中删除该元素

```javascript
var intersect = function (nums1, nums2) {
  let short = [];
  let lang = [];
  let x = [];
  if (nums1.length > nums2.length) {
    short = nums2;
    lang = nums1;
  } else {
    short = nums1;
    lang = nums2;
  }
  for (let i = 0; i < short.length; i++) {
    let index = lang.indexOf(short[i]);
    if (index !== -1) {
      lang.splice(index, 1);
      x.push(short[i]);
    }
  }
  return x;
};
```

哈希表<br />先用 Hashmap 记录第一个数组中的元素【放在 key】，和出现的次数【放在 value】。<br />
<br />然后再遍历第二个数组，如果找到对应元素，则添加这个元素到返回数组里。<br />
<br />如果 value 值大于 1，HashMap 中的 value 值减 1，表示已经找到一个相同的了。<br />
<br />如果 value 值等于 1，则删除该元素<br />

```javascript
var intersect = function (nums1, nums2) {
  let hash = new Map();
  let res = [];
  for (let i = 0; i < nums1.length; i++) {
    if (hash.has(nums1[i])) {
      hash.set(nums1[i], hash.get(nums1[i]) + 1);
    } else {
      hash.set(nums1[i], 1);
    }
  }

  for (let i = 0; i < nums2.length; i++) {
    let temp = nums2[i];
    let hashKey = hash.get(temp);
    if (hash.has(temp)) {
      res.push(temp);
      if (hashKey > 1) {
        hash.set(temp, hashKey - 1);
      } else {
        hash.delete(temp);
      }
    }
  }

  return res;
};
```

1. 两个数组排序
1. 设定两个为 0 的指针，比较两个指针的元素是否相等
1. 如果相等，元素 push 到返回值里，两个指针同时往前
1. 如果不相等，元素小的指针往前

```javascript
var intersect = function (nums1, nums2) {
  let p1 = 0;
  let p2 = 0;
  let res = [];
  nums1 = nums1.sort((a, b) => a - b);
  nums2 = nums2.sort((a, b) => a - b);
  while (p1 < nums1.length && p2 < nums2.length) {
    if (nums1[p1] == nums2[p2]) {
      res.push(nums1[p1]);
      p1++;
      p2++;
    } else if (nums1[p1] < nums2[p2]) {
      p1++;
    } else {
      p2++;
    }
  }
  return res;
};
```
