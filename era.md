# **简介**

`era basic` : 制作 era 系列游戏时使用的脚本语言, 即 `.erb` 格式文件

`eramaker` : 初代引擎, 已淘汰

`Emuera` : `Emulator of eramaker` 改进版驱动引擎, 最新为 `EmueraEE`

# **运行流程**

- 启动 `Emuera` , 读取配置 `_default.config` -> `emuera.config` -> `_fixed.config`
- 读取并载入 `./CSV` 目录下 `*.csv` 文件, 存储数据
- 读取并载入 `./ERB` 目录下 `*.erh` 文件, 预定义变量及宏定义
- 读取并载入 `./ERB` 目录下 `*.erb` 文件, 主要业务逻辑
- 默认搜索 `@SYSTEM_TITLE` 函数并执行

# **变量**

## **变量类型**

唯二 : 整数和字符串, 一般字符串特别指定 `s` 后缀

数组变量 : 最多到三维数组, 通过 `:` 来读取指定下标的值

## **系统内置变量**

  - `LOCAL / LOCALS` 本地变量, 仅在当前作用域下生效(函数作用域)
  - `ARG / ARGS` 形参
  - `RESULT /	RESULTS` 返回值

所有内置变量都可以用 `VariableSize.csv` 文件来设置大小, 格式为 `变量名, 变量数组大小`

当变量数组大小值为 `-1` 时, 表示注销此变量

## **系统内置全局变量**

| 作用 | 配置项名 | 配置项类型 | 配置项变量名 |
|------|---------|-----------|-------------|
| 自定义标题栏 | ウィンドウタイトル | 字符串 | WINDOW_TITLE |
| 游戏制作者 | 作者 | 字符串 | GAMEBASE_AUTHOR |
| 游戏信息 | 追加情報 | 字符串 | GAMEBASE_INFO |
| 发布时间 | 製作年 | 字符串 | GAMEBASE_YEAR |
| 游戏名 | タイトル | 字符串 | GAMEBASE_TITLE |
| 游戏标识 | ID コード | 数值 | GAMEBASE_GAMECODE |
| 游戏版本号 | バージョン | 数值 | GAMEBASE_VERSION |
| 最低兼容版本 | バージョン違い認める | 数值 | GAMEBASE_ALLOWVERSION |
| 默认角色编号 | 最初からいるキャラ | 数值 | GAMEBASE_DEFAULTCHARA |
| 禁用物品系统 | アイテムなし | 数值 | GAMEBASE_NOITEM |

## **系统内置常量**

  - `MONEYLABEL` 货币单位符号, 默认 `$`, 常量名 `お金の単位`
  - `DRAWLINESTR` 分隔线本体, 常量名: `DRAWLINE文字`

常量无法改变, 但可配置 `_Replace.csvを利用する: YES` 后在 `_replace.csv` 文件里设置

## **声明变量**

使用 `#DIM` 声明数值, 使用 `#DIMS` 声明字符串

声明时可用 `=` 赋值, 没指定初始值时数值类型默认为 `0` , 字符串类型默认为 `""`

加上 `DYNAMIC` 关键字表示为动态变量, 每次调用都会重新初始化一个该变量

加上 `CONST` 关键字表示静态变量, 即常量

加上 `REF` 关键字表示引用型变量, 传递的是变量所在的内存地址的引用, 无需返回, 外部函数就能获得处理结果

## **变量赋值**

`=` 表示将右边的内容原封不动的赋值给左边

`'=` 右边的内容需要为一个完整的字符串

## **使用变量**

数值类型变量在 `{}` 里使用, 字符串类型变量在 `%%` 里使用

在 `""` 中使用变量需要加上 `@" ... "`

# **函数**

## **一般函数**

  - 用 `CALL` 或 `JUMP` 命令跳转
  - 用 `RETURN / RETURNFORM` 返回值到全局变量 `RESULT` 里, 值类型
  - 用 `RESULTS = ...` 赋值语句来返回字符串类型到 `RESULTS` 里
  - 参数定义和调用的格式可以是 `()` 或 `,`

用一个全局公共变量来临时存放处理后的结果

## **行内函数**

  - 只用用在表达式里, 不能被 `CALL` 或 `JUMP`
  - 用 `RETURNF` 返回值到调用它的地方
  - 定义时必须加修饰符 `#FUNCTION / #FUNCTIONS` 限定返回值的数据类型
  - 参数定义格式可以是 `()` 或 `,` , 调用时必需用 `()`

## **局部变量**

`LOCAL / LOCALS` 一组仅在函数内部生效的的变量

用 `#LOCALSIZE / #LOCALSIZES` 修饰符来单独限定变量(数组)的大小

若没有手动指定，则默认使用 `VariableSize.csv` 里设定的数组大小

本质上是名为 `LOCAL@函数名 / LOCALS@函数名` 的全局变量, 可以通过此名在函数外调用

# **输出**

  - `PRINT` 原封不动的打印
  - `PRINTV` 解析数值类型变量并打印
  - `PRINTS` 解析字符串类型变量并打印
  - `PRINTFORM` 解析表达式并打印
  - `PRINTFORMS` 识别字符串并解析表达式并打印
  - `PRINTK` 配合 `FORCEKANA 0/1/2/3` 使用, 为 1 时转平假名为片假名, 为 2 时反之, 为 0 不变
  - `PRINTD` 无视 `SETCOLOR` 设置的颜色, 显示默认颜色
  - `PRINTL` 原封不懂得打印且换行
  - `PRINTW` 打印后自动换行, 同时运行一次 WAIT 命令, 输入任意指令以继续

## **PRINTSINGLE**

独占一行, 超出屏幕绘制区域宽度的多余内容会被直接丢弃, 可跟 `V S FORM FORMS K D`

## **PRINTC**

自动补齐半角空格到指定长度的打印, 由配置项 `PRINTCの文字数` 决定, 默认为 25

可用的修饰符顺序依次为 `FORM C LC K D`, C 是右对齐, LC 是左对齐

## **PRINTDATA**

无需 `IF + RAND` 的组合就能随机打印文本

```erb
WHILE 1
  ; 随机打印 DATA DATAFORM DATALIST 的其中一个
  PRINTDATAL rand_res
    DATA 钻石 × 5
    DATAFORM 金%coin% × 10
    DATAFORM 银%coin% × 10
    DATAFORM 铜%coin% × 10
    DATALIST
      DATA 一对剑盾：
      DATA 〇 短剑
      DATAFORM 〇 雕刻了货%coin%图案的小木盾
    ENDLIST
  ENDDATA
  INPUTMOUSEKEY
  PRINTL
WEND
```

## **PRINTBUTTON**

打印一个可以交互的按钮, 有两个参数, 分别是 `按钮显示的内容` 字符串和 `按钮的值` 数值或字符串

## **PRINTPLAIN**

当打印的内容里有 `[数字]` 这样的格式且又存在 `INPUT` 系列命令时, 会被自动识别为按钮

这是使用 `PRINTPLAIN` 可以强制只打印原本的内容, 不会被错误地解析

## **其他**

`CUSTOMDRAWLINE` 以自定义的内容作为分割线

`DRAWLINEFORM` 解析自定义的内容后作为分割线

`REUSELASTLINE` 在当前的最后一 添加一段临时信息

`CLEARLINE` 删除在这条命令之前打印的, 指定行数的内容

# **图像输出**

