
# MAC

## 概览

- MAC 系统采用 Unix 文件系统，所有文件都挂在根目录下面，没有 Windows 系统的盘符概念，根目录用斜杠 / 表示
- 在 Unix 系统中区别字符大小写，A.txt 不等于 a.txt
- 关键的标点符号：点 `.` 表示当前目录, 两个点 `..` 表示上一级目录，星号 `*` 匹配任意字符任意次数，问号 `?` 匹配任意字符仅一次
- 获得权限：为了防止误操作破坏系统，用户状态下没有权限操作重要的系统文件，需要先获取 root 权限，语法：`sudo -s`，然后会提示输入密码，输入密码时没有任何回显，连星号都没有，输入完密码按回车键即可

## 文件位置

- 驱动所在位置： `/Systme/Library/Extensions`
- 用户文件夹位置：`/Users/用户名`，可以用波浪号 `~` 表示
- 桌面位置：`/Users/用户名/Desktop`，可以用 `~/Desktop` 表示

## 键位

- `table` 键，单击可以实现自动补全，双击可以列出指定路径下的所有内容 

## 目录和文件常用命令

- `cd` 进入指定文件夹路径	`cd ~/Desktop`
- `pwd`	显示当前的目录路径 `/Users/xz/Desktop`
- `ls` 显示当前目录下的内容 `ls`
- `mkdir`	创建目录 `mkdir dir_name`
- `touch` 创建指定格式的文件 `touch file.ext`
- `mv` 移动文件夹/文件 `mv dir1 dir2` 把 dir1 目录移动到 dir2 中, `mv` 重命名 `mv name1 name2` 当 name2 不存在时会重命名 name1
- `rm` 删除文件 `rm file_name`, `rm -r` 删除目录 `rm -r dir`
- `cp` 复制文件	`cp file1 file2`, `cp -r` 复制文件夹 `cp -r dir1 dir2`
- `file`	显示文件类型	`file file_name`

## 其他常用命令

- `sudo` 获取 root 权限
- `clear`	清除屏幕或窗口内容
- `history`	列出最近执行过的命令及编号
- `hostname` 电脑在网络中的名称
- `date` 显示系统的当前日期和时间
- `cal`	显示日历
- `time` 统计程序的执行时间

## 目录和文件操作进阶版

- `open` 使用默认的程序打开文件	`open file_name`
- `find` 使用匹配表达式查找文件	`find *.file_format`
- `cat` 显示或连接文件内容 `cat file`
- `head` 显示文件的最初几行	`head -20 file_name`
- `tail` 显示文件的最后几行 `tail -10 file_name`
- `diff` 比较并显示两个文件的内容差异	`diff file1 file2`
- `wc` 统计文件的字符数、词数和行数	`wc file_name`
- `uniq` 去掉文件中的重复行	`uniq file_name`

## 一般命令

- `vim directory/file_name` 进入编辑模式, 用 vim 模式编辑, 若指定路径的文件不存在，则新建空文件,
- `ls -l`	显示当前目录下的详细内容	
- `ls -a` 显示当前目录下的内容	含点 `.` 开头的文件, `-a` `-A` 还不一样
- `rmdir`	删除空目录, 平时用得少
- `ln`	为文件创建联接	`ln -s file1 file2` s 表示软联接
- `paste` 横向拼接文件内容	`paste file1 file2`
- `grep` 通过简单正则表达式搜索文件