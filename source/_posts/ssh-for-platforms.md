---
title: 不同代码托管平台下，SSH密钥的生成及配置
date: 2018-08-14 15:43:31
tags: Git
categories: 笔记
---

## 背景

对于我而言，闭源项目都在[coding][1]上托管，而开源项目都托管在[github][2]上。二者都是基于Git的开源分布式版本控制系统，在本地可以通过SSH协议进行远程登录验证和数据传输，而使用该协议需要在托管平台上配置公钥，客户端（电脑）存放公钥对应的密钥。

默认情况下，在同一客户端（电脑）生成密钥时，密钥所存放的文件位置和文件名称是相同的（默认为C:\Users\spin\.ssh\id_rsa和C:\Users\spin\.ssh\id_rsa.pub），那么就会出现新生成的密钥覆盖原来的密钥。所以，我们需要将区分开不同代码托管平台的密钥文件。

## 生成公私密钥

一、闭源项目托管在[coding][1]上，那么：

1. 任意打开一个目录，打开git命令行；

1. 执行**ssh-keygen -t rsa -C "{你的邮箱}"**；

1. 接下来会询问你存放密钥的路径和文件名称**Enter file in which to save the key (/c/Users/{用户名}/.ssh/id_rsa)**，假设存储为/c/Users/{用户名}/.ssh/codingnet_rsa，如果不填默认文件名就是id_rsa;

1. 接下来还会询问你是否需要登录密码，可以设置也可以不设置；

1. 最终，打开C:\Users\{用户名}\.ssh目录，将发现目录下生成了**codingnet_rsa**和**codingnet_rsa.pub**两个文件。

  **生成公私有密钥步骤：**

    ```
    winsycwen@DESKTOP-GRBPS3N MINGW64 ~
    $ ssh-keygen -t rsa -C "{你的邮箱}"
    Generating public/private rsa key pair.
    Enter file in which to save the key (/c/Users/{用户名}/.ssh/id_rsa): /c/Users/{用户名}/.ssh/codingnet_rsa
    Created directory '/c/Users/{用户名}/.ssh'.
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /c/Users/{用户名}/.ssh/codingnet_rsa.
    Your public key has been saved in /c/Users/{用户名}/.ssh/codingnet_rsa.pub.
    The key fingerprint is:
    SHA256:xxxxxxxxxxxxxxxxx {你的邮箱}
    The key's randomart image is:xxxxxxxxxxxxxxxxxxxxxxxxxx

    ```

二、开源项目托管在[github][2]上，那么：

1. 步骤同上，只是在第2步将密钥文件命名为github_rsa。

1. 最终，打开**C:\Users\{用户名}\.ssh**目录，将发现目录下生成了**github_rsa**和**github_rsa.pub**两个文件。


## 分别配置公用密钥

一、对于闭源项目：

1. 打开**C:\Users\{用户名}\.ssh\codingnet_rsa.pub**并复制里面的内容；

1. 打开[coding][1]并登录，找到配置SSH公钥的页面并添加SSH公钥；

二、对于开源项目：

1. 打开**C:\Users\{用户名}\.ssh\github_rsa.pub**并复制里面的内容；

1. 打开[github][2]并登录，找到配置SSH公钥的页面并添加SSH公钥；

## 检测有效性

由于，首次建立连接需要获得主机的信任，因此需要执行下列操作：

一、对于闭源项目：

1. 打开git命令行，执行**ssh-agent bash**，然后执行**ssh-add ~/.ssh/codingnet_rsa**；

    ```
    winsycwen@DESKTOP-GRBPS3N MINGW64 /d/study/project
    $ ssh-add ~/.ssh/codingnet_rsa
    Identity added: /c/Users/winsycwen/.ssh/codingnet_rsa (/c/Users/winsycwen/.ssh/codingnet_rsa)
    ```

1. 执行**ssh -T git@git.coding.net**

    ```
    winsycwen@DESKTOP-GRBPS3N MINGW64 /d/study/project
    $ ssh -T git@git.coding.net
    Coding 提示: Hello winsycwen, You've connected to Coding.net via SSH. This is a personal key.
    winsycwen，你好，你已经通过 SSH 协议认证 Coding.net 服务，这是一个个人公钥
    ```

1. 最后，我们可以测试一下，例如执行**git clone git@git.coding.net:{用户名}/{仓库名}.git**

二、对于开源项目：

1. 打开git命令行，执行**ssh-agent bash**，然后执行**ssh-add ~/.ssh/github_rsa**；

    ```
    winsycwen@DESKTOP-GRBPS3N MINGW64 /d/study/project
    $ ssh-add ~/.ssh/github_rsa
    Identity added: /c/Users/winsycwen/.ssh/github_rsa (/c/Users/winsycwen/.ssh/github_rsa)
    ```

1. 执行**ssh -T git@github.com**

    ```
    winsycwen@DESKTOP-GRBPS3N MINGW64 /d/study/project
    $ ssh -T git@github.com
    Hi winsycwen! You've successfully authenticated, but GitHub does not provide shell access.
    ```

1. 最后，我们可以测试一下，例如执行**git clone git@github.com:{用户名}/{仓库名}.git**

  [1]: https://coding.net/ "coding"
  [2]: http://github.com/ "github"