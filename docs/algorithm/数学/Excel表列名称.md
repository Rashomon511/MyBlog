# Excel 表列名称-简单

难度：简单<br />
<br />题目描述：<br />给定一个正整数，返回它在 Excel 表中相对应的列名称。<br />    1 -> A<br />   2 -> B<br />   3 -> C<br />   ...<br />   26 -> Z<br />   27 -> AA<br />   28 -> AB<br />   ...<br />
<br />示例：

```javascript
输入: 701;
输出: "ZY";

输入: 28;
输出: "AB";
```

<br />
<br />解题思路：<br />
<br />取余法
```javascript
var convertToTitle = function(n) {
    //10进制转26进制,取余法
    let res="";
    while(n>0){
        let temp = n%26;
        n = Math.floor(n/26);
        if(temp==0){
            temp=26;
            n--;
        }
        res = String.fromCharCode(temp+64)+res;
    }
    return  res; 
};
```
