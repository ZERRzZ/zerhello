# **Git 简介**

git 是世界上最先进的分布式版本控制系统

git 是 `linux` 创始人 `linus` 用 `c` 写的

所有的版本控制系统只能跟踪文本文件的改动, 像二进制文件(图片, 视频, word)都无法知道改了啥

# **Git 安装**

linux: 在 debian 或 ubuntu 版本上执行命令即可 `sudo apt-get install git`, 其他版本可用源码安装

mac: 可安装 xcode, 里面集成了 git

windows: 从官网直接下载安装程序, 然后按默认选项安装即可

安装完成后需设置用户名密码, 因为 git 是分布式版本控制系统, 所以每个机器都必须自报家门

    使用 git config 命令设置用户信息, --global 参数表示你这台机器上所有的 git 仓库都会使用这个配置
    当然也可以对某个仓库指定不同的用户名和 email 地址
    git config --global user.name 'your name'
    git config --global user.email 'email@example.com'

# **版本库基础操作**

版本库: 又名仓库(repository), 里面的所有文件都可以被 git 管理起来, 每个文件的修改删除, git 都能跟踪

将目录变为版本库: `git init`

将工作区指定文件添加到暂存区: `git add <file-name>`  
将工作区所有改动文件添加到暂存区: `git add .`  
会自动忽略空目录和 `.gitignore` 中指定的文件

将暂存区所有内容提交到当前分支: `git commit -m <commit-msg>`  
提交所有内容到分支且写提交信息: `git commit`

查看仓库状态: `git status`  
查看修改内容: `git diff <file-name>`

查看提交日志: `git log`  
查看提交日志简介: `--pretty=oneline`  
查看日志只显示提交 ID 前六位: `git log --pretty=oneline --abbrev-commit`

# **版本回退**

版本号: 即 `commit-id`

版本回退实质: git 在内部有个指向当前分支的 HEAD 指针, 回退版本时仅仅是把 HEAD 指向移动一位而已

一般用 `HEAD` 表示当前版本, `HEAD^` 表示上个版本, 再往上可以加多个 `^` 或用 `HEAD~n` 表示

# **工作区与暂存区**

工作区: 电脑上能看到的目录  
版本库: 工作区中的 `.git` 隐藏目录或理解为带有 `.git` 隐藏目录的工作区  
暂存区: 版本库里被称为 `stage|index` 的空间  
版本库中的其他内容: 默认分支 `master|main`, 以及版本指针 `HEAD` 指向默认分支

添加: `git add` 实质是把文件添加到暂存区  
提交: `git commmit` 实质是把暂存区所有内容提交到当前分支

撤销工作区修改, 没有添加到暂存区: `git checkout <file-name>`  
删除文件, 删除也是一次修改: `git rm <file-name>`  
重命名文件: `git mv <file-name> <new-name>`

# **远程仓库**

可以让本地仓库与远程仓库关联, 远程仓库默认名字 `origin`  
一个本地仓库可以与多个远程仓库关联, 但需指定不同的名字  
关联: `git remote add origin-name origin-url`  
取消关联: `git remote rm <origin-name>`

可以从远程仓库克隆出新的仓库  
克隆: `git clone <origin-url>`

查看远程仓库: `git remote`  
查看远程仓库详细信息, 显示可抓取和推送的远程仓库地址, 没有权限时不限时 push 地址: `git remote -v`

# **分支管理**

版本库中 HEAD 指针指向当前分支, 而当前分支指向提交  
git 中分支切换都是指针的指向变动, 工作区文件并没有变动

创建分支实质是为当前提交新建一个分支指针  
创建并切换分支: `git checkout -b <branch-name>`  
创建: `git branch <branch-name>`  
切换: `git checkout <branch-name>`

查看分支: `git branch`

将指定分支合并到当前分支: `git merge <branch-name>`  
默认合并模式快进模式, 直接把当前分支指向目标分支的提交: `fast-forward`  
使用 `--squash` 命令来去除子分支上的冗余提交

冲突: 合并分支时 git 有时会无法解决, 需要我们自行解决, 然后再合并  
查看分支合并图: `git log --graph`

删除分支: `git branch -d <branch-name>`  
删除远程分支: `git push <origin-name> -d <branch-name>`

复制提交: `git cherry-pick <commit_id>`  
把指定提交复制到当前分支上, git 会自动为当前分支进行一次提交, 这样避免了重复劳动

# **暂存工作现场**

暂存: `git stash`  
查看暂存列表: `git stash list`  
恢复: `git stash apply [<stach@{}>]`  
删除: `git stash drop`  
恢复并删除: `git stash pop`

# **多人协作**

推送分支就是把该分支上的所有本地提交推送到远程库, 可以指定远程库的分支  
推送分支: `git push [<origin-name> <origin-branch>]`  
当推送失败时用 `git pull` 抓取远程库的新提交  
抓取失败时需链接本地分支与远程库分支, 抓取成功需在本地解决冲突然后在提交

使用远程分支创建本地分支 `git checkout -b <branch-name> <origin-name/branch-name>`  
将本地分支与远程分支关联 `git branch --set-upstream <branch-name> <origin-name/branch-name>`

# **版本 tag 管理**

tag 的出现为了更好的识别每次提交  
tag 也与版本库的某个 commit 绑在一起, 同 commit_id  
tag 实质是指向某个 commit 的指针, 跟分支类似, 但是分支可以移动, tag 不能移动

创建标签: `git tag <tag-name> [commit-id]`  
查看所有标签: `git tag`  
查看对应提交信息: `git show <tag-name>`  
指定标签描述: `git tag -a <tag-name> -m <tag-msg>`  
删除标签: `git tag -d <tag-name>`  
推送标签: `git push <origin-name> <tag-name>`  
推送所有标签: `git push <origin-name> --tags`  
删除远程标签: `git push <origin-name> :refs/tags/<tag-name>`

# **自定义 Git**

配置全局用户信息: `git config --global <user.name|user.email> <name|email>`  
配置单个仓库用户信息: `git config <user.name|user.email> <name|email>`

忽略文件: `.gitignore` 中设置要忽略追踪的文件

配置别名: `git config --global alias.<name> <command>` 命令有多个单词用引号包裹
眼花了: `git config --global alias.l "log --color --graph --abbrev-commit --pretty=format:'%C(yellow)[%h]%C(blue)[%an]%C(green)[%cr]%C(reset) %s%C(red)%d'"`

当前仓库配置文件位置: `.git/config`  
用户全局配置文件位置: `<用户目录下>/.gitconfig`

# **重新整理**

## **撤销操作**

重新提交: `git commit --amend` 提交完了才发现漏掉了几个文件没有添加, 或者提交信息写错了  
取消暂存的文件: `git reset HEAD <file>`  
撤销对文件的修改: `git checkout -- <file>` 将文件还原成上次提交时的样子, 危险的命令, 你对那个文件在本地的任何修改都会消失

## **重置揭秘**

**三棵树**

HEAD: 指向该分支上的最后一次提交, 该分支上的最后一次提交的快照  
Index: 预期的下一次提交, git 暂存区  
Working Directory: 工作区, 另外两棵树以一种高效但并不直观的方式将它们的内容存储在 .git 文件夹中, 而工作目录会将它们解包为实际的文件以便编辑

**工作流程**

`git init`: 创建一个 Git 仓库, 其中的 HEAD 引用指向未创建的 master 分支, 只有 Working Directory 有内容  
`git add`: 获取工作目录中的内容, 并将其复制到 Index 中  
`git commit`: 取得 Index 的内容并将它保存为一个永久的快照, 然后创建一个指向该快照的提交对象, 最后更新 master 来指向本次提交  
切换分支或克隆: 当检出一个分支时, 会修改 HEAD 指向新的分支引用, 将 Index 填充为该次提交的快照, 然后将 Index 的内容复制到 Working Directory 中

**git reset**

`git reset --soft <commit>`: 只是移动 HEAD 分支的指向历史的某次提交, 不修改 Index 和 Working Directory  
`git reset <commit>`: 默认 `--mixed`, 在前面的基础上, 用 HEAD 指向的快照更新 Index  
`git reset --hard <commit>`: 在前面的基础上, 用 HEAD 指向的快照覆盖 Working Directory, 危险  
`git reflog`: 使用 `--hard` 后想恢复可用此命令找回, 有风险

**通过路径来重置**

若指定了一个路径, 会跳过移动 HEAD 分支的指向, HEAD 只是一个指针, 你无法让它同时指向两个提交中各自的一部分  
`git reset <commit> <file>`: 默认为 --mixed HEAD, 本质是将 HEAD 指向的快照中的某文件复制到 Index 中
