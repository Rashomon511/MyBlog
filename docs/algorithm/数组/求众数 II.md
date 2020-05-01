# 求众数 II-中等

难度：中等<br />
<br />题目描述：<br />给定一个大小为 *n *的数组，找出其中所有出现超过 `⌊ n/3 ⌋` 次的元素。<br />**说明: **要求算法的时间复杂度为 O(n)，空间复杂度为 O(1)。<br />
<br />示例：

```javascript
输入: [1, 1, 1, 3, 3, 2, 2, 2];
输出: [1, 2];
```

<br />
<br />解题思路：<br />哈希表<br />

```javascript
var majorityElement = function (nums) {
  let i = 0;
  let obj = {};
  let arr = [];
  while (i < nums.length) {
    if (!obj[nums[i]]) {
      obj[nums[i]] = 1;
    } else {
      obj[nums[i]] = obj[nums[i]] + 1;
    }
    i++;
  }
  for (let i in obj) {
    if (obj[i] > nums.length / 3) {
      arr.push(i);
    }
  }
  return arr;
};
```

<br />
<br />摩尔投票法
```javascript
function majorityElement(nums) {
  let cand1, cand2;
  let count1 = 0;
  let count2 = 0;
  let ans = [];

for(let i = 0; i < nums.length; i++) {
if(nums[i] === cand1) {
count1++;
} else if(nums[i] === cand2) {
count2++;
} else if(count1 === 0) {
cand1 = nums[i];
count1++;
} else if(count2 === 0) {
cand2 = nums[i];
count2++;
}else {
count1--;
count2--;
}
}

count1 = count2 = 0;
for(let i = 0; i < nums.length; i++) {
if(nums[i] === cand1) count1++;
if(nums[i] === cand2) count2++;
}

if(count1 > nums.length/3) ans.push(cand1);
if(count2 > nums.length/3) ans.push(cand2);

return ans;

}

```

```
