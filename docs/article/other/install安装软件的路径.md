---
layout: post
title: 查询yum install安装软件的路径
---

# 查询yum install安装软件的路径

在使用yum安装mongo是遇到了一些问题，如图：
<!-- more -->
![](/img/linux/WechatIMG8698.jpeg)

那我们就必须卸载 mongodb-2.6.12-6.el7.x86_64,但是我找不到他了路径怎么办呢？

一般是 /usr/local 一般一个软件是要复制多个文件到不同的地方，包括可执行文件 ，文档， 配置文件。 通过yum安装的软件包，可以通过 rpm -ql 软件包名 来查询这个软件包具体都复制到了哪些文件到哪些地方。
RPM命令常用技巧若干：
如何查看rpm包里有什么内容

>rpm -qlp

如何查看rpm包的安装脚本

>rpm -qp --scripts

如何查看rpm包的依赖性关系

>rpm -qp --requires

如何查看rpm包详细信息

>rpm -qi

如何安装rpm包

>rpm -ivh

如何更新软件

>rpm -Uvh

如何卸载软件

>rpm -e

如何在安装过程中指定相对安装路径

>rpm -ivh --nodeps --force --root=你指定的路径

如何在安装过程中忽略依赖性关系

>rpm -ivh --nodeps --force

如何查看rpm包的更新记录

>rpm -qp --changelog

如何重新编译rpm包

>rpm -ba spec配置文件

以上的命令是别人写的，我拿来记录一下以免忘记。

那么我们可以使用下面的命令来直接卸载并安装
```
rpm -e mongodb-2.6.12-6.el7.x86_64

rm -rf /var/cache/yum //清除以免报错

yum install -y mongodb-org

```
以上即可完成mongo的安装
额外的配置
```
vi /etc/yum.repos.d/mongodb-org-3.6.repo

[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.4/x86_64/
gpgcheck=0
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

```





