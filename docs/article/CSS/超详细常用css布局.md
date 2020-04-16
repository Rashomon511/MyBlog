# 超详细常用css布局

<a name="51ijZ"></a>
### 

<a name="ko5hM"></a>
### 垂直居中布局
<a name="4YX4q"></a>
#### 绝对定位布局
1.
```javascript
        .parent {
            position: relative;
        }
        .child {
            width: 200px;
            height: 200px;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
```

2.margin 负间距
```javascript
       .child{
            width:200px;
            height: 200px;
            position: absolute;
            left:50%;
            top:50%;
            margin-left:-100px;
            margin-top:-100px;
        }
```

3. Transforms 变形
```javascript
      .child {
            width: 200px;
            height: 200px;
            position:absolute;
            left:50%;    /* 定位父级的50% */
            top:50%;
            transform: translate(-50%,-50%); /*自己的50% */
        }
```

<a name="JGWG0"></a>
#### flex布局
1.
```javascript
       .parent {
            display: flex;
            justify-content:center;
            align-items:center;
        }
```

2. <br />
```javascript
        .parent {
            display: flex;
        }
        .child {
            margin: auto
        }
```

<a name="RUGk8"></a>
#### table布局
父元素设置teable-cell元素,利用三层结构模拟父子结构
```javascript
.parent {
            display: table;
            width: 200px;
            height: 200px;
        }

        .child {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }

        .box {
            display: inline-block;
        }
```

<a name="jehSX"></a>
#### grid布局
1.
```javascript
.parent {
            display: grid;
        }

        .child {
            justify-self: center;
            align-self: center;
        }
```

2.
```javascript
.parent {
            display: grid;
        }

        .child {
            margin: auto;
        }
```

<a name="L5n9h"></a>
### 自适应布局
<a name="LNtYk"></a>
#### 右边宽度固定，左边自适应
![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1570882413445-0370ef99-beb0-4604-80e9-99fea126798c.png#align=left&display=inline&height=226&name=image.png&originHeight=452&originWidth=1090&size=10096&status=done&width=545)<br />float布局实现方式<br />实现步骤：

1. 给子元素设置相同高度，left元素向左浮动,设置固定宽度100px
1. right元素利用margin-left调整位置
```javascript
    <style>
        .container > div {
            height: 200px;
        }

        .left {
            background-color: #ce5a4b;
            float: left;
            width: 100px;
        }

        .right {
            background-color: #499e56;
            margin-left: 100px;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
    </div>
</body>
```

flex实现方式：

1. 父元素设置display: flex,给left元素设置固定宽度
1. 给right元素设置flex:1使其填充其余空间
```css
    <style>
        .container {
            display: flex;
        }

        .left {
            background-color: #ce5a4b;
            height: 200px;
            width: 100px;
        }

        .right {
            background-color: #499e56;
            height: 200px;
            flex: 1;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
    </div>
</body>
```


<a name="mh6tW"></a>
#### 上部高度固定，下部高度自适应
![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1570882861255-6e2a060c-73eb-419a-a5d7-66fb9c93099f.png#align=left&display=inline&height=511&name=image.png&originHeight=1022&originWidth=1058&size=23558&status=done&width=529)<br />绝对定位实现方式：<br />实现步骤：

1.  设置container元素高度与box-sizing属性，使padding计算入container元素中
1.  设置top元素高度，并使用绝对定位将其放置在container头部
1. 设置container元素内边距padding-top为top元素的高度，设置bottom元素高度为100%
```javascript
    <style>
        .container {
            height: 100%;
            padding: 100px 0 0;
            box-sizing: border-box;
            position: relative;
        }

        .top {
            height: 100px;
            background: #ce5a4b;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }

        .bottom {
            height: 100%;
            background: #499e56;
        }
    </style>
<body>
    <div class="container">
        <div class="top"></div>
        <div class="bottom"></div>
    </div>
</body>
```

普通布局实现：<br />实现步骤：

1. 设置container元素高度与box-sizing属性，使padding计算入container元素中
1. 设置top元素高度，使用margin移动元素位置到container元素顶部
1. 设置container元素内边距padding-top为top元素的高度，设置bottom元素高度为100%
```javascript
    <style>
        .container {
            height: 500px;
            padding-top: 100px;
            box-sizing: border-box;
        }

        .top {
            height: 100px;
            background: #ce5a4b;
            margin: -100px 0 0;
        }

        .bottom {
            height: 100%;
            background: #499e56;
        }
    </style>
<body>
    <div class="container">
        <div class="top"></div>
        <div class="bottom"></div>
    </div>
</body>
```

<a name="CVp67"></a>
### **三栏式布局**
三栏式布局的七种布局方式：float布局、绝对定位布局、圣杯布局、双飞翼布局、Flex布局、表格布局、网格布局<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1570862945607-9df063e1-f41c-428d-a129-60251dccd6bc.png#align=left&display=inline&height=224&name=image.png&originHeight=448&originWidth=1426&size=13617&status=done&width=713)
<a name="89eYi"></a>
#### float布局
实现步骤：<br />1.左右两栏设置float属性使其脱离文档流左边栏设置 float:left, 右边栏设置float: right<br />2.给中间元素设置margin-left、和margin-right，设置margin的原因是当中间元素高度超出左右两边时，中间元素会被覆盖<br />3.为了不影响其他元素，给父元素清除浮动
```javascript
    <style>
        .left {
            float: left;
            width: 100px;
            height: 200px;
            background: #ce5a4b;
        }

        .right {
            float: right;
            width: 200px;
            height: 200px;
            background: #499e56;
        }

        .main {
            margin-left: 120px;
            margin-right: 220px;
            height: 200px;
            background: #f8cf5f;
        }

        .container::after {
            content: '';
            display: block;
            clear: both;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
        <div class="main"></div>
    </div>
</body>
```
> 缺点：使用的时候只需要注意一定要清除浮动

<a name="AXRvh"></a>
#### <br />position布局
实现步骤

1. 给 container 设置position: relative，因为绝对定位的元素的参照物为第一个postion不为static的父元素。
1. left 向左定位，right 向右定位。
1. main 使用绝对定位，通过设置left和right并把两边撑开。
```javascript
    <style>
        .container {
            position: relative;
        }
        .left {
            position: absolute;
            left: 0;
            width: 100px;
            height: 300px;
            background-color: #ce5a4b;
        }

        .main {
            position: absolute;
            left: 120px;
            right: 220px;
            height: 300px;
            background-color: #f8cf5f;
        }

        .right {
            position: absolute;
            right: 0;
            width: 200px;
            height: 300px;
            background-color: #499e56;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="main"></div>
        <div class="right"></div>
    </div>
</body>
```
> 缺点：绝对定位是脱离文档流的，意味着下面的所有子元素也会脱离文档流，导致了这种方法的有效性和可使用性是比较差的


<a name="YtqeY"></a>
#### float和BFC配合圣杯布局
实现步骤

1. 使左、中、右三栏都通过float进行浮动。
1. 将left的margin-left设置为-100%，此时左栏会移动到第一行的首部。然后再将right的margin-left设置为其宽度的负值：-200px，则右栏也会移动到和左、中栏一行中
1. 给container一个padding，该padding应该正好等于左、右栏的宽度
1. 给左、右两栏加上相对布局，然后再通过设置left和right值向外移动。
```javascript
    <style>
        .container {
            overflow: hidden;
            padding: 0 220px 0 120px;
        }

        .container>div {
            position: relative;
            float: left;
            height: 300px;
        }

        .main {
            width: 100%;
            background-color: #f8cf5f;
        }

        .left {
            width: 100px;
            margin-left: -100%;
            left: -120px;
            background-color: #ce5a4b;
        }

        .right {
            width: 200px;
            background-color: #499e56;
            margin-left: -200px;
            right: -220px;
        }
    </style>
    <div class="container">
        <div class="main"></div>
        <div class="left"></div>
        <div class="right"></div>
    </div>
```

<a name="OOjRk"></a>
#### 双飞翼布局
实现步骤

1. 使左、中、右三栏都通过float进行浮动。
1. 将left的margin-left设置为-100%，此时左栏会移动到第一行的首部。然后再将right的margin-left设置为其宽度的负值：-200px，则右栏也会移动到和左、中栏一行中
1. 给 main 的子元素content设置margin: 0 220px 0 120px;，同时设置overflow: hidden使其成为一个BFC
1.  为了不影响其他元素，给main清除浮动
```javascript
    <style>
        .container {
            overflow: hidden;
        }

        .container>div {
            position: relative;
            float: left;
            height: 300px;
        }

        .main {
            width: 100%;
        }

        .main::after {
            content: '';
            display: block;
            clear: both;
        }

        .left {
            width: 100px;
            background-color: #ce5a4b;
            margin-left: -100%;
        }

        .right {
            width: 200px;
            background-color: #499e56;
            margin-left: -200px;
        }

        .content {
            height: 100%;
            margin: 0 220px 0 120px;
            overflow: hidden;
            background-color: #f8cf5f;
        }
    </style>
    <div class="container">
        <div class="main">
            <div class="content"></div>
        </div>
        <div class="left"></div>
        <div class="right"></div>
    </div>
```
> 和圣杯布局类似，只是处理中间栏部分内容被遮挡问题的解决方案有所不同


<a name="4hWiW"></a>
#### flex布局
实现步骤

1. 给 container 设置为一个 flex 容器display: flex
1. main 的宽度设置为width: 100%，left 和 right 分别设置为width: 200px和width: 100px
1. 为了不让 left 和 right 收缩，给它们设置flex-shrink: 0
1. 使用order属性给三个部分的 DOM 结构进行排序：left：order: 1，main：order: 2，right：order: 3
```javascript
    <style>
        .container {
            display: flex;
        }

        .main {
            background-color: #f8cf5f;
            width: 100%;
            height: 300px;
            order: 2;
        }

        .left {
            background-color: #ce5a4b;
            width: 100px;
            height: 300px;
            margin-right: 20px;
            flex-shrink: 0;
            order: 1;
        }

        .right {
            background-color: #499e56;
            width: 200px;
            height: 300px;
            flex-shrink: 0;
            margin-left: 20px;
            order: 3;
        }
    </style>
<body>
    <div class="container">
        <div class="main"></div>
        <div class="left"></div>
        <div class="right"></div>
    </div>
</body>
```
> 极其灵活(还有其他实现方式)，需要注意浏览器兼容性


<a name="aHQGk"></a>
#### table-cell布局
实现步骤

1. 给三栏都设置为表格单元 display: table-cell
1. left 和 right分别设置 width: 100px和width: 200px，container设置 width: 100%
1. 这时 left 和 right 被挤到两边去了，因此要分别设置min-width确保不会被挤压。
```javascript
    <style>
        .container {
            width: 100%;
            display: table;
        }
        .container > div {
            display: table-cell;
            height: 300px;
        }

        .content {
            height: 100%;
            margin: 0 20px;
            background: #f8cf5f;
        }

        .left {
            width: 100px;
            min-width: 100px;
            background-color: #ce5a4b;
        }

        .right {
            width: 200px;
            min-width: 200px;
            background-color: #499e56;
        }
    </style>
    <body>
        <div class="left"></div>
        <!-- 这时的main要放在中间 -->
        <div class="main">
            <div class="content"></div>
        </div>
        <div class="right"></div>
    </body>
```
> 这种布局方式能使得三栏的高度是统一的，但不能使main放在最前面得到最先渲染


<a name="vzvKX"></a>
#### 网格布局
实现步骤

1. 给 container 设置为display: grid
1. 设置三栏的高度：grid-template-rows: 300px
1. 设置三栏的宽度，中间自适应，两边固定：grid-template-columns: 100px auto 200px;
```javascript
    <style>
        .container {
            display: grid;
            width: 100%;
            grid-template-rows: 300px;
            grid-template-columns: 100px auto 200px;
        }
        .left {
            background-color: #ce5a4b;
            margin-right: 20px;
        }
        .main {
            background-color: #f8cf5f;
        }
        .right {
            background-color: #499e56;
            margin-left: 20px;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="main"></div>
        <div class="right"></div>
    </div>
</body>
```
> 使用起来极其方便,代码简介,但是兼容性很差

### 多列等高

#### 利用背景图片

```javascript
    <style>
        .container {
            background: url("column.png") repeat-y;
            width: 960px;
            margin: 0 auto;
        }

        .left {
            float: left;
            width: 220px;
        }

        .main {
            float: left;
            width: 480px;
        }

        .right {
            float: left;
            width: 220px;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="main"></div>
        <div class="right"></div>
    </div>
</body>
```

<a name="W7clr"></a>
#### **使用正padding和负margin对冲实现多列布局方法**
实现步骤：

1. background 会填充内边距 padding，而不会填充外边距 margin 。margin具有坍塌性，可以设置负值。
1. float:left。使用float，元素会脱离文档流，使其浮动至最近的文档流元素。在这里的作用是，将三个div元素并排。
1. overflow:hidden; 设置overflow属性为hidden，这样会让父容器产生BFC（Block Fromatting Context块级格式化上下文）效果，消除float带来的影响。同时，根据需要，会截取内容以适应填充框，将超出容器的部分隐藏。
```javascript

    <style>
        .container {
            overflow: hidden;
        }

        .container>div {
            /**
            * padding-bottom 设置比较大的正值。
            * margin-bottom 设置绝对值大的负值。
            **/
            padding-bottom: 10000px;
            margin-bottom: -10000px;
            float: left;
            width: 30%;
        }

        .left {
            background-color: #ce5a4b;
        }

        .main {
            background-color: #f8cf5f;
        }

        .right {
            background-color: #499e56;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="main"></div>
        <div class="right"></div>
    </div>
</body>
```

<a name="1SK7q"></a>
#### 布局 flex实现等高
实现思路：

1. 父元素设置display:flex, 弹性盒子布局flex，默认值就是自带等高布局的特点
```javascript
    <style>
        .container {
            display: flex;
        }

        .left {
            width: 200px;
            background-color: #ce5a4b;
        }

        .main {
            flex: 1;
            height: 400px;
            background: #f8cf5f;
        }

        .right {
            width: 300px;
            background: #499e56;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="main"></div>
        <div class="right"></div>
    </div>
</body>
```

<a name="4pILi"></a>
#### table-cell等高布局
实现步骤：<br />1.父元素设置dispaly:table, table布局天然就具有等高的特性。
```javascript
    <style>
        .container {
            display: table;
        }
        .left {
            display: table-cell;
            width: 300px;
            background-color: #ce5a4b;
        }

        .main {
            display: table-cell;
            width: 300px;
            height: 400px;
            background: #f8cf5f;
        }

        .right {
            display: table-cell;
            width: 300px;
            background: #499e56;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="main"></div>
        <div class="right"></div>
    </div>
</body>
```

<a name="8IYga"></a>
#### grid布局
```javascript
    <style>
        .container {
            display: grid;
            grid-auto-flow: column;
        }

        .left {
            background-color: #ce5a4b;
        }

        .main {
            background-color: #f8cf5f;
            height: 300px;
        }

        .right {
            background-color: #499e56;
        }
    </style>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="main"></div>
        <div class="right"></div>
    </div>
</body>
```


<a name="u0btF"></a>
### 品字形布局
![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1570880754031-11a43f1d-58c3-4e27-bc68-58a8b0211083.png#align=left&display=inline&height=430&name=image.png&originHeight=860&originWidth=1124&size=22193&status=done&width=562)
<a name="2Yad4"></a>
#### inline或float布局方式
实现步骤：

1. 三块高宽是确定的；
1. 上面那块用margin: 0 auto;居中；
1. 下面两块用inline-block或者float不换行
1. 用margin调整位置使他们居中(使left元素margin-left为宽度的一般则可居中)

实现方式一：
```javascript
    <style>
        .container > div {
            height: 300px;
            width: 300px;
        }

        .top {
            margin: 0 auto;
            background-color: #f8cf5f;
        }

        .left {
            display: inline-block;
            // float: left;
            margin-left: 150px;
            background-color: #499e56;
        }

        .right {
            display: inline-block;
            // float: left;
            background-color: #ce5a4b;
        }
    </style>
<body>
    <div class="container">
        <div class="top">上</div>
        <div class="left">左</div>
        <div class="right">右</div>
    </div>
</body>
```
实现方式二：
```javascript
//  与上述实现道理基本相同，不同的是left和right元素布局     
    <style> 
        .container>div {
            height: 300px;
            width: 300px;
        }

        .top {
            margin: 0 auto;
            background-color: #f8cf5f;
        }

        .left {
            display: inline-block;
            // float: left;
            margin-left: -600px;
            background-color: #499e56;
        }

        .right {
            display: inline-block;
            // float: left;
            margin-left: 50%;
            background-color: #ce5a4b;
        }
    </style>
<body>
    <div class="container">
        <div class="top">上</div>
        <div class="right">右</div>
        <div class="left">左</div>
    </div>
</body>
```
> 缺点：使用inline-block会有小的间隙


<a name="WWlcJ"></a>
#### 全屏的品字布局
实现步骤：

1. 上面的div宽100%，下面的两个div分别宽50%，然后用float或者inline使其不换行即可
```javascript
    <style>
        .container>div {
            height: 200px;
        }

        .top {
            width: 100%;
            background-color: #f8cf5f;
        }

        .left {
            // display: inline-block
            float: left;
            width: 50%;
            background-color: #499e56;
        }

        .right {
            // display: inline-block
            float: left;
            width: 50%;
            background-color: #ce5a4b;
        }
    </style>
<body>
    <div class="container">
        <div class="top">上</div>
        <div class="left">左</div>
        <div class="right">右</div>
    </div>
</body>
```

<a name="kH93n"></a>
### 瀑布流布局
![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1570947107406-51e5fa63-2889-46ca-a624-815cbe487a94.png#align=left&display=inline&height=462&name=image.png&originHeight=924&originWidth=1238&size=53253&status=done&width=619)
<a name="yrcCu"></a>
#### multi-columns 方式
实现步骤：

1. 瀑布流容器中设置 column-count（列数） 和 column-gap（列间距）
1. item 中设置 break-inside:avoid，这是为了控制文本块分解成单独的列，以免项目列表的内容跨列，破坏整体的布局。
1. 为了布局具有响应式效果，可以借助媒体查询属性，在不同屏幕大小的条件下设置瀑布流容器 container 的 column-count 来自适应改变列数
```javascript
    <style>
        .container {
            -moz-column-count: 3;
            /* Firefox */
            -webkit-column-count: 3;
            /* Safari 和 Chrome */
            column-count: 3;
            -moz-column-gap: 2em;
            -webkit-column-gap: 2em;
            column-gap: 2em;
            width: 70%;
            margin: 2em auto;
        }

        .item {
            padding: 2em;
            margin-bottom: 2em;
            -moz-page-break-inside: avoid;
            -webkit-column-break-inside: avoid;
            break-inside: avoid;
            background: #ce5a4b;
            color: #fff;
            text-align: center;
        }

        .item .content-lar {
            height: 200px;
        }

        .item .content-mid {
            height: 100px;
        }

        .item .content-sma {
            height: 50px;
        }

        @media screen and (max-width: 800px) {
            .container {
                column-count: 2;
                /* two columns on larger phones */
            }
        }

        @media screen and (max-width: 500px) {
            .container {
                column-count: 1;
                /* two columns on larger phones */
            }
        }
    </style>    
<body>
    <div class="container">
        <div class="item">
            <div class="item_content content-lar"> 1 我最大 </div>
        </div>
        <div class="item">
            <div class="item_content content-sma"> 2 我最小 </div>
        </div>
        <div class="item">
            <div class="item_content content-mid"> 3 我中等 </div>
        </div>
        <div class="item">
            <div class="item_content content-sma"> 4 我最小 </div>
        </div>
        <div class="item">
            <div class="item_content content-mid"> 5 我中等 </div>
        </div>
        <div class="item">
            <div class="item_content content-lar"> 6 我最大 </div>
        </div>
        <div class="item">
            <div class="item_content content-sma"> 7 我最小 </div>
        </div>
        <div class="item">
            <div class="item_content content-lar"> 8 我最大 </div>
        </div>
        <div class="item">
            <div class="item_content content-lar"> 9 我最大 </div>
        </div>
        <div class="item">
            <div class="item_content content-sma"> 10 我最小 </div>
        </div>
        <div class="item">
            <div class="item_content content-mid"> 11 我中等 </div>
        </div>
        <div class="item">
            <div class="item_content content-mid"> 12 我中等 </div>
        </div>
        <!-- more items -->
    </div>
</body>
```

<a name="3uevJ"></a>
#### flex布局
实现步骤：

1.  瀑布流容器设置dispaly:flex，并使用 flex-flow 来控制列，并且允许它换行
1. 显式的设置 height 属性，当然除了设置 px 值，还可以设置100vh，让容器的高度和浏览器视窗高度一样(注意：不能不显式的设置，如果没有显式的设置，容器就无法包裹住项目列表)
1. 为了布局具有响应式效果，可以借助媒体查询属性显示设置不同的高度值
```javascript
    <style>
        .container {
            height: 800px;
            display: flex;
            flex-flow: column wrap;
            width: 70%;
            margin: 2em auto;
        }

        .item {
            padding: 2em;
            margin-bottom: 2em;
            break-inside: avoid;
            background: #f60;
            color: #fff;
            text-align: center;
            margin: 10px;
        }

        .item .content-lar {
            height: 200px;
        }

        .item .content-mid {
            height: 100px;
        }

        .item .content-sma {
            height: 50px;
        }

        @media screen and (max-width: 1100px) {
            .masonry {
                height: 800px;
            }
        }

        @media screen and (max-width: 800px) {
            .masonry {
                height: 1100px;
            }
        }

        @media screen and (max-width: 600px) {
            .masonry {
                height: 1300px;
            }
        }

        @media screen and (max-width: 460px) {
            .masonry {
                height: 1600px;
            }
        }
    </style>
<body>
    <div class="container">
        <div class="item">
            <div class="item_content content-lar"> 1 我最大 </div>
        </div>
        <div class="item">
            <div class="item_content content-sma"> 2 我最小 </div>
        </div>
        <div class="item">
            <div class="item_content content-mid"> 3 我中等 </div>
        </div>
        <div class="item">
            <div class="item_content content-sma"> 4 我最小 </div>
        </div>
        <div class="item">
            <div class="item_content content-mid"> 5 我中等 </div>
        </div>
        <div class="item">
            <div class="item_content content-lar"> 6 我最大 </div>
        </div>
        <div class="item">
            <div class="item_content content-sma"> 7 我最小 </div>
        </div>
        <div class="item">
            <div class="item_content content-lar"> 8 我最大 </div>
        </div>
        <div class="item">
            <div class="item_content content-lar"> 9 我最大 </div>
        </div>
        <div class="item">
            <div class="item_content content-sma"> 10 我最小 </div>
        </div>
        <div class="item">
            <div class="item_content content-mid"> 11 我中等 </div>
        </div>
        <div class="item">
            <div class="item_content content-mid"> 12 我中等 </div>
        </div>
        <!-- more items -->
    </div>
</body>
```
> 缺点：两种实现方式都只能从上往下排列，不能从左往右排列


<a name="h02Ew"></a>
### 参考连接
[CSS布局说——可能是最全的](https://segmentfault.com/a/1190000011358507)<br />[css 多列等高](https://segmentfault.com/a/1190000005123968)<br />[CSS || 三栏布局，两边固定，中间自适应](https://segmentfault.com/a/1190000008705541)<br />[三种方式实现圣杯布局](https://segmentfault.com/a/1190000013327930)<br />[分享一次纯 css 瀑布流 和 js 瀑布流](https://ainyi.com/60)
