# **简介**

Era Basic 是制作 Era 系列游戏时使用的脚本语言，即 `.erb` 格式文件

EraMaker 是初代引擎，已淘汰

Emuera 是 Emulator of EraMaker 改进版驱动引擎，最新为 EmueraEE

# **运行流程**

- 启动 `Emuera` ，读取配置 `_default.config` ~ `emuera.config` ~ `_fixed.config`
- 读取并载入 `./CSV` 目录下 `*.csv` 文件，存储数据
- 读取并载入 `./ERB` 目录下 `*.erh` 文件，预定义变量及宏定义
- 读取并载入 `./ERB` 目录下 `*.erb` 文件，主要业务逻辑
- 默认搜索 `@SYSTEM_TITLE` 函数并执行

# **变量**

## **变量类型**

唯二：整数和字符串，一般字符串特别指定 `s` 后缀

数组变量：最多到三维数组，通过 `:` 来读取指定下标的值

## **声明变量**

使用 `#DIM` 声明数值，使用 `#DIMS` 声明字符串

声明时可用 `=` 赋值，没指定初始值时数值类型默认为 `0` ，字符串类型默认为 `""`

加上 `DYNAMIC` 关键字表示为动态变量，每次调用都会重新初始化一个该变量

加上 `CONST` 关键字表示静态变量，即常量

加上 `REF` 关键字表示引用型变量，传递的是变量所在的内存地址的引用，无需返回，外部函数就能获得处理结果

## **变量赋值**

`=` 表示将右边的内容原封不动的赋值给左边

`'=` 右边的内容需要为一个完整的字符串

## **使用变量**

数值类型变量在 `{}` 里使用，字符串类型变量在 `%%` 里使用

在 `""` 中使用变量需要加上 `@" ... "`

# **函数**

## **一般函数**

函数的注册时需要使用 `@` ，后紧跟函数名，用 `CALL` 调用函数，用 `JUMP` 跳转到某个函数

用 `RETURN` 返回值到全局变量 `RESULT` 里，值类型，没有则默认返回 `0`

用 `RESULTS = ...` 赋值语句来返回字符串类型到 `RESULTS` 里

参数定义和调用的格式可以是 `()` 或 `,`

在函数内使用 `RESTART` 语句，当前函数会重新开始执行

## **行内函数**

  - 只用用在表达式里，不能被 `CALL` 或 `JUMP`
  - 用 `RETURNF` 返回值到调用它的地方
  - 定义时必须加修饰符 `#FUNCTION / #FUNCTIONS` 限定返回值的数据类型
  - 参数定义格式可以是 `()` 或 `,` ，调用时必需用 `()`

## **局部变量**

`LOCAL / LOCALS` 一组仅在函数内部生效的的变量

用 `#LOCALSIZE / #LOCALSIZES` 修饰符来单独限定变量(数组)的大小

若没有手动指定，则默认使用 `VariableSize.csv` 里设定的数组大小

本质上是名为 `LOCAL@函数名 / LOCALS@函数名` 的全局变量，可以通过此名在函数外调用

# **输出**

  - `PRINT` 打印文字
  - `PRINTL` 打印文字并换行
  - `PRINTW` 打印文字并等待输入
  - `PRINTV` 打印数值类型变量
  - `PRINTS` 打印字符串类型变量
  - `PRINTFORM` 打印表达式解析后的文字
  - `PRINTFORMS` 打印字符串形式的表达式解析后的文字
  - `PRINTD` 无视 `SETCOLOR` 设置的颜色，显示默认颜色

## **PRINTSINGLE**

独占一行，超出屏幕绘制区域宽度的多余内容会被直接丢弃，可跟 `V S FORM FORMS K D`

## **PRINTC**

自动补齐半角空格到指定长度的打印，由配置项 `PRINTCの文字数` 决定，默认为 25

可用的修饰符顺序依次为 `FORM C LC K D`，C 是右对齐，LC 是左对齐

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

打印一个可以交互的按钮，有两个参数，分别是 `按钮显示的内容` 字符串和 `按钮的值` 数值或字符串

## **PRINTPLAIN**

当打印的内容里有 `[数字]` 这样的格式且又存在 `INPUT` 系列命令时，会被自动识别为按钮

这是使用 `PRINTPLAIN` 可以强制只打印原本的内容，不会被错误地解析

## **其他**

`CUSTOMDRAWLINE` 以自定义的内容作为分割线

`DRAWLINEFORM` 解析自定义的内容后作为分割线

`REUSELASTLINE` 在当前的最后一 添加一段临时信息

`CLEARLINE` 删除在这条命令之前打印的，指定行数的内容

## **图像输出**

`PRINT_IMG` 打印指定图像，需通过 `./resources` 目录下的 `*.csv` 文件加载对应图片

`PRINT_RECT` 绘制矩形图像，一个参数时为宽，四个参数时为 `x，y，width，height`

`PRINT_SPACE` 打印指定长度的空白

# **输入**

`INPUT` 系列命令捕获的输入都会自动保存到 `RESULT / RESULTS`

  - `INPUT / INPUTS` 普通输入，对应值和字符串，可指定默认值，当输入空值时视为默认值
  - `TINPUT / TINPUTS` 有时间限制的输入，四参数，限时，默认值，是否显示剩余时间，超时提示的信息
  - `ONEINPUT / ONEINPUTS` 只接受一个字符的输入，得到后立即执行
  - `TONEINPUT / TONEINPUTS` 类似 `TINPUT / TINPUTS`
  - `INPUTMOUSEKEY` 捕获鼠标或键盘输入的命令，支持输入一个参数作为时间限制

## **FORCEWAIT**

按住鼠标右键不放，可以快速跳过不需要判定具体输入的 `WAIT` 命令

而 `FORCEWAIT` 是右键和宏命令都无法跳过的强制等待，一般用于关键的主线选择

## **TWAIT**

带有延时的 `WAIT` 命令，需要两个参数，第一个为等待的时间，第二个为是否强制等待

# **语法**

## **条件判断**

`SIF`：只控制 SIF 语句的下一行是否执行

`IF`：控制一个代码块的执行与否 `IF - ELSEIF - ELSE - ENDIF`

在 `SIF` 或 `IF` 语句中，条件表达式为 0 则 `false`，不为 0 则 `true`

## **条件运算符**

`==` 等于 `!=` 不等于 `>` 大于 `>=` 大于等于 `<` 小于 `<=` 小于等于 `&&` 与 `||` 或 `!` 非

## **重复**

`REPEAT - REND` 重复执行一段代码，重复次数存放在 `COUNT` 变量里

`CONTINUE` 和 `BREAK` 语句生效

## **GOTO**

使用 GOTO 一次性移动到另一个地方，需要用 `$` 注册一个标签

```
$INPUT_LOOP
GOTO INPUT_LOOP
```

## **BEGIN**

BEGIN 可以通过调用各种系统指令来推进游戏，正在执行的函数在调用BEGIN函数后会被终止

`BEGIN TRAIN`：开始训练

`BEGIN AFTERTRAIN`：结束训练

`BEGIN ABLUP`：呼出升级界面

`BEGIN TURNEND`：结束回合

`BEGIN SHOP`：呼出SHOP界面

## **其他命令**

`QUIT`：退出游戏

`DRAWLINE`：用 `--` 画一条从左至右的分割线

`TIMES`：支持小数的乘法运算，否则 EraMaker 会对小数自动取整 `TIMES MONEY, 1.25`

`BAR`：在屏幕上绘制一个类似于 [*****.....] 的控件，用法为：`BAR [变量], [最大值], [控件长度]`

`SAVEGAME`：呼出保存存档界面，只能在 `SHOP` 中调用

`LOADGAME`：呼出加载存档界面，只能在 `SHOP` 中调用

# **系统内置**

`A - Z`：单字母变量，从 A 到 Z ，共26个，适用于储存临时数据

`COUNT`：循环次数变量，用于 `REPEAT ~ REND` 循环之中，从零开始计数

`RESULT / RESULTS`：结果变量

`RAND`：随机数，是个伪数组，返回一个随机数 `RAND:10` 表示一个 0 ~ 9 之间的随机数

`LOCAL / LOCALS`：本地变量，仅在当前作用域下生效

`ARG / ARGS`：形参

所有内置变量都可以用 `VariableSize.csv` 文件来设置大小，格式为 `变量名, 变量数组大小`

当变量数组大小值为 `-1` 时，表示注销此变量

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

  - `MONEYLABEL` 货币单位符号，默认 `$`，常量名 `お金の単位`
  - `DRAWLINESTR` 分隔线本体，常量名：`DRAWLINE文字`

常量无法改变，但可配置 `_Replace.csvを利用する：YES` 后在 `_replace.csv` 文件里设置