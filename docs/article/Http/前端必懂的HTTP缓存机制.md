---
title: 前端必懂的HTTP缓存机制
---

# 前端必懂的HTTP缓存机制

<a name="0560882d"></a>
# HTTP缓存机制

Http 缓存机制作为 web 性能优化的重要手段，对从事 Web 开发的小伙伴们来说是必须要掌握的知识，要想彻底搞懂HTTP缓存机制<br />那就需从HTTP缓存基本概念说起。

<a name="c89e83b0"></a>
## Http缓存基本概念

<a name="c9bf556a"></a>
### Http报文

在浏览器和服务器进行Http通信时发送的数据即为Http报文，其中分为两部分：<br />1.header - 报文的首部或头部，其中保存着各类请求的属性字段，关于Http的缓存相关规则信息均保存在header中<br />2.body - 请求体部分，Http请求真正传输的主体部分

<a name="30a0b120"></a>
### 与缓存相关的首部字段

1.通用首部字段<br />![](https://user-images.githubusercontent.com/21194931/56130129-a8ab5c80-5fb6-11e9-8294-2da41892ccdf.png#align=left&display=inline&height=82&originHeight=82&originWidth=649&status=uploading&width=649)

2.请求首部字段<br />![](https://user-images.githubusercontent.com/21194931/56130136-ad701080-5fb6-11e9-8308-33dd69394269.png#align=left&display=inline&height=132&originHeight=132&originWidth=649&status=uploading&width=649)

3.响应首部字段<br />![](https://user-images.githubusercontent.com/21194931/56130143-b365f180-5fb6-11e9-9d34-22c3e41c18ba.png#align=left&display=inline&height=57&originHeight=57&originWidth=648&status=uploading&width=648)

4.实体首部字段<br />![](https://user-images.githubusercontent.com/21194931/56130159-bd87f000-5fb6-11e9-81ac-98e70067185e.png#align=left&display=inline&height=82&originHeight=82&originWidth=648&status=uploading&width=648)

<a name="725921ac"></a>
### 首次请求规则

Http缓存主要涉及三个角色：一是浏览器，二是浏览器的缓存数据库，三是服务器。当浏览器端向服务器发出第一次请求时：

![](https://user-images.githubusercontent.com/21194931/56130179-caa4df00-5fb6-11e9-867f-a609f5a23982.png#align=left&display=inline&height=734&originHeight=734&originWidth=1166&status=uploading&width=1166)

<a name="17ef9bc6"></a>
## 缓存的类型

> 缓存的类型主要分为两种：强制缓存和协商缓存


两类缓存规则可以同时存在，强制缓存优先级高于对比缓存，也就是说，当执行强制缓存的规则时，如果缓存生效，直接使用缓存，不再执行对比缓存规则。

<a name="a80b42f8"></a>
### 强制缓存

强缓存基本原理是：所请求的数据在缓存数据库中尚未过期时，不与服务器进行交互，直接使用缓存数据库中的数据。当缓存未过期时基本流程如下

而控制强缓存过期时间的主要有两个规则字段：

1. Expire 其指定了一个日期/时间， 在这个日期/时间之后，HTTP响应被认为是过时的。但是它本身是一个HTTP1.0标准下的字段，所以如果请求中还有一个置了 “max-age” 或者 “s-max-age” 指令的Cache-Control响应头，那么 Expires 头就会被忽略。
1. Cache-Control通用消息头用于在http 请求和响应中通过指定指令来实现缓存机制。其常用的几个取值有：

private：客户端可以缓存<br />public：客户端和代理服务器都可以缓存<br />max-age=xxx：缓存的内容将在xxx 秒后失效<br />s-max-age=xxx：同s-max-age，但仅适用于共享缓存(比如各个代理)，并且私有缓存中忽略。<br />no-cache：需要使用协商缓存来验证缓存数据<br />no-store：所有内容都不会缓存，强缓存和协商缓存都不会触发<br />must-revalidate：缓存必须在使用之前验证旧资源的状态，并且不可使用过期资源。

例如:<br />![](https://user-images.githubusercontent.com/21194931/56130194-d2648380-5fb6-11e9-902c-eb23b7220445.png#align=left&display=inline&height=668&originHeight=668&originWidth=1736&status=uploading&width=1736)

其中的Cache-Control字段中即标识了缓存可以被客户端和代理服务器缓存，并且缓存的时间为315…秒(365天)后失效，我们在执行这一请求时在其缓存过期时间之内，所以直接命中并从磁盘中读取，不需要与服务器交互。

<a name="f9465812"></a>
### 协商缓存

协商存基本原理是：浏览器第一次请求数据时，服务器会将缓存标识与数据一起返回给客户端，客户端将二者备份至缓存数据库中。<br />再次请求数据时，客户端将备份的缓存标识发送给服务器，服务器根据缓存标识进行判断，判断成功后，返回304状态码，通知客户端比较成功，可以使用缓存数据

<a name="1dc7a96f"></a>
#### Last-Modified/If-Modified-Since规则

<a name="ee3f3a98"></a>
##### Last-Modified：

服务器在响应请求时，告诉浏览器资源的最后修改时间。

<a name="89c1e98b"></a>
##### If-Modified-Since：

再次请求服务器时，通过此字段通知服务器上次请求时，服务器返回的资源最后修改时间。<br />服务器收到请求后发现有头If-Modified-Since 则与被请求资源的最后修改时间进行比对。<br />若资源的最后修改时间大于If-Modified-Since，说明资源又被改动过，则响应整片资源内容，返回状态码200；<br />若资源的最后修改时间小于或等于If-Modified-Since，说明资源无新修改，则响应HTTP 304，告知浏览器继续使用所保存的cache。

<a name="cf5e7096"></a>
#### Etag/If-None-Match规则（优先级高于Last-Modified/If-Modified-Since）

<a name="5849df01"></a>
##### Etag：

服务器资源的唯一标识符, 浏览器可以根据ETag值缓存数据, 节省带宽. 如果资源已经改变, etag可以帮助防止同步更新资源的相互覆盖. ETag 优先级比 Last-Modified 高.

<a name="0fb1b73a"></a>
##### If-None-Match：

再次请求服务器时，通过此字段通知服务器客户段缓存数据的唯一标识。<br />服务器收到请求后发现有头If-None-Match 则与被请求资源的唯一标识进行比对，<br />不同，说明资源又被改动过，则响应整片资源内容，返回状态码200；<br />相同，说明资源无新修改，则响应HTTP 304，告知浏览器继续使用所保存的cache。

浏览器第二次请求过程：

![](https://user-images.githubusercontent.com/21194931/56130204-d8f2fb00-5fb6-11e9-9cf7-f4f03a3c87de.png#align=left&display=inline&height=531&originHeight=531&originWidth=556&status=uploading&width=556)

<a name="41734eb8"></a>
### 不能缓存的请求

1.不能被缓存的请求HTTP 信息头中包含Cache-Control:no-cache，pragma:no-cache，或Cache-Control:max-age=0 等告诉浏览器不用缓存的请求<br />2.需要根据Cookie，认证信息等决定输入内容的动态请求是不能被缓存的<br />3.经过HTTPS安全加密的请求（有人也经过测试发现，ie 其实在头部加入 Cache-Control：max-age 信息，firefox 在头部加入 Cache-Control:Public 之后，能够对HTTPS的资源进行缓存）<br />4.HTTP 响应头中不包含 Last-Modified/Etag，也不包含 Cache-Control/Expires 的请求无法被缓存<br />5.目前浏览器的实现是不会对POST请求的响应做缓存的（从语义上来说也不应该），并且规范中也规定了返回状态码不允许是304。不过这并不表示POST的响应不能被缓存，根据RFC 7231 - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content中描述的，如果在POST请求对应的响应中包含Freshness相关信息的话，这次响应也是可以被缓存，具体可以参考上面的那个链接

<a name="d8af35c6"></a>
### 缓存的优先级

> Pragma > Cache-Control > Expires > ETag > Last-Modified


参考资料：<br />[http协议缓存机制](https://segmentfault.com/a/1190000010690320)<br />[浅谈浏览器http的缓存机制](http://www.cnblogs.com/vajoy/p/5341664.html)<br />[Http缓存机制与原理](https://blog.csdn.net/jutal_ljt/article/details/80021545)
