## 在javascript中使用Array.flat展平数组


> 作者：[Samantha Ming](https://medium.com/@samanthaming?source=follow_footer--------------------------follow_footer-)
来源：medium.com
> 译者：rashomon


**为了保证的可读性，本文采用意译而非直译。**<br />**<br />之前在javascript中展开数组总是很麻烦的，但现在不是了，因为ES2019提供了一个新的展开数组的方法，并且有一个“深度”参数，因此您可以展开任何级别的嵌套数组。示例如下：

```javascript
const nested = [ ['📦', '📦'], ['📦']];
const flattened = nested.flat();
console.log(flattened);
// ['📦', '📦', '📦']
```


<a name="L8mSe"></a>
### 设置深度参数
该方法的语法：`array.flat(<depth>);`<br />默认情况下，flat（）只会压缩一层深度。换句话说，深度为1

```javascript
array.flat();
// Same as
array.flat(1);
```

<a name="PegUO"></a>
### 展开更深的嵌套数组
这种方法更好的是可以设置超过1级深度。只需设置适当的深度参数即可展平更深层次的嵌套数组

```javascript
const twoLevelsDeep = [[1, [2, 2], 1]];
// depth = 1
twoLevelsDeep.flat()
// [1, [2, 2], 1]
// depth = 2
twoLevelsDeep.flat(2)
// [1, 2, 2, 1]
```

如果遇到更深的嵌套，甚至是无限嵌套，我们只需要设置深度参数为Infinity即可展开无限嵌套的数组。
```javascript
const veryDeep = [[1, [2, 2, [3,[4,[5,[6]]]]], 1]];
veryDeep.flat(Infinity);
// [1, 2, 2, 3, 4, 5, 6, 1]
```


<a name="5sWti"></a>
### 去掉数组中的空值
flat（）可以做的另一件事情就是删除数组中的空槽。
```javascript
const missingNumbers = [1, ,3, ,5];
missingNumbers.flat();
// [1, 3, 5];
```

<a name="GG3jA"></a>
### 浏览器支持
flat是ES2019中引入的超级新功能，所以忘记了Internet Explorer或Edge。这里可以看到支持flat的浏览器[Browser Support: flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#Browser_compatibility)

<a name="uDN1G"></a>
### 替代方案
由于支持不是很好。以下是一些替代解决方案

<a name="pqIOc"></a>
#### ES6解决方案
该方法只支持展开一个层级的嵌套
```javascript
const oneLevelDeep = [ [1, 2], [3]];
const flattened = [].concat(...oneLevelDeep);
// [1, 2, 3,]
```

<a name="B0dLn"></a>
#### 旧浏览器解决方案
下列方法同样也只支持展开一个层级的嵌套

```javascript
const oneLevelDeep = [ [1, 2], [3]];
const flattened = [].concat.apply([], oneLevelDeep);
// [1, 2, 3,]
```


<a name="kXoRc"></a>
#### 递归解决方案
对于具有更深嵌套的数组，可以使用递归方法来展平数组

```javascript
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
flattenDeep(arr1);// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```






