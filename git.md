## **git 简介**

`git` 是世界上最先进的分布式版本控制系统  
`git` 是 `linux` 创始人 `linus` 用 `c` 写的  
注: 所有的版本控制系统, 其实只能跟踪文本文件的改动, 二进制文件如图片, 视频, word 格式文档都无法知道改了啥

## **git 安装**

`linux`: 在 `debian` 或 `ubuntu` 版本上安装用 `sudo apt-get install git`, 其他版本可用源码安装  
`mac`: 可安装 `xcode`, 集成了 `git`, `xcode` 是Apple官方IDE，功能非常强大  
`windows`: 从官网直接下载安装程序, 然后按默认选项安装即可  
安装完成后需设置用户名密码, 因为 `git` 是分布式版本控制系统, 所以每个机器都必须自报家门

	使用 git config 命令设置用户信息, --global 参数表示你这台机器上所有的Git仓库都会使用这个配置
	git config --global user.name 'your name'
	git config --global user.email 'email@example.com'
	当然也可以对某个仓库指定不同的用户名和 email 地址

## **创建版本库**

版本库: `repository` 又名仓库, 里面的所有文件都可以被 git 管理起来, 每个文件的修改, 删除, git 都能跟踪  
创建: `git init` 即可把目录变为 git 可以管理的版本库  
添加: `git add <file>` 将文件添加到仓库, 可以添加某一个文件  
提交: `git commit -m <message>` 将文件提交到仓库, 一次提交多个文件  
查看仓库状态: `git status`  
查看修改内容: `git diff <file>`