# 导论

## 什么是 JavaScript 语言

**脚本语言**：不具备开发操作系统的能力，只用来编写控制其他大型应用程序（浏览器）的脚本。

**嵌入式语言**：核心语法不多，只能做一些数学与逻辑运算，不提供任何 I/O 相关的 API。通常嵌入浏览器、Node 项目等

**面向对象语言**：但也支持其他编程范式（函数式编程）。

**组成**：核心语法包括基本语法构造（操作符、语句、控制结构等）和标准库（如 Array、Date、Math等），以及各种宿主环境提供的额外 API，例如浏览器控制类（BOM），DOM，Web 等等。

**优点**：语法灵活、支持编译运行、事件驱动和非阻塞式设计。

# 历史

……

# 基本语法

## 语句

**表达式（expression）**：为了得到一个值的计算式。

**语句（statement）**：完成某种任务而进行的操作。

凡是预期为值的地方都能放置表达式。语句以分号结尾，多个语句可在一行展示。

## 变量

变量是对值的具名引用，然后引用这个名字就是引用这个值。

```js
var a = 1
a = 'hello'
```
JS 中用 `var` 声明变量，告诉解释引擎要创建一个变量，变量的声明与赋值是分开的，但可以合在一起。不用 `var` 也可以直接进行变量赋值，但会创建全局变量。

* 变量名区分大小写
* 只声明变量不赋值则该变量值为 `undefined`，表示无定义
* JS 的变量类型没有限制，你可以随时更改变量类型
* 用 `var` 声明一个已经存在的变量是无效的，但如果第二次还进行了赋值，则会覆盖之前的值

## 变量提升

```js
console.log(a) // undefined，a 已声明，但未赋值
var a = 1
```
由于 JS 引擎会先解析代码，获取所有被声明的变量，然后再一行一行的执行。造成所有变量声明的语句会提升到代码的头部，即变量提升。

## 标识符

标识符（identifier）是用来识别各种值的合法名称，例如变量名和函数名。格式为：**不以数字开头的包含 Unicode 字母, 数字, 下划线和 $ 的区分大小写的一串字符**，中文是合法的标识符。

```
JS 有一些保留字，不能用作标识符。……
```
## 注释

两种注释 `//` 和 `/* */`，分别为单行注释和多行注释。

## 区块

用大括号将多个相关的语句组合在一起称之为区块。区块往往用来构成其他更复杂的语法结构，如 `for`、`if`、`while`、`function` 等。

```js
{
  var a = 1
}
a // 1
```
**对于 `var` 命令来说 JS 的区块不构成单独的作用域**

## 条件语句

JS 提供 `if` 结构和 `switch` 结构完成条件判断

```js
if (表达式)
  语句
```
```js
if (表达式) {
  语句
} else if {
  语句
} else {
  语句
}
```
```js
switch (表达式) { // 根据表达式的结果来与下面的值对照
  case 值:
    语句
    break;
  case 值:
    语句
    break;
  default:
    语句
}
```
switch 语句会根据表达式的结果来与下面的值对照，来执行某个分支的代码, `break` 用来跳出 switch 结构，没有则会一直执行下去。如果条件都不满足则执行 `default` 里的语句。**switch 中的比较是严格相等运算符 `===`，不会发生类型转换**。

## 三元运算符

`(条件) ？ 表达式1 : 表达式2`

```js
var even = (n % 2 === 0) ? true : false;
```
条件为真时返回表达式1中的值，为假则返回表达式2的值。是 `if...else...` 的简写形式。

## 循环语句

JS 提供多种循环语句，大体上都是满足某条件时，则不断执行语句。应避免死循环，确立循环终止的条件。

```js
// 当条件为真时，不断执行语句
while (条件)
  语句
```
```js
// 先执行一次语句，之后再判断条件是否为真来确定是否执行语句
do
  语句
while (条件)
```
```js
// 初始化表达式：循环变量的初始值，只在循环开始前执行一次
// 条件表达式：每轮循环开始时都会判断一次
// 递增表达式：每轮循环最后一个操作，通常递增循环变量
// 可省略任意一个
for (初始化表达式; 条件; 递增表达式)
  语句
```
`break` 语句用来跳出代码块或循环、`continue` 语句用来终止本轮循环

```js
for (var i = 0; i < 5; i++) {
  console.log(i)
  if (i === 3) break // 循环只会执行 4 次 0 1 2 3
}
```
```js
var i = 0
while (i < 100) {
  i++
  if (i % 2 === 0) continue
  console.log(i) // 只会打印奇数
}
```
当遇到多层循环时，`break` 和 `continue` 默认只会跳出本层循环，但可以与标签语法配合，来跳出特定的循环。

```js
// 标签语法
label:
  语句
```
```js
top:
  for (var i = 0; i < 3; i++) {
    for (var j = 0; i < 3; j++) {
      if (i === 1 && j === 1) break top
        console.log(i, j) // 0,0 0,1 0,2 1,0
    }
  }
```

# 数据类型

## 简介

每一个值都有一个对应的数据类型，JS 中数据类型有六种：

* 数值（number）：整数和小数
* 字符串（string）
* 布尔值（boolean）：表示真伪的两个特殊值，`true` 和 `false`
* undefined：表示未定义
* null：表示空值
* 对象（object）：各种值的集合

一般把数值、字符串、布尔值这三种类型合称为原始类型，而对象称为合成类型，由多个原始类型的值的组合。至于 `undefined` 和 `null` 一般看作两个特殊值。

对象又分为三个字类型：

* 狭义的对象（object）
* 数组（array）
* 函数（function）

## typeof 运算符

JS 有三种方法判断一个值到底是什么类型：

* `typeof` 运算符
* `instanceof` 运算符
* `Object.prototype.toString` 方法

这里只讨论 `typeof`：

```js
// 数值、字符串、布尔值分别返回 `number`、`string`、`boolean`
typeof 123 // 'number'
typeof '123' // 'string'
typeof false // 'boolean'
```
```js
// undefined 返回 'undefined'
// null 返回 'object', 历史遗留问题
typeof undefined // 'undefined'
typeof null // 'object'
```
```js
// 对象返回 'object'
// 数组返回 'object', typeof 不能区分对象和数组
// 函数返回 'function'
typeof {} // 'object'
typeof [] // 'object'
function f() {}; typeof f // 'function'
```

## null 和 undefined

`null` 与 `undefined` 都表示没有，含义相近。将变量赋值为他们也几乎等价，在布尔判定中两者都会自动转为 `false`，而相等运算符 `==` 会直接报告两者相等。

```js
if (!undefined && !null) {
  console.log(undefined == null) // true
}
```
起初 JS 中只有 `null` 表示无，根据 C 语言传统 `null` 可以自动转化为 `0`。但后来又设计了 `undefined`，区别为：`null` 表示为一个空对象，转换为数值时为 `0`；`undefined` 表示一个未定义的原始值，转换为数值时为 `NaN`。

```js
5 + null // 5
5 + undefined // NaN
```

一般理解为 `null` 表示空值，`undefined` 表示为未定义。

```js
// 变量声明却未赋值时
var i // undefined

// 调用函数时参数为提供
function f(x) {
  return x // undefined
}

// 对象未赋值的属性
window.sayhello // undefined

// 函数没有返回值时，默认返回 undefined
function f() {} // undefined
```

## 布尔值

布尔值只有两个值，表示真和假两个状态，真为 `true`，假为 `false`。

JS 中预期某个位置因该是布尔值时，会将该位置上的值自动转换为布尔值。除了下面六个值被转为 `false` 外，其他值都视为 `true`。

* undefined
* null
* false
* 0
* NaN
* '' 或 ""（空字符串）

```js
// 注意空数组和空对象对应的布尔值都是 true
if ('') {} // false
if ([]) {} // true
if ({}) {} // true
```

## 数值

JS 中所有数字都以 64 位浮点数形式储存。即 JS 语言的底层根本没有整数，所有数字都是小数。

```js
1 === 1.0 // true

// 浮点数不是精确的值，所以涉及小数的比较和运算要特别小心
0.1 + 0.2 === 0.3 // false
0.3 / 0.1 // 2.9999999999999996
(0.3 - 0.2) == (0.2 - 0.1) // false
```

绝对值小于 **2 的 53 次方** 的整数都可以精确表示，由于 2 的 53 次方是 16 位的十进制值，所以简单点就是 JS 对 15 位的十进制数都可以精确处理。

```js
Math.pow(2, 53) // 9007199254740992
```

JS 能表示的数值范围为 2 的 1024 到 2 的 -1023（开区间）之间，超出这个范围的值无法表示。

```js
// 大于等于 2 的 1024 次方的值正向溢出
// 小于等于 2 的 -1075（加上 52 位小数部分）次方的值负向溢出
Math.pow(2, 1024) // Infinity
Math.pow(2, -1075) // 0
```

JS 提供 `Number` 对象的 `MAX_VALUE` 和 `MIN_VALUE` 属性返回可以具体表示的最大最小值。

```js
Number.MAX_VALUE // 1.79...e+308
Number.MIN_VALUE // 5e-324
```

数值的表示可以用字面形式直接表示（35、0xFF），也可用科学记数法表示。

```js
// e、E 都可
123e3 // 12300
123E-3 // 0.123
```

使用字面量表示一个数值时，JS 对整数提供了四种进制：

* 十进制：没有前导 0 的数值
* 八进制：有前缀 `0o` 或 `0O`，或有前导 0，且只用到 0-7 的数值（废弃）
* 十六进制：有前缀 `0x` 或 `0X` 的数值
* 二进制：有前缀 `0b` 或 `0B` 的数值

```js
// 默认自动转换为十进制
0xff // 255
0o377 // 255
0b11 // 3
```

JS 提供了几个特殊的数值：

* 正零与负零
* NaN
* Infinity

除了 +0 和 -0 当作分母返回的值不一样之外，没有任何区别

```js
1 / +0 // +Infinity
1 / -0 // -Infinity
```

NaN 表示非数字，主要出现在字符串解析成数字出错的场所，但本质上它还是属于数值类型。NaN 不等于任何值，包括它本身。NaN 与任何数运算都为 NaN，包括它本身。NaN 在布尔运算时表示为 false。

```js
5 - 'x' // NaN
0 / 0 // NaN（特例）
NaN === NaN // false
Boolean(NaN) // false
NaN + 32 // NaN
```

Infinity 表示无穷，表示数值太大或太小……

与数值相关的全局方法：

* parseInt() 将字符串转为整数
* parseFloat() 将字符串转为浮点数
* isNaN() 判断一个数是否为 NaN
* isFinite() 判断一个数是否为正常的数值

`parseInt` 返回的值要么是十进制整数，要么是 NaN。

```js
parseInt('123') // 123
parseInt(1.23) // 1，先转化为字符串，再执行
parseInt('8a') // 8，有点怪
parseInt('a8') // NaN 完全不能转换
```

`parseInt` 还可以接收第二个参数，表示被解析的值的进制，返回该值对应的十进制数，默认为 10，即十进制转十进制。只能在 2 到 36 之间，超出则返回 NaN。

```js
parseInt('1000', 2) // 8
parseInt('1000', 6) // 216
parseInt('1000', 8) // 512
parseInt('1000', 37) // NaN
```

`parseFloat` 大致上同 `parseInt`

`isNaN` 只对数值有效，其他类型的值会被先转换为数值，所以 `isNaN` 为 `true` 的值有可能不是 `NaN`，而是一个字符串。**最靠谱的办法是利用 `NaN` 是唯一不等于自身的值的特点进行判断**。

```js
isNaN('Hello') // true
isNaN(NaN) // true
isNaN(123) // false

function myIsNaN(value) {
  return value !== value
}
```

除了 `Infinity`、`-Infinity`、`NaN` 和 `undefined` 这几个值会返回 `false`，`isFinite` 对于其他的数值都会返回 `true`。

```js
isFinite(Infinity) // false
isFinite(-1) // true
```

## 字符串

