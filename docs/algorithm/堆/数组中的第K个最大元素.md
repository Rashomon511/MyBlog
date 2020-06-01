# 数组中的第 K 个最大元素-中等

<br />难度：中等<br />
<br />题目描述：<br />在未排序的数组中找到第  **k**  个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例：

```javascript
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

<br />解题思路：

```javascript
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => {
    return b - a;
  });
  return nums[k - 1];
};
```

```javascript
var findKthLargest = function (nums, k) {
  // 1、朴素算法是***然后取第K个，时间复杂度为O(nlogn)
  // 2、直观上采用最小堆heap数据结构，但是heap的构建和维护比较麻烦
  // 可以使用JS中的array+sort来模拟heap。时间复杂度为O(nlogk)

  // 优秀做法采用divide-and-conqure分治法，只要能够等到位置K的pivot元素即可

  function select(nums, low, high, k) {
    if (low === high) return nums[low];

    // pos返回该轮partition操作pivot的合适位置
    let pos = partition(nums, low, high);

    if (pos === k) return nums[pos];
    else if (pos < k) {
      // 表明此轮pivot元素的索引处于nums数组低位则需要从后边再次选择
      return select(nums, pos + 1, high, k);
    } else {
      return select(nums, low, pos - 1, k);
    }
  }

  return select(nums, 0, nums.length - 1, nums.length - k);

  // ***核心代码，下来返回值表示pivot元素开始插入的位置
  function partition(nums, low, high) {
    // 不随机选择pivot，而采用朴素的选取
    const pivot = nums[low];
    let i = low,
      j = high;

    while (i < j) {
      while (i < j && nums[j] >= pivot) j--;
      nums[i] = nums[j];
      while (i < j && nums[i] <= pivot) i++;
      nums[j] = nums[i];
    }

    nums[i] = pivot;
    return i;
  }
};
```
