## CSS

<a name="mwIxT"></a>
### css元素
行内元素：a、b、span、em、i、u<br />块级元素：div、h、ol、ul、li、p、dt、dd、h1-h6、table、menu、form、blockquote、address<br />区别一：<br />块级：块级元素会独占一行，默认情况下宽度自动填满其父元素宽度<br />行内：行内元素不会独占一行，相邻的行内元素会排在同一行。其宽度随内容的变化而变化。<br />区别二：<br />块级：块级元素可以设置宽高<br />行内：行内元素不可以设置宽高<br />区别三：<br />块级：块级元素可以设置margin，padding<br />行内：行内元素水平方向的margin-left; margin-right;<br />padding-left; padding-right;可以生效。但是竖直方向的margin-bottom; margin-top; padding-top; padding-bottom;却不能生效。<br />区别四：<br />块级：display:block;<br />行内：display:inline;
> 行内元素float:left后不会变为块级元素，但是可以设置宽高

<a name="3zifQ"></a>
### css 继承属性

- font
- word-break
- letter-spacing
- text-align
- text-rendering
- word-spacing
- white-space
- text-indent
- text-transform
- text-shadow
- line-height
- color
- visibility
- cursor
<a name="O4wgh"></a>
### css选择器
**元素选择器**
```javascript
html {color:black;}
h1 {color:blue;}
h2 {color:silver;}
```

**类选择器**
```javascript
.important {color:red;}
```

**id选择器**
```javascript
#intro {font-weight:bold;}
```

**属性选择器**
```javascript
a[href][title] {color:red;} // 将同时有 href 和 title 属性的 HTML 超链接的文本设置为红色
```

**后代选择器**
```javascript
h1 em {color:red;}  // 只对 h1 元素中的 em 元素应用样式
```

**子元素选择器**
```javascript
h1 > strong {color:red;} // 选择只作为 h1 元素子元素的 strong 元素
```

**相邻兄弟选择器**
```javascript
h1 + p {margin-top:50px;} // 选择紧接在 h1 元素后出现的段落，h1 和 p 元素拥有共同的父元素
```

**伪类选择器**
```javascript
a:link {color: #FF0000}		/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	
```
> 伪类用：表示


**伪元素选择器**
```javascript
p::first-line  // 对 p 元素的第一行文本进行格式化
  {
  color:#ff0000;
  font-variant:small-caps;
  }
```
> css3修订伪元素用：： 表示
> 伪元素用途：
> CSS 伪元素是添加到选择器的关键字，去选择元素的特定部分。它们可以用于装饰（:first-line，:first-letter）或将元素添加到标记中（与 content:...组合），而不必修改标记（:before，:after）。
> - :first-line和:first-letter可以用来修饰文字。
> - 上面提到的.clearfix方法中，使用clear: both来添加不占空间的元素。
> - 使用:before和after展示提示中的三角箭头。鼓励关注点分离，因为三角被视为样式的一部分，而不是真正的 DOM。如果不使用额外的 HTML 元素，只用 CSS 样式绘制三角形是不太可能的。

**选择器权重**<br />优先级为: !important > id > class > tag

- 优先级就近原则，同权重情况下样式定义最近者为准
- 载入样式以最后载入的定位为准
- important 比 内联优先级高

<a name="zlVZX"></a>
### css伪类
:active 向被激活的元素添加样式。<br />[:focus](https://www.w3school.com.cn/cssref/pr_pseudo_focus.asp) 向拥有键盘输入焦点的元素添加样式。<br />[:hover](https://www.w3school.com.cn/cssref/pr_pseudo_hover.asp) 当鼠标悬浮在元素上方时，向元素添加样式。<br />[:link](https://www.w3school.com.cn/cssref/pr_pseudo_link.asp) 向未被访问的链接添加样式<br />[:visited](https://www.w3school.com.cn/cssref/pr_pseudo_visited.asp) 向已被访问的链接添加样式。<br />[:first-child](https://www.w3school.com.cn/cssref/pr_pseudo_first-child.asp) 向元素的第一个子元素添加样式。<br />[:lang](https://www.w3school.com.cn/cssref/pr_pseudo_lang.asp) 向带有指定 lang 属性的元素添加样式<br />**CSS3新增伪类**

- p:first-of-type 选择属于其父元素的首个元素的每个元素。
- p:last-of-type 选择属于其父元素的最后元素的每个元素。
- p:only-of-type 选择属于其父元素唯一的元素的每个元素。
- p:only-child 选择属于其父元素的唯一子元素的每个元素。
- p:nth-child(2) 选择属于其父元素的第二个子元素的每个元素。
- :after 在元素之前添加内容,也可以用来做清除浮动。
- :before 在元素之后添加内容
- :enabled
- :disabled 控制表单控件的禁用状态。
- :checked 单选框或复选框被选中

<a name="wQRgk"></a>
### CSS重置与标准化
重置（Resetting）： 重置意味着除去所有的浏览器默认样式。对于页面所有的元素，像margin、padding、font-size这些样式全部置成一样。你将必须重新定义各种元素的样式。<br />标准化（Normalizing）： 标准化没有去掉所有的默认样式，而是保留了有用的一部分，同时还纠正了一些常见错误。

<a name="FDJ0f"></a>
### link与@import的区别
总体来说：link优于@import

- link是HTML方式， @import是CSS方式，link功能较多，可以定义 RSS，定义 Rel 等作用，而@import只能用于加载 css
- link最大限度支持并行下载，@import过多嵌套导致串行下载，出现FOUC
- link可以通过rel=”alternate stylesheet”指定候选样式
- 浏览器对link支持早于@import，可以使用@import对老浏览器隐藏样式，@import需要 IE5 以上才能使用
- @import必须在样式规则之前，可以在css文件中引用其他文件
- 当解析到link时，页面会同步加载所引的 css，而@import所引用的 css 会等到页面加载完才被加载
- link可以使用 js 动态引入，@import不行
> FOUC(Flash Of Unstyled Content)：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。
> 解决方法：把样式表放到文档的head
> 如果想要避免使用[@import](https://github.com/import)引入多个css文件，可以使用CSS工具将CSS合并为一个CSS文件，例如使用Sass\Compass


<a name="aE44I"></a>
### px/em/rem的区别
**px 在缩放页面时无法调整那些使用它作为单位的字体、按钮等的大小，是相对于显示屏幕分辨率而言的**
> 这是一个不取决于平台的、跨浏览器的准确设置字体大小高度为你所想的像素大小的方法

**特点**：IE无法调整那些使用px作为单位的字体大小<br />**em 的值并不是固定的，会继承父级元素的字体大小，代表倍数**
> 由于 em 是相对于其父级字体的倍数的，当出现有多重嵌套内容时，使用 em 分别给它们设置字体的大小往往要重新计算

**特点：**em的值并不是固定的,em会继承父级元素的字体大小<br />**rem 的值并不是固定的，始终是基于根元素的，也代表倍数**
> 为了兼容不支持 rem 的浏览器，我们需要在各个使用了 rem 地方前面写上对应的 px 值，这样不支持的浏览器可以优雅降级

**特点**：即可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应

<a name="7qbps"></a>
### BFC(块级格式上下文)
BFC (Block Formatting Contexts )就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响<br />创建 BFC 的方式：

1. body 根元素
1. 浮动元素：float 除 none 以外的值
1. 绝对定位元素：position (absolute、fixed)
1. display 为 inline-block、table-cells、flex
1. overflow 除了 visible 以外的值 (hidden、auto、scroll)<br />

BFC 主要作用:

1. 可以包含浮动元素(清除浮动)
1. 防止同一 BFC 容器中的相邻元素间的外边距重叠问题(毗邻的两个或多个margin会合并成一个margin，叫做外边距折叠),可以将元素放在不同的 BFC 容器中
  1. 两个或多个毗邻的普通流中的块元素垂直方向上的margin会折叠
  1. 浮动元素/inline-block元素/绝对定位元素的margin不会和垂直方向上的其他元素的margin折叠
  1. 创建了块级格式化上下文的元素，不会和它的子元素发生margin折叠
  1. 元素自身的margin-bottom和margin-top相邻时也会折叠
3. BFC 可以阻止元素被浮动元素覆盖
3. 自适应两栏布局

<br />
<a name="T7RoS"></a>
### IFC(内联格式上下文)
IFC(Inline formatting contexts)规定元素在同一行的水平和垂直对齐方式的,可以在同一行排列(inline,inline-block,float:left,right).<br />IFC中是不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。<br />作用：<br />水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。<br />垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

<a name="PiAqN"></a>
### GFC(网格布局格式化上下文)
GFC(GrideLayout formatting contexts)当为一个元素设置为display:grid的时候，此元素将获得一个独立的渲染区域，可以在网格容器上定义网格行和列，为每一个网格定义位置和空间<br />作用：<br />GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

<a name="55JXR"></a>
### FFC(自适应格式上下文)
FFC（Flex formatting contexts)相当于一个自适应容器(flex container)并由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。<br />作用：Flexbox 定义了伸缩容器内伸缩项目该如何布局。

<a name="SvYBs"></a>
### 盒子模型
盒子模型：盒子模型简单点理解就是外边距(margin)+边框(border)+内边距(padding)+内容(content)，页面所呈现的效果其实就是一个个盒子堆叠而成的。每一个元素其实是包含了一个“外在盒子”和一个“内在盒子”，其中“外在盒子”负责元素是一行显示还是换行显示，而“内在盒子”则负责宽高、内容展现。<br />**标准盒子模型**<br />标准盒模型 width = content<br />元素框的总宽度=width+padding*2+border*2+margin*2<br />box-sizing:content-box，border和padding不计算入width之内，表示按照标准的盒模型显示，

** IE盒子模型**<br />IE盒模型 width=border*2+padding*2+content<br />元素框的总宽度=width+margin*2<br />box-sizing:border-box，border和padding计算入width之内，表示按照IE盒模型来显示，
>  box-sizing 是用来设置盒模型的尺寸，该属性允许您以特定的方式定义匹配某个区域的特定元素。


<a name="NqBPX"></a>
### 层叠上下文
**层叠上下文**：元素提升为一个比较特殊的图层，在三维空间中 (z轴) 高出普通元素一等<br />触发条件:

- 根层叠上下文(html)
- position
- css3属性
  - flex
  - transform
  - opacity
  - filter
  - will-change
  - -webkit-overflow-scrolling

**层叠等级**：层叠上下文在z轴上的排序

- 在同一层叠上下文中，层叠等级才有意义
- z-index的优先级最高

**z-index优先级判定1. 如果两个元素都没有定位发生位置重合现象或者两个都已定位元素且z-index相同发生位置重合现象，那么按文档流顺序，后面的覆盖前面的。<br />2.如果两个元素都没有设置z-index，使用默认值，一个定位一个没有定位，那么定位元素覆盖未定位元素<br />3.如果父元素z-index有效，那么子元素无论是否设置z-index都和父元素一致，在父元素上方<br />4.如果父元素z-index失效（未定位或者使用默认值），那么定位子元素的z-index设置生效5,如果兄弟元素的z-index生效，那么其子元素覆盖关系有父元素决定

**内联元素的层叠顺序要比块状元素高的原因**

1. 行内块的级别比块级元素的层级高，行内块能覆盖块
1. z-index不能和和folat一起使用，因为他的层级已经规定在z-index：0；和z-index负数之间
<a name="bufVG"></a>
### display属性
**display:block **: 像块类型元素一样显示。<br />**display:none** : 缺省值,像行内元素类型一样显示。<br />**display:inline-block** : 像行内元素一样显示，但其内容象块类型元素一样显示。<br />    去掉inline-block出现空隙的方法

- 移除空格
- 使用margin负值
- 使用font-size:0
- letter-spacing
- word-spacing

**display:list-item** ：像块类型元素一样显示，并添加样式列表标记。<br />**display:table **：此元素会作为块级表格来显示<br />**display:inherit** ：规定应该从父元素继承 display 属性的值

**opacity: 0、visibility: hidden、display: none 区别，优劣，适用场景<br />**区别：<br />结构：<br />display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，<br />visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击<br />opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击<br />继承：<br />display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。<br />visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。<br />性能：<br />displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大<br />visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容<br />opacity: 0 ： 修改元素会造成重回，性能消耗较少<br />联系：它们都能让元素不可见

<a name="9OQEt"></a>
### position属性
**position:absolute**：生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位<br />**position:fixed**：生成绝对定位的元素，相对于浏览器窗口进行定位<br />**position:relative**：生成相对定位的元素，相对于其正常位置进行定位<br />**position:static:** 默认值。没有定位，元素出现在正常的流中<br />**position:inherit** : 规定从父元素继承 position 属性的值

**absolute的containing block(容器块)计算方式跟正常流不同之处**<br />无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：

1. 若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
1. 否则,则由这个祖先元素的 padding box 构成。如果都找不到，则为 initial containing block。

如何确定一个元素的包含块：

1. static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
1. absolute: 向上找最近的定位为absolute/relative的元素
1. fixed: 它的containing block一律为根元素(html/body)，根元素也是initial containing block

**position跟display、margin collapse、overflow、float这些特性相互叠加后的情况**<br />如果元素的display为none,那么元素不被渲染,position,float不起作用,<br />如果元素拥有position:absolute;或者position:fixed;属性那么元素将为绝对定位,float不起作用.<br />如果元素float属性不是none,元素会脱离文档流,根据float属性值来显示.有浮动,绝对定位,inline-block属性的元素,margin不会和垂直方向上的其他元素margin折叠.

**为何要使用 translate() 而非 absolute position<br />**通过absolute定位属性实现的移动，通过translate也可以实现，两者结合使用可以实现元素的居中。<br />文档流上的差异：<br />absolute会脱离文档流，而translate不会脱离文档流<br />基点上的差异：<br />absolute是基于第一个非static父元素的左上角border与padding交界处，而translate是子元素整体平移，没有所谓的基点而言，当然通过transform-origin改变旋转的基准点？<br />视图属性上的差异：<br />可以看出使用 translate 的例子的 offsetTop 和 offsetLeft 的数值与没有产生位移的元素没有然后区别，无论位移多少这两个数值都是固定不变的。<br />而使用相对定位的例子 offsetTop 和 offsetLeft 的数值则根据位移的长度发生了改变。<br />动画表现上的差异：<br />使用绝对定位的动画效果会受制于利用像素(px)为单位进行位移，而使用 translate 函数的动画则可以不受像素的影响，以更小的单位进行位移。<br />另外，绝对定位的动画效果完全使用 CPU 进行计算，而使用 translate 函数的动画则是利用 GPU，因此在视觉上使用 translate 函数的动画可以有比绝对定位动画有更高的帧数。

<a name="07Sah"></a>
### visibility属性
**visibility: visible**: 默认值。元素是可见的。<br />**visibility: hidden**: 元素是不可见的<br />**visibility: collapse**: 对于普通元素visibility:collapse;会将元素完全隐藏,不占据页面布局空间,与display:none;表现相同. 如果目标元素为table,visibility:collapse;将table隐藏,但是会占据页面布局空间. 仅在Firefox下起作用,IE会显示元素,Chrome会将元素隐藏,但是占据空间.<br />**visibility:inherit**:  规定应该从父元素继承 visibility 属性的值

<a name="PwBP1"></a>
### 隐藏页面的元素
**常用两种方法**<br />display:none; (不占位隐藏)<br />visibility:hidden; (占位隐藏)<br />**将透明度设置为0**<br />opacity:0; (需要考虑兼容性,filter:Alpha(opacity=0))(占位)<br />**定位**
```
<div class="box">
    <div class="self">qwwww</div>
</div>
```

position:absolute;left:-999%;(移出可视区域，为何不使用正值自行尝试，不占位)<br />position:fixed;left:-999%;(移出可视区域，为何不使用正值自行尝试，不占位)<br />position:relative;left:-999%;(移出可视区域，为何不使用正值自行尝试，占位)<br />.box{background-color:#fff;}.self{position:absolute;z-index:-9;}(移至底层，使用背景遮罩，不占位)<br />.box{background-color:#fff;}.self{position:fixed;z-index:-9;}(移至底层，使用背景遮罩，不占位)<br />.box{background-color:#fff;}.self{position:relative;z-index:-9;}(移至底层，使用背景遮罩，占位)<br />**Transform**<br />transform: translate(-999%, -999%);(移出可视区域，为何不使用正值自行尝试，占位)<br />transform: scale(0);(缩放，占位)<br />**盒模型**<br />margin-left:-999%;(移出可视区域，为何不使用正值自行尝试，占位，慎用)<br />width:0;height:0;overflow:hidden;(盒子大小为0，超出隐藏，不占位)<br />**常用文本隐藏**<br />text-indent:-9999px;(移出可视区域，为何不使用正值自行尝试)<br />扩展:考虑隐藏元素引起页面的回流或重绘，延伸到书写css的规范，先写布局在写其他样式

<a name="3CRW0"></a>
### Float定位的工作原理
浮动（float）是 CSS 定位属性。浮动元素从网页的正常流动中移出，但是保持了部分的流动性，会影响其他元素的定位（比如文字会围绕着浮动元素）。这一点与绝对定位不同，绝对定位的元素完全从文档流中脱离。<br />CSS 的clear属性通过使用left、right、both，让该元素向下移动（清除浮动）到浮动元素下面。<br />如果父元素只包含浮动元素，那么该父元素的高度将塌缩为 0。我们可以通过清除（clear）从浮动元素后到父元素关闭前之间的浮动来修复这个问题<br />有一种 hack 的方法，是自定义一个.clearfix类，利用伪元素选择器::after清除浮动。另外还有一些方法，比如添加空的和设置浮动元素父元素的overflow属性。与这些方法不同的是，clearfix方法，只需要给父元素添加一个类，定义如下：
```javascript
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```
值得一提的是，把父元素属性设置为overflow: auto或overflow: hidden，会使其内部的子元素形成块格式化上下文（Block Formatting Context），并且父元素会扩张自己，使其能够包围它的子元素。

<a name="wim50"></a>
### 浮动与清除浮动
浮动的框可以向左或向右移动，直到他的外边缘碰到包含框或另一个浮动框的边框为止。由于浮动框不在文档的普通流中，所以文档的普通流的块框表现得就像浮动框不存在一样。浮动的块框会漂浮在文档普通流的块框上.<br />元素设置浮动后 display值自动变成了block。<br />清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。<br />**清除浮动方法：**

1. 父级div定义height；
1. 父级div 也一起浮动；
1. 常规的使用一个class；
```javascript
.clearfix::before, .clearfix::after {
       content: " ";
       display: table;
   }
   .clearfix::after {
       clear: both;
   }
   .clearfix {
       *zoom: 1;
   }
```

4. SASS编译的时候，浮动元素的父级div定义伪类:after(该方案较好)
```javascript
&::after,&::before{
       content: " ";
          visibility: hidden;
          display: block;
          height: 0;
          clear: both;
   }
```

5. 结尾处加空div标签clear:both
5. 父级div定义overflow:hidden
5. 父级div也浮动，需要定义宽度
5. 结尾处加br标签clear:both

**解析原理：**

1. display:block 使生成的元素以块级元素显示,占满剩余空间;
1. height:0 避免生成内容破坏原有布局的高度。
1. visibility:hidden 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互;<br />4）通过 content:"."生成内容作为最后一个元素，至于content里面是点还是其他都是可以的，例如oocss里面就有经典的 content:".",有些版本可能content 里面内容为空,一丝冰凉是不推荐这样做的,firefox直到7.0 content:”" 仍然会产生额外的空隙；<br />5）zoom：1 触发IE hasLayout。

<a name="gVfIx"></a>
### **三栏式布局**
三栏式布局的六种布局方式：圣杯布局、双飞翼布局、Flex布局、绝对定位布局、表格布局、网格布局<br />**流体布局**
```javascript
.left {
        float: left;
        width: 100px;
        height: 200px;
        background: red;
    }
    .right {
        float: right;
        width: 200px;
        height: 200px;
        background: blue;
    }
    .main {
        margin-left: 120px;
        margin-right: 220px;
        height: 200px;
        background: green;
    }
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="main"></div>
</div>
```

**圣杯布局**<br />**实现步骤**

1. 把 left 放上去，由于浮动的关系，给 left 设置margin-left: -100%即可使左侧栏浮动到 center 上面，并位于 center 左侧之上。
1. 同样为 right 设置margin-left: -200px，这里的长度等于 right 的长度
1. 这时 center 的两侧被 left 和 right 覆盖了，因此给 container设置padding: 0 200px
1. 由于 left 和 right 也同时往中间缩，因此给 left 和 right 分别设置left: -200px; right: -200px，往两侧分别偏移自身的宽度去覆盖掉 contaniner 使用padding后的空白位置。
```javascript
.container {
  overflow: hidden;
  padding: 0 200px;
}
.container > div {
  position: relative;
  float: left;
  height: 100px;
}
.main {
  width: 100%;
  background-color: red;
}
.left {
  width: 200px;
  background-color: green;
  margin-left: -100%;
  left: -200px;
}
.right {
  width: 200px;
  background-color: blue;
  margin-left: -200px;
  right: -200px;
}
<div class="container">
    <div class="main"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```

**双飞翼布局**<br />**实现步骤**

1. 把 left 放上去，由于浮动的关系，给 left 设置margin-left: -100%即可使左侧栏浮动到 center 上面，并位于 center 左侧之上。
1. 同样为 right 设置margin-left: -200px，这里的长度等于 right 的长度
1. 给 main 设置margin: 0 200px，同时设置overflow: hidden使其成为一个BFC
```javascript
.container {
  overflow: hidden;
}
.container > div {
  position: relative;
  float: left;
  height: 100px;
}
.center {
  width: 100%;
  background-color: red;
}
.left {
  width: 200px;
  background-color: green;
  margin-left: -100%;
}
.right {
  width: 200px;
  background-color: blue;
  margin-left: -200px;
}
.main {
  height: 100%;
  margin: 0 200px;
  background-color: rosybrown;
  overflow: hidden;
}

<div class="container">
  <!-- 优先渲染 -->
  <div class="center">
    <div class="main">
      center
    </div>
  </div>
  <div class="left">
    left
  </div>
  <div class="right">
    right
  </div>
</div>
```

**flex布局**<br />**实现步骤**

1. 给 container 设置为一个 flex 容器display: flex
1. center 的宽度设置为width: 100%，left 和 right 设置为width: 200px
1. 为了不让 left 和 right 收缩，给它们设置flex-shrink: 0
1. 使用order属性给三个部分的 DOM 结构进行排序：left：order: 1，center：order: 2，right：order: 3
```javascript
.container {
  display: flex;
}
.center {
  background-color: red;
  width: 100%;
  order: 2;
}
.left {
  background-color: green;
  width: 200px;
  flex-shrink: 0;
  order: 1;
}
.right {
  background-color: blue;
  width: 200px;
  flex-shrink: 0;
  order: 3;
}
<body>
    <div class="container">
        <!-- 优先渲染 -->
        <div class="center">
            center
        </div>
        <div class="left">
            left
        </div>
        <div class="right">
            right
        </div>
    </div>
</body>
```
> 极其灵活


**绝对定位布局**<br />**实现步骤**

1. 给 container 设置position: relative和overflow: hidden，因为绝对定位的元素的参照物为第一个postion不为static的祖先元素。
1. left 向左浮动，right 向右浮动。
1. center 使用绝对定位，通过设置left和right并把两边撑开。
1. center 设置top: 0和bottom: 0使其高度撑开。
```javascript
.center {
    position: absolute;
    left: 200px;
    right: 200px;
    top: 0;
    bottom: 0;
}
<body>
    <div class="container">
        <!-- 优先渲染 -->
        <div class="center">
            center
        </div>
        <div class="left">
            left
        </div>
        <div class="right">
            right
        </div>
    </div>
</body>
```
> 缺点是依赖于left 和 right 的高度，如果两边栏的高度不够，中间的内容区域的高度也会被压缩。


**table-cell布局**<br />**实现步骤**

1. 给三栏都设置为表格单元 display: table-cell
1. left 和 right width: 200px，center width: 100%
1. 这时 left 和 right 被挤到两边去了，因此要分别设置min-width: 200px确保不会被挤压。
```javascript
  .container {
        overflow: hidden;
        position: relative;
    }
    .container > div {
        display: table-cell;
        height: 100%;
    }
    .center {
        margin: 0 200px;
        width: 100%;
        background: red;
    }
    .left {
        width: 200px;
        min-width: 200px;
        background-color: green;
    }
    .right {
        width: 200px;
        min-width: 200px;
        background-color: blue;
    }
<body>
    <div class="container">
        <div class="left">
            left
        </div>
        <!-- 这时的center要放在中间 -->
        <div class="center">
            center
        </div>
        <div class="right">
            right
        </div>
    </div>
</body>
```
> 这种布局方式能使得三栏的高度是统一的，但不能使center放在最前面得到最先渲染


**网格布局**<br />**实现步骤**

1. 给 container 设置为display: grid
1. 设置三栏的高度：grid-template-rows: 100px
1. 设置三栏的宽度，中间自适应，两边固定：grid-template-columns: 200px auto 200px;
```javascript
    .container {
        display: grid;
        width: 100%;
        grid-template-rows: 100px;
        grid-template-columns: 200px auto 200px;
    }
<body>
    <div class="container">
        <div class="left">
            left
        </div>
        <!-- 这时的center要放在中间 -->
        <div class="center">
            center
        </div>
        <div class="right">
            right
        </div>
    </div>
</body>
```
> 使用起来极其方便


**总结**

1. 圣杯布局、双飞翼布局、flex布局的高度取决于内容区(center部分)，页面的高度取决于内容区
1. 绝对定位的内容区高度取决于两边栏的最高点。
1. table-cell布局能让三栏的高度一致，但不能优先渲染 center。
1. 网格布局极其强大，但兼容性差

<a name="wc5kA"></a>
### 右边宽度固定，左边自适应

1. 实现方式一
```css
<style>
body{
    display: flex;
}
.left{
    background-color: rebeccapurple;
    height: 200px;
    flex: 1;
}
.right{
    background-color: red;
    height: 200px;
    width: 100px;
}
</style>
<body>
    <div class="left"></div>
    <div class="right"></div>
</body>
```

2. 实现方式二
```javascript
<style>
    div {
        height: 200px;
    }
    .left {
        float: right;
        width: 200px;
        background-color: rebeccapurple;
    }
    .right {
        margin-right: 200px;
        background-color: red;
    }
</style>
<body>
    <div class="left"></div>
    <div class="right"></div>
</body>
```


<a name="vj4Hx"></a>
### 上部高度固定，下部高度自适应
1.
```javascript
<style>
body {
    height: 100%;
    padding: 0;
    margin: 0;
}
.container {
    height: 100%;
    padding: 100px 0 0;
    box-sizing: border-box ;
    position: relative;
}
.top {
    height: 100px;
    background: #BBE8F2;
    position: absolute;
    top: 0 ;
    left: 0 ;
    width: 100%;
}
.bottom {
    height: 100%;
    background: #D9C666;
}
</style>
<body>
<div class="container">
    <div class="top">头部div</div>
    <div class="bottom">下部div</div>
</div>
</body>
```

2.
```javascript
<style>
body {
    height: 100%;
    padding: 0;
    margin: 0;
}
.container {
    height: 100%;
    padding: 100px 0 0;
    box-sizing: border-box ;
}
.top {
    height: 100px;
    margin: -100px 0 0;
    background: #BBE8F2;
}
.bottom {
    height: 100%;
    background: #D9C666;
}
</style>
<body>
<div class="container">
    <div class="top">头部div</div>
    <div class="bottom">下部div</div>
</div>
</body>
```

<a name="fPs1y"></a>
### CSS宽高等比例自适应举行

```javascript
<style>
    .scale {
        width: 100%;
        padding-bottom: 56.25%;
        height: 0;
        position: relative; //
    }

    .item {
        width: 100%;
        height: 100%;
        background-color: aquamarine;
        position: absolute; //
    }
</style>

<div class="scale">
    <div class="item">
        这里是所有子元素的容器
    </div>
</div>
```

<a name="rzfE3"></a>
### 等高栏
1.
```javascript
.parent {
position: reletive
}
.child {
position: absolute;
top:0;
bottom: 0;
overflow:auto
}
```

2. <br />
```javascript
.parent {
display: flex;
}
.child {
flex: 1
}
```
> line-height: height 有被问到该值是不是等于高度设置的值，这个没有答好，回来测试发现是跟盒模型相关的，需要是 computed height
> absolute + transform 居中为什么要使用 transform（为什么不使用marginLeft / Top），这是一道重绘重排的问题。
> flex + align-items: center 我会对 flex 容器以及 flex 项目的每个 css 属性都了解一遍，并且写了一些小 demo， flex：1 代表什么


<a name="in8GF"></a>
### 多列等高
**真实等高布局 flex**<br />**技术点：弹性盒子布局flex，默认值就是自带等高布局的特点**
```javascript
<div class="box">
  <div class="left"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>

.box {
  display: flex;
}

.left {
  width: 300px;
  background-color: grey;
}

.center {
  flex: 1;
  background: red;
}

.right {
  width: 500px;
  background: yellow;
}
```

**真实等高布局 table-cell**<br />**技术点：table布局天然就具有等高的特性。**
```javascript
<div class="box">
  <div class="left"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>
.left {
  display: table-cell;
  width:30%;
  background-color: greenyellow;
}

.center {
  display: table-cell;
  width:30%;
  background-color: gray;
}

.right {
  display: table-cell;
  width:30%;
  background-color: yellowgreen;
}
```

**假等高列布局 内外边距底部正负值**<br />**技术点**

1. background 会填充内边距 padding，而不会填充外边距 margin 。margin具有坍塌性，可以设置负值。<br />
1. float:left。使用float，元素会脱离文档流，使其浮动至最近的文档流元素。在这里的作用是，将三个div元素并排。<br />
1. overflow:hidden; 设置overflow属性为hidden，这样会让父容器产生BFC（Block Fromatting Context块级格式化上下文）效果，消除float带来的影响。同时，根据需要，会截取内容以适应填充框，将超出容器的部分隐藏。<br />
```javascript
<div class="box">
  <div class="left"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>
.box {
  overflow: hidden;
}

.box > div{
  /**
  * padding-bottom 设置比较大的正值。
  * margin-bottom 设置绝对值大的负值。
  **/
  padding-bottom: 10000px;
  margin-bottom: -10000px;
  float:left;
  width:30%;
}

.left {
  background-color: greenyellow;
}

.center {
  background-color: gray;
}

.right {
  background-color: yellowgreen;
}
```

**假等高布局，背景视觉效果**<br />**技术点： float浮动，并设置每一列的宽度。设置父元素为行内块级元素，之后再利用线性渐变的图片来设置父元素的背景凸显等高的效果**
```javascript
  <div class="box five-columns">
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"></div>
</div>
/** 需要自己算出平均每列的宽度 */
.box {
  display: inline-block;
  background: linear-gradient(
    to right, 
    red, 
    red 20%,
    blue 20%,
    blue 40%,
    yellow 40%,
    yellow 60%,
    orange 60%,
    orange 80%,
    grey 80%,
    grey);
} 

.col {
  float: left; 
  width: 16%;
  padding: 2%;
}
```

<a name="1AjUu"></a>
### 垂直居中
一：绝对定位<br />1.
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

二.flex布局，使用于不定宽高布局<br />1.
```
.parent {
            display: flex;
            justify-content:center;
            align-items:center;
        }
```

```javascript
.parent {
            display: flex;
        }
        .child {
            margin: auto
        }
```

三：父元素设置teable-cell元素,利用三层结构模拟父子结构
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

四：grid布局<br />1.
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

<a name="dWf6g"></a>
### 品字布局
**inline方式**<br />（1）三块高宽是确定的；<br />（2）上面那块用margin: 0 auto;居中；<br />（3）下面两块用float或者inline-block不换行；<br />（4）用margin调整位置使他们居中
```javascript
<div>
  <div class="d1">上</div>
  <div class="d2">右</div>
  <div class="d3">左</div>
</div>
*{
margin: 0;
border: 0;
}
.d1, .d2, .d3{
height: 100px;
width: 100px;
background-color: #FF0000;
border: solid 1px #000000;
}
.d1{
margin: 0 auto;
}
.d3{
display: inline-block;
margin-left: -200px;
}
.d2{
display: inline-block;
margin-left: 50%;
}
```

**float方式**
```javascript
    <body>
        <div class="d1">上</div>
        <div class="d2">右</div>
        <div class="d3">左</div>
    </body>
*{
margin: 0;
border: 0;
}
.d1, .d2, .d3{
height: 100px;
width: 100px;
background-color: #FF0000;
border: solid 1px #000000;
}
.d1{
margin: 0 auto;
}
.d3{
float: left;
margin-left: -200px;
}
.d2{
float: left;
margin-left: 50%;
}
```

**全屏的品字布局**<br />上面的div宽100%，下面的两个div分别宽50%，然后用float或者inline使其不换行即可

```javascript
    <body>
        <div class="d1">上</div>
        <div class="d2">右</div>
        <div class="d3">左</div>
    </body>
*{
margin: 0;
border: 0;
}
.d1, .d2, .d3{
height: 300px;
}
.d1{
width: 100%;
height: 300px;
background-color: #FF0000;
}
.d3{
float: left;
width: 50%;
background-color: #0099FF;
}
.d2{
float: left;
width: 50%;
background-color: #4eff00;
}
```

<a name="zU5FX"></a>
### 栅格系统 (grid system)
一个基本的栅格系统仅仅需要几个元素

- a container （一个容器）
- rows    （行）
- columns   （列）
- gutters (the space between columns)

**容器：**
容器是用于设置整个栅格的宽度， 容器的宽度通常是100%, 但是，你可能也要设置一下最大宽度，用于限制在大屏幕的展示<br />**行：**
行是用于确保它里面的列元素不会溢出到其他的行元素里面，为了达到目的，通常我们需要使用clearfix。<br />**列:**
列是栅格系统中最重要的组成部分，我们通常需要在不同的分辨率下，改变他的宽度来实现响应式布局。<br />**列与列之间的间距:**<br />这里通常需要开启'border-box' 模式。<br />最后，通过媒体查询来实现响应式布局

**完整代码**
```javascript
.grid-container {
    width : 100%;
    max-width : 1200px; 
    margin: 0 auto;
}
.grid-container *{
    box-sizing: border-box; 
}
.row:before, 
.row:after {
    content:"";
    display: table ;
    clear:both;
}
[class*='col-'] {
    float: left;
    min-height: 1px; 
    width: 16.66%; 
    padding: 12px;
    background-color: #FFDCDC;
}
.col-1{
    width: 16.66%; 
}
.col-2{
    width: 33.33%; 
}
.col-3{
    width: 50%; 
}
.col-4{
    width: 66.664%;
}
.col-5{
    width: 83.33%;
}
.col-6{
    width: 100%;
}


.outline, .outline *{
    outline: 1px solid #F6A1A1; 
}


[class*='col-'] > p {
 background-color: #FFC2C2; 
 padding: 0;
 margin: 0;
 text-align: center; 
 color: white; 
}


@media screen and (max-width:800px){
    .col-1{ width: 33.33%;  }
    .col-2{ width: 50%;     }
    .col-3{ width: 83.33%;  }
    .col-4{ width: 100%;    }
    .col-5{ width: 100%;    }
    .col-6{ width: 100%;    }


    .row .col-2:last-of-type{
        width: 100%; 
    }


    .row .col-5 ~ .col-1{
        width: 100%; 
    }
}


@media screen and (max-width:650px){
    .col-1{ width: 50%;     }
    .col-2{ width: 100%;    }
    .col-3{ width: 100%;    }
    .col-4{ width: 100%;    }
    .col-5{ width: 100%;    }
    .col-6{ width: 100%;    }
}

HTML代码：

<div class="grid-container outline">
   <div class="row">
       <div class="col-1"><p>col-1</p></div> 
       <div class="col-1"><p>col-1</p></div> 
       <div class="col-1"><p>col-1</p></div> 
       <div class="col-1"><p>col-1</p></div> 
       <div class="col-1"><p>col-1</p></div> 
       <div class="col-1"><p>col-1</p></div> 
   </div> 
   <div class="row">
       <div class="col-2"><p>col-2</p></div> 
       <div class="col-2"><p>col-2</p></div> 
       <div class="col-2"><p>col-2</p></div> 
   </div> 
   <div class="row">
       <div class="col-3"><p>col-3</p></div> 
       <div class="col-3"><p>col-3</p></div> 
   </div> 
   <div class="row">
       <div class="col-4"><p>col-4</p></div> 
       <div class="col-2"><p>col-2</p></div> 
   </div> 
   <div class="row">
       <div class="col-5"><p>col-5</p></div> 
       <div class="col-1"><p>col-1</p></div> 
   </div> 
   <div class="row">
       <div class="col-6"><p>col-6</p></div> 
   </div> 

</div>
```

<a name="4v2kT"></a>
### Flex布局
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为 Flex 布局，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效<br />采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。<br />![](https://cdn.nlark.com/yuque/0/2019/png/218767/1565609714803-3e4d4e5d-59e2-463f-81f1-c6088dce393f.png#align=left&display=inline&height=333&originHeight=333&originWidth=563&size=0&status=done&width=563)<br />容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。[具体属性解析](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?%5E%$)<br />**flex:1 代表什么**<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1565610264799-2567cab7-ad8e-4dad-a8bb-3e3be81cde6e.png#align=left&display=inline&height=438&name=image.png&originHeight=876&originWidth=810&size=68998&status=done&width=405)

**align-items和justify-content的区别**<br />align-items：定义在侧轴（纵轴）方向上的对齐方式；<br />justify-content：定义在主轴（横轴）方向上的对齐方式

<a name="I2B5p"></a>
### 响应式设计 (responsive design) 和自适应设计 (adaptive design) 
**响应式（RWD**<br />所有设备的代码是一样的,响应式的概念覆盖了自适应，而且涵盖的内容更多<br />优点：面对不同分辨率设备灵活性强；能够快捷解决多设备显示适应问题<br />缺点：兼容各种设备工作量大，效率低下；代码累赘会出现隐藏无用的元素，加载时间加长；一定程度上改变了网站原有的布局结构，会出现用户混淆的结果

**自适应（AWD**<br />不同设备的代码是不一样的,自适应是为了解决如何在不同大小的设备上呈现同样的网页（网页的主题和内容不改变）<br />自适应暴露的一个问题，如果屏幕太小，即使网页能够根据屏幕大小进行适配，但是会感觉在小屏幕上查看内容太过拥挤。<br />响应式正是针对这个问题衍生出的概念。它可以自动识别屏幕宽度、并做出相应调整的网页设计、布局和展示的内容可能会有所改变

**自适应设计实现方法：**<br />1.允许网页宽度自动调整<br />首先在代码的头部加入一行viewport标签<br />2.尽量少使用绝对宽度<br />由于网页会根据屏幕宽度调整布局，所以不能使用绝对宽度的布局，也不能使用具有绝对宽度的元素。<br />具体：如不能使用px作为单位，使用百分比，同时可以配合css的cal进行宽度，或者width：auto；<br />3.相对大小的字体<br />字体也不能使用绝对大小（px），只能使用相对大小（em）或者高清方案（rem），rem不局限字体大小，而前面的width也可以使用，代替百分百。<br />4.流动布局<br />流动布局是各个区块的位置都是浮动的，不是固定不变的。<br />float的好处是，如果宽度太小，放不下两个元素，后面的元素会自动滚到前面元素的下方，不会再水平方向溢出，避免了水平滚动条的实现。另外绝对定位也要谨慎使用<br />5.选择加载css<br />**区别**<br />响应式布局中你可能需要面对非常多状态——是的，大部分状态之间的区别很小，但它们又的确是不同的——这样一来就很难确切搞清你的设计会是什么样<br />自适应布局有它自己的优势，因为它们实施起来代价更低，测试更容易，这往往让他们成为更切实际的解决方案。自适应布局可以看做响应式布局的“穷兄弟”，在资源有限的情况下就可以让它出马<br />**扩展：**<br />那起飞页是响应式还是自适应呢？这个。。。严格的说，起飞页是自适应的，因为我们针对不同的设备进行了优化和加速。但是不同设备上的代码，又竟然是90%一致的。我们只能说，起飞页九成是响应式，一成是自适应，是这两种技术的完美结合

<a name="J47dm"></a>
### css雪碧图
**概念**：将多个小图片拼接到一个图片中。通过background-position和元素尺寸调节需要显示的背景图案。<br />**优点**：

- 减少HTTP请求数，极大地提高页面加载速度
- 增加图片信息重复度，提高压缩比，减少图片大小
- 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现

**缺点**：

- 图片合并麻烦
- 维护麻烦，修改一个图片可能需要从新布局整个图片，样式

<a name="wXtd0"></a>
### CSS Hack原理
对于不同的浏览器，CSS的解析程度不一样，因此会导致生成的页面效果不一样；特别是对于IE这种蛇精病的浏览器来说，这个时候我们就需要针对不同的浏览器（特别是IE）去写不同的CSS，这个过程就叫做css hack<br />**css hack主要依据的是**

1. 浏览器对CSS的支持及解析结果不一样；
1. CSS中的优先级的关系。

**常用hack:**

- png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.<br />
- 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。<br />
- IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。浮动ie产生的双倍距离 #box{ float:left; width:10px; margin:0 0 0 100px;}这种情况之下IE会产生20px的距离,

      解决方案是在float的标签样式控制中加入 ——_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)<br />      渐进识别的方式，从总体中逐渐排除局部。<br />      首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。<br />      着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
```javascript
.bb{
background-color:red;/所有识别/
background-color:#00deff\9; /IE6、7、8识别/
+background-color:#a200ff;/IE6、7识别/
_background-color:#1e0bd1;/IE6识别/
}
```

- IE下,可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性;Firefox下,只能使用getAttribute()获取自定义属性。<br />解决方法:统一通过getAttribute()获取自定义属性。<br />
- IE下,even对象有x,y属性,但是没有pageX,pageY属性;Firefox下,event对象有pageX,pageY属性,但是没有x,y属性。<br />

解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。<br />

- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,<br />解决方案：可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。<br />
- 超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了
- 解决方法是改变CSS属性的排列顺序:L-V-H-A : a:link {} a:visited {} a:hover {} a:active {}

<a name="uynAW"></a>
### CSS3新特性

- 新增各种css选择器
- 圆角 border-radius
- 多列布局
- 阴影和反射
- 文字特效text-shadow
- 线性渐变
- 旋转transform

<a name="YEJC1"></a>
### CSS3动画
依靠CSS3中提出的三个属性：transition、transform、animation<br />transition：定义了元素在变化过程中是怎么样的，包含transition-property、transition-duration、transition-timing-function、transition-delay。<br />transform：定义元素的变化结果，包含rotate、scale、skew、translate。<br />animation：动画定义了动作的每一帧（[@Keyframes](https://github.com/Keyframes)）有什么效果，包括animation-name，animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-direction<br />**css动画与js动画差异：**<br />渲染线程分为main thread和compositor thread，如果css动画只改变transform和opacity，这时整个CSS动画得以在compositor trhead完成（而js动画则会在main thread执行，然后出发compositor thread进行下一步操作），特别注意的是如果改变transform和opacity是不会layout或者paint的。<br />区别：

- 功能涵盖面，js比css大
- 实现/重构难度不一，CSS3比js更加简单，性能跳优方向固定
- 对帧速表现不好的低版本浏览器，css3可以做到自然降级
- css动画有天然事件支持
- css3有兼容性问题
> 手写动画的最短时间间隔：多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms

**Transitions动画功能与Animations动画功能的区别：**<br />虽然它们两者都是通过改变元素的属性值来实现动画效果，但是Transitions只能通过指定属性的开始值与结束值，然后在这两者之间进行平滑过渡的方式来实现动画的效果，因此不能实现较复杂的动画效果；而Animations功能可以通过定义多个关键帧以及每个关键帧中元素的属性值来实现复杂的动画效果

<a name="4LshX"></a>
### stylus/sass/less区别
**概念：**

- 预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，<br />还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。<br />
- 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的<br />是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。<br />
> CSS预处理器的原理: 是将类 CSS 语言通过 Webpack 编译 转成浏览器可读的真正 CSS。在这层编译之上，便可以赋予 CSS 更多更强大的功能

**常用功能：**

- 嵌套
- 变量
- 循环语句
- 条件语句
- 自动前缀
- 单位转换
- mixin复用

**区别：**

- 均具有“变量”、“混合”、“嵌套”、“继承”、“颜色混合”五大基本特性
- Scss和LESS语法较为严谨，LESS要求一定要使用大括号“{}”，Scss和Stylus可以通过缩进表示层次与嵌套关系
- Scss无全局变量的概念，LESS和Stylus有类似于其它语言的作用域概念
- Sass是基于Ruby语言的，而LESS和Stylus可以基于NodeJS NPM下载相应库后进行编译；

**缺点：**

- CSS预处理器语言较CSS玩法变得更高级了，但同时降低了自己对最终代码的控制力。
- 更致命的是提高了门槛，首先是上手门槛，其次是维护门槛，再来是团队整体水平和规范的门槛。这也造成了初学学习成本的昂贵。

**优点：**<br />用一种专门的编程语言，为CSS增加了一些编程的特性，将CSS作为目标生成文件，然后开发者就只要使用这种语言进行编码工作。通俗的说，CSS预处理器用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件，以供项目使用。CSS预处理器为CSS增加一些编程的特性，无需考虑浏览器的兼容性问题，例如你可以在CSS中使用变量、简单的逻辑程序、函数等等在编程语言中的一些基本特性，可以让你的CSS更加简洁、适应性更强、可读性更佳，更易于代码的维护等诸多好处
> postcss的作用：PostCSS 提供了一个解析器，它能够将 CSS 解析成抽象语法树，通过在 PostCSS 这个平台上，我们能够开发一些插件，来处理我们的CSS，postcss可以对sass处理过后的css再处理 最常见的就是autoprefixer


<a name="RgLiy"></a>
### 图片替代方案

- 首先使用图片；然后给图片添加一个alt值，对搜索引擎友好一些。缺点：对搜索引移开文字擎不友好，搜索引擎对于图片alt属性的权重肯定是低于H1的，就算你的图片是放在H1标签里面
```javascript
<h1><img src="image.gif" alt="Image Replacement"></h1>
```

- 代码非常简单，但是依然存在2的问题，图片不显示时，区域无内容
```javascript
<h1>Image Replacement</h1> 

h1{
text-indent: -5000px;background:url(hello_world.gif) no-repeat;width: 150px;height:35px;
}
```

- 先将图片应用在 H2 的背景中，然后将 SPAN 的标签隐藏。但是这种方式有个问题，就是当图片无法显示时，将导致这个区域没有任何内容（用户体验不好）。同时，使用 display:none 的方式隐藏的内容，将被许多主流屏幕阅读器忽略，从而造成可用性问题，因此，应该尽量避免使用
```javascript
<h1><span>Image Replacement</span></h1> 

h1 {
background:url(hello_world.gif) no-repeat; width: 150px; height: 35px; 
} 
span {
display: none; 
}
```

- 最完善的图文替换技术（最喜欢）：加入空标签,将 H2 的 position 设为 relative ，这样将使 H1 里面的元素定位以 H1 为参照，然后将 SPAN 元素绝对定位，撑满整个 H2 区域，同时将背景图应用在 SPAN 标签里面；这种方法的原理是将 SPAN 标签覆盖在文字内容上面，一旦 SPAN 里面的背景图无法显示，将显示下层的文字内容，不影响正常使用。但是，此方法也有一个缺陷，就是背景图不能透明，否则将透出下面的文字

```javascript
<h1><span></span>Image Replacement</h1>

h1 {

width: 150px;height: 35px;position: relative; }

h1 span{

position:absolute;

width:100%;

height:100%;

background: url(hello_world.gif) no-repeat
}
```

<a name="obf4i"></a>
### CSS适配浏览器
```javascript
<meta name="viewport"
        content="width=device-width,
        height=device-height,
        inital-scale=1.0,
        maximum-scale=1.0,
        user-scalable=no;" 
    />
```
> width：控制 viewport 的大小，可以是指定的一个值，比如 1920，或者是特殊的值，如 device-width 为设备的宽度，单位为缩放为 100% 时的 CSS 的像素。
> height：和 width 相对应，指定高度，可以是指定的一个值，比如 1080，或者是特殊的值，如 device-height 为设备的高度。
> initial-scale：初始缩放比例，即当页面第一次载入是时缩放比例。
> maximum-scale：允许用户缩放到的最大比例。
> minimum-scale：允许用户缩放到的最小比例。

> user-scalable：用户是否可以手动缩放。


2. 网页内部的元素宽度要使用百分比，在不同的屏幕大小下需使用媒体查询定义不同的css代码

<a name="PGMHu"></a>
### 移动端布局方案

- 百分比布局<br />
百分比布局的，这样的做法的话是比较费时间的，有些细节的地方还需要用媒体查询来做兼容。做起来挺费时间，而且对于设计稿的还原也不好。所以这里>也不怎么推荐
- 固定的设备宽度<br />
在做移动开发的时候很多人都会加上viewport的配置，<br />
那么固定设备宽度的布局就是根据这个来设置的，将viewport里面的宽度width设置成设计稿的宽度，也就是说原本是width=device-width，即宽度为设备的宽度，假如在iphone6上显示的时候，那么页面的宽度就是375px; 当我们将width设置成设计稿的宽度的，假如设计稿是750px，而我们的css也按设计的尺寸来做，例如一个图片是200px*200px，那么在css上也是宽高都是写200px,也就是1：1的比例。那么在375px的手机上显示的时候，就会缩小2倍显示，以此类推，在320px的宽度的时候，就会缩小2.3倍显示，在414px的宽度的时候就会缩小1.8倍。<br />
这样的写法是会比较好的还原设计稿，而且速度也会比较快，但是这样也有缺点，在缩>小的时候有些设备会比较模糊，因为你强行将设备放大了
- rem布局<br />
我现在常用的移动端布局主要是用rem布局，这个应该是比较多人使用的，也是比较流行的。使用rem布局优点是可以适应多个屏幕 ，也比较好的还原设计稿。在有些地方需要一屏显示完设计稿的时候，可能需要用到vh,或是百分比。<br />
rem布局简单来说就是根据页面的font-size的大小来设置页面元素的属性

<a name="H5ecZ"></a>
### CSS解析顺序
**css 选择器匹配元素是逆向解析**

- 因为所有样式规则可能数量很大，而且绝大多数不会匹配到当前的 DOM 元素（因为数量很大所以一般会建立规则索引树），所以有一个快速的方法来判断「这个 selector 不匹配当前元素」就是极其重要的。
- 如果正向解析，例如「div div p em」，我们首先就要检查当前元素到 html 的整条路径，找到最上层的 div，再往下找，如果遇到不匹配就必须回到最上层那个 div，往下再去匹配选择器中的第一个 div，回溯若干次才能确定匹配与否，效率很低。
- 逆向匹配则不同，如果当前的 DOM 元素是 div，而不是 selector 最后的 em，那只要一步就能排除。只有在匹配时，才会不断向上找父节点进行验证

<a name="rQKcm"></a>
### 高效CSS
首先，浏览器从最右边的选择器，即关键选择器（key selector），向左依次匹配。根据关键选择器，浏览器从 DOM 中筛选出元素，然后向上遍历被选元素的父元素，判断是否匹配。选择器匹配语句链越短，浏览器的匹配速度越快。避免使用标签和通用选择器作为关键选择器，因为它们会匹配大量的元素，浏览器必须要进行大量的工作，去判断这些元素的父元素们是否匹配。<br />原则上建议为独立的 CSS 类命名，并且在需要层级关系时，将关系也体现在命名中，这自然会使选择器高效且易于覆盖。<br />搞清楚哪些 CSS 属性会触发重新布局（reflow）、重绘（repaint）和合成（compositing）。在写样式时，避免触发重新布局的可能。

<a name="6dqoS"></a>
### CSS性能优化

- css压缩与合并、Gzip压缩
- css文件放在head里、不要用[@import](https://github.com/import)
- 尽量用缩写、避免用滤镜、合理使用选择器
- 关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）；
- 如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）；
- 提取项目的通用公有样式，增强可复用性，按模块编写组件；增强项目的协同开发性、可维护性和可扩展性;
- 使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）；
