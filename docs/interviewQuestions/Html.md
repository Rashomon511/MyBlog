## HTML

<a name="E3c5s"></a>
###  meta viewport相关
```javascript
<!DOCTYPE html>  H5标准声明，使用 HTML5 doctype，不区分大小写
<head lang=”en”> 标准的 lang 属性写法
<meta charset=’utf-8′>    声明文档使用的字符编码
<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   优先使用 IE 最新版本和 Chrome
<meta name=”description” content=”不超过150个字符”/>       页面描述
<meta name=”keywords” content=””/>      页面关键词
<meta name=”author” content=”name, email@gmail.com”/>    网页作者
<meta name=”robots” content=”index,follow”/>      搜索引擎抓取
<meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”> 为移动设备添加 viewport
<meta name=”apple-mobile-web-app-title” content=”标题”> iOS 设备 begin
<meta name=”apple-mobile-web-app-capable” content=”yes”/>  添加到主屏后的标题（iOS 6 新增）
是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
<meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”>
添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
<meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>
<meta name=”format-detection” content=”telphone=no, email=no”/>  设置苹果工具栏颜色
<meta name=”renderer” content=”webkit”>  启用360浏览器的极速模式(webkit)
<meta http-equiv=”X-UA-Compatible” content=”IE=edge”>     避免IE使用兼容模式
<meta http-equiv=”Cache-Control” content=”no-siteapp” />    不让百度转码
<meta name=”HandheldFriendly” content=”true”>     针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
<meta name=”MobileOptimized” content=”320″>   微软的老式浏览器
<meta name=”screen-orientation” content=”portrait”>   uc强制竖屏
<meta name=”x5-orientation” content=”portrait”>    QQ强制竖屏
<meta name=”full-screen” content=”yes”>              UC强制全屏
<meta name=”x5-fullscreen” content=”true”>       QQ强制全屏
<meta name=”browsermode” content=”application”>   UC应用模式
<meta name=”x5-page-mode” content=”app”>    QQ应用模式
<meta name=”msapplication-tap-highlight” content=”no”>    windows phone 点击无高光
设置页面不缓存
<meta http-equiv=”pragma” content=”no-cache”>
<meta http-equiv=”cache-control” content=”no-cache”>
<meta http-equiv=”expires” content=”0″>
```

<a name="Idq6T"></a>
### **Doctype 作用 标准模式与兼容模式区别 **

- 声明位于位于 HTML 文档中的第一行，处于  标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。
- 标准模式的排版和 JS 运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

<a name="ZqL7F"></a>
### **window 常用属性与方法**
**window 对象的常用属性**

- window.self 返回当前窗口的引用
- window.parent 返回当前窗体的父窗体对象
- window.top 返回当前窗体最顶层的父窗体的引用
- window.outerwidt 返回当前窗口的外部宽
- window.outerheight 返回当前窗口的外部高
- window.innerwidth 返回当前窗口的可显示区域宽
- window.innerheight 返回当前窗口的可显示区域高

提示：通过直接在 Chrome 控制台中输入 console.log(window) 可以查看到其所有的被当前浏览器支持的属性及值。<br />**window 对象的常用方法**

- window.prompt() 弹出一个输入提示框，若用户点击了“取消”则返回 null
- window.alert() 弹出一个警告框
- window.confirm() 弹出一个确认框
- window.close() 关闭当前浏览器窗口。 有些浏览器对此方法有限制。
- window.open(uri, [name], [features]) 打开一个浏览器窗口，显示指定的网页。name 属性值可以是“_blank”、“_self”、“_parent”、“_top”、任意指定的一个窗口名。
- window.blur( ) 指定当前窗口失去焦点
- window.focus( ) 指定当前窗口获得焦点
- window.showModalDialog(uri, [dataFromParent]) 打开一个“模态窗口”（打开的子窗口只要不关闭，其父窗口即无法获得焦点；且父子窗口间可以传递数据）

<a name="jnOxK"></a>
### **document 常用属性与方法**
**document 常见的属性**

- body 提供对  元素的直接访问。对于定义了框架集的文档，该属性引用最外层的 。
- cookie 设置或返回与当前文档有关的所有 cookie。
- domain 返回当前文档的域名。
- lastModified 返回文档被最后修改的日期和时间。
- referrer 返回载入当前文档的文档的 URL。
- title 返回当前文档的标题。
- URL 返回当前文档的 URL。

**document常见的方法**

- write()：动态向页面写入内容
- createElement(Tag)：创建一个 HTML 标签对象
- getElementById(ID)：获得指定 id 的对象
- getElementsByName(Name)：获得之前 Name 的对象
- body.appendChild(oTag)：向 HTML 中插入元素对象

<a name="d2acY"></a>
### BOM属性对象方法
<br />什么是Bom? Bom是浏览器对象。有哪些常用的Bom属性呢？<br />(1)location对象<br />location.href-- 返回或设置当前文档的URL<br />location.search -- 返回URL中的查询字符串部分。例如 [http://www.dreamdu.com/dreamd](http://www.dreamdu.com/dreamd)... 返回包括(?)后面的内容?id=5&name=dreamdu<br />location.hash -- 返回URL#后面的内容，如果没有#，返回空<br />location.host -- 返回URL中的域名部分，例如www.dreamdu.com<br />location.hostname -- 返回URL中的主域名部分，例如dreamdu.com<br />location.pathname -- 返回URL的域名后的部分。例如 [http://www.dreamdu.com/xhtml/](http://www.dreamdu.com/xhtml/) 返回/xhtml/<br />location.port -- 返回URL中的端口部分。例如 [http://www.dreamdu.com:8080/xhtml/](http://www.dreamdu.com:8080/xhtml/) 返回8080<br />location.protocol -- 返回URL中的协议部分。例如 [http://www.dreamdu.com:8080/xhtml/](http://www.dreamdu.com:8080/xhtml/) 返回(//)前面的内容http:<br />location.assign -- 设置当前文档的URL<br />location.replace() -- 设置当前文档的URL，并且在history对象的地址列表中移除这个URL location.replace(url);<br />location.reload() -- 重载当前页面<br />(2)history对象<br />history.go() -- 前进或后退指定的页面数 history.go(num);<br />history.back() -- 后退一页<br />history.forward() -- 前进一页<br />(3)Navigator对象<br />navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)<br />navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie

<a name="0xUdG"></a>
### HTML全局属性(global attribute)

- accesskey:设置快捷键，提供快速访问元素如aaa在windows下的firefox中按alt + shift + a可激活元素
- class:为元素设置类标识，多个类名用空格分开，CSS和javascript可通过class属性获取元素
- contenteditable: 指定元素内容是否可编辑
- contextmenu: 自定义鼠标右键弹出菜单内容
- data-*: 为元素增加自定义属性
- dir: 设置元素文本方向
- draggable: 设置元素是否可拖拽
- dropzone: 设置元素拖放类型： copy, move, link
- hidden: 表示一个元素是否与文档。样式上会导致元素不显示，但是不能用这个属性实现样式效果
- id: 元素id，文档内唯一
- lang: 元素内容的的语言
- spellcheck: 是否启动拼写和语法检查
- style: 行内css样式
- tabindex: 设置元素可以获得焦点，通过tab可以导航
- title: 元素相关的建议信息
- translate: 元素和子孙节点内容是否需要本地化
<a name="VCMy5"></a>
### offsetWidth/offsetHeight,clientWidth/clientHeight与scrollWidth/scrollHeight的区别
offsetWidth/offsetHeight返回值包含content + padding + border，效果与e.getBoundingClientRect()相同<br />clientWidth/clientHeight返回值只包含content + padding，如果有滚动条，也不包含滚动条<br />scrollWidth/scrollHeight返回值包含content + padding + 溢出内容的尺寸

<a name="4kBhN"></a>
### attribute和property的区别
attribute是dom元素在文档中作为html标签拥有的属性；<br />property就是dom元素在js中作为对象拥有的属性。<br />对于html的标准属性来说，attribute和property是同步的，是会自动更新的<br />但是对于自定义的属性来说，他们是不同步的

<a name="ij4qR"></a>
### e.getAttribute(propName)和e.propName区别和联系

- e.getAttribute()，是标准DOM操作文档元素属性的方法，具有通用性可在任意文档上使用，返回元素在源文件中设置的属性
- e.propName通常是在HTML文档中访问特定元素的特性，浏览器解析元素后生成对应对象（如a标签生成HTMLAnchorElement），这些对象的特性会根据特定规则结合属性设置得到，对于没有对应特性的属性，只能使用getAttribute进行访问
- e.getAttribute()返回值是源文件中设置的值，类型是字符串或者null（有的实现返回""）
- e.propName返回值可能是字符串、布尔值、对象、undefined等
- 大部分attribute与property是一一对应关系，修改其中一个会影响另一个，如id，title等属性
- 一些布尔属性的检测设置需要hasAttribute和removeAttribute来完成，或者设置对应property
- 像[link](https://github.com/Rashomon511/LearningRecord/index.html)中href属性，转换成property的时候需要通过转换得到完整URL
- 一些attribute和property不是一一对应如：form控件中对应的是defaultValue，修改或设置value property修改的是控件当前值，setAttribute修改value属性不会改变value property

<a name="hMMNb"></a>
### target和currentTarget的区别
event.target 返回触发事件的元素<br />event.currentTarget 返回绑定事件的元素

<a name="CkwR8"></a>
### document load 和 document DOMContentLoaded 两个事件的区别
他们的区别是，触发的时机不一样，先触发DOMContentLoaded事件（DOM树构建完成），后触发load事件（页面加载完毕）

<a name="eyWRo"></a>
### **src 与 href 的区别**

- href 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。
- src 是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；
- 在请求 src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片和 frame 等元素。
当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 js 脚本放在底部而不是头部。

<a name="BbMBo"></a>
### '<'script'>'、'<'script async'>'和'<'script defer'>'的区别

- script<br />当解析器遇到 script 标签时，文档的解析将停止，并立即下载并执行脚本，脚本执行完毕后将继续解析文档。<br />
- defer script<br />当解析器遇到 script 标签时，文档的解析不会停止，其他线程将下载脚本，待到文档解析完成，脚本才会执行。<br />
- async script<br />当解析器遇到 script 标签时，文档的解析不会停止，其他线程将下载脚本，脚本下载完成后开始执行脚本，脚本执行的过程中文档将停止解析，直到脚本执行完毕。<br />

如果脚本不依赖于任何脚本，并不被任何脚本依赖，那么则使用 defer。<br />如果脚本是模块化的，不依赖于任何脚本，那么则使用 async。<br />defer 的脚本是按照声明顺序执行的。而 async 的脚本不同，只要脚本下载完成，将会立即执行，未必会按照声明顺序执行。

<a name="Fdknn"></a>
### **html 中 title 属性和 alt 属性的区别 **

1. alt
```javascript
<img src="#" alt="alt 信息" />
```
当图片不输出信息的时候，会显示 alt 信息， 鼠标放上去没有信息。
当图片正常读取，不会出现 alt 信息。

1. title
```javascript
<img src="#" alt="alt 信息" title="title 信息" />
```
当图片不输出信息的时候，会显示 alt 信息，鼠标放上去会出现 title 信息。
当图片正常输出的时候，不会出现 alt 信息，鼠标放上去会出现 title 信息

<a name="6119N"></a>
### focus/blur与focusin/focusout的区别与联系

1. focus/blur不冒泡，focusin/focusout冒泡
1. focus/blur兼容性好，focusin/focusout在除FireFox外的浏览器下都保持良好兼容性，如需使用事件托管，可考虑在FireFox下使用事件捕获elem.addEventListener('focus', handler, true)
1. 可获得焦点的元素：
- window
- 链接被点击或键盘操作
- 表单空间被点击或键盘操作
- 设置tabindex属性的元素被点击或键盘操作

<a name="wPUAK"></a>
### mouseover/mouseout与mouseenter/mouseleave的区别与联系

1. mouseover/mouseout是标准事件，所有浏览器都支持；mouseenter/mouseleave是IE5.5引入的特有事件后来被DOM3标准采纳，现代标准浏览器也支持
1. mouseover/mouseout是冒泡事件；mouseenter/mouseleave不冒泡。需要为多个元素监听鼠标移入/出事件时，推荐mouseover/mouseout托管，提高性能
1. 标准事件模型中event.target表示发生移入/出的元素,vent.relatedTarget对应移出/如元素；在老IE中event.srcElement表示发生移入/出的元素，event.toElement表示移出的目标元素，event.fromElement表示移入时的来源元素

鼠标从div#target元素移出时进行处理，判断逻辑如下

```javascript
<div id="target"><span>test</span></div>

<script type="text/javascript">
var target = document.getElementById('target');
if (target.addEventListener) {
  target.addEventListener('mouseout', mouseoutHandler, false);
} else if (target.attachEvent) {
  target.attachEvent('onmouseout', mouseoutHandler);
}

function mouseoutHandler(e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  // 判断移出鼠标的元素是否为目标元素
  if (target.id !== 'target') {
    return;
  }

  // 判断鼠标是移出元素还是移到子元素
  var relatedTarget = event.relatedTarget || e.toElement;
  while (relatedTarget !== target
    && relatedTarget.nodeName.toUpperCase() !== 'BODY') {
    relatedTarget = relatedTarget.parentNode;
  }

  // 如果相等，说明鼠标在元素内部移动
  if (relatedTarget === target) {
    return;
  }

  // 执行需要操作
  //alert('鼠标移出');

}
</script>
```


<a name="gnuN1"></a>
### 通用事件监听函数
```javascript
// event(事件)工具集，来源：github.com/markyun
 	markyun.Event = {
 		// 页面加载完成后
 		readyEvent : function(fn) {
 			if (fn==null) {
 				fn=document;
 			}
 			var oldonload = window.onload;
 			if (typeof window.onload != 'function') {
 				window.onload = fn;
 			} else {
 				window.onload = function() {
 					oldonload();
 					fn();
 				};
 			}
 		},
 		// 视能力分别使用dom0||dom2||IE方式 来绑定事件
 		// 参数： 操作的元素,事件名称 ,事件处理程序
 		addEvent : function(element, type, handler) {
 			if (element.addEventListener) {
 				//事件类型、需要执行的函数、是否捕捉
 				element.addEventListener(type, handler, false);
 			} else if (element.attachEvent) {
 				element.attachEvent('on' + type, function() {
 					handler.call(element);
 				});
 			} else {
 				element['on' + type] = handler;
 			}
 		},
 		// 移除事件
 		removeEvent : function(element, type, handler) {
 			if (element.removeEventListener) {
 				element.removeEventListener(type, handler, false);
 			} else if (element.datachEvent) {
 				element.detachEvent('on' + type, handler);
 			} else {
 				element['on' + type] = null;
 			}
 		},
 		// 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
 		stopPropagation : function(ev) {
 			if (ev.stopPropagation) {
 				ev.stopPropagation();
 			} else {
 				ev.cancelBubble = true;
 			}
 		},
 		// 取消事件的默认行为
 		preventDefault : function(event) {
 			if (event.preventDefault) {
 				event.preventDefault();
 			} else {
 				event.returnValue = false;
 			}
 		},
 		// 获取事件目标
 		getTarget : function(event) {
 			return event.target || event.srcElement;
 		},
 		// 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
 		getEvent : function(e) {
 			var ev = e || window.event;
 			if (!ev) {
 				var c = this.getEvent.caller;
 				while (c) {
 					ev = c.arguments[0];
 					if (ev && Event == ev.constructor) {
 						break;
 					}
 					c = c.caller;
 				}
 			}
 			return ev;
 		}
 	};
```

<a name="plPnr"></a>
### 
<a name="Gne7q"></a>
### 渐进式渲染 (progressive rendering)
渐进式渲染是用于提高网页性能（尤其是提高用户感知的加载速度），以尽快呈现页面的技术。<br />在以前互联网带宽较小的时期，这种技术更为普遍。如今，移动终端的盛行，而移动网络往往不稳定，渐进式渲染在现代前端开发中仍然有用武之地。<br />一些举例：<br />图片懒加载——页面上的图片不会一次性全部加载。当用户滚动页面到图片部分时，JavaScript将加载并显示图像。<br />确定显示内容的优先级（分层次渲染）——为了尽快将页面呈现给用户，页面只包含基本的最少量的CSS、脚本和内容，然后可以使用延迟加载脚本或监听DOMContentLoaded/load事件加载其他资源和内容。<br />异步加载HTML片段——当页面通过后台渲染时，把HTML拆分，通过异步请求，分块发送给浏览器。更多相关细节可以在这里找到。


<a name="LKzwj"></a>
### ** reflow 和 repaint **
**repaint 就是重绘，reflow 就是回流。**<br />严重性：在性能优先的前提下，性能消耗 reflow 大于 repaint。<br />体现：repaint 是某个 DOM 元素进行重绘；reflow 是整个页面进行重排，也就是页面所有 DOM 元素渲染。<br />如何触发：style 变动造成 repaint 和 reflow。

1. 不涉及任何 DOM 元素的排版问题的变动为 repaint，例如元素的 color/text-align/text-decoration 等等属性的变动。
1. 除上面所提到的 DOM 元素 style 的修改基本为 reflow。例如元素的任何涉及 长、宽、行高、边框、display 等 style 的修改。

常见触发场景<br />**触发 repaint：**

- color 的修改，如 color=#ddd；
- text-align 的修改，如 text-align=center；
- a:hover 也会造成重绘。
- :hover 引起的颜色等不导致页面回流的 style 变动。

**触发 reflow：**

- width/height/border/margin/padding 的修改，如 width=778px；
- 动画，:hover 等伪类引起的元素表现改动，display=none 等造成页面回流；
- appendChild 等 DOM 元素操作；
- font 类 style 的修改；
- background 的修改，注意着字面上可能以为是重绘，但是浏览器确实回流了，经过浏览器厂家的优化，部分 background 的修改只触发 repaint，当然 IE 不用考虑；
- scroll 页面，这个不可避免；
- resize 页面，桌面版本的进行浏览器大小的缩放，移动端的话，还没玩过能拖动程序，resize 程序窗口大小的多窗口操作系统。
- 读取元素的属性（这个无法理解，但是技术达人是这么说的，那就把它当做定理吧）：读取元素的某些属性（offsetLeft、offsetTop、offsetHeight、offsetWidth、scrollTop/Left/Width/Height、clientTop/Left/Width/Height、getComputedStyle()、currentStyle(in IE))；

**如何避免：**

- 尽可能在 DOM 末梢通过改变 class 来修改元素的 style 属性：尽可能的减少受影响的 DOM 元素。
- 避免设置多项内联样式：使用常用的 class 的方式进行设置样式，以避免设置样式时访问 DOM 的低效率。
- 设置动画元素 position 属性为 fixed 或者 absolute：由于当前元素从 DOM 流中独立出来，因此受影响的只有当前元素，元素 repaint。
- 牺牲平滑度满足性能：动画精度太强，会造成更多次的 repaint/reflow，牺牲精度，能满足性能的损耗，获取性能和平滑度的平衡。
- 避免使用 table 进行布局：table 的每个元素的大小以及内容的改动，都会导致整个 table 进行重新计算，造成大幅度的 repaint 或者 reflow。改用 div 则可以进行针对性的 repaint 和避免不必要的 reflow。
- 避免在 CSS 中使用运算式：学习 CSS 的时候就知道，这个应该避免，不应该加深到这一层再去了解，因为这个的后果确实非常严重，一旦存在动画性的 repaint/reflow，那么每一帧动画都会进行计算，性能消耗不容小觑。

<a name="YBWtw"></a>
###  HTML5 的基本构件（building block）

- 语义 - 提供更准确地描述内容。
- 连接 - 提供新的方式与服务器通信。
- 离线和存储 - 允许网页在本地存储数据并有效地离线运行。
- 多媒体 - 在 Open Web 中，视频和音频被视为一等公民（first-class citizens）。
- 2D/3D 图形和特效 - 提供更多种演示选项。
- 性能和集成 - 提供更快的访问速度和性能更好的计算机硬件。
- 设备访问 - 允许使用各种输入、输出设备。
- 外观 - 可以开发丰富的主题


<a name="bsSfj"></a>
### HTML5 为什么只需要写 < !DOCTYPE HTML> 
HTML5 不基于 SGML(标准通用标记语言（以下简称“通用标言”)，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）；
而 HTML4.01 基于 SGML，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型。

<a name="Ra8V7"></a>
### **行内元素 块级元素空(void)元素**
CSS 规范规定，每个元素都有 display 属性，确定该元素的类型，每个元素都有默认的 display 值。
如 div 的 display 默认值为 “block”，则为“块级”元素；
span 默认 display 属性值为 “inline”，是“行内”元素。

- 行内元素有：a b span img input select strong（强调的语气）
- 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4  p
- 常见的空元素： img input link meta br hr ，鲜为人知的是：area base col command embed keygen param source track wbr
> HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为
> 而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型


<a name="KphSi"></a>
### **title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别 **

- title 属性没有明确意义只表示是个标题，H1 则表示层次明确的标题，对页面信息的抓取也有很大的影响；<br />
- strong 是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：`strong 会重读，而 b 是展示强调内容`。<br />
- i 内容展示为斜体，em 表示强调的文本；<br />
- Physical Style Elements -- 自然样式标签：b, i, u, s, pre<br />
- Semantic Style Elements -- 语义样式标签：strong, em, ins, del, code<br />
- 应该准确使用语义样式标签, 但不能滥用, 如果不能确定时，首选使用自然样式标签。<br />

<a name="2YGvX"></a>
### HTML5 新特性
HTML5 现在已经不是 SGML（标准通用标记语言）的子集，主要是关于图像，位置，存储，多任务等功能的增加。<br />**新特性**

- 绘画 canvas;
- 用于媒介回放的 video 和 audio 元素;
- 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
- sessionStorage 的数据在浏览器关闭后自动删除;
- 语意化更好的内容元素，比如 article、footer、header、nav、section;
- 表单控件：calendar、date、time、email、url、search;
- 新的技术：webworker, websocket, Geolocation;

**移除的元素**

- 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
- 对可用性产生负面影响的元素：frame，frameset，noframes；

**支持 HTML5 新标签**

- IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签，可以利用这一特性让这些浏览器支持 HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式。
- 当然也可以直接使用成熟的框架、比如 html5shim;
```javascript
<!--[if lt IE 9]>
<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
<![endif]-->
```


<a name="F4Mry"></a>
### ** HTML 语义化**
**意义**：根据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。
注意：<br />1.尽可能少的使用无语义的标签div和span；<br />2.在语义不明显时，既可以使用div或者p时，尽量用p,
因为p在默认情况下有上下间距，对兼容特殊终端有利；<br />3.不要使用纯样式标签，如：b、font、u等，改用css设置。<br />4.需要强调的文本，可以包含在strong或者em标签中（浏览器预设样式，能用CSS指定就不用他们），strong默认样式是加粗（不要用b），em是斜体（不用i）；<br />5.使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td；<br />6.表单域要用fieldset标签包起来，并用legend标签说明表单的用途；<br />7.每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/218767/1566910470232-8d3eede4-3501-4918-b3db-f8dde1e6ee56.png#align=left&display=inline&height=521&name=image.png&originHeight=698&originWidth=886&size=289964&status=done&width=661)


<a name="JsWij"></a>
### **HTML5 的离线储存与工作原理**
在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。<br />原理<br />HTML5 的离线存储是基于一个新建的 .appcache 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。<br />**如何使用**

- 1、页面头部像下面一样加入一个 manifest 的属性；
- 2、在 cache.manifest 文件的编写离线存储的资源；
```
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
resourse/logo.png
FALLBACK:
//offline.html
复制代码
```

- 3、在离线状态时，操作 window.applicationCache 进行需求实现。

<a name="HTkNj"></a>
### **浏览器是怎么对 HTML5 的离线储存资源进行管理和加载**
在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。<br />如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。<br />离线的情况下，浏览器就直接使用离线存储的资源。

<a name="hLDFK"></a>
### **cookies，sessionStorage 和 localStorage **
**介绍**

- cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
- cookie 数据始终在同源的 http 请求中携带（即使不需要），也会在浏览器和服务器间来回传递。
- sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。

**存储大小**

- cookie 数据大小不能超过 4k。
- sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

**有期时间**

- localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
- sessionStorage 数据在当前浏览器窗口关闭后自动删除。
- cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。

<a name="pD2Kc"></a>
### iframe 内嵌框架
内联框架 iframe一般用来包含别的页面，例如 我们可以在我们自己的网站页面加载别人网站的内容，为了更好的效果，可能需要使 iframe 透明效果；

- iframe 会阻塞主页面的 onload 事件；
- 搜索引擎的检索程序无法解读这种页面，不利于 SEO 搜索引擎优化（Search Engine Optimization）
- iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

如果需要使用 iframe，最好是通过 javascript 动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。

<a name="GQPu1"></a>
### Label 的作用
label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上
```javascript
<label for="Name">Number:</label>
<input type=“text“ name="Name"  id="Name"/>
<label>Date:<input type="text" name="B"/></label>
```

<br />
<a name="OdZMd"></a>
### **浏览器内多个标签页之间的通信**

- WebSocket、SharedWorker；
- 也可以调用 localstorge、cookies 等本地存储方式；
- localstorge 在另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信；
注意 quirks：Safari 在无痕模式下设置 localstorge 值时会抛出 QuotaExceededError 的异常；

<a name="5Pp46"></a>
### **webSocket 如何兼容低浏览器**

- Adobe Flash Socket 、
- ActiveX HTMLFile (IE) 、
- 基于 multipart 编码发送 XHR 、
- 基于长轮询的 XHR。

<a name="DG240"></a>
### **页面可见性（Page Visibility API）用途 **

- 通过 visibilityState 的值检测页面当前是否可见，以及打开网页的时间等;
- 在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放；


<a name="Kdi1y"></a>
### **前端页面有哪三层构成**
**网页分成三个层次，即：结构层、表示层、行为层。**

- 网页的结构层（structurallayer）由 HTML 或 XHTML 之类的标记语言负责创建。
标签，也就是那些出现在尖括号里的单词，对网页内容的语义含义做出这些标签不包含任何关于如何显示有关内容的信息。例如，P 标签表达了这样一种语义：“这是一个文本段。”
- 网页的表示层（presentationlayer）由 CSS 负责创建。CSS 对“如何显示有关内容”的问题做出了回答。
- 网页的行为层（behaviorlayer）负责回答 “内容应该如何对事件做出反应” 这一问题。
这是 Javascript 语言和 DOM 主宰的领域。


