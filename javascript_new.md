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

零个或多个排在一起的字符，放在单引号或双引号之中。

长字符串分成多行可在每一行的尾部使用反斜杠。也可用链接运算符 `+` 来连接。

```js
// 反斜杠后紧跟换行符
'long \
long \
string'
// 'long long string'
```

反斜杠 `\` 在字符串内视为转义符。

  * `\0`：null（`\u0000`）
  * `\b`：后退符（`\u0008`）
  * `\f`：换页符（`\u000C`）
  * `\n`：换行符（`\u000A`）
  * `\r`：回车符（`\u000D`）
  * `\t`：制表符（`\u0009`）
  * `\v`：垂直制表符（`\u000B`）
  * `\'`：单引号（`\u0027`）
  * `\"`：双引号（`\u0022`）
  * `\\`：反斜杠（`\u005C`）

反斜杠的其他特殊用法：

  * `\HHH`：反斜杠后跟三个八进制数（`000 - 377`）代表一个字符。`HHH` 对应该字符的 Unicode 码点。只能输出 256 种字符。
  * `\xHH`：`\x` 后跟两个十六进制数（`00 - FF`）代表一个字符。`HH` 对应该字符的 Unicode 码点。只能输出 256 种字符。
  * `\uXXXX`：`\u` 后跟四个十六进制数（`0000 - FFFF`）代表一个字符。`HHHH` 对应该字符 Unicode 码点。

```js
'\251' // '©'
'\xA9' // '©'
'\u00A9' // '©'
```

若在非特殊字符前使用反斜杠，会自动忽略反斜杠。

```js
'\a' // a
```

字符串可以被视为数组，可以使用方括号运算符来返回某个位置的字符，但只能读不能写。

```js
var s = 'hello'
s[0] // h
s[1] = 'a' // s -> hello
```

字符串的 `length` 属性返回字符串的长度，只读属性。

```js
'hello'.length // 5
```

当文本里存在不可打印的符号或需要以文本格式来传递的二进制数据，可以使用 `Base64` 转码。`Base64` 是一种编码方式，可讲任意值转成 `0～9、A～Z、a～z、+ 和 /` 这 64 个字符组成的可打印字符。使用它的主要目的不是为了加密，而是为了不出现特殊字符，简化程序的处理。

  * `btoa()`：任意值转为 Base64 编码
  * `atob()`：Base64 编码转为原来的值

这两种方法不适合非 ASCII 码的字符，会报错。要编码非 ASCII 码字符需要插入一个转码环节：

```js
// 转码
function b64Encode(str) { return btoa(encodeURIComponent(str)) }
function b64Decode(str) { return decodeURIComponent(atob(str)) }

b64Encode('你好') // '...'
b64Decode('...') // '你好'
btoa('你好') // 报错
```

## 对象

对象即一对键值对的集合，是一种无序的复合数据的集合。键名与键值之间用冒号分隔，两个键值对之间用逗号分隔。

所有的键名都是字符串，可以不加引号。对象的键名又称为属性，它的键值可以是任意数据类型。当一个属性的值为函数是，通常称之为方法。

```js
var obj = {
  foo: 'hello',
  'bar': 1,
  fun: function(x) { 
    return 2 * x 
  }
}
```

当两个变量名指向同意变量时，修改其中一个会改变另一个。因为变量是引用类型。

```js
var o1 = {}
var o2 = o1
o1.a = 1
o2.a // 1
```

当行首是一个大括号时，JS 一律解释为代码块

```js
// 以下一行代码可以是一个对象，foo 属性值为 123
// 也可以是一个代码块，foo 是标签，指向表达式 123
// JS 按第二种表示
{ foo: 123 }

// 如果想解释为对象，可以再套一层圆括号
({ foo: 123 })

eval('{ foo: 123 }') // 123
eval('({ foo: 123 })') // { foo: 123 }
```

读取对象的属性可以用点运算符，也可以用方括号运算符。方括号运算符用来解决点运算符做不到的场合。赋值同理。

```js
var obj = { p: 'hello' }
obj.p = 'hi'
obj['p'] = 'HI'
```

查看一个对象本身的所有属性，可以使用 `Object.keys` 方法

```js
var obj = {
  key1: 1,
  key2: 2
}
Object.keys(obj) // ['key1', 'key2']
```

删除对象的属性用 `delete` 命令，他不能删除不能删除的属性，也不能删除继承而来的属性。

```js
var obj = Object.defineProperty({}, 'p', {
  value: 123
})
delete obj.value // true
delete obj.toString // true，但实际上没删
delete obj.p // false
```

检查对象是否存在某属性可用 `in` 运算符，但它不能识别属性是否是继承而来的。这时可用 `hasOwnProperty` 方法来判断一下。

```js
var obj = { p: 1 }
'p' in obj // true
'toString' in obj // true
obj.hasOwnProperty('toString') // false
```

属性的遍历，用 `for...in` 循环来遍历对象的全部属性

  * 只遍历可遍历属性，会跳过不可遍历属性
  * 不仅遍历自身属性，还遍历继承的属性
  * （不会遍历到 toString 是因为它是不可遍历属性）

```js
var obj = { a: 1, b: 2, c: 3 }
for (var i in obj) {
  console.log(i + '\t' + obj[i]) // a 1 b 2 c 3
}
```

## 函数

有三种函数声明方式，分别是 `function` 命令，函数表达式，`Function` 构造函数。

```js
function print(s) { console.log(s) } // funciton 命令

var print = function(s) { console.log(s) } // 函数表达式
// 不用匿名函数也可以，但函数名 x 只在该函数体内部生效，代指函数本身
var print = function x() { console.log(x) } 

var foo = new Function('a', 'b', 'return a + b') // 不直观
```

调用函数时要用到圆括号运算符，在圆括号中加入函数的参数。

```js
function add(x, y) { return x + y }
add(1, 2) // 3
```

当遇到函数体内的 `retrun` 语句时，就直接返回 `return` 后面那个表达式的值，然后中止函数，没有 `return` 语句的话就会返回 `undefined`。`return` 语句可以返回函数自己，形成**递归**。 

```js
// 计算斐波那契数列
function fib(num) {
  if (num === 0) return 0
  if (num === 1) return 1
  return fib(num - 2) + fib(num - 1)
}
fib(6) // 8
```

函数名同变量名一样，采用 `function` 命令声明函数，也会有提升的现象。

```js
var f = function() { console.log(1) }
funciton f() { console.log(2) }
f() // 1
```

函数的 `length` 属性返回函数预期传入的参数个数，即定义之中的参数个数。

```js
function f(a, b) {}
f.length // 2
```

函数的 `toString()` 方法返回一个字符串，内容是函数的源码。如果是原生函数就返回 `function() {[native code]}`。函数内部的注释也能返回，以此来实现多行字符串。

```js
Math.sqrt.toString() // "function sqrt() { [native code] }"
function f() {/*
  这是一个
  多行注释
*/}

f.toString() // 去掉首位即可
//function f() {/*
//   这是一个
//   多行注释
// */}
```

JS 中有两种作用域，一种是全局作用域，变量在程序中一直存来，所有地方都可以读取；另一种是函数作用域，变量值只存在在函数内部。（ES6 新增块级作用域）

  1. 全局变量可以在函数内部读取到，但局部变量在外部无法读取

```js
var v = 1
function f() {
  var u = 2
  console.log(v)
}
f() // 1
u // ReferenceError: v is not defined
```

  2. 函数内部定义的变量会在该作用域内覆盖同名的全局变量。

```js
var v = 1
function f() {
  var v = 2
  console.log(v)
}
f() // 2
v // 1
```

  3. 函数内部的变量提升和函数声明提升同全局作用域

```js
function f() {
  console.log(a) // undefined
  var a = 1
}
```

  4. 函数执行时所在的作用域，是取决于定义时的作用域，而不是调用时所在的作用域。

```js
// 函数 x 定义在全局
var a = 1
var x = function () { console.log(a) }
function f() {
  var a = 2
  x() // 1
}

// 函数 x 定义在局部，闭包
function f() {
  var a = 1
  function x() { console.log(a) }
  return x
}
var a = 2
f()() // 1
```

有时函数需要依靠外部数据而得到不同的结果，外部数据即参数。参数可以省略，也可以提供多于定义的个数。

```js
function f(a, b) { return a }
f() // undefined
f(1) // 1
f(1, 2) // 1
f(1, 2, 3) // 1
```

函数参数如果是原始类型的值，传递方式是值传递，如果是复合类型的值，则传递方式是地址传递，即传入的是原始值的地址。

```js
var a = 1
var obj = { b: 2 }
var obj2 = { c: 3 }
function f(x, y, z) {
  x = 5
  y.b = 5
  z = { d: 4 }
}
f(a, obj, obj2)
a // 1
obj // { b: 5 }
// 直接替换整个参数不会影响到原始值，因为形参 z 存储的是 obj2 的地址，重新赋值只是导致 z 指向另一个地址
obj2 // { c: 3 }
```

函数中 `argument` 对象包含了函数运行时的所有参数。它是一个类数组但并不是数组，如可以用 `argument[0]` 取第一个参数，而没有 `slice` 方法。用 `length` 属性判断函数调用时到底带了几个参数。

```js
var f = function(a, b) {
  argument[0] = 3
  argument[1] = 2
  console.log(argument.length)
  return a + b
}
f(1, 1) // 5, 2
```

闭包是依靠着链式作用域的结构，使函数外部可以看到函数内部的参数的桥梁。产生条件是两层函数，每次执行外层函数都会形成一个新的闭包，内存消耗量大。

```js
function inc(n) {
  return function() {
    return n++
  }
}
var inc2 = inc(5)
inc2() // 5
inc2() // 6
inc2() // 7
```

立即执行函数 `IIFE`，在定义函数后立马调用函数。

```js
(function() { /* code */ }()); 
```

## 数组

按次序排列的一组值即数组。用方括号表示，通过下标来赋值去值，下标从零开始。任何类型的数据都可以放入数组。

```js
var arr = ['a', { a: 1 }, [1, 2, 3]]
arr[0] // 'a'
arr[1] // {a: 1}
arr[2] // [1, 2, 3]
```

数组本质上是一种特殊的对象。它的键名是按次序排列的一组整数。但实际上键名也是字符串（'0', '1', '2'），之所以可以用数值读取，是因为非字符串键名会被转换为字符串。

```js
var arr = [1, 2, 3]
typeof arr // 'object'
Object.keys(arr) // ['0', '1', '2']
arr.0 // SyntaxError 不合法，单独的数值不能作为标识符
arr[0] // 1 方括号是运算符，可接收数值
```

数组 `length` 属性返回数组的成员数量。

  * 该属性是一个动态值，等于键名中最大整数加 `1`。
  * 数组的数字键不需要连续，`length` 的值始终比最大的那个整数键大 `1`
  * `length` 属性可写，如果设置一个小于当前成员个数的值，数组的成员数会自动减少。（可以以此清空数组）
  * 设置 `length` 为一个不合法的值会报错（正整数，且最大为 2^32 - 1）

```js
var arr = ['a', 'b']
arr.length // 2
arr[5] = 'f'
arr.length // 6
arr.length = 0
arr // []
```

因为数组本质上是对象，所以可以为数组添加属性，但这不影响 `length` 的属性的值。

```js
var arr = []
arr[-1] = 'a'
arr[Math.pow(2, 32)] = 'b'
arr.length // 0
arr[-1] // 'a' -1 转成了字符串
```

检查某个键名是否存在的运算符 `in`，也适用于数组。但如果数组某个位置是空位时，`in` 运算符返回 `false`。

```js
var arr = []
arr[100] = 'a'
100 in arr // true
'100' in arr // true
1 in arr // false
```

`for...in` 循环也可以遍历数组，但它不仅遍历数字键，还会遍历非数字键。

```js
var a = [1, 2, 3]
a.foo = true
for (var key in a) { console.log(key) }
// 0
// 1
// 2
// foo
```

即如果只想遍历数字键的话可以使用 `for` 循环或 `while` 循环。

```js
var a = [1, 2, 3]

for (var i = 0; i < a.length; i++) {
  console.log(a[i]) // 1 2 3
}

var i = 0
while (i < a.length) {
  console.log(a[i])
  i++
}

var l = a.length
while (l--) {
  console.log(a[l])
}
```

数组的空位即数组某个位置为空。数组的空位不影响 `length` 属性，但影响遍历。

```js
var arr = [1, , 2, ]
arr[1] // undefined 空位能被读取到，为 undefined，或者说对象未赋值的属性都为 undefined
arr.length // 3
arr.forEach((v) => console.log(v)) // 1 2 并不会循环到空位
```

类似数组的对象。一个对象的所有键名都是正整数或零，并且有 `length` 属性。常见的有 `argument` 对象，大多数 `DOM` 元素集，字符串。

# 运算符

JS 中有 10 个算术运算符，用来完成基本运算。

  * 加法运算符：`x + y`
  * 减法运算符：`x - y`
  * 乘法运算符：`x * y`
  * 除法运算符：`x / y`
  * 指数运算符：`x ** y`
  * 余数运算符：`x % y`
  * 自增运算符：`++x` 或 `x++`
  * 自减运算符：`--x` 或 `x--`
  * 正负运算符：`+x` 和 `-x`

*加法运算符 `+`* 用来求两个数值的和，当遇到布尔值相加或一个加数为布尔值时，会将布尔值自动转换为数值，然后相加。

```js
1 + 1 // 2
true + true // 2
1 + false // 1
```

*加法运算符 `+`* 从左到右执行，当遇到字符串时，会将加数转换为字符串，并进行连接。

```js
false + 'a' // 'falsea'
'3' + 4 + 5 // '345'
3 + 4 + '5' // '75'
```

*加法运算符 `+`* 遇到不同类型的运算子发生的这种情况叫做重载，而其他算术运算符并没有重载，它们的规则是：所有运算子一律转为数值，在进行计算。

```js
1 - '2' // -1
1 * '2' // 2
1 / '2' // 0.5
```

*对象的相加* 会将对象转成原始类型的值，然后相加。会自动调用 `valueOf` 方法，然后调用 `toString` 方法。

```js
var obj = { p: 1 }
obj + 2 // '[object Object]2'
obj.valueOf() // { p: 1 } 返回对象本身
obj.valueOf().toString() // '[object Object]'
```

*余数运算符* 返回前一个运算子被后一个运算子除所得的余数，运算结果的正负号由第一个运算子的正负号决定。

```js
-1 % 2 // -1
1 % 2 // 1
```

*自增自减运算符* 是一元运算符，他会将运算子先转换为数值，然后加上 1 或者减去 1，会改变原始变量。**该类运算符放在变量之前，则先进行自增自减操作，在返回变量操作后的值；放在变量之后，则先返回变量操作前的值，再进行自增自减操作。**

```js
var x = 1
var y = 1
x++ // 1
++y // 2
```

*正负运算符* 是一元运算符，将任意值转成数值，结果与 `Number` 函数作用一致，只是正负号的不同。

```js
+true // 1
-[] // -0
+{} // NaN
```

*指数运算符* 完成指数运算，前一个运算子是底数，后一个运算子是指数。**指数运算符是右结合**