# 实现strStr()

难度：简单

描述<br />给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

示例：

```javascript
示例 1:

输入: haystack = "hello", needle = "ll"
输出: 2
示例 2:

输入: haystack = "aaaaa", needle = "bba"
输出: -1

```

思路分析：<br />实现方法一：双层for循环<br />双层for循环嵌套。当首位匹配时，循环检查后几位是否相同

实现方法二：切片比较<br />使用substring，这样就可以少一次内层循环了。速度和indexOf差不多，

实现方法三：切片比较<br />使用slice,比较haystack截取的字符串是否与needle相等

代码实现：
```javascript
// 实现方法一
var strStr = function(haystack, needle){
    if (needle==="") return 0
    for(var i=0;i<haystack.length;i++){
        if(haystack[i]===needle[0]){
            var flag = true;
            for (var j=1;j<needle.length;j++){
                if (haystack[i+j]!=needle[j]){
                    flag = false
                    break;
                }
            }
            if (flag) return i
        }
    }
    return -1
};
// 实现方法二
var strStr = function (haystack, needle) {
    if (needle === "") return 0
    for (var i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle[0]) {
            if (haystack.substring(i, i + needle.length) === needle) return i;
        }
    }
    return -1
};
//实现方法三
var strStr = function(haystack, needle) {
  var ans = -1
  for(i=0;i<=haystack.length-needle.length;){
    if( needle !== haystack.slice(i,i+(needle.length)) ){
      i++
    }else{
      ans = i
      return ans
    }
  }
  return ans
};

```

