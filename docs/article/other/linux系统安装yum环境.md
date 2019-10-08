---
layout: post
title: linux系统安装yum环境
---

# linux系统安装yum环境

今天手贱把我自己服务器上的yum给卸载了，服务器没了yum那就相当于废人了，于是一下午我都在折腾怎么重新装yum,
经过不懈努力终于安装好了，现在来记录一下:
<!-- more -->
### 第一步.卸载系统的默认安装的yum包

```
查看yum包
rpm -qa|grep yum
卸载yum,必须卸载干净，不然会报错
rpm -qa|grep yum|xargs rpm -e --nodeps
```

### 第二步.下载依赖包

```
wget http://vault.centos.org/7.3.1611/os/x86_64/Packages/yum-3.4.3-150.el7.centos.noarch.rpm
wget http://vault.centos.org/7.3.1611/os/x86_64/Packages/yum-metadata-parser-1.1.4-10.el7.x86_64.rpm
wget http://vault.centos.org/7.3.1611/os/x86_64/Packages/python-iniparse-0.4-9.el7.noarch.rpm
wget http://vault.centos.org/7.3.1611/os/x86_64/Packages/yum-plugin-fastestmirror-1.1.31-40.el7.noarch.rpm
```

尤其注意一点，你系统是7.3就必须安装7.3的，安装别的会出现找不到包的情况，所以要根据自己的系统去官网找对应的包

### 第三步.安装依赖包

```
rpm -ivh python-iniparse-0.4-9.el7.noarch.rpm

rpm -ivh yum-metadata-parser-1.1.4-10.el7.x86_64.rpm

rpm -ivh yum-3.4.3-150.el7.centos.noarch.rpm yum-plugin-fastestmirror-1.1.31-40.el7.noarch.rpm
```

后两个包是相互依赖的必须同时安装，安装好之后运行yum即可

