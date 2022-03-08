## mac 文件系统简介

mac 系统采用 unix 文件系统, 所有文件都挂在根目录下面, 没有 windows 系统的盘符概念  
mac 系统根目录用斜杠 `/` 表示且区别字符大小写  
mac 中点 `.` 表示当前目录, 两个点 `..` 表示上一级目录, 星号 `*` 匹配任意字符任意次数, 问号 `?` 匹配任意字符仅一次  

## 文件位置

驱动所在位置： `/Systme/Library/Extensions`  
用户文件夹位置：`/Users/用户名`，可以用波浪号 `~` 表示  
桌面位置：`/Users/用户名/Desktop`，可以用 `~/Desktop` 表示  

## 键位

`table` 键，单击可以实现自动补全，双击可以列出指定路径下的所有内容  

## 目录和文件常用命令

`cd` 进入指定文件夹路径  
`pwd`	显示当前的目录路径  
`ls` 显示当前目录下的内容  
`mkdir`	创建目录  
`touch` 创建指定格式的文件  
`mv` 移动文件夹/文件  
`mv` 重命名  
`rm` 删除文件  
`rm -r` 删除目录  
`cp` 复制文件  
`cp -r` 复制文件夹  
`file`	显示文件类型  

## 其他常用命令

`sudo` 获取 root 权限  
`clear`	清除屏幕或窗口内容  
`history`	列出最近执行过的命令及编号  
`hostname` 电脑在网络中的名称  
`date` 显示系统的当前日期和时间  
`cal`	显示日历  
`time` 统计程序的执行时间  

## 目录和文件操作进阶版

`open` 使用默认的程序打开文件  
`find` 使用匹配表达式查找文件  
`cat` 显示或连接文件内容  
`head` 显示文件的最初几行  
`tail` 显示文件的最后几行  
`diff` 比较并显示两个文件的内容差异  
`wc` 统计文件的字符数、词数和行数  
`uniq` 去掉文件中的重复行  

## 一般命令

`vim directory/file_name` 进入编辑模式, 用 vim 模式编辑  
`ls -l`	显示当前目录下的详细内容  
`ls -a` 显示当前目录下的内容	含点 `.` 开头的文件, `-a` `-A` 还不一样  
`rmdir`	删除空目录, 平时用得少  
`ln`	为文件创建联接	`ln -s file1 file2` s 表示软联接  
`paste` 横向拼接文件内容	`paste file1 file2`  
`grep` 通过简单正则表达式搜索文件  

## 远程交互

`ssh username@origin` 利用 ssh 连接到远程的服务器
`scp -r /path/to/local/dir usrname@orgname.edu:/path/to/remote/dir` 利用 ssh 中的 scp 来复制文件
`-r` 递归操作, 单文件的话不用, 文件夹需要
`-v` 查看进度
`-p` 选择端口