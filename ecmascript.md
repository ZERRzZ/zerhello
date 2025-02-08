# 基础

## 值

变量可存在两种类型的值, 即原始值和引用值

原始值: 存储在栈 `stack` 中的简单数据段, 直接存储在变量访问的位置

引用值: 存储在堆 `heap` 中的对象, 存储在变量处的值是一个指针, 指向存储对象的内存处

## 原始类型

五种原始类型: Undefined, Null, Boolean, Number, String

`typeof` 运算符: 该运算符的参数是要检查的变量, 返回值有 `undefined, boolean, number, string, object`, 注意 `null` 类型返回值是 `object`

`Undefined` 类型: 只有一个值 `undefined`, 当声明的变量未初始化时或函数无明确返回值时, 默认值都是 `undefined`

`Null` 类型: 只有一个值 `null`, 值 `undefined` 实际上是从值 `null` 派生来的, 即 `undefined == null`, 但两者意义不同, `null` 表示尚未存在的对象

`Boolean` 类型: 两个值 `true` 和 `false`

`Number` 类型: 既可以表示 32 位的整数, 也可以表示 64 位的浮点数, 直接输入的任何数字都被看做 `Number` 类型的字面量

```
八进制数和十六进制数: 八进制首数字须是 0, 十六进制首数字须是 0, 并且其后接 x, 例 070, 0x1b, 尽管所有整数都可以表示为八进制或十六进制的字面量, 但所有数学运算返回的都是十进制结果

浮点数: 包括小数点和小数点后的一位数字, 例 1.0 而不是 1, 在进行计算前, 真正存储的是字符串

科学计数法: 把一个数表示为数字加 e 或 E, 后面加乘以 10 的倍数, 例 5.1e3 = 5100

特殊的 Number 值:

Number.MAX_VALUE 和 Number.MIN_VALUE, 定义 Number 值集合的边界, 但计算生成的数值可以超出
Number.POSITIVE_INFINITY 和 Number.NEGATIVE_INFINITY, 计算生成的数值超出范围后被赋予的值, 意味着不再有数字值
Infinity 与 -Infinity, 专门表示无穷大的值, 是 Number.POSITIVE_INFINITY 与 Number.NEGATIVE_INFINITY 的值, 不能用与其他计算
ifFinite(), 可对任何数使用, 判断该数是否无穷大
NaN, 表示非数 Not a Number, 发生在类型转换失败时, 不能用于计算, 它与自身不相等, 推荐使用函数 isNaN()
```

`String` 类型: 没有固定大小的原始类型, 用 `''` 或 `""` 声明, 字符串中每个字符都有特定的位置, 首字符从位置 0 开始, 依此类推

```
String 类型还包括几种字符字面量:

\n 换行, \t 制表符, \b 空格, \r 回车, \f 换页符, \\ 反斜杠, \' 单引号, \" 双引号
\0nnn 八进制代码 nnn 表示的字符, n 是 0 到 7 中的一个八进制数字
\xnn 十六进制代码 nn 表示的字符, n 是 0 到 F 中的一个十六进制数字
\unnnn 十六进制代码 nnnn 表示的 Unicode 字符, n 是 0 到 F 中的一个十六进制数字
```

## 类型转换

所有程序设计语言最重要的特征之一是具有进行类型转换的能力, ES 中的布尔值, 数字和字符串的原始值都是伪对象, 具有属性与方法

转换成字符串: `toString()` 将值转换成字符串, 所有对象都有此方法, 无论是真对象还是伪对象

```
Boolean 类型的 toString() 方法只是输出 true 或 false, 结果由变量的值决定

Number 类型的 toString() 方法有两种模式, 即默认模式和基模式, 默认模式返回十进制, 可传 2, 8, 16 来转换不同进制

Array 类型的 toString(), 返回值与没有参数的 join() 方法相同, 当数组用于字符串环境时, 会自动调用该方法, 也可以显式调用

Date 对象的 toString(), 用字符串表示, 使用本地时间格式
```

转换成数字: ES 提供了两种把非数字的原始值转换成数字的方法, 即 `parseInt()` 和 `parseFloat()`, 只有 String 类型调用才能正确运行, 其他类型调用返回的都是 NaN

```
parseInt(): 会仔细分析字符串, 将数值和某类字符串转换为整数, 也有基模式, 例 'parseInt("10", 2) = 2', 'parseInt('12red') = 12', 'parseInt("0xA") = 10'

parseFloat(): 与 parseInt 类似, 但会处理小数点, 只识别第一个小数点, 没有基模式, 也不识别前导零或前导 0x

```

强制类型转换: `Boolean()`, `Number()`, `String()` 将创建一个新值, 存放由原始值直接转换成的值

```
Boolean(): 当值是至少有一个字符的字符串, 非 0 数字或对象时返回 true, 如果该值是空字符串, 数字 0, undefined 或 null, 将返回 false

Number(): 分为一般情况与特殊情况

一般: 转换的是整个值, 当整个字符串值不能转换成数字时, 返回 NaN, 当字符串值能被完整地转换时, 将判断是调用 parseInt() 还是 parseFloat() 方法
特殊: 空的字符串转换为 0, Null 类型转换为 0, Undefined 类型转换为 NaN, 布尔类型转换为 0 和 1, 日期对象转换为毫秒

String(): 可把任何值转换成字符串, 包括 null 与 undefined, 而 null 与 undefined 没有 toString() 方法
```

## 引用类型

引用类型通常叫做类 class, 即遇到引用值, 所处理的就是对象, ES 定义了对象定义, 并不真正具有类, 逻辑上等价于其他程序设计语言中的类

对象是由 new 运算符加上要实例化的对象的名字创建的 var o = new Object() 没有参数时可省略括号

`Object` 对象: 所有对象都由这个对象继承而来

```
属性:

constructor: 对创建对象的函数的引用(指针), 对于 Object 对象, 该指针指向原始的 Object() 函数
prototype: 对该对象的对象原型的引用, 对于所有的对象, 它默认返回 Object 对象的一个实例

方法:

hasOwnProperty(property): 判断对象是否有某个特定的属性, 必须用字符串指定该属性
isPrototypeOf(object): 判断该对象是否为另一个对象的原型
propertyIsEnumerable(): 判断给定的属性是否可以用 for...in 语句进行枚举
toString(): 返回对象的原始字符串表示
valueOf(): 返回最适合该对象的原始值, 对于许多对象，该方法返回的值都与 toString() 的返回值相同
```

`Boolean` 对象: 是 Boolean 原始类型的引用类型 var bool = new Boolean(true), Boolean 对象将覆盖了 Object 对象的 valueOf() 和 toString() 方法

`Number` 对象: 是 Number 原始类型的引用类型 var number = new Number(68), 所有特殊值都是 Number 对象的静态属性, 可用 valueOf() 方法来得到数值对象的原始值

```
特殊方法:

toFixed(): 返回具有指定位数小数的数字的字符串表示, 能表示具有 0 到 20 位小数的数字, 参数为小数位数
toExponential(): 返回用科学计数法表示的数字的字符串形式, 参数为小数位数
toPrecision(): 根据最有意义的形式来返回数字的预定形式或指数形式, 参数为数的数字总数 (试试就懂了)
```

`String` 对象: 是 String 原始类型的对象表示法, var str = new String('hello world'), String 对象的 valueOf() 和 toString() 方法都会返回 String 类型的原始值

```
特殊方法:

length 属性: 字符串中的字符个数
charAt()/charCodeAt(): 参数为位置, 返回在该位置上的字符/字符代码
indexOf()/lastIndexOf(): 参数为字符, 返回字符在字符串上的位置, 从前到后/从后到前, 找不到返回 -1
concat(): 参数为字符串, 返回连接后的字符串, 不改变原数组
localeCompare(): 参数为字符串, 返回正数/0/负数, 表示按字母表排序在参数之前/相等/之后
slice(): 第一个参数是起始位置, 第二个参数是终止位置且默认为字符串长度, 返回截取后的字符串, 参数中有负数时会用字符串长度加上参数
substring(): 第一个参数是起始位置, 第二个参数是终止位置且默认为字符串长度, 返回截取后的字符串, 参数有负数时会无视负数且总把较小的数字作为起始位
toLowerCase(), toUpperCase(), toLocaleLowerCase(), toLocaleUpperCase() 大小写转换
```

`instanceof` 运算符: 弥补 typeof 对引用类型都返回 object 的问题, 判断变量是否是某对象的实例 `xxx instanceof xxxObject` 返回布尔值

# 运算符

## 一元运算符

`delete`: 删除自定义的对象属性或方法的引用, 意味着强制解除对它的引用, 将其设置为 undefined, `delete obj.name`

`void`: 对任何值返回 undefined, 通常用于避免输出不应该输出的值

`++/--`: 前增量和前减量, 后增量和后减量

`+/-`: 一元加法与一元减法, 即数学上的正负号, 会把字符串转换为数值

## 位运算符

位运算符是在数字底层, 即表示数字的 32 个数位上进行操作的

`~`: NOT, 把运算数转换成 32 位数字, 把二进制数转换成它的二进制反码, 把二进制数转换成浮点数

`&`: AND, ...

`|`: OR, ...

`^`: XOR ...

`<<` 左移, `>>` 右移, `>>>` 无符号右移

## 逻辑运算符

`toBoolean` 操作: ES 规定的抽象操作

```
抽象操作 toBoolean 将其参数按照下表中的规则转换为逻辑值:

Undefined -> false
Null -> false
Boolean -> 结果等于输入的参数, 不转换
Number -> 如果参数为 +0, -0 或 NaN, 则结果为 false, 否则为 true
String -> 如果参数为空字符串, 则结果为 false, 否则为 true
Object -> true
```

`!`: 非, 逻辑 NOT 运算符返回的一定是 Boolean 值, 取逻辑反, 但遇 undefined 报错

`&&`, 且, 存在逻辑短路

`||`, 或, 存在逻辑短路, 返回的结果也不一定是 Boolean 值, 与 && 对立

## 乘性运算符

`*` 乘, `/` 除, `%` 取模, 运算数为数字时执行正常的数学运算, 特殊值运算如 NaN, Infinity, 0 视情况而定

## 加性运算符

`+` 加, `-` 减, 运算数为数字时执行正常的数学运算, 处理特殊值时视情况而定, 当运算数有字符串时 + 会用字符串形式来处理

## 关系运算符

关系运算符执行的是比较运算, 每个关系运算符都返回一个布尔值, 有 `>`, `<`, `>=`, `<=` 这几个关系运算符

数值的比较与算术比较运算相同, 字符串的比较会依次比较对应位置上的字符的 unicode 码, 注意大写字母的码比小写字母小

数值与字符串比较时, 会把字符串转换为数值, 注意任何包含 NaN 的关系运算符都要返回 false

## 等性运算符

`==` 等, `!=` 非等, 比较时会对运算数进行类型转换, 即不区分数据类型, 转换规则视情况而定

`===` 全等, `!==` 非全等, 比较时不会对运算数进行类型转换, 即区分数据类型

Boolean => Number, String/Number => Number, Object/String => String, Object/Number => Number

null == undefined, NaN != NaN, 对象的相等会判断它们的引用值, 如果指向同一对象则相等

## 条件运算符

`variable = boolean_expression ? true_value : false_value`

## 赋值运算符

`=` 一般赋值, `*=`, `/=`, `%=`, `+=`, `-=` 等

## 逗号运算符

`,` 可以在一条语句中执行多个运算, 常用变量声明中

# 语句

## if 语句

`if (condition) statement1 else statement2`, 条件可以是任何表达式, 语句可以是单行代码也可以是代码块

## 迭代 语句

`do {statement} while (expression)`, 后测试循环, 即退出条件在执行循环内部的代码之后计算

`while (expression) statement`, 前测试循环, 退出条件在执行循环内部代码之前计算

`for (initialization; expression; post-loop-expression) statement`, 前测试循环, 而且在进入循环之前能够初始化变量并定义循环后要执行的代码

`for (property in expression) statement`, 严格的迭代语句, 用于枚举对象的属性, PropertyIsEnumerable() 可用于说明属性是否可以用 for-in 迭代

## 标签 语句

`label: statement`, 可用下列语句给语句加标签, 以便以后调用

## break 与 continue 语句

break 可以立即退出循环而 continue 只是退出当前循环

break 与 continue 可以配合标签使用

## with 语句

`with (expression) statement`, 用于设置代码在特定对象中的作用域

## switch 语句

```js
switch (expression)
  case value: statement;
    break;
  case value: statement;
    break;
	...
  default: statement;
```

# 函数

## 概述

函数是一组可以随时随地运行的语句, 是 ES 的核心, 基本语法 `function functionName(arg0, arg1, ... argN) { statements }`

函数调用时用函数名加上括号中的参数来进行调用

函数返回值用 return 运算符后跟要返回的值即可, 如果函数无明确的返回值，或调用了没有参数的 return 语句，那么它真正返回的值是 undefined

函数在执行过 return 语句后立即停止代码

## arguments

`arguments` 特殊对象, 使开发者无需指定参数名就能访问他们, 是一个参数数组

`arguments.length` 检测函数的参数个数

注: ES 不会验证传递给函数的参数个数是否等于函数定义的参数个数, 任何遗漏的参数都会以 undefined 传递给函数，多余的函数将忽略

## 函数对象

ES 中函数实际上是功能完善的对象, `Function` 类可表示任何定义的函数

可以用类创建函数语法 `var fname = new Function(arg1, arg2, ..., function_body)`, 每个参数都是字符串

Function 对象的 `length` 属性: 声明了函数期望的参数个数

Function 对象的 `valueOf()` 与 `toString()` 方法: 返回函数源代码

```js
function sayHi(sName, sMessage) alert("Hello " + sName + sMessage);
var sayHi = new Function("sName", "sMessage", "alert(\"Hello \" + sName + sMessage);");
```

注意: 用类定义函数比用传统方式要慢得多, 不推荐使用, 但所有函数都应看作 Function 类的实例

## 闭包

**闭包，指的是词法表示包括不被计算的变量的函数，也就是说，函数可以使用函数之外定义的变量**

# 对象

## 应用

声明与实例化: 用 `new` 后面跟上实例化的类的名字, 如果构造函数无参数，括号则不是必需的, var oObject = new Object

对象引用: 每次创建对象, 存储在变量中的都是该对象的引用, 而不是对象本身

对象废除: 因为有**无用存储单元收集程序**的存在, 所以不必专门销毁对象来释放内存, 将无用对象废除即设置为 null 即可

早绑定与晚绑定: ...

## 类型

可以创建并使用的对象有三种: 本地对象, 内置对象和宿主对象

本地对象: 独立于宿主环境的 ES 实现提供的对象, 本地对象就是 ECMA-262 定义的类

内置对象: 由 ES 实现提供的, 独立于宿主环境的所有对象, 在 ES 程序开始执行时出现, ES 只有 Global 和 Math 两种

宿主对象: 由 ES 实现的宿主环境提供的对象, 如 BOM, DOM

## 对象作用域

公有, 私有和受保护的作用域: 公用作用域中的对象属性可以从对象外部访问, 而私有只能在对象内部使用, 但受保护的还可以在子类中使用

**ES 中只有公有作用域**: 可通过在属性名前添加 `_` 来做一个口头约定来表示私有

静态作用域: 严格来说 ES 没有静态作用域, 但可以给构造函数提供属性和方法, 来实现类似的静态方法

`this`: 关键字 this 总是指向调用该方法的对象

## 创建类和对象

原始方式: 直接全手动实现, 缺点是无法批量生产对象

```js
var oCar = new Object()
oCar.color = 'blue'
```

工厂方式: 批量生产相同属性的对象, 缺点是引用类型属性会重复创建造成内存泄漏, 可以在工厂函数外定义对象的方法, 然后通过属性指向该方法

```js
function showColor() {
  alert(this.color)
}
function createCar(sColor, iDoors) {
  var oTempCar = new Object()
  oTempCar.color = sColor
  oTempCar.showColor1 = function () {
    alert(this.color)
  } // 重复创建
  oTempCar.showColor2 = showColor() // 不会重复
  return oTempCar
}
```

构造函数方式: 构造函数看起来很像工厂函数, 缺点也一样, 可以夹杂原型方式, 即把不需要重复创建的属性写在构造函数的原型上, 只是最常用的方式

```js
function Car(sColor, iDoors) {
  // 一般第一个字符大写
  this.color = sColor
  this.showColor = function () {
    alert(this.color)
  } // 重复创建
}
Car.prototype.showColor = function () {
  alert(this.color)
} // 不会重复
```

动态原型方法: 为了语义上的和谐

```js
function Car(sColor, iDoors) {
  this.color = sColor
  this.drivers = new Array('Mike', 'John')
  if (typeof Car._initialized == 'undefined') {
    // 使用 _initialized 来保证执行一次
    Car.prototype.showColor = function () {
      alert(this.color)
    }
    Car._initialized = true
  }
}
```

## 修改对象

`prototype` 属性不仅可以定义构造函数的属性和方法，还可以为本地对象添加属性和方法

# 继承

## 对象冒充

原理是构造函数使用 this 关键字给所有属性和方法赋值, 然后使 ClassA 构造函数成为 ClassB 的方法, 这样 B 就有 A 的方法属性

```js
function ClassA(sColor) {
  this.color = sColor
  this.sayColor = function () {
    alert(this.color)
  }
}
function ClassB(sColor) {
  this.newMethod = ClassA
  this.newMethod(sColor)
  delete this.newMethod
  this.name = sName
  this.sayName = function () {
    alert(this.name)
  }
}
```

## call 与 apply 方式

改良的对象冒充, 使用方法 `xxx.call(this, ...arguments)`, 第一个参数用作 this 的对象, 其他参数都直接传递给函数自身, `xxx.apply(this, arguments)` 方式, 用作 this 的对象和要传递给函数的参数的数组

```js
function ClassB(sColor, sName) {
  ClassA.call(this, sColor) // call
  ClassA.apply(this, new Array(sColor)) // apply
  this.name = sName
  this.sayName = function () {
    alert(this.name)
  }
}
```

## 原型链方式

原理是 prototype 对象的任何属性和方法都被传递给那个类的所有实例, 以此来实现继承, 在原型链中, `instanceof` 运算符的运行方式也很独特

```js
function ClassA() {}
ClassA.prototype.color = 'blue'
ClassA.prototype.sayColor = function () {
  alert(this.color)
}
function ClassB() {}
ClassB.prototype = new ClassA()
ClassB.prototype.name = ''
ClassB.prototype.sayName = function () {
  alert(this.name)
}
```
