---
layout: post
title: 利用nginx部署静态页面
---

# 利用nginx部署静态页面

我看别人都有一个介绍自己的在线页面，所以我也手痒搞了一个，但是写的的让别人看见啊！
这时候我们可以用nginx来部署自己的页面。

## 需要条件
  1. 云服务器(我的是腾讯云)
  2. 一个自己的域名(codehao.com)

## 必要配置
### 第一步：登录云服务器
<!-- more -->
mac 电脑直接通过下面的命令行连接到你的服务器。连接时候会叫你输入密码，输入就是咯
```
ssh root@127.22.20.121 //你的服务器公有 ip
```
现在你就登陆上了你的云服务器了，可以进行安装了

### 第二步：安装git,node,nginx

![](/img/nginx/npmNginx.jpg)

nginx启动成功后，在浏览器输入你IP,出现一下画面即可:
![](/img/nginx/nginxStart.png)

## 正式配置
首先通过命令行新建一个 page文件夹

```
cd /usr/local

mkdir page

cd page
```
进入page文件夹后，可以利用git将代码从github拉去下来

```
git clone git@github.com:LuoShengMen/Home.git

```

> tips: 这里不能克隆到的，需要把服务器本机的公钥添加到码云上面。这个有很多教程我就不细说了。

代码都克隆到我们的服务器了之后，下面我们稍微配置一下 nginx 配置很简单，跟着我就可以了。进入到 nginx 配置目录

```
cd /etc/nginx/conf.d/

vim page.conf

```
然后通过 vim 命令新建一个配置文件后，按下 键盘的i 键，就可以写入内容，写入以下内容

```
server {
   server_name www.yuming.com; //你的域名
   root /usr/local/page;
   index index.html;
   location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt){
   root /usr/local/rashomon/Home;
   }
}
```

写入内容之后，按下esc然后输入:wq！来保存你编辑的内容。

退出之后我们需要通过命令行重启 nginx服务

```
sudo nginx -s reload
```