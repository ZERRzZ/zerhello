## git 简介

`git` 是世界上最先进的分布式版本控制系统  
`git` 是 `linux` 创始人 `linus` 用 `c` 写的  
注: 所有的版本控制系统, 其实只能跟踪文本文件的改动, 二进制文件如图片, 视频, word 格式文档都无法知道改了啥

## git 安装

`linux`: 在 `debian` 或 `ubuntu` 版本上安装用 `sudo apt-get install git`, 其他版本可用源码安装  
`mac`: 可安装 `xcode`, 集成了 `git`, `xcode` 是Apple官方IDE，功能非常强大  
`windows`: 从官网直接下载安装程序, 然后按默认选项安装即可  
安装完成后需设置用户名密码, 因为 `git` 是分布式版本控制系统, 所以每个机器都必须自报家门

	使用 git config 命令设置用户信息, --global 参数表示你这台机器上所有的Git仓库都会使用这个配置
	git config --global user.name 'your name'
	git config --global user.email 'email@example.com'
	当然也可以对某个仓库指定不同的用户名和 email 地址

## 版本库基础操作

版本库: `repository` 又名仓库, 里面的所有文件都可以被 git 管理起来, 每个文件的修改, 删除, git 都能跟踪  
创建: `git init` 即可把目录变为 git 可以管理的版本库  
添加: `git add <file>`  
提交: `git commit -m <message>`  
查看仓库状态: `git status`  
查看修改内容: `git diff <file>` 前提是该文件已被 git 跟踪  
查看提交日志: `git log` 从上到下, 由近到远 `--pretty=oneline` 一次提交只显示一行, 长串乱码表示 `commit_id`

## 版本回退

版本号: 即 `commit_id`, 一般用 `HEAD` 表示当前版本, `HEAD^` 表示上个版本, 再往上可以加多个 `^` 或用 `HEAD~n` 表示  
回退: `git reset --hard commit_id`  
查看命令日志: `git reflog` 可以看到每次命令对应的 `commit_id`, 版本号并没有显示完全, 可再用回退命令撤销上次回退  
版本回退实质: git 在内部有个指向当前版本的 HEAD 指针, 回退版本时仅仅是把 HEAD 指向移动一位而已

## 工作区与暂存区

工作区: 电脑上能看到的目录  
版本库: 工作区中的 `.git` 隐藏目录或带有 `.git` 隐藏目录的工作区  
版本库里有被称为 `stage|index` 的暂存区, 默认分支 `master|main`, 以及版本指针 `HEAD` 指向默认分支  
添加与提交: `git add` 实质是把文件添加到暂存区, `git commmit` 实质是把暂存区所有内容提交到当前分支  
撤销工作区修改: `git checkout -- file` 让文件回到最近一次提交或添加的状态, 必须加 `--`  
撤销暂存区修改: `git reset HEAD file` 把暂存区修改回退到工作区, `git reset` 的另一个功能  
删除文件: 删除也是一次修改 `git rm file` 删除文件, 其他操作与修改类似